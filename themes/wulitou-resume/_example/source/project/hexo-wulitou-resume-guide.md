---
title: Hexo无厘头简历模板
description: 一份能跑起来、也能让人一眼想用的 Hexo 简历主题使用指南
cover: '/images/resume.png'
tags: ['Hexo', '简历', '主题', '前端']
role: 全栈开发
start: '2024'
end: 至今
stack: ['Hexo', 'SCSS', 'Nunjucks', 'Vanilla JS']
highlights:
  - 暖色纸质感设计系统与卡通装饰
  - 响应式三栏布局，侧边栏 + 主内容 + 导航
  - 内置 Fancybox 图片灯箱、代码块组件、Live2D 看板娘
  - 40+ 内联 SVG 图标，零外部图标库依赖
demo: ''
github: ''
order: 1
slug: hexo-wulitou-resume-guide
---

# Hexo 无厘头简历模板

> **代码是画笔，产品是画布！**  
> 一份不正经但好用的 Hexo 简历主题，暖色纸质感设计，自带卡通装饰、图片灯箱、代码高亮、Live2D 看板娘。

---

## 功能特性

### 设计

- **暖色纸质感** — cream 背景 + 浅色卡片 + 暖色阴影，不刺眼
- **卡通装饰层** — 手绘 SVG 装饰素材散落页面各处，可一键关闭
- **响应式三栏** — 桌面端侧边栏 + 主内容 + 右侧导航，移动端折叠为抽屉
- **CSS Design Tokens** — 所有颜色、间距、圆角统一管理，换色只改 token

### 组件

- **Fancybox 图片灯箱** — `<fancybox>` 标签包裹图片，点击预览，手机端全屏
- **代码块组件** — macOS 风格头部 + 语言标签 + 复制按钮 + 语法高亮
- **技能块 hover 动画** — 鼠标悬停上浮 + 径向金色光晕从右上扫到左下
- **Live2D 看板娘** — 左下角 koharu 模型，跟随鼠标视线，手机端缩放

### 工程

- **零外部图标库** — 40+ 内联 SVG，品牌色 + 统一描边风格
- **IntersectionObserver 动画** — 技能进度条进入视口才播放
- **prefers-reduced-motion** — 全部动画尊重无障碍偏好
- **SEO** — JSON-LD 结构化数据、Open Graph、自动 keywords

---

## 快速开始

### 1. 安装

```bash
# 克隆仓库
git clone https://github.com/yourname/resume.git
cd resume

# 安装依赖
npm install
```

### 2. 填写简历内容

把示例文件复制为正式数据文件，然后修改：

```bash
cp src/_data/resume.example.yml src/_data/resume.yml
```

编辑 `src/_data/resume.yml`，改成你自己的信息：

```yaml
name: 你的名字
title: 你的职位
slogan: 一句副标题

hero:
  prefix: 你好，我是
  highlight: 你的名字
  suffix: '，'
  description: 一段自我介绍，可以把某个词高亮成橙色。
  highlight_word: 高亮的词

contact:
  phone:
    value: 138-0000-0000
  email:
    value: hello@example.com
  wechat:
    value: your_wechat
  github:
    value: https://github.com/yourname
    label: github.com/yourname

skills:
  - { name: 'Vue 3', level: 90, icon: vue }
  - { name: 'Java', level: 85, icon: java }
  - { name: 'Go', level: 75, icon: go }

experience:
  - company: 某公司
    position: 前端工程师
    start: '2022'
    end: 至今
    description: 负责产品前端开发。
    tags: ['Vue', 'TypeScript']
```

### 3. 构建与预览

```bash
# 开发模式（热重载）
npx hexo server --config _config.yml,_config.wulitou.yml --output public-wulitou

# 生产构建
npx hexo generate --config _config.yml,_config.wulitou.yml --output public-wulitou
```

浏览器打开 `http://localhost:4000` 即可预览。

---

## 配置说明

### 站点配置

站点 `_config.yml` 关键配置：

```yaml
# Hexo 内置代码高亮
highlight:
  enable: true
  line_number: false
  auto_detect: false
  tab_replace: '  '
  wrap: true

# Markdown 渲染
markdown:
  preset: 'default'
  render:
    html: true       # 允许 <fancybox> 等自定义标签
    sanitize: false  # 关闭 sanitize，保留内联 HTML
```

### 主题配置

主题 `_config.yml` 或 `_config.wulitou.yml`：

```yaml
# CDN 资源（图片灯箱）
cdn:
  jquery: https://cdn.staticfile.org/jquery/3.5.0/jquery.min.js
  fancybox:
    css: https://cdn.staticfile.org/fancybox/3.5.7/jquery.fancybox.min.css
    js: https://cdn.staticfile.org/fancybox/3.5.7/jquery.fancybox.min.js

# 主题行为
theme_options:
  nav_icons: true          # 导航栏图标
  decorations: true       # 卡通装饰层
  animate_skills: true     # 技能进度条动画
  smooth_scroll: true      # 锚点平滑滚动
  project_dir: project     # 项目详情页目录

# 导航
nav:
  - { label: 首页, anchor: home, icon: home }
  - { label: 个人简介, anchor: about, icon: user }
  - { label: 专业技能, anchor: skills, icon: code }
  - { label: 工作经历, anchor: experience, icon: briefcase }
  - { label: 项目作品, anchor: projects, icon: folder }

# Live2D 看板娘
live2d:
  enable: true
  model:
    use: live2d-widget-model-koharu
  display:
    position: left
    width: 150
    height: 300
  mobile:
    show: true
    scale: 0.5
```

---

## 内容编写

### 简历数据结构

所有内容写在 `src/_data/resume.yml` 里。**任何字段留空都安全** — 对应区域自动隐藏，不会出现「暂无数据」占位文案。

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | string | 姓名，用于侧边栏 / Header / SEO |
| `title` | string | 职位 |
| `slogan` | string | 副标题，与 title 拼成两行 |
| `avatar` | string | 头像路径，如 `/images/avatar/avatar.png` |
| `hero` | object | 首屏配置（prefix / highlight / suffix / description / image / bubble） |
| `contact` | object | 联系方式（phone / email / wechat / github / extra） |
| `about` | object | 个人简介（content 支持多行，bubble 为吉祥物气泡） |
| `skills` | array | 技能列表，每项 `{ name, level, icon }` |
| `experience` | array | 工作经历，每项 `{ company, position, start, end, description, tags }` |
| `projects` | object | 项目作品，`items` 数组，每项 `{ name, description, cover, tags, demo, github }` |
| `education` | array | 教育经历，可选 |

### 技能配置

```yaml
skills_note: 技能满格，快乐加倍！

skills:
  - { name: 'Vue 3',      level: 90, icon: vue }
  - { name: 'React',      level: 85, icon: react }
  - { name: 'Java',       level: 85, icon: java }
  - { name: 'Python',     level: 80, icon: python }
  - { name: 'Go',         level: 75, icon: go }
  - { name: 'Rust',       level: 70, icon: rust }
  - { name: 'PHP',        level: 75, icon: php }
  - { name: 'Kotlin',     level: 70, icon: kotlin }
  - { name: 'PostgreSQL', level: 80, icon: postgresql }
  - { name: 'Redis',      level: 85, icon: redis }
  - { name: 'Kafka',      level: 75, icon: kafka }
  - { name: 'Figma',      level: 80, icon: figma }
  - { name: 'Tailwind',  level: 85, icon: tailwind }
  - { name: 'Claude Code', level: 90, icon: claude }
```

> `level` 范围 0–100，渲染为进度条 + 百分比文字。不写 `level` 则只显示图标和名称。  
> `icon` 写不存在的名字会回落到笑脸图标，不会报错。

### 联系方式配置

```yaml
contact:
  phone:
    value: 138-8888-6666
  email:
    value: hello@example.com
  wechat:
    value: huanghe
  github:
    value: https://github.com/huanghe
    label: github.com/huanghe
  # 可选额外联系方式
  extra:
    - { label: X (Twitter), value: '@yourname', url: 'https://x.com/yourname', icon: x }
    - { label: WhatsApp, value: '+86 138 8888 6666', url: 'https://wa.me/8613888886666', icon: whatsapp }
    - { label: Telegram, value: '@yourname', url: 'https://t.me/yourname', icon: telegram }
```

> 电话自动生成 `tel:`，邮箱自动生成 `mailto:`，微信是纯文本。  
> GitHub 自动补全 `https://` 并加 `rel="noopener noreferrer"`。

### 项目详情页

在 `source/project/` 下创建 Markdown 文件即可生成项目详情页：

```bash
source/project/my-project.md
```

文件头 front-matter：

```yaml
---
title: 我的项目
description: 项目一句话简介
cover: /images/projects/my-project.png
tags: ['Vue', 'NestJS']
role: 全栈开发
start: '2024'
end: 至今
stack: ['Vue 3', 'NestJS', 'Neo4j']
highlights:
  - 亮点一
  - 亮点二
demo: https://demo.example.com
github: https://github.com/yourname/my-project
slug: my-project
---
```

简历 `projects.items` 里写 `slug: my-project` 即可关联到对应详情页。

---

## Markdown 语法展示

本主题完整支持以下 Markdown 语法，在项目详情页中可以使用。

### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

### 文字格式

**加粗文字**、*斜体文字*、~~删除线~~、`行内代码`。

> **提示：** 加粗和斜体可以嵌套使用，如 ***加粗斜体***。

### 列表

无序列表：

- 第一项
- 第二项
  - 嵌套子项 A
  - 嵌套子项 B
- 第三项

有序列表：

1. 第一步
2. 第二步
   1. 子步骤 a
   2. 子步骤 b
3. 第三步

### 引用

> 这是一段引用文字。
>
> 引用内可以包含多个段落。
>
> > 嵌套引用也可以。

### 代码块

支持多种语言高亮：

```javascript
class KnowledgeBase {
  constructor(name) {
    this.name = name;
    this.entries = [];
  }

  add(entry) {
    this.entries.push(entry);
    return this.entries.length;
  }
}

const kb = new KnowledgeBase('AI 知识库');
kb.add({ question: '什么是 NestJS?', answer: '一个 Node.js 框架' });
```

```yaml
# YAML 配置示例
server:
  port: 3000
  host: localhost
database:
  type: postgresql
  url: postgres://user:pass@localhost:5432/mydb
```

```bash
# Bash 命令
npm install
npm run build
docker-compose up -d
```

### 表格

| 技术栈 | 类型 | 用途 |
|--------|------|------|
| Vue 3 | 前端框架 | 用户界面 |
| NestJS | 后端框架 | API 服务 |
| Neo4j | 图数据库 | 知识图谱 |
| Docker | 容器化 | 部署运维 |

### 分割线

上方内容

---

下方内容

### 链接与图片

普通链接：[GitHub](https://github.com)

自动链接：<https://www.example.com>

### Fancybox 图片灯箱

在 Markdown 中用 `<fancybox>` 标签包裹图片，点击即可预览：

**默认 flex 布局：**

```markdown
<fancybox>
<img src='//example.com/image-1.png'>
<img src='//example.com/image-2.png'>
<img src='//example.com/image-3.png'>
</fancybox>
```

**Grid 2 列 + 大间距：**

```markdown
<fancybox data-layout="grid" data-cols="2" data-gap="lg">
<img src='//example.com/image-1.png'>
<img src='//example.com/image-2.png'>
</fancybox>
```

**Grid 4 列 + 紧凑间距：**

```markdown
<fancybox data-layout="grid" data-cols="4" data-gap="sm">
<img src='//example.com/image-1.png'>
<img src='//example.com/image-2.png'>
<img src='//example.com/image-3.png'>
<img src='//example.com/image-4.png'>
</fancybox>
```

| 属性 | 值 | 说明 |
|------|----|------|
| `data-layout` | `"flex"`(默认) / `"grid"` | 布局模式 |
| `data-cols` | `1`–`6` | 列数 |
| `data-gap` | `"none"` / `"sm"`(默认) / `"md"` / `"lg"` | 图片间距 |

> 手机端（≤425px）自动把 4–6 列降为 3 列，防止缩略图太小。  
> 图片排列顺序 = HTML 中 `<img>` 标签的书写顺序。

---

## 图标参考

主题内置 68 个内联 SVG 图标，零外部依赖。用法：在 `resume.yml` 的 `icon` 字段填写图标名称。

### UI 图标

用于导航栏、区块标题、按钮等。

| 名称 | 用途 | 主色 |
|------|------|------|
| `home` | 首页 / 导航 | `#FF6B35` 橙 |
| `user` | 个人简介 | `#2D9CDB` 蓝 |
| `code` | 专业技能 | `#FFE89A` 黄 |
| `briefcase` | 工作经历 | `#42B883` 绿 |
| `folder` | 项目作品 | `#FFD85C` 金 |
| `mail` | 邮箱联系 | `#FF85A2` 粉 |
| `phone` | 电话联系 | `#42B883` 绿 |
| `wechat` | 微信联系 | `#42B883` 绿 |
| `github` | GitHub | `#8B5CF6` 紫 |
| `link` | 外链 | `#2D9CDB` 蓝 |
| `star` | 星标 / 技能徽章 | `#FFD85C` 金 |
| `sparkle` | 闪光 / 亮点 | `#FFD85C` 金 |
| `arrow-right` | 右箭头 | `currentColor` |
| `arrow-left` | 左箭头 / 返回 | `currentColor` |
| `external` | 外部链接 | `currentColor` |
| `menu` | 菜单 | `currentColor` |
| `close` | 关闭 | `currentColor` |
| `graduation` | 教育经历 | `#8B5CF6` 紫 |

### 编程语言图标

用于技能块 `.wr-skill__icon`。

| 名称 | 对应 | 主色 |
|------|------|------|
| `vue` | Vue.js | `#42B883` 绿 |
| `nextjs` | Next.js | `#161616` 黑 |
| `nestjs` | NestJS | `#E0234E` 红 |
| `typescript` | TypeScript | `#3178C6` 蓝 |
| `nodejs` | Node.js | `#539E43` 绿 |
| `c` | C 语言 | `#5C6BC0` 靛蓝 |
| `cpp` | C++ | `#659AD2` 浅蓝 |
| `ruby` | Ruby | `#CC342D` 红 |
| `go` | Go | `#00ADD8` 青 |
| `rust` | Rust | `#CE422B` 砖红 |
| `java` | Java | `#5382A1` 钢蓝 + `#F89820` 橙 |
| `graphql` | GraphQL | `#E10098` 品红 |
| `php` | PHP | `#777BB4` 紫蓝 |
| `python` | Python | `#3776AB` 蓝 + `#FFD43B` 黄 |
| `swift` | Swift | `#F05138` 橙 |
| `kotlin` | Kotlin | `#7F52FF` 紫 |

### 数据库与中间件图标

| 名称 | 对应 | 主色 |
|------|------|------|
| `mysql` | MySQL | `#00758F` 青 + `#F29111` 橙 |
| `neo4j` | Neo4j | `#018BFF` 蓝 |
| `redis` | Redis | `#DC382D` 红 |
| `postgresql` | PostgreSQL | `#336791` 深蓝 |
| `kafka` | Apache Kafka | `#231F20` 近黑 |
| `docker` | Docker | `#2496ED` 蓝 |
| `tailwind` | Tailwind CSS | `#06B6D4` 青 |

### 框架与构建工具图标

| 名称 | 对应 | 主色 |
|------|------|------|
| `react` | React | `#61DAFB` 青 |
| `angular` | Angular | `#DD0031` 红 |
| `spring` | Spring | `#6DB33F` 绿 |
| `dart` | Dart | `#0175C2` 蓝 + `#13B9FD` 浅蓝 |
| `flutter` | Flutter | `#02569B` 深蓝 + `#13B9FD` 浅蓝 |
| `electron` | Electron | `#47848F` 青灰 |
| `vite` | Vite | `#646CFF` 紫 + `#FFD85C` 金 |
| `webpack` | Webpack | `#1C78C0` 蓝 |
| `sass` | Sass | `#CC6699` 粉 |
| `html5` | HTML5 | `#E34F26` 橙 |
| `css3` | CSS3 | `#1572B6` 蓝 |
| `git` | Git | `#F05032` 橙红 |

### AI 工具图标

| 名称 | 对应 | 主色 |
|------|------|------|
| `ai` | AI 通用 | `#8B5CF6` 紫 |
| `codex` | Codex | `#1a1a2e` 深色 + `#10A37F` 绿 |
| `claude` | Claude Code | `#D97757` 陶土橙 |
| `workbuddy` | WorkBuddy | `#8B5CF6` 紫 + `#FFD85C` 金 |

### 设计软件图标

| 名称 | 对应 | 主色 |
|------|------|------|
| `design` | UI 设计通用 | `#FFD85C` 金（调色盘多色） |
| `figma` | Figma | `#F24E1E` / `#FF7262` / `#A259FF` / `#1ABCFE` / `#0ACF83` 多色 |
| `photoshop` | Adobe Photoshop | `#31A8FF` 蓝 |
| `illustrator` | Adobe Illustrator | `#FF9A00` 橙 |
| `sketch` | Sketch | `#FDB300` / `#EA6C00` 琥珀 |
| `xd` | Adobe XD | `#470137` 深紫 + `#FF61F6` 粉 |

### 平台与网页图标

| 名称 | 对应 | 主色 |
|------|------|------|
| `miniprogram` | 微信小程序 | `#07C160` 微信绿 |
| `website` | 个人网页 / 网站 | `#2D9CDB` 蓝 |

### 联系方式图标

| 名称 | 对应 | 主色 |
|------|------|------|
| `x` | X (Twitter) | `#161616` 黑 |
| `whatsapp` | WhatsApp | `#25D366` 绿 |
| `telegram` | Telegram | `#26A5E4` 蓝 |

### 兜底图标

| 名称 | 触发条件 | 效果 |
|------|----------|------|
| *(笑脸)* | `icon` 值不匹配任何已知名称 | 黄色圆脸 + 两只眼睛 + 微笑曲线 |

---

## 自定义指南

### 添加新图标

在 `themes/wulitou-resume/layout/partial/icons.njk` 的 `{%- else -%}` 之前插入新分支：

```njk
{%- elif _n == 'myicon' -%}
<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
  <circle cx="12" cy="12" r="9" fill="#FF6B35" stroke="#161616" stroke-width="1.6"/>
  <path d="M8 12h8" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
</svg>
```

然后在 `resume.yml` 里写 `icon: myicon` 即可使用。

> **风格约定：**
> - `viewBox="0 0 24 24"` 统一坐标系
> - `aria-hidden="true" focusable="false"` 装饰性
> - 品牌色用 `fill`，描边用 `stroke="#161616" stroke-width="1.6"`
> - SVG path 数据可从 [Simple Icons](https://simpleicons.org)（CC0）获取后适配

### 修改配色

编辑 `themes/wulitou-resume/source/css/_tokens.scss`：

```scss
:root {
  --color-bg: #fdf9f0;            // 页面背景
  --color-surface: #fefbf4;       // 卡片背景
  --color-text: #161616;           // 正文
  --color-text-secondary: #666666; // 次要文字
  --color-yellow: #ffd85c;         // 主题强调色
  --color-orange: #ff6b35;         // 高亮色
  --color-green: #42b883;          // 进度条
  --color-blue: #2d9cdb;           // 链接
  --color-purple: #8b5cf6;         // 紫色标签
}
```

### 关闭装饰

```yaml
theme_options:
  decorations: false  # 关闭卡通装饰，变为纯净简历
  animate_skills: false # 关闭技能进度条动画
```

### Fancybox 布局自定义

| 属性 | 可选值 | 说明 |
|------|--------|------|
| `data-layout` | `flex` / `grid` | 布局模式 |
| `data-cols` | `1` / `2` / `3` / `4` / `5` / `6` | 列数 |
| `data-gap` | `none` / `sm` / `md` / `lg` | 图片间距 |

### 代码块特性

- macOS 风格头部：红 / 黄 / 绿三个交通灯圆点
- 语言标签：自动识别，支持 30+ 语言名映射
- 复制按钮：`navigator.clipboard` API + `execCommand` fallback
- 语法高亮：深色暖色调主题（Material Ocean 风格配色）
- 横向滚动条：细窄半透明，hover 变亮，与深色背景融合

---

## 项目结构

```
themes/wulitou-resume/
├── _config.yml                 # 主题配置
├── layout/
│   ├── layout.njk               # 主布局（加载 JS/CSS + 初始化脚本）
│   ├── index.njk                # 首页
│   ├── page.njk                 # 页面
│   └── partial/
│       ├── head.njk             # <head> 标签
│       ├── sidebar.njk          # 左侧边栏
│       ├── hero.njk             # 首屏
│       ├── about.njk            # 个人简介
│       ├── skills.njk           # 专业技能
│       ├── experience.njk       # 工作经历
│       ├── projects.njk         # 项目作品
│       ├── education.njk        # 教育经历
│       ├── project-detail.njk   # 项目详情页
│       ├── mobile-header.njk    # 移动端 Header
│       ├── drawer.njk           # 移动端抽屉
│       └── icons.njk            # SVG 图标集（40+ 图标）
├── source/
│   ├── css/
│   │   ├── style.scss           # 主样式入口
│   │   ├── _tokens.scss         # Design Tokens
│   │   ├── _mixins.scss         # SCSS Mixins
│   │   ├── _layout.scss         # 布局
│   │   ├── _sidebar.scss        # 侧边栏
│   │   ├── _hero.scss            # 首屏
│   │   ├── _skills-about.scss   # 技能 + 简介（含 hover 动画）
│   │   ├── _experience-projects.scss
│   │   ├── _project-detail.scss
│   │   ├── _fancybox.scss       # 图片灯箱画廊
│   │   ├── _code-block.scss     # 代码块组件
│   │   ├── _live2d.scss         # 看板娘移动端适配
│   │   └── _typography.scss
│   └── js/
│       └── theme.js             # 交互逻辑
└── scripts/
    └── helpers.js               # Hexo 辅助函数
```

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 静态站点生成 | Hexo |
| 模板引擎 | Nunjucks (.njk) |
| 样式 | SCSS + CSS Custom Properties |
| 交互 | Vanilla JS（零框架依赖） |
| 图标 | 内联 SVG（零图标库） |
| 图片灯箱 | Fancybox 3.5.7（CDN） |
| 语法高亮 | Hexo 内置 highlight.js（服务端渲染） |
| 看板娘 | hexo-helper-live2d + koharu 模型 |

---

## 常见问题

**Q: 简历数据放在哪里？**  
A: `src/_data/resume.yml`。优先级：站点 `_data/resume.yml` > 主题 `_config.yml` 的 `resume:` > 主题内置兜底。

**Q: 某个区域不想显示怎么办？**  
A: 把对应字段留空或删除。比如不写 `education` 数组，教育经历整个区域自动隐藏。

**Q: 图标名字写错了会怎样？**  
A: 会显示一个黄色笑脸兜底图标，不会报错。

**Q: 如何关闭 Live2D 看板娘？**  
A: 在 `_config.wulitou.yml` 中设 `live2d.enable: false`。

**Q: 如何关闭所有动画？**  
A: 浏览器设置「减少动画」即可，主题自动尊重 `prefers-reduced-motion`。

---

> **无厘头，但有用。**  
> 这份模板的初衷是让简历不再千篇一律——暖色调、卡通装饰、看板娘，都是为了让打开页面的人多停留三秒。但内核是扎实的：语义化 HTML、响应式布局、无障碍支持、SEO 优化。好看和好用，不矛盾。
