#!/usr/bin/env node

/**
 * Hexo -> 七牛云对象存储 -> CDN 刷新
 *
 * 用法:
 *   cp .env.example .env
 *   npm run deploy:qiniu
 *
 * 说明:
 *   - 每次先清理并重新生成 public，再覆盖上传全部站点文件。
 *   - CDN 按文件 URL 刷新，单次最多 100 个 URL，脚本会自动分批。
 *   - AK/SK 只从环境变量读取，不写入代码或仓库。
 */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const qiniu = require('qiniu')
const dotenv = require('dotenv')

const ROOT = path.resolve(__dirname)
const PUBLIC_DIR = path.join(ROOT, 'public')
const HEXO_BIN = require.resolve('hexo/bin/hexo')
const CDN_REFRESH_BATCH_SIZE = 100

dotenv.config({ path: path.join(ROOT, '.env'), quiet: true })

const ZONE_ALIASES = {
  z0: 'Zone_z0',
  z1: 'Zone_z1',
  z2: 'Zone_z2',
  na0: 'Zone_na0',
  as0: 'Zone_as0',
  cn_east_2: 'Zone_cn_east_2',
  'cn-east-2': 'Zone_cn_east_2',
}

function requiredEnv(name) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`缺少环境变量 ${name}，请在 .env 或 shell 中配置`)
  }
  return value
}

function getZone(zoneName) {
  const directName = zoneName.trim()
  const sdkZoneName = qiniu.zone[directName]
    ? directName
    : ZONE_ALIASES[directName.toLowerCase()]

  if (!sdkZoneName || !qiniu.zone[sdkZoneName]) {
    throw new Error(
      `QINIU_ZONE 无效: ${zoneName}。可用值示例: Zone_z0、Zone_z1、Zone_z2、z0、z1、z2`,
    )
  }

  return qiniu.zone[sdkZoneName]
}

function getConfig() {
  const domain = requiredEnv('QINIU_DOMAIN').replace(/\/+$/, '')
  let parsedDomain

  try {
    parsedDomain = new URL(domain)
  } catch {
    throw new Error('QINIU_DOMAIN 必须是完整的 http(s) URL')
  }

  if (!['http:', 'https:'].includes(parsedDomain.protocol)) {
    throw new Error('QINIU_DOMAIN 只支持 http:// 或 https://')
  }

  if (parsedDomain.search || parsedDomain.hash) {
    throw new Error('QINIU_DOMAIN 不应包含查询参数或 hash')
  }

  const zoneName = requiredEnv('QINIU_ZONE')
  const keyPrefix = (process.env.QINIU_KEY_PREFIX || '')
    .trim()
    .replace(/^\/+|\/+$/g, '')

  return {
    accessKey: requiredEnv('QINIU_ACCESS_KEY'),
    secretKey: requiredEnv('QINIU_SECRET_KEY'),
    bucket: requiredEnv('QINIU_BUCKET'),
    zone: getZone(zoneName),
    zoneName,
    domain: `${domain}/`,
    keyPrefix,
  }
}

function runHexo(args) {
  console.log(`\n▸ hexo ${args.join(' ')}`)
  execFileSync(process.execPath, [HEXO_BIN, ...args], {
    cwd: ROOT,
    env: process.env,
    stdio: 'inherit',
  })
}

function shouldIgnore(relativePath) {
  const normalizedPath = relativePath.replaceAll(path.sep, '/')
  const firstSegment = normalizedPath.split('/')[0]
  const baseName = path.posix.basename(normalizedPath)

  return (
    baseName === '.gitignore' ||
    baseName === '.DS_Store' ||
    firstSegment === '.vercel' ||
    /^\.env(?:\.|$)/.test(baseName)
  )
}

function collectFiles(directory, relativeDirectory = '') {
  const entries = fs
    .readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name.localeCompare(right.name))
  const files = []

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name)
    const relativePath = path.join(relativeDirectory, entry.name)

    if (shouldIgnore(relativePath)) {
      continue
    }

    if (entry.isDirectory()) {
      files.push(...collectFiles(absolutePath, relativePath))
    } else if (entry.isFile()) {
      files.push({ absolutePath, key: relativePath.replaceAll(path.sep, '/') })
    }
  }

  return files
}

function chunk(items, size) {
  const chunks = []
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }
  return chunks
}

function cdnUrl(domain, key) {
  const encodedKey = key.split('/').map(encodeURIComponent).join('/')
  return new URL(encodedKey, domain).toString()
}

function remoteKey(key, prefix) {
  return prefix ? `${prefix}/${key}` : key
}

function formatResponseBody(body) {
  if (!body) return ''
  if (typeof body === 'string') return body
  try {
    return JSON.stringify(body)
  } catch {
    return String(body)
  }
}

class QiniuPublisher {
  constructor(config) {
    this.config = config
    this.mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey)
    this.uploadConfig = new qiniu.conf.Config()
    this.uploadConfig.zone = config.zone
    this.formUploader = new qiniu.form_up.FormUploader(this.uploadConfig)
    this.cdnManager = new qiniu.cdn.CdnManager(this.mac)
  }

  upload(file) {
    const policy = new qiniu.rs.PutPolicy({
      scope: `${this.config.bucket}:${file.key}`,
      expires: 3600,
    })
    const uploadToken = policy.uploadToken(this.mac)
    const putExtra = new qiniu.form_up.PutExtra()

    return this.formUploader
      .putFile(uploadToken, file.key, file.absolutePath, putExtra)
      .then(({ data, resp }) => {
        if (!resp || resp.statusCode !== 200) {
          throw new Error(
            `上传失败 ${file.key}: ${resp?.statusCode ?? 'unknown'} ${formatResponseBody(data)}`,
          )
        }
      })
  }

  refreshUrls(urls) {
    return new Promise((resolve, reject) => {
      this.cdnManager.refreshUrls(urls, (error, body, response) => {
        if (error) {
          reject(error)
          return
        }

        if (!response || response.statusCode !== 200) {
          reject(
            new Error(
              `CDN 刷新失败: ${response?.statusCode ?? 'unknown'} ${formatResponseBody(body)}`,
            ),
          )
          return
        }

        resolve(body)
      })
    })
  }
}

async function main() {
  const config = getConfig()

  console.log('🚀 七牛部署流程启动')
  console.log(`   bucket: ${config.bucket}`)
  console.log(`   zone: ${config.zoneName}`)
  console.log(`   domain: ${config.domain}`)
  console.log(`   key prefix: ${config.keyPrefix || '(none)'}`)

  console.log('\n🧹 [1/4] 清理旧产物...')
  runHexo(['clean'])

  console.log('\n📦 [2/4] 生成静态文件...')
  runHexo(['generate'])

  if (!fs.existsSync(PUBLIC_DIR) || !fs.statSync(PUBLIC_DIR).isDirectory()) {
    throw new Error('构建失败: public 目录不存在')
  }

  const files = collectFiles(PUBLIC_DIR)
  if (!files.length) {
    throw new Error('构建失败: public 目录没有可上传的站点文件')
  }

  const uploadFiles = files.map(file => ({
    ...file,
    key: remoteKey(file.key, config.keyPrefix),
  }))
  const publisher = new QiniuPublisher(config)

  console.log(`\n☁️  [3/4] 上传 ${uploadFiles.length} 个文件...`)
  for (let index = 0; index < uploadFiles.length; index += 1) {
    const file = uploadFiles[index]
    await publisher.upload(file)
    console.log(`   [${index + 1}/${uploadFiles.length}] ${file.key}`)
  }

  const urls = uploadFiles.map(file => cdnUrl(config.domain, file.key))
  console.log(`\n♻️  [4/4] 刷新 ${urls.length} 个 CDN URL...`)

  for (const [index, urlsToRefresh] of chunk(urls, CDN_REFRESH_BATCH_SIZE).entries()) {
    await publisher.refreshUrls(urlsToRefresh)
    console.log(
      `   第 ${index + 1}/${Math.ceil(urls.length / CDN_REFRESH_BATCH_SIZE)} 批刷新已提交 (${urlsToRefresh.length} 个 URL)`,
    )
  }

  console.log('\n✅ 七牛部署完成')
}

main().catch(error => {
  console.error(`\n❌ 七牛部署失败: ${error.message}`)
  process.exitCode = 1
})
