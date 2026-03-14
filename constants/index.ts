// ─── Homepage ────────────────────────────────────────────────────────────────

export const EXAMPLE_REPOS = [
  "https://github.com/vercel/next.js",
  "https://github.com/facebook/react",
  "https://github.com/microsoft/vscode",
];

export const HOME_FEATURES = [
  {
    color: "text-accent",
    title: "Deep Analysis",
    desc: "Architecture patterns, tech stack detection, and complexity scoring",
  },
  {
    color: "text-electric",
    title: "Code Quality",
    desc: "Identify strengths, concerns, and areas for improvement",
  },
  {
    color: "text-amber",
    title: "Actionable Insights",
    desc: "Prioritized suggestions to improve your codebase",
  },
];

export const LOADING_STEPS = [
  "Fetching repository data",
  "Reading file structure",
  "Analyzing with Groq AI",
  "Generating insights",
];

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const COMPLEXITY_CONFIG = {
  Beginner: {
    color: "#4ade80",
    bg: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  Intermediate: {
    color: "#fbbf24",
    bg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  Advanced: {
    color: "#f87171",
    bg: "bg-red-500/10 text-red-400 border-red-500/20",
  },
} as const;

export const PRIORITY_CONFIG = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
} as const;
