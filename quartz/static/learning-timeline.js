// learning-timeline.js — 渲染学习时间线
(function() {
  var container = document.getElementById("learning-root");
  if (!container) return;

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
