# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-06

### Added

- 单页锚点简历：Hero / 个人简介 / 专业技能 / 工作经历 / 项目作品 / 联系方式（+ 可选教育经历）
- 响应式布局：Desktop 侧边栏 + Tablet/Mobile 顶栏抽屉导航
- 内容完全可配置：所有简历数据放在 `_data/resume.yml`，不硬编码进模板
- 空数据安全：任何字段留空，对应 Section 自动隐藏
- 图片灯箱（Fancybox）：`<fancybox>` 标签包裹图片，支持 flex/grid 自定义布局
- 代码块美化：Markdown 代码围栏自动渲染 macOS 风格代码块，含复制按钮和语法高亮
- 微信二维码：联系方式微信块可配置二维码图片，点击弹出灯箱
- Live2D 看板娘：支持 hexo-helper-live2d 插件集成
- 技能块交互动画：hover 上浮 + 金色径向光晕扫过
- 69 个内置 SVG 图标：覆盖编程语言、数据库、框架、AI 工具、设计软件、联系方式等
- ICP 备案号配置：页脚可配置备案号，自动渲染为链接
- 项目列表页：自动生成 `/projects/` 列表页
- 项目详情页：`source/project/*.md` 自动渲染为详情页
- 简历 PDF 下载按钮
- 无障碍：语义化 HTML、键盘可达、`:focus-visible`、`prefers-reduced-motion`
- SEO：title / description / canonical / Open Graph / Twitter Card / Schema.org JSON-LD
- 示例内容：`_example/` 目录包含精简可运行的示例数据
