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

<div id="learning-root"></div>

<script src="./timeline-data.js"></script>
<script>
(function() {
  var container = document.getElementById("learning-root");

  // 数据未就绪（JS 文件不存在或加载失败）
  if (!window.TIMELINE_DATA) {
    container.innerHTML =
      '<div class="timeline-error">' +
      '<p>数据未生成。请运行扫描脚本：</p>' +
      '<p><code>node scripts/scan-learning.cjs</code></p>' +
      '</div>';
    return;
  }

  var data = window.TIMELINE_DATA;

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  }

  function renderStats(summary) {
    var bar = el("div", "stats-bar");
    bar.appendChild(statCard(summary.totalDays, "学习天数"));
    bar.appendChild(statCard(summary.totalProjects, "完成项目"));
    bar.appendChild(statCard(summary.skills.length, "掌握技能"));
    return bar;
  }

  function statCard(number, label) {
    return el("div", "stat-card",
      '<span class="stat-number">' + number + '</span>' +
      '<span class="stat-label">' + label + '</span>');
  }

  function renderSkills(skills) {
    var cloud = el("div", "skills-cloud");
    skills.forEach(function(s) {
      cloud.appendChild(el("span", "skill-tag", s));
    });
    return cloud;
  }

  function renderTimeline(days) {
    var tl = el("div", "timeline");

    days.forEach(function(day) {
      var group = el("div", "day-group");

      var marker = el("div", "day-marker");
      group.appendChild(marker);

      var header = el("div", "day-header",
        '<div class="day-date">' + day.date + '</div>' +
        '<div class="day-label">' + day.label + '</div>');
      group.appendChild(header);

      if (day.note) {
        group.appendChild(el("div", "day-note", day.note));
      }

      var list = el("div", "project-list");
      day.projects.forEach(function(p) {
        list.appendChild(renderProjectCard(p));
      });
      group.appendChild(list);

      if (day.memoryRefs) {
        group.appendChild(el("div", "memory-refs",
          '🧠 经验笔记：' + day.memoryRefs));
      }

      tl.appendChild(group);
    });

    return tl;
  }

  function renderProjectCard(p) {
    var skillsHtml = p.skills.map(function(s) {
      return '<span class="mini-tag">' + s + '</span>';
    }).join("");

    var highlightsHtml = p.highlights.map(function(h) {
      return '<li>' + h + '</li>';
    }).join("");

    var card = el("div", "project-card");

    card.appendChild(el("div", "project-title", p.title));
    card.appendChild(el("div", "project-desc", p.description));

    if (p.skills.length) {
      card.appendChild(el("div", "project-skills", skillsHtml));
    }

    if (p.highlights.length) {
      card.appendChild(el("ul", "project-highlights", highlightsHtml));
    }

    return card;
  }

  // ===== 渲染 =====
  container.appendChild(renderStats(data.summary));
  container.appendChild(renderSkills(data.summary.skills));
  container.appendChild(renderTimeline(data.days));
})();
</script>
