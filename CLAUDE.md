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
│   └── ideas/                # 创意 Markdown 文件
├── quartz/                   # Quartz 核心（不改）
├── quartz.config.ts          # 站点配置
├── quartz.layout.ts          # 布局配置
├── quartz/styles/custom.scss # Apple 风格主题定制
├── .github/workflows/deploy.yml  # 自动部署
```

## 关键定制

- **NavBar**: `quartz/components/NavBar.tsx` — 自定义导航组件，包含 创意/标签/关于 链接
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

- 不要修改 `quartz/` 核心代码（除 `quartz/components/PageList.tsx` 和 `quartz/components/NavBar.tsx` 已定制）
- 不要删除 `content/` 下的 `.gitkeep` 文件
- 部署用 `git push`，不要手动操作 `public/` 目录
