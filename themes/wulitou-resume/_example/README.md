# 示例站点快速启动

这个目录包含一套最小可运行的示例，使用主题内置默认图片，无需额外素材即可预览。

## 使用方法

### 方式一：复制到已有 Hexo 站点

```bash
# 在你的 Hexo 站点根目录下

# 1. 复制示例简历数据和页面
cp -r themes/wulitou-resume/_example/source/* source/

# 2. 复制示例站点配置（会覆盖已有 _config.yml，请先备份）
cp themes/wulitou-resume/_example/_config.example.yml _config.yml

# 3. 启动预览
npx hexo server
```

> 如果不想覆盖已有 `_config.yml`，至少确保以下三项：
> ```yaml
> theme: wulitou-resume
> markdown:
>   breaks: true        # 代码块换行依赖
> highlight:
>   enable: true       # 代码块高亮依赖
> ```

### 方式二：从零开始

```bash
# 1. 初始化 Hexo 站点
npx hexo init my-resume
cd my-resume

# 2. 安装主题
git clone https://github.com/yigeFYW/hexo-theme-wulitou-resume.git themes/wulitou-resume

# 3. 安装主题依赖（SCSS 编译器）
cd themes/wulitou-resume && npm install && cd ../..

# 4. 复制示例数据和站点配置
cp -r themes/wulitou-resume/_example/source/* source/
cp themes/wulitou-resume/_example/_config.example.yml _config.yml

# 5.（可选）安装 Live2D 看板娘
npm install hexo-helper-live2d live2d-widget-model-koharu

# 6. 启动预览
npx hexo server
```

打开 http://localhost:4000 即可看到效果。

## 目录说明

```
_example/
  _config.example.yml          # 示例站点配置（含 Live2D、代码高亮、Markdown 等全部设置）
  source/
    _data/
      resume.yml              # 示例简历数据（脱敏，可直接修改）
    index.md                  # 首页（layout: index）
    project/
      example-project.md      # 示例项目详情页
```

示例数据使用主题内置的默认头像和插画（`/images/avatar/avatar.png`、`/images/hero.png`），
所以不需要额外准备图片就能看到完整的页面效果。

替换成你自己的内容后，把对应图片放到 `source/images/` 下并修改 `resume.yml` 中的路径即可。
