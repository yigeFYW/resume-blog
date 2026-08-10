# 无厘头简历博客

这是一个基于 [Hexo](https://hexo.io/) 和 [wulitou-resume](https://github.com/yigeFYW/hexo-theme-wulitou-resume) 主题搭建的个人简历博客。

它把个人介绍、技能、工作经历、项目作品和联系方式放在同一个轻量的静态站点里。主题采用 Nunjucks、SCSS 和原生 JavaScript 构建，不依赖前端框架，适合部署到 GitHub Pages、Vercel、七牛云 CDN 等静态托管平台。

> 主题已经直接包含在本仓库的 `themes/wulitou-resume/` 目录中。Fork 或普通 Clone 本项目后，不需要再单独 Clone 主题仓库。

## 特性

- 响应式简历首页，适配桌面端和移动端
- 个人介绍、技能、工作经历、教育经历、项目作品和联系方式
- 独立的项目列表页与项目详情页
- Nunjucks 模板与 SCSS 主题样式
- 内置 SVG 图标系统，无需额外图标库
- 可选 Live2D 看板娘
- 支持 PDF 简历下载
- 本地图片和静态资源，不依赖运行时后端
- 支持 GitHub Pages、Vercel 和七牛云 CDN 部署

## 在线预览

请将下面的地址替换成你实际部署后的域名：

- 博客主页：`https://your-domain.example`
- 项目列表：`https://your-domain.example/projects/`

## 技术栈

| 项目 | 版本或说明 |
| --- | --- |
| Hexo | `8.x` |
| Node.js | 推荐 `20+`，GitHub Actions 使用 Node.js 22 |
| 主题 | `wulitou-resume` |
| 模板 | Nunjucks |
| 样式 | SCSS / Dart Sass |
| 部署 | GitHub Pages、Vercel、七牛云 CDN |

## 快速开始

### 1. 获取项目

```bash
git clone https://github.com/yigeFYW/resume-blog.git
cd resume-blog
```

主题已经是主仓库中的普通目录，不需要执行 `git submodule update`，也不需要额外 Clone 主题仓库。

### 2. 安装依赖

先安装站点依赖，再安装主题依赖。主题需要在自己的目录中安装 `sass`，用于编译 SCSS。

```bash
npm install

cd themes/wulitou-resume
npm install
cd ../..
```

### 3. 本地预览

```bash
npm run server
```

打开 [http://localhost:4000](http://localhost:4000)。

常用命令：

```bash
npm run clean    # 删除 Hexo 缓存和 public
npm run build    # 生成静态文件到 public
npm run server   # 启动本地开发服务器
```

## 使用 wulitou-resume 主题

### 主题配置

根目录 `_config.yml` 已启用主题：

```yaml
theme: wulitou-resume
source_dir: source
public_dir: public
```

如果你把主题复制到新的 Hexo 站点，至少需要在站点 `_config.yml` 中配置：

```yaml
theme: wulitou-resume

markdown:
  breaks: true

highlight:
  enable: true
  line_number: false
```

### 修改个人资料

个人资料建议写在站点根目录的 `source/_data/resume.yml`，不要直接修改主题内的默认资料。主题会优先读取站点资料，再使用主题默认值。

当前项目已经提供了资料文件：

```text
source/_data/resume.yml
```

新建站点时可以从主题示例复制：

```bash
cp themes/wulitou-resume/source/_data/resume.example.yml source/_data/resume.yml
```

一个最小示例：

```yaml
name: 你的名字
title: 全栈工程师
slogan: 用代码解决真实问题

hero:
  prefix: "你好，我是"
  highlight: 你的名字
  suffix: ""
  description: 一句话介绍你正在做什么。

contact:
  email:
    value: hello@example.com
  github:
    value: https://github.com/your-name

skills:
  - name: Vue 3
    level: 90
    icon: vue
  - name: NestJS
    level: 85
    icon: nestjs

experience:
  - company: 某公司
    position: 全栈工程师
    start: '2024'
    end: 至今
    description: 负责业务系统的设计、开发和维护。
    tags: [Vue 3, NestJS]

projects:
  items:
    - name: 项目名称
      description: 项目的一句话介绍。
      cover: /images/projects/example.png
      tags: [Vue 3, Node.js]
      demo: https://example.com
      github: https://github.com/your-name/example
```

### 添加项目详情

在 `source/project/` 下创建 Markdown 文件：

```text
source/project/my-project.md
```

示例：

```markdown
---
title: 我的项目
date: 2026-01-01
description: 项目的一句话介绍。
tags: [Vue 3, Node.js]
role: 全栈开发
start: '2026'
end: 至今
stack: [Vue 3, Node.js]
highlights:
  - 项目亮点一。
  - 项目亮点二。
demo: https://example.com
github: https://github.com/your-name/example
slug: my-project
---

这里写项目详情、技术方案、截图和项目链接。
```

如果项目同时写在 `resume.yml` 的 `projects.items` 中，建议使用一致的项目名称或 slug，主题会自动关联项目卡片和详情页。

### 添加图片和 PDF

站点自己的资源放在 `source/images/` 或 `source/files/`：

```text
source/images/avatar.png
source/images/projects/my-project.png
source/files/resume.pdf
```

在资料文件中使用站点绝对路径：

```yaml
avatar: /images/avatar.png

resume_file:
  enable: true
  url: /files/resume.pdf
  label: 下载简历
  filename: resume.pdf
```

### Live2D

当前配置默认启用 Live2D。如果不需要，可以在根目录 `_config.yml` 中关闭：

```yaml
live2d:
  enable: false
```

主题细节、完整字段说明、图标列表和高级配置见 [`themes/wulitou-resume/README.md`](themes/wulitou-resume/README.md)。

### 在其他 Hexo 站点单独使用主题

如果你只想把这个主题用于另一个 Hexo 站点：

```bash
cd your-hexo-site
git clone https://github.com/yigeFYW/hexo-theme-wulitou-resume.git themes/wulitou-resume

cd themes/wulitou-resume
npm install
cd ../..
```

然后在站点 `_config.yml` 中启用主题，并复制示例资料：

```yaml
theme: wulitou-resume
```

```bash
cp themes/wulitou-resume/source/_data/resume.example.yml source/_data/resume.yml
npx hexo clean
npx hexo server
```

## 部署到七牛云

七牛部署脚本会依次执行：

1. `hexo clean`
2. `hexo generate`
3. 上传 `public/` 中的站点文件
4. 按文件 URL 分批刷新 CDN 缓存

### 1. 绑定自定义域名

不要使用七牛 CDN 测试域名作为正式站点域名。生产环境应在七牛空间的“域名管理”中绑定自定义 CDN 域名，并按控制台提示配置 DNS CNAME。[七牛域名管理文档](https://developer.qiniu.com/kodo/8527/kodo-domain-name-management)

例如：

```text
blog.example.com
```

如果使用中国大陆区域的 CDN 域名，还需要按照七牛控制台要求完成域名备案和 HTTPS 配置。

### 2. 配置密钥和空间

复制环境变量模板：

```bash
cp .env.example .env
```

编辑 `.env`：

```dotenv
QINIU_ACCESS_KEY=你的七牛AccessKey
QINIU_SECRET_KEY=你的七牛SecretKey
QINIU_BUCKET=wulitou-resume
QINIU_ZONE=Zone_z2
QINIU_DOMAIN=https://blog.example.com
QINIU_KEY_PREFIX=
```

支持的区域写法包括：

| 配置值 | 区域 |
| --- | --- |
| `Zone_z0` / `z0` | 华东-浙江 |
| `Zone_z1` / `z1` | 华北-河北 |
| `Zone_z2` / `z2` | 华南-广东 |
| `Zone_cn_east_2` / `cn-east-2` | 华东-浙江二 |
| `Zone_na0` / `na0` | 北美-洛杉矶 |
| `Zone_as0` / `as0` | 亚太-新加坡 |

`QINIU_KEY_PREFIX` 要和 Hexo 的 `root` 保持一致：

- 如果 `_config.yml` 是 `root: /`，保持为空。
- 如果 `_config.yml` 是 `root: /resume-blog/`，填写 `resume-blog`。

### 3. 执行部署

```bash
npm run deploy:qiniu
```

脚本会覆盖上传同名文件，并刷新本次生成文件对应的 CDN URL。AK/SK 只从 `.env` 或 shell 环境变量读取，`.env` 已加入 `.gitignore`，不要将真实密钥提交到仓库。

## 部署到 Vercel

项目提供了 [`deploy-vercel.js`](deploy-vercel.js)，它会清理并生成 `public/`，然后通过 Vercel CLI 发布生产环境。

### 方式一：交互式部署

首次使用先登录：

```bash
npx vercel login
```

确认主题依赖已安装后执行：

```bash
npm run deploy:vercel
```

脚本会在没有项目配置时询问项目名称，也可以直接回车让 Vercel 自动生成。

### 方式二：使用 Token 部署

适合 CI 或自动化环境：

```bash
VERCEL_TOKEN=你的Token \
VERCEL_PROJECT_NAME=你的项目名 \
npm run deploy:vercel
```

Token 不要写进 `package.json`、README 或 Git 仓库。CI 环境应使用 GitHub Actions Secrets、Vercel Environment Variables 或其他密钥管理功能。[Vercel CLI 部署文档](https://vercel.com/docs/cli/deploying-from-cli)

### Vercel 控制台导入仓库

也可以在 Vercel 控制台导入 GitHub 仓库，配置为：

```text
Framework Preset: Other
Install Command: npm install --no-audit --no-fund && npm install --prefix themes/wulitou-resume --no-audit --no-fund
Build Command: npm run build
Output Directory: public
```

主题依赖必须安装，否则可能出现 `Cannot find module 'sass'`。

## 部署到 GitHub Pages

仓库已经包含 `.github/workflows/pages.yml`。推送到 `main` 分支后，GitHub Actions 会自动：

1. 安装根目录依赖
2. 安装主题目录依赖
3. 生成 Hexo 静态文件
4. 上传 `public/` artifact
5. 发布到 GitHub Pages

这使用的是 GitHub Pages 的 Actions 工作流方式。[GitHub Pages 自定义工作流文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

### 配置仓库

在 GitHub 仓库中打开：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

然后提交并推送：

```bash
git add .
git commit -m "update resume"
git push origin main
```

### 配置 URL 和 root

如果是项目站点，例如仓库地址为 `https://github.com/your-name/resume-blog`：

```yaml
url: https://your-name.github.io/resume-blog
root: /resume-blog/
```

如果是用户站点仓库 `your-name.github.io`，则使用：

```yaml
url: https://your-name.github.io
root: /
```

如果使用自己的域名，`url` 改为实际域名，`root` 通常保持 `/`。

## 项目结构

```text
.
├── source/                         # 站点内容、简历资料和图片
│   ├── _data/resume.yml            # 个人资料主文件
│   ├── _posts/                     # Hexo 文章
│   ├── project/                    # 项目详情页
│   └── images/                     # 站点图片
├── themes/wulitou-resume/          # 内置主题源码
├── .github/workflows/pages.yml     # GitHub Pages 自动部署
├── deploy-qiniu.js                 # 七牛上传和 CDN 刷新
├── deploy-vercel.js                # Vercel 生产部署
├── _config.yml                     # Hexo 站点配置
├── .env.example                    # 七牛环境变量模板
└── package.json                    # 站点命令和依赖
```

## 常见问题

### Fork 后主题目录为空

本仓库已经将主题从 Git submodule 改为普通目录。拉取包含该改动的新版本后，Fork/Clone 会直接得到主题文件，不需要额外执行 Clone。

### 构建时报 `Cannot find module 'sass'`

进入主题目录安装依赖：

```bash
cd themes/wulitou-resume
npm install
cd ../..
```

### 七牛链接在浏览器中自动下载

通常是使用了七牛测试域名。请绑定自己的 CDN 域名，将 `.env` 中的 `QINIU_DOMAIN` 改成自定义域名后重新部署。七牛当前对测试域名有访问限制，正式站点应使用自定义域名。[七牛测试域名迁移说明](https://developer.qiniu.com/kodo/kb/5158/how-to-transition-from-test-domain-name-to-a-custom-domain-name?category=kb)

### GitHub Pages 页面 404 或 CSS/图片路径错误

检查 `_config.yml` 中的 `url` 和 `root` 是否与仓库类型一致。项目站点通常需要 `root: /仓库名/`，用户站点或自定义域名通常使用 `root: /`。

### Vercel 部署时找不到主题依赖

确保在 `themes/wulitou-resume` 目录执行过 `npm install`，或者在 Vercel 的 Install Command 中同时安装主题依赖。

## 许可证

主题源码遵循 [`themes/wulitou-resume/LICENSE`](themes/wulitou-resume/LICENSE) 中的许可证。个人资料、文章、图片和其他内容请根据自己的版权情况使用和授权。
