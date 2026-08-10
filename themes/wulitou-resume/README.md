# hexo-theme-wulitou-resume

一个「无厘头卡通 + 专业简历 + Portfolio」风格的 Hexo 响应式简历主题。

奶油白背景、黄色大圆角 Sidebar、手绘卡通装饰，但简历信息结构清晰、真正响应式、完全可配置。

## 主题预览

安装好之后大概长这样

![主题预览](./source/images/resume.png)

**技术栈**：Hexo + Nunjucks + SCSS + CSS Custom Properties + 少量原生 JS。
**可选 CDN 依赖**：jQuery + Fancybox（仅图片灯箱功能需要，通过主题 `_config.yml` 的 `cdn` 配置）。

---

## 特性

- **单页锚点简历**：Hero / 个人简介 / 专业技能 / 工作经历 / 项目作品 / 联系方式（+ 可选教育经历）
- **真正响应式**：Desktop 侧边栏 + Tablet/Mobile 顶栏抽屉，不是等比缩放
- **内容完全可配置**：所有简历数据放在 `_data/resume.yml`，不硬编码进模板
- **空数据安全**：任何字段留空，对应 Section 自动隐藏，不显示「暂无数据」
- **图片灯箱**：Fancybox 集成，`<fancybox>` 标签包裹图片即可点击预览，支持 flex/grid 布局
- **代码块美化**：Markdown 代码围栏自动渲染 macOS 风格代码块，含复制按钮和语法高亮
- **微信二维码**：联系方式微信块可配置二维码图片，点击弹出灯箱
- **69 个内置图标**：覆盖编程语言、数据库、框架、AI 工具、设计软件、联系方式等，零外部依赖
- **无障碍**：语义化 HTML、键盘可达、`:focus-visible`、≥44px 触控区、Drawer 焦点管理、`prefers-reduced-motion`
- **SEO 就绪**：title / description / canonical / Open Graph / Twitter Card / Schema.org Person JSON-LD
- **性能友好**：项目图 lazy load、图片预留尺寸避免 CLS、无图标库、无网络字体
- **渐进增强**：禁用 JavaScript 后正文、锚点导航、技能进度条依然正常

---

## 环境要求

| 项目 | 要求 |
| --- | --- |
| Hexo | >= 5.0（在 5.4.2 实测；以 Hexo 7 为目标） |
| Node.js | >= 16（推荐 20+） |
| 模板引擎 | Nunjucks — **Hexo 核心内置**，无需安装渲染器插件 |
| 样式 | SCSS — 由主题自带的 `sass` 编译，无需站点安装 |

---

## 安装

### 方式一：快速开始（使用示例数据）

主题自带 `_example/` 示例目录，包含一套精简的简历数据和示例项目，使用主题内置默认图片，无需额外素材即可预览：

```bash
# 1. 克隆主题
cd your-hexo-site
git clone https://github.com/yigeFYW/hexo-theme-wulitou-resume.git themes/wulitou-resume

# 2. 安装主题依赖（SCSS 编译器）
cd themes/wulitou-resume && npm install && cd ../..

# 3. 复制示例数据和站点配置到站点根目录
cp -r themes/wulitou-resume/_example/source/* source/
cp themes/wulitou-resume/_example/_config.example.yml _config.yml

# 4. 启动预览
npx hexo server
```

打开 http://localhost:4000 即可看到完整效果。满意后编辑 `source/_data/resume.yml` 替换成你的内容即可。

> `_config.example.yml` 已配好 `theme`、Markdown `breaks`、代码高亮、Live2D 等全部设置，直接覆盖即可。如果不想覆盖已有 `_config.yml`，至少确保以下三项：
> ```yaml
> theme: wulitou-resume
> markdown:
>   breaks: true        # 代码块换行依赖
> highlight:
>   enable: true       # 代码块高亮依赖
> ```

> 如果还没有 Hexo 站点，先执行 `npx hexo init my-resume && cd my-resume && npm install`。

### 方式二：手动配置

#### 1. 获取主题

```bash
cd your-hexo-site
git clone https://github.com/yigeFYW/hexo-theme-wulitou-resume.git themes/wulitou-resume
```

#### 2. 安装主题依赖

主题自带 SCSS 编译器，需要在**主题目录内**安装一次：

```bash
cd themes/wulitou-resume
npm install
cd ../..
```

> 这一步只装 `sass`，不会影响站点自身的 `package.json` 和 lock 文件。

#### 3. 启用主题

编辑站点根目录的 `_config.yml`：

```yaml
theme: wulitou-resume
```

#### 4. 准备简历数据

```bash
# 标准 Hexo 站点
mkdir -p source/_data
cp themes/wulitou-resume/source/_data/resume.example.yml source/_data/resume.yml

# 如果你的站点 source_dir 是 src（本仓库即是）
mkdir -p src/_data
cp themes/wulitou-resume/source/_data/resume.example.yml src/_data/resume.yml
```

然后编辑 `resume.yml` 填入你自己的内容。

#### 5. 准备首页

首页需要一个使用 `index` 布局的页面。在你的 `source`（或 `src`）目录下建 `index.md`：

```markdown
---
layout: index
title: ''
---
```

#### 6. 构建

```bash
npx hexo clean
npx hexo generate
npx hexo server
```

打开 http://localhost:4000 即可。

---

## 简历数据配置

### 数据来源优先级

高优先级覆盖低优先级，**逐字段深合并**——某一层没写的字段会自动向下取值：

```text
1. 站点 _data/resume.yml            ← 你的内容写在这里
2. 主题 _config.yml 的 resume:      ← 主题级默认值（默认留空）
3. 主题内置兜底
```

> **不要**把个人信息写进主题的 `_config.yml`：升级主题时会被覆盖，而且会让所有未填写该字段的人「继承」到你的联系方式。

### 字段说明

完整带注释的模板见 [`source/_data/resume.example.yml`](source/_data/resume.example.yml)。核心字段：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 姓名，用于 Sidebar / Header / SEO / JSON-LD |
| `title` | string | 职位 |
| `slogan` | string | 副标题，与 `title` 一起显示为两行 |
| `avatar` | path | 头像，站点绝对路径，如 `/images/avatar/avatar.png` |
| `hero.prefix` / `.highlight` / `.suffix` | string | H1 三段；`highlight` 显示为蓝色，留空则取 `name` |
| `hero.description` | string | 首屏一句话简介 |
| `hero.highlight_word` | string | `description` 中高亮成橙红色的词 |
| `hero.image` | path | 首屏主插画，留空回落到 `avatar` |
| `hero.bubble` | string | 人物旁的小气泡，留空则不渲染 |
| `contact.phone/email/wechat/github` | object | `{ value, visible, label }`，见下 |
| `about.title` / `.content` | string | 简介标题与正文；`content` 多行渲染为多段 |
| `about.bubble` | string | Folder 吉祥物旁的气泡 |
| `skills[]` | array | `{ name, level, icon }` |
| `skills_note` | string | 技能标题右侧小字 |
| `experience[]` | array | `{ company, position, start, end, description, tags }` |
| `projects.items[]` | array | `{ name, description, cover, tags, demo, github }` |
| `projects.more_link` / `.more_label` | string | 右上角「更多项目」链接；`more_link` 留空则指向主题生成的 `/projects/` 列表页 |
| `education[]` | array | `{ school, major, start, end, description }`，可选 |
| `resume_file.enable` / `.url` / `.label` / `.filename` | object | 侧边栏 PDF 下载按钮，见下 |
| `seo.description/keywords/og_image/twitter_site` | string | 留空则自动推导 |
| `footer.copyright` / `.text` | string | `text` 填写则完全替换默认页脚文案 |
| `footer.icp` | string | ICP 备案号，如「宁ICP备12345678号」；留空则不渲染 |

### 联系方式

每一项支持三个键：

```yaml
contact:
  phone:
    value: 138-8888-6666    # 实际内容；留空 = 未配置
    visible: true           # false 可临时隐藏而不删数据
  email:
    value: hello@example.com
  wechat:
    value: huanghe          # 微信号
    qr: /images/wechat-qr.png  # 可选：填了则点击弹出二维码灯箱
  github:
    value: https://github.com/huanghe
    label: github.com/huanghe   # 展示文案；留空则自动从 URL 推导
```

- 电话自动生成 `tel:`，邮箱自动生成 `mailto:`
- 外链自动带 `target="_blank" rel="noopener noreferrer"`
- 长邮箱/长网址会在 `@` `.` `/` 处智能换行，不会溢出
- 微信号默认渲染为纯文本；填了 `qr` 后变为可点击链接，hover 有边框+阴影动画，点击弹出 Fancybox 灯箱显示二维码

也可以添加额外条目：

```yaml
contact:
  extra:
    - { label: 博客, value: example.com, url: https://example.com, icon: link }
```

### 技能

```yaml
skills:
  - { name: 'Vue 3', level: 90, icon: vue }
  - { name: '某项技能' }              # 不写 level 就只显示图标和名称
```

`level` 取 0–100，渲染为进度条 **加百分比文字**（不只靠颜色传达信息）。

内置 69 个图标，按分类：

| 分类 | 图标名 |
| --- | --- |
| 导航与 UI | `home` `user` `code` `briefcase` `folder` `mail` `phone` `wechat` `github` `link` `star` `sparkle` `arrow-right` `arrow-left` `external` `menu` `close` `graduation` `download` |
| 编程语言 | `vue` `nextjs` `nestjs` `typescript` `nodejs` `python` `java` `c` `cpp` `go` `rust` `ruby` `swift` `kotlin` `graphql` `php` `sass` |
| 数据库与中间件 | `mysql` `neo4j` `redis` `postgresql` `kafka` |
| 框架与构建工具 | `react` `angular` `spring` `dart` `flutter` `electron` `vite` `webpack` `html5` `css3` `git` `tailwind` `docker` |
| AI 工具 | `ai` `codex` `claude` `workbuddy` |
| 设计软件 | `design` `figma` `photoshop` `illustrator` `sketch` `xd` |
| 平台与网页 | `miniprogram` `website` |
| 联系方式 | `x` `whatsapp` `telegram` |

写了不存在的名字会回落到通用笑脸图标，不会报错。

### 工作经历

`description` 支持字符串或数组：

```yaml
experience:
  - company: 某公司
    position: 全栈工程师
    start: '2024'
    end: 至今
    description: 一句话描述。
    tags: ['SaaS', 'NestJS']

  - company: 另一家
    position: 前端工程师
    start: '2022'
    end: '2024'
    description:              # 数组会渲染成多段
      - 第一条职责。
      - 第二条职责。
```

### 项目作品

```yaml
projects:
  more_link: ''                        # 留空则指向主题生成的 /projects/ 列表页
  items:
    - name: 项目名
      description: 一句话介绍。
      cover: /images/projects/foo.png   # 16:9；留空则用内置 SVG 占位图
      tags: ['Vue 3', 'NestJS']
      demo: https://example.com         # 留空则不渲染按钮
      github: https://github.com/...
```

封面按 16:9 预留空间（`aspect-ratio`），所以图片加载前后布局不跳动。

### 简历 PDF 下载

侧边栏底部（手机端在抽屉菜单里）可以放一个 PDF 下载按钮：

```yaml
resume_file:
  enable: true
  url: /files/resume.pdf     # 站内文件：放在 source/files/resume.pdf
  label: 下载简历 PDF          # 留空则用默认文案
  filename: 张三-简历.pdf      # 可选，下载后保存的文件名
```

把 PDF 放进站点的 `source/files/`（或 `src/files/`）下，Hexo 会原样拷贝到输出目录。

`url` 也可以写完整的 `https://` 地址。但浏览器不允许对跨域文件强制下载，
所以外部链接会改为新标签页打开，`filename` 对它无效。

`enable: false` 或 `url` 留空都不渲染按钮——后者是为了避免你打开开关却忘了放文件时留下 404 死链。

---

## 扩展功能

### 图片灯箱（Fancybox）

在 Markdown 中用 `<fancybox>` 标签包裹图片，点击后弹出灯箱预览，手机端全屏：

```html
<fancybox>
  <img src="/images/photo1.png" alt="描述">
  <img src="/images/photo2.png" alt="描述">
</fancybox>
```

支持自定义布局，通过属性控制：

```html
<fancybox data-layout="grid" data-cols="3" data-gap="md">
  <img src="/images/a.png" alt="A">
  <img src="/images/b.png" alt="B">
  <img src="/images/c.png" alt="C">
</fancybox>
```

| 属性 | 可选值 | 说明 |
| --- | --- | --- |
| `data-layout` | `flex`（默认）/ `grid` | 布局模式 |
| `data-cols` | `1`–`6` | grid 布局列数，默认 3 |
| `data-gap` | `none` / `sm` / `md`（默认）/ `lg` | 图片间距 |

手机端（≤425px）自动降为更少列数。灯箱资源通过主题 `_config.yml` 的 `cdn` 配置加载，无需手动引入。

### 代码块

Markdown 中的 `` ```javascript `` 代码围栏会自动渲染为带 macOS 风格头部（交通灯圆点 + 语言标签 + 复制按钮）的代码块，支持语法高亮。无需额外配置，直接写代码围栏即可：

````
```javascript
const greeting = 'Hello World';
console.log(greeting);
```
````

复制按钮使用 `navigator.clipboard` API，不兼容时自动回退到 `execCommand`。

### Live2D 看板娘

在站点 `_config.yml` 中配置 [hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d)：

```yaml
live2d:
  enable: true
  model:
    use: live2d-widget-model-koharu    # 需 npm install 模型包
  display:
    position: left                      # left / right
  mobile:
    show: true                          # 手机端是否显示
```

模型包需要单独安装：`npm install live2d-widget-model-koharu`。手机端会自动缩放到合适尺寸。

### 技能块交互动画

技能卡片 hover 时会自动上浮并显示金色径向光晕扫过效果（从右上到左下）。动画自动尊重 `prefers-reduced-motion`，无需配置。

---

## 替换素材

### 头像

把你的头像放到站点的 `source/images/`（或 `src/images/`）下，然后在 `resume.yml` 里改路径：

```yaml
avatar: /images/my-avatar.png
```

建议正方形、≥208×208px。主题会裁成圆形。

### 首屏插画

```yaml
hero:
  image: /images/my-hero.png
  image_alt: 描述这张图的内容      # 无障碍必需
```

建议宽高比接近 16:10，宽度 ≥600px。

### 卡通装饰

装饰素材默认在主题的 `source/images/decorations/`。要整体替换成你自己的一套：

```yaml
# 主题 _config.yml
theme_options:
  decoration_path: /images/my-decorations
```

然后在站点 `source/images/my-decorations/` 下放同名文件：

```text
star.png  rocket.png  sparkles-top.png  sparkles-bottom.png
coffee-cup.png  jiayou.png  plant.png  arrow.png
heart.png  folder-mascot.png  green-monster.png  ladybug.png
waves.png  paper-plane.png  smiley.png
```

**完全关掉装饰**（变成一份干净的纯文本简历，正文完全不受影响）：

```yaml
theme_options:
  decorations: false
```

### 项目占位封面

```yaml
theme_options:
  project_placeholder: /images/my-placeholder.svg
```

---

## 主题选项

主题 `_config.yml` 的 `theme_options`：

| 选项 | 默认 | 说明 |
| --- | --- | --- |
| `nav_icons` | `true` | 导航项是否显示图标 |
| `decorations` | `true` | 是否启用卡通装饰层 |
| `animate_skills` | `true` | 技能条进入视口时动画（自动尊重 reduced motion） |
| `smooth_scroll` | `true` | 锚点平滑滚动（自动尊重 reduced motion） |
| `decoration_path` | `/images/decorations` | 装饰素材目录 |
| `project_placeholder` | `/images/placeholder-project.svg` | 项目占位封面 |
| `project_dir` | `project` | 项目详情页目录，站点 `source/<dir>/*.md` 渲染成详情页 |
| `project_back_label` | `返回项目作品` | 详情页返回列表的按钮文案 |
| `project_nav_anchor` | `projects` | 子页面中左侧菜单固定高亮的导航项 |
| `projects_page` | `true` | 是否生成独立的项目列表页 |
| `projects_page_path` | `projects/` | 列表页路径，结尾带 `/` 会生成 `index.html` |
| `projects_page_title` | `项目作品` | 列表页标题 |
| `back_home_label` | `返回首页` | 列表页/详情页「返回首页」按钮文案 |

主题 `_config.yml` 的 `cdn`（图片灯箱依赖，已预配默认值，一般不需要改）：

```yaml
cdn:
  jquery: https://cdn.staticfile.org/jquery/3.5.0/jquery.min.js
  fancybox:
    css: https://cdn.staticfile.org/fancybox/3.5.7/jquery.fancybox.min.css
    js: https://cdn.staticfile.org/fancybox/3.5.7/jquery.fancybox.min.js
```

### 项目列表页

首页「项目作品」卡片只展示前几个项目，右上角的「更多项目」默认指向主题自动生成的
`/projects/` 列表页——那里以列表形式展示全部项目，左侧菜单的「项目作品」保持高亮，
顶部有「返回首页」按钮。

只要 `projects.items` 或 `source/<project_dir>/*.md` 里有内容，这个页面就会自动生成，
不需要新建 markdown 文件。

想指向别处（例如自己的 GitHub），填写 `projects.more_link` 即可覆盖；
想完全关掉列表页，把 `projects_page` 设为 `false`。

### 导航

```yaml
nav:
  - { label: 首页,     anchor: home,       icon: home }
  - { label: 个人简介, anchor: about,      icon: user }
  - { label: 专业技能, anchor: skills,     icon: code }
  - { label: 工作经历, anchor: experience, icon: briefcase }
  - { label: 项目作品, anchor: projects,   icon: folder }
```

`label` 可自由改写；`anchor` 必须对应 Section 的 id。**对应 Section 没有内容时该导航项会自动隐藏**，所以不会出现死链。

---

## 响应式规则

| 断点 | 布局 | Skills | Projects | Contact | Hero |
| --- | --- | --- | --- | --- | --- |
| ≥1200px | Sidebar 248px + Main | 5 列 | 3 列 | 4 列 | 横向 |
| 1024–1199px | Sidebar + Main | 3 列 | 2 列 | 2 列 | 横向 |
| 768–1023px | Header + Main | 3 列 | 2 列 | 2 列 | 纵向 |
| <768px | Header + Drawer | 2 列 | 1 列 | 1 列 | 纵向 |

Desktop Sidebar 使用 sticky 定位；<1024px 时切换为固定顶栏 + 抽屉导航。

---

## 抽屉导航（Mobile）

支持：菜单按钮打开、关闭按钮、遮罩点击、`Escape`、点击导航项后自动关闭、body 滚动锁定、焦点陷阱、关闭后焦点回到触发按钮、`aria-expanded` / `aria-controls` / `role="dialog"` / `aria-modal`。

---

## 部署

产物是纯静态文件，无需服务端：

```bash
npx hexo clean && npx hexo generate    # 输出到 public/
```

可直接部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 或任意 Nginx 静态站点。

如果站点部署在子目录，正确设置 `_config.yml` 的 `url` 和 `root` 即可，主题所有资源路径都会自动加上 `root` 前缀。

---

## 常见问题

**样式没有生效 / 只有裸 HTML**
主题依赖没装。进入 `themes/wulitou-resume` 执行 `npm install`，然后 `npx hexo clean && npx hexo generate`。

**改了 SCSS 或 `resume.yml` 但页面没变**
Hexo 会缓存。执行 `npx hexo clean` 后重新生成。

**某个 Section 不显示**
这是预期行为：对应数据为空时该 Section 与它的导航项都会自动隐藏。检查 `resume.yml` 里该字段是否填了内容。

**页面出现了别人的姓名/联系方式**
说明简历数据没被读到，页面回落到了默认值。确认文件路径是 `<source_dir>/_data/resume.yml`——如果站点的 `source_dir` 是 `src`，路径就是 `src/_data/resume.yml`，不是 `source/_data/resume.yml`。

**首页是博客列表而不是简历**
首页缺少 `layout: index` 的 `index.md`，见安装第 5 步。

---

## 许可

MIT
