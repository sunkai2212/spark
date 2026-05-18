---
title: "学习历程"
description: "Claude Code 学习时间线 · 3 天 7 个项目的成长轨迹"
created: 2026-05-18
tags:
  - 学习
  - Claude Code
---

<style>
/* ===== 学习历程页面样式 ===== */

#learning-root {
  max-width: 800px;
  margin: 0 auto;
}

/* ---- Stats Bar ---- */
.stats-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.stat-card {
  flex: 1;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  padding: 1.5rem 1.25rem;
  text-align: center;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.stat-number {
  display: block;
  font-size: 2.25rem;
  font-weight: 600;
  color: var(--secondary);
  letter-spacing: -0.02em;
  line-height: 1.2;
}
.stat-label {
  display: block;
  font-size: 0.875rem;
  color: var(--gray);
  margin-top: 0.25rem;
}

/* ---- Skills Cloud ---- */
.skills-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}
.skill-tag {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--secondary);
  background: var(--highlight);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  transition: all 0.2s ease;
  cursor: default;
}
.skill-tag:hover {
  background: rgba(0, 113, 227, 0.15);
}

/* ---- Timeline ---- */
.timeline {
  position: relative;
  padding-left: 2.5rem;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: var(--lightgray);
  border-radius: 1px;
}

.day-group {
  position: relative;
  margin-bottom: 2.5rem;
}
.day-group:last-child {
  margin-bottom: 0;
}

/* Day marker dot */
.day-marker {
  position: absolute;
  left: -2.5rem;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--secondary);
  border: 2px solid var(--light);
  z-index: 1;
}

.day-header {
  margin-bottom: 1rem;
}
.day-date {
  font-size: 0.8125rem;
  color: var(--gray);
  font-weight: 400;
}
.day-label {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--dark);
  letter-spacing: -0.01em;
}

.day-note {
  font-size: 0.9375rem;
  color: var(--gray);
  font-style: italic;
  margin-bottom: 0.25rem;
  line-height: 1.6;
}

/* ---- Project Cards ---- */
.project-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}
.project-card {
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  padding: 1.25rem;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}
.project-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

.project-title {
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--dark);
  letter-spacing: -0.01em;
  margin: 0 0 0.35rem 0;
}
.project-desc {
  font-size: 0.875rem;
  color: var(--gray);
  margin-top: 0.35rem;
  line-height: 1.5;
}

.project-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.65rem;
}
.project-skills .mini-tag {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--secondary);
  background: var(--highlight);
  padding: 0.15rem 0.55rem;
  border-radius: 100px;
}

.project-highlights {
  list-style: none;
  margin: 0.65rem 0 0 0;
  padding: 0;
}
.project-highlights li {
  font-size: 0.8125rem;
  color: var(--gray);
  line-height: 1.6;
  padding-left: 1rem;
  position: relative;
}
.project-highlights li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--lightgray);
}

/* ---- Memory refs ---- */
.memory-refs {
  font-size: 0.8125rem;
  color: var(--gray);
  margin-top: 0.25rem;
}

/* ---- Loading / Error ---- */
.timeline-loading {
  text-align: center;
  color: var(--gray);
  padding: 3rem 0;
  font-size: 0.9375rem;
}
.timeline-error {
  text-align: center;
  color: var(--gray);
  padding: 3rem 0;
  font-size: 0.9375rem;
  line-height: 1.7;
}
.timeline-error code {
  font-size: 0.8125rem;
  background: var(--highlight);
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

/* ---- Dark Mode ---- */
body[data-mode="dark"] .stat-card,
body[data-mode="dark"] .project-card {
  background: #232323;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
body[data-mode="dark"] .stat-card:hover,
body[data-mode="dark"] .project-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
body[data-mode="dark"] .day-marker {
  border-color: #1a1a1a;
}
body[data-mode="dark"] .skill-tag:hover,
body[data-mode="dark"] .mini-tag:hover {
  background: rgba(77, 166, 255, 0.18);
}

/* ---- Mobile ---- */
@media all and (max-width: 800px) {
  .stats-bar {
    flex-direction: column;
  }
  .stat-number {
    font-size: 1.75rem;
  }
  .timeline {
    padding-left: 2rem;
  }
  .day-marker {
    left: -2rem;
    width: 10px;
    height: 10px;
  }
}
</style>

<div id="learning-root">

<!-- TIMELINE_START -->
<div class="stats-bar">
  <div class="stat-card"><span class="stat-number">3</span><span class="stat-label">学习天数</span></div>
  <div class="stat-card"><span class="stat-number">7</span><span class="stat-label">完成项目</span></div>
  <div class="stat-card"><span class="stat-number">23</span><span class="stat-label">掌握技能</span></div>
</div>

<div class="skills-cloud">
  <span class="skill-tag">动画</span>
  <span class="skill-tag">品牌设计</span>
  <span class="skill-tag">设计</span>
  <span class="skill-tag">数据分析</span>
  <span class="skill-tag">Axios</span>
  <span class="skill-tag">Canvas</span>
  <span class="skill-tag">Cheerio</span>
  <span class="skill-tag">CSS</span>
  <span class="skill-tag">D3.js</span>
  <span class="skill-tag">ECharts</span>
  <span class="skill-tag">GitHub Pages</span>
  <span class="skill-tag">HTML</span>
  <span class="skill-tag">HTTP</span>
  <span class="skill-tag">JavaScript</span>
  <span class="skill-tag">Node.js</span>
  <span class="skill-tag">pptxgenjs</span>
  <span class="skill-tag">Quartz</span>
  <span class="skill-tag">React</span>
  <span class="skill-tag">Remotion</span>
  <span class="skill-tag">SCSS</span>
  <span class="skill-tag">Sharp</span>
  <span class="skill-tag">SVG</span>
  <span class="skill-tag">TypeScript</span>
</div>

<div class="timeline">
  <div class="day-group">
    <div class="day-marker"></div>
    <div class="day-header">
      <div class="day-date">2026-05-16</div>
      <div class="day-label">Day 1 · 5月16日</div>
    </div>
    <div class="day-note">第一天：初次接触 Claude Code，从交互式可视化入手，感受 AI 编程的节奏。</div>
    <div class="project-list">
      <div class="project-card">
        <div class="project-title">红酒品鉴轮盘</div>
        <div class="project-desc">D3.js 交互式葡萄酒风味轮盘</div>
        <div class="project-skills">
          <span class="mini-tag">D3.js</span>
          <span class="mini-tag">SVG</span>
          <span class="mini-tag">CSS</span>
          <span class="mini-tag">JavaScript</span>
        </div>
        <ul class="project-highlights">
          <li>首个 Claude Code 完整项目</li>
          <li>交互式数据可视化</li>
        </ul>
      </div>
      <div class="project-card">
        <div class="project-title">股票可视化看板</div>
        <div class="project-desc">ECharts 驱动的股票数据仪表盘</div>
        <div class="project-skills">
          <span class="mini-tag">ECharts</span>
          <span class="mini-tag">CSS</span>
          <span class="mini-tag">JavaScript</span>
        </div>
        <ul class="project-highlights">
          <li>多图表联动</li>
          <li>响应式布局</li>
        </ul>
      </div>
      <div class="project-card">
        <div class="project-title">个人 IP 品牌创作</div>
        <div class="project-desc">品牌视觉探索：海报、Pitch Deck、形象生成</div>
        <div class="project-skills">
          <span class="mini-tag">HTML</span>
          <span class="mini-tag">CSS</span>
          <span class="mini-tag">Canvas</span>
          <span class="mini-tag">Sharp</span>
          <span class="mini-tag">品牌设计</span>
        </div>
        <ul class="project-highlights">
          <li>AI 辅助品牌视觉设计</li>
          <li>多版式海报生成</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="day-group">
    <div class="day-marker"></div>
    <div class="day-header">
      <div class="day-date">2026-05-17</div>
      <div class="day-label">Day 2 · 5月17日</div>
    </div>
    <div class="day-note">第二天：密度升级 — 品牌设计、爬虫实战、游戏数据报告，工具链快速拓宽。</div>
    <div class="project-list">
      <div class="project-card">
        <div class="project-title">个人 IP 品牌创作</div>
        <div class="project-desc">品牌视觉探索：海报、Pitch Deck、形象生成</div>
        <div class="project-skills">
          <span class="mini-tag">HTML</span>
          <span class="mini-tag">CSS</span>
          <span class="mini-tag">Canvas</span>
          <span class="mini-tag">Sharp</span>
          <span class="mini-tag">品牌设计</span>
        </div>
        <ul class="project-highlights">
          <li>AI 辅助品牌视觉设计</li>
          <li>多版式海报生成</li>
        </ul>
      </div>
      <div class="project-card">
        <div class="project-title">网页爬虫实践</div>
        <div class="project-desc">Node.js 爬虫：新闻抓取 + Bilibili 热榜</div>
        <div class="project-skills">
          <span class="mini-tag">Node.js</span>
          <span class="mini-tag">Axios</span>
          <span class="mini-tag">Cheerio</span>
          <span class="mini-tag">HTTP</span>
        </div>
        <ul class="project-highlights">
          <li>掌握 HTTP 请求与 DOM 解析</li>
          <li>真实数据抓取实践</li>
        </ul>
      </div>
      <div class="project-card">
        <div class="project-title">金铲铲 17.3 环境报告</div>
        <div class="project-desc">游戏数据抓取 → 可视化报告 → PPT 自动生成</div>
        <div class="project-skills">
          <span class="mini-tag">Node.js</span>
          <span class="mini-tag">HTML</span>
          <span class="mini-tag">Canvas</span>
          <span class="mini-tag">pptxgenjs</span>
          <span class="mini-tag">数据分析</span>
        </div>
        <ul class="project-highlights">
          <li>端到端数据报告流水线</li>
          <li>23MB PPT 自动输出</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="day-group">
    <div class="day-marker"></div>
    <div class="day-header">
      <div class="day-date">2026-05-18</div>
      <div class="day-label">Day 3 · 5月18日</div>
    </div>
    <div class="day-note">第三天：冲顶 — Remotion 视频编程 + Quartz 数字花园搭建，从代码到底层框架。</div>
    <div class="project-list">
      <div class="project-card">
        <div class="project-title">Remotion 游戏 PV 动效</div>
        <div class="project-desc">React 驱动的视频渲染引擎，5 场景动画</div>
        <div class="project-skills">
          <span class="mini-tag">React</span>
          <span class="mini-tag">Remotion</span>
          <span class="mini-tag">TypeScript</span>
          <span class="mini-tag">Canvas</span>
          <span class="mini-tag">动画</span>
        </div>
        <ul class="project-highlights">
          <li>视频编程入门</li>
          <li>组件化动画系统</li>
          <li>踩坑：深色背景渲染</li>
        </ul>
      </div>
      <div class="project-card">
        <div class="project-title">火花 · 创意数字花园</div>
        <div class="project-desc">Quartz v4.5.2 个人知识库，Apple 风格主题</div>
        <div class="project-skills">
          <span class="mini-tag">Quartz</span>
          <span class="mini-tag">TypeScript</span>
          <span class="mini-tag">SCSS</span>
          <span class="mini-tag">GitHub Pages</span>
          <span class="mini-tag">设计</span>
        </div>
        <ul class="project-highlights">
          <li>个人创意站从零搭建</li>
          <li>Apple 风格 UI 定制</li>
          <li>CI/CD 自动部署</li>
        </ul>
      </div>
    </div>
    <div class="memory-refs">🧠 经验笔记：call-superpowers-first、remotion-common-mistakes、spark-project-context</div>
  </div>
</div>
<!-- TIMELINE_END -->

</div>
