# 火花 · Spark

个人创意数字花园。基于 Quartz v4.5.2，托管于 GitHub Pages。

## 技术栈

- **框架**: Quartz v4.5.2（TypeScript 静态站点生成器）
- **内容**: Markdown + YAML frontmatter
- **部署**: GitHub Actions → GitHub Pages
- **域名**: `sunkai2212.github.io/spark/`

## 项目结构

```
spark/
├── content/                  # 唯一需要手写的部分
│   ├── index.md              # 首页
│   ├── about.md              # 关于页
│   ├── journal.md            # 学习历程时间线（静态 HTML 注入）
│   └── ideas/                # 创意 Markdown 文件
├── scripts/
│   └── scan-learning.cjs     # 扫描项目数据，生成静态 HTML 注入 journal.md
├── quartz/
│   ├── static/               # 静态资源（timeline-data.js 等）
│   ├── components/NavBar.tsx  # 自定义导航
│   └── components/PageList.tsx # 卡片列表组件
├── quartz.config.ts          # 站点配置
├── quartz.layout.ts          # 布局配置
├── quartz/styles/custom.scss # Apple 风格主题定制
├── .github/workflows/deploy.yml  # 自动部署
```

## 关键定制

- **NavBar**: `quartz/components/NavBar.tsx` — 自定义导航组件，历程 / 创意
- **PageList**: `quartz/components/PageList.tsx` — 修改为在卡片上显示 description 文本
- **主题**: Apple 风格，`#f5f5f7` 背景，`#0071e3` 强调色，Noto Sans SC 字体
- **布局**: 移除了 Explorer、Breadcrumbs、Graph 侧栏，简化内容页

## 命令速查

```bash
npx quartz build              # 本地构建到 public/
npm run quartz -- build       # 同上（npm scripts）
git push                      # 推送后 GitHub Actions 自动部署
```

## 内容规范

每个创意是 `content/ideas/<名称>.md`，frontmatter 字段：

```yaml
title, created, updated, stage, platforms, tags, cover, description
```

`description` 字段决定卡片上的概述文字。`stage` 取值：概念 | 原型 | 开发中 | 已上线 | 搁置。

## 红线

- 不要修改 `quartz/` 核心代码（除已定制的 `NavBar.tsx`、`PageList.tsx`）
- 不要删除 `content/` 下的 `.gitkeep` 文件
- 部署用 `git push`，不要手动操作 `public/` 目录

## Quartz 陷阱（踩过坑）

- **禁止内联 `<script>`**：Quartz 会把引号编码为 `&quot;`，JS 直接失效。动态内容必须用扫描器预渲染静态 HTML 注入 markdown（参考 `scripts/scan-learning.cjs`）
- **不用子目录放独立页面**：`content/xxx/index.md` 会被 FolderPage 列表页覆盖，显示"0 个"。独立页面放 content 根目录（如 `journal.md`）
- **文件名只用 ASCII**：GitHub Pages 不认中文文件名（`历程.md` → 404）。用 `journal.md` 这种英文 slug
