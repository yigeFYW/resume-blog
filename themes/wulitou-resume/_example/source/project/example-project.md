---
title: 示例项目
date: 2025-01-15
description: 一个展示项目详情页结构的示例，包含技术栈、亮点和正文内容。
tags:
  - Vue 3
  - NestJS
  - MySQL
role: 全栈负责人
start: '2024.06'
end: '2025.01'
order: 0
demo: https://example.com
github: https://github.com/zhangsan/example
stack:
  - 前端：Vue 3 + Vite + Pinia
  - 后端：NestJS + Prisma + MySQL
  - 部署：Docker + Nginx
highlights:
  - 用示例数据演示项目详情页的完整渲染效果。
  - 展示 front-matter 各字段的用途和排版方式。
---

## 项目背景

这是一个示例项目详情页，用来演示主题的项目详情模板。你在 `source/project/` 下创建的每篇 Markdown 都会渲染成这样的页面。

## 我做了什么

项目详情页支持以下 front-matter 字段：

| 字段 | 说明 |
| --- | --- |
| `title` | 项目标题（必填） |
| `description` | 一句话描述，显示在标题下方 |
| `cover` | 封面图（16:9），留空则用内置占位图 |
| `tags` | 技术标签 |
| `role` | 担任角色 |
| `start` / `end` | 时间范围 |
| `stack` | 技术栈列表 |
| `highlights` | 项目亮点列表 |
| `demo` / `github` | 演示和源码链接 |
| `order` | 排序权重，数字越小越靠前 |

## 正文

正文使用标准 Markdown 语法，支持标题、列表、表格、代码块等所有 Hexo 支持的语法。

```javascript
// 代码块也会自动渲染成 macOS 风格
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World'));
```

## 总结

在 `resume.yml` 的 `projects.items` 里填写 `slug: example-project`（或让标题与本文 `title` 一致），首页的项目卡片就会链接到这个详情页。
