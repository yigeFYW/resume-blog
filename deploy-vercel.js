#!/usr/bin/env node
/**
 * Vercel 部署脚本
 *
 * 用法:
 *   npm run deploy:vercel                       # 交互式部署, 可自定义项目名
 *   VERCEL_TOKEN=xxx npm run deploy:vercel      # CI / 自动化部署
 *
 * 首次使用:
 *   npx vercel login   # 登录 Vercel 账号
 *
 * 环境变量:
 *   VERCEL_TOKEN          Vercel API Token, 用于非交互式部署
 *                         获取地址: https://vercel.com/account/tokens
 *   VERCEL_PROJECT_NAME   项目名称, 决定域名为 xxx.vercel.app
 *                         仅支持小写字母、数字、连字符
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const readline = require('readline')

const ROOT = path.resolve(__dirname)
const PUBLIC_DIR = path.join(ROOT, 'public')

function run(cmd) {
  console.log(`\n ▸ ${cmd}`)
  execSync(cmd, { stdio: 'inherit', cwd: ROOT })
}

function askProjectName() {
  return new Promise(resolve => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    rl.question('\n📛 请输入项目名称 (决定域名为: <名称>.vercel.app)\n'
      + '   规则: 小写字母、数字、连字符, 3-63 个字符\n'
      + '   直接回车跳过, 由 Vercel 自动生成:\n'
      + '   → ', name => {
        rl.close()

        const trimmed = name.trim()
        if (!trimmed) {
          console.log('   ⏭️  跳过, 将使用 Vercel 自动生成的域名\n')
          return resolve('')
        }

        if (!/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(trimmed)) {
          console.log('   ⚠️  名称不合规, 已跳过 (仅支持小写字母/数字/连字符, 3-63 字符)\n')
          return resolve('')
        }

        console.log(`   ✅ 域名将为: ${trimmed}.vercel.app\n`)
        resolve(trimmed)
      })
  })
}

async function main() {
  const token = process.env.VERCEL_TOKEN
  const hasVercelConfig = fs.existsSync(path.join(ROOT, '.vercel'))

  console.log('🚀 Vercel 部署流程启动\n')

  // 1. 清理旧产物
  console.log('🧹 [1/3] 清理旧产物...')
  run('npx hexo clean')

  // 2. 生成静态文件
  console.log('📦 [2/3] 生成静态文件...')
  run('npx hexo generate')

  if (!fs.existsSync(PUBLIC_DIR)) {
    throw new Error('构建失败: public 目录不存在')
  }

  // 3. 部署到 Vercel
  console.log('☁️  [3/3] 部署到 Vercel...')

  // 获取项目名称: 环境变量优先, 否则交互式输入
  let projectName = process.env.VERCEL_PROJECT_NAME || ''
  if (!projectName && !token) {
    projectName = await askProjectName()
  }

  if (!hasVercelConfig && !token) {
    console.log('⚠️  未检测到 Vercel 登录信息, 将进入交互式登录流程')
    console.log('   如需 CI 自动部署, 请设置环境变量 VERCEL_TOKEN')
    console.log('   Token 获取: https://vercel.com/account/tokens\n')
  }

  let deployCmd = token
    ? `npx vercel deploy public --prod --yes --token=${token}`
    : `npx vercel deploy public --prod --yes`

  if (projectName) {
    deployCmd += ` --name=${projectName}`
  }

  run(deployCmd)

  if (projectName) {
    console.log(`\n✅ 部署完成!`)
  } else {
    console.log('\n✅ 部署完成!')
  }
}

main().catch(err => {
  console.error('\n❌ 部署失败:', err.message)
  process.exit(1)
})
