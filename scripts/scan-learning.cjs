// scan-learning.cjs — 扫描桌面项目目录，生成学习时间线 JSON
// 用法: node scripts/scan-learning.cjs
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const DESKTOP = "c:/Users/sunka/OneDrive/桌面";

// ===== 需要过滤的无用文件模式 =====
const VENDOR_PATTERNS = [
  /\.min\.js$/,
  /\.min\.css$/,
  /\.min\.json$/,
  /package-lock\.json$/,
  /\.map$/,
  /\.webp$/,
  /\.mp3$/,
  /\.mp4$/,
  /desktop\.ini$/,
  /\.gitkeep$/,
  /\.gitattributes$/,
  /LICENSE/,
];

function isVendorFile(filePath) {
  return VENDOR_PATTERNS.some(p => p.test(filePath));
}

// ===== 项目元数据配置 =====
const PROJECT_META = {
  "wine-app": {
    title: "红酒品鉴轮盘",
    description: "D3.js 交互式葡萄酒风味轮盘",
    skills: ["D3.js", "SVG", "CSS", "JavaScript"],
    highlights: ["首个 Claude Code 完整项目", "交互式数据可视化"],
    dir: path.join(DESKTOP, "cc_test/wine-app"),
  },
  "stock-app": {
    title: "股票可视化看板",
    description: "ECharts 驱动的股票数据仪表盘",
    skills: ["ECharts", "CSS", "JavaScript"],
    highlights: ["多图表联动", "响应式布局"],
    dir: path.join(DESKTOP, "cc_test/stock-app"),
  },
  "个人IP": {
    title: "个人 IP 品牌创作",
    description: "品牌视觉探索：海报、Pitch Deck、形象生成",
    skills: ["HTML", "CSS", "Canvas", "Sharp", "品牌设计"],
    highlights: ["AI 辅助品牌视觉设计", "多版式海报生成"],
    dir: path.join(DESKTOP, "cc_test/个人IP"),
  },
  "爬虫学习": {
    title: "网页爬虫实践",
    description: "Node.js 爬虫：新闻抓取 + Bilibili 热榜",
    skills: ["Node.js", "Axios", "Cheerio", "HTTP"],
    highlights: ["掌握 HTTP 请求与 DOM 解析", "真实数据抓取实践"],
    dir: path.join(DESKTOP, "cc_test/爬虫学习"),
  },
  "金铲铲17.3报告": {
    title: "金铲铲 17.3 环境报告",
    description: "游戏数据抓取 → 可视化报告 → PPT 自动生成",
    skills: ["Node.js", "HTML", "Canvas", "pptxgenjs", "数据分析"],
    highlights: ["端到端数据报告流水线", "23MB PPT 自动输出"],
    dir: path.join(DESKTOP, "cc_test/金铲铲17.3报告"),
  },
  动效: {
    title: "Remotion 游戏 PV 动效",
    description: "React 驱动的视频渲染引擎，5 场景动画",
    skills: ["React", "Remotion", "TypeScript", "Canvas", "动画"],
    highlights: ["视频编程入门", "组件化动画系统", "踩坑：深色背景渲染"],
    dir: path.join(DESKTOP, "动效"),
  },
  创意站: {
    title: "火花 · 创意数字花园",
    description: "Quartz v4.5.2 个人知识库，Apple 风格主题",
    skills: ["Quartz", "TypeScript", "SCSS", "GitHub Pages", "设计"],
    highlights: ["个人创意站从零搭建", "Apple 风格 UI 定制", "CI/CD 自动部署"],
    dir: path.join(DESKTOP, "创意站"),
  },
};

// ===== 工具函数 =====

/** 递归获取目录下源文件（排除构建产物、依赖、vendor 库） */
function getSourceFiles(dir) {
  const exclude = ["node_modules", ".git", "public", "out", "dist", ".quartz-cache", "images", "assets", "package-lock.json"];
  const results = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (exclude.includes(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...getSourceFiles(fullPath));
      } else if (!isVendorFile(fullPath)) {
        results.push(fullPath);
      }
    }
  } catch { /* skip */ }
  return results;
}

/** 获取项目源文件的 mtime 列表（过滤无用文件后） */
function getProjectTimestamps(dir) {
  const files = getSourceFiles(dir);
  return files
    .map(f => {
      try {
        const stat = fs.statSync(f);
        // 忽略体积 > 5MB 的大文件（通常是二进制资源）
        if (stat.size > 5 * 1024 * 1024) return null;
        return { path: f, mtime: stat.mtimeMs };
      } catch { return null; }
    })
    .filter(Boolean);
}

/** 获取 git 提交日期列表 */
function getGitDates(dir) {
  try {
    const out = execSync('git log --all --format="%ai" -- .', {
      cwd: dir,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return out.trim().split("\n").filter(Boolean).map(s => new Date(s));
  } catch {
    return [];
  }
}

/** YYYY-MM-DD */
function dateKey(d) {
  return d.getFullYear() + "-" +
    String(d.getMonth() + 1).padStart(2, "0") + "-" +
    String(d.getDate()).padStart(2, "0");
}

/** 读取 .claude/projects 下的 memory 文件 */
function readClaudeMemories() {
  const projDir = "c:/Users/sunka/.claude/projects";
  const notes = {};
  try {
    const entries = fs.readdirSync(projDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const memDir = path.join(projDir, entry.name, "memory");
      try {
        const memFiles = fs.readdirSync(memDir).filter(f => f.endsWith(".md") && f !== "MEMORY.md");
        for (const mf of memFiles) {
          const mtime = fs.statSync(path.join(memDir, mf)).mtimeMs;
          const day = dateKey(new Date(mtime));
          if (!notes[day]) notes[day] = [];
          notes[day].push({ file: mf, mtime });
        }
      } catch { /* no memory dir */ }
    }
  } catch { /* no projects dir */ }
  return notes;
}

// ===== 主逻辑 =====

function main() {
  // allDates 收集所有 "项目在某天有活动" 的证据
  // 结构: { project, date (Date 对象), mtimeMs (用于排序) }
  const allDates = [];

  for (const [name, meta] of Object.entries(PROJECT_META)) {
    const gitDates = getGitDates(meta.dir);

    if (gitDates.length > 0) {
      // 有 git → 用提交日期（最准确反映实际工作时间）
      for (const d of gitDates) {
        allDates.push({ project: name, date: d, mtimeMs: d.getTime() });
      }
    } else {
      // 无 git → 用源文件 mtime
      const files = getProjectTimestamps(meta.dir);
      for (const f of files) {
        allDates.push({ project: name, date: new Date(f.mtime), mtimeMs: f.mtime });
      }
    }
  }

  // 按日期分组
  const dayMap = {};
  for (const item of allDates) {
    const key = dateKey(item.date);
    if (!dayMap[key]) {
      dayMap[key] = {};
    }
    if (!dayMap[key][item.project]) {
      dayMap[key][item.project] = [];
    }
    dayMap[key][item.project].push(item.mtimeMs);
  }

  const sortedDays = Object.keys(dayMap).sort();
  if (sortedDays.length === 0) {
    console.error("未找到任何项目数据。请检查路径。");
    process.exit(1);
  }

  const memoryNotes = readClaudeMemories();

  // Day 汇总文案（已覆盖前 3 天，后续日子自动生成占位）
  const dayNotes = {
    "2026-05-16": "第一天：初次接触 Claude Code，从交互式可视化入手，感受 AI 编程的节奏。",
    "2026-05-17": "第二天：密度升级 — 品牌设计、爬虫实战、游戏数据报告，工具链快速拓宽。",
    "2026-05-18": "第三天：冲顶 — Remotion 视频编程 + Quartz 数字花园搭建，从代码到底层框架。",
  };

  const firstDate = new Date(sortedDays[0]);

  const days = sortedDays.map((key, i) => {
    const projMap = dayMap[key];
    const projNames = Object.keys(projMap);

    const projects = projNames.map(name => {
      const meta = PROJECT_META[name];
      if (!meta) return null;

      return {
        name,
        title: meta.title,
        description: meta.description,
        skills: meta.skills,
        highlights: meta.highlights,
      };
    }).filter(Boolean);

    const skillsLearned = [...new Set(projects.flatMap(p => p.skills))];

    const memForDay = memoryNotes[key] || [];
    const memSummary = memForDay.map(m => m.file.replace(".md", "")).join("、");

    // Day N 计算：相对于第一个有数据的日期
    const dayDate = new Date(key);
    const dayDiff = Math.floor((dayDate - firstDate) / 86400000);
    const dayNum = dayDiff + 1;

    return {
      date: key,
      label: `Day ${dayNum} · ${dayDate.getMonth() + 1}月${dayDate.getDate()}日`,
      projects,
      skillsLearned,
      note: dayNotes[key] || "",
      memoryRefs: memSummary,
    };
  });

  // 汇总所有技能
  const allSkills = [...new Set(days.flatMap(d => d.skillsLearned))].sort((a, b) =>
    a.localeCompare(b, "zh-CN")
  );

  const output = {
    generated: new Date().toISOString(),
    summary: {
      totalDays: days.length,
      totalProjects: [...new Set(days.flatMap(d => d.projects.map(p => p.name)))].length,
      skills: allSkills,
    },
    days,
  };

  // 写 JSON
  const outDir = path.join(DESKTOP, "创意站/content/learning");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, "timeline-data.json");
  fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2), "utf8");

  // 同时写 JS 版本（script 标签直接加载，不走 fetch，更可靠）
  const jsPath = path.join(outDir, "timeline-data.js");
  fs.writeFileSync(jsPath, "window.TIMELINE_DATA=" + JSON.stringify(output) + ";", "utf8");

  // 打印摘要
  console.log(`\n======== 扫描完成 ========`);
  console.log(`覆盖 ${output.summary.totalDays} 天，${output.summary.totalProjects} 个项目`);
  console.log(`技能标签: ${allSkills.join(", ")}`);
  console.log(`日期范围: ${sortedDays[0]} ~ ${sortedDays[sortedDays.length - 1]}`);
  for (const day of days) {
    console.log(`\n${day.label}`);
    for (const p of day.projects) {
      console.log(`  📁 ${p.title}  [${p.skills.join(", ")}]`);
    }
    if (day.memoryRefs) console.log(`  🧠 笔记: ${day.memoryRefs}`);
  }
  console.log(`\n输出: ${jsonPath}`);
  console.log(`JS:   ${jsPath}`);
}

main();
