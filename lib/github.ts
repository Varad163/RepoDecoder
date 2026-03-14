import { RepoMetadata, FileNode } from "@/types";

const GITHUB_API = "https://api.github.com";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "AI-GitHub-Analyzer",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  try {
    const cleaned = url.trim().replace(/\.git$/, "");
    const patterns = [
      /github\.com\/([^/]+)\/([^/\s?#]+)/,
      /^([^/]+)\/([^/]+)$/,
    ];
    for (const pattern of patterns) {
      const match = cleaned.match(pattern);
      if (match) return { owner: match[1], repo: match[2] };
    }
    throw new Error("Invalid GitHub URL format");
  } catch {
    throw new Error("Could not parse GitHub URL. Please provide a valid repository URL.");
  }
}

export async function fetchRepoMetadata(owner: string, repo: string): Promise<RepoMetadata> {
  const [repoRes, langsRes] = await Promise.all([
    fetch(`${GITHUB_API}/repos/${owner}/${repo}`, { headers: getHeaders() }),
    fetch(`${GITHUB_API}/repos/${owner}/${repo}/languages`, { headers: getHeaders() }),
  ]);

  if (!repoRes.ok) {
    if (repoRes.status === 404) throw new Error("Repository not found. It may be private or doesn't exist.");
    if (repoRes.status === 403) throw new Error("API rate limit exceeded. Please add a GitHub token.");
    throw new Error(`GitHub API error: ${repoRes.statusText}`);
  }

  const repoData = await repoRes.json();
  const languages = langsRes.ok ? await langsRes.json() : {};

  return {
    name: repoData.name,
    fullName: repoData.full_name,
    description: repoData.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    watchers: repoData.watchers_count,
    language: repoData.language,
    languages,
    topics: repoData.topics || [],
    createdAt: repoData.created_at,
    updatedAt: repoData.updated_at,
    defaultBranch: repoData.default_branch,
    size: repoData.size,
    openIssues: repoData.open_issues_count,
    license: repoData.license?.name || null,
    owner: {
      login: repoData.owner.login,
      avatarUrl: repoData.owner.avatar_url,
      type: repoData.owner.type,
    },
    htmlUrl: repoData.html_url,
  };
}

export async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/readme`, { headers: getHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

export async function fetchFileStructure(owner: string, repo: string, branch: string): Promise<FileNode[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`,
      { headers: getHeaders() }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.truncated) {
      // Build from non-truncated portion
    }
    return buildFileTree(data.tree || []);
  } catch {
    return [];
  }
}

interface TreeItem {
  path: string;
  type: string;
  size?: number;
}

function buildFileTree(items: TreeItem[]): FileNode[] {
  const root: FileNode[] = [];
  const map = new Map<string, FileNode>();

  // Sort: dirs first, then files
  const sorted = [...items].sort((a, b) => {
    if (a.type !== b.type) return a.type === "tree" ? -1 : 1;
    return a.path.localeCompare(b.path);
  });

  // Limit depth to avoid overwhelming UI
  const filtered = sorted.filter((item) => {
    const depth = item.path.split("/").length;
    return depth <= 4 && !item.path.includes("node_modules") && !item.path.includes(".git");
  });

  for (const item of filtered) {
    const parts = item.path.split("/");
    const name = parts[parts.length - 1];
    const node: FileNode = {
      name,
      path: item.path,
      type: item.type === "tree" ? "dir" : "file",
      size: item.size,
      children: item.type === "tree" ? [] : undefined,
    };
    map.set(item.path, node);

    if (parts.length === 1) {
      root.push(node);
    } else {
      const parentPath = parts.slice(0, -1).join("/");
      const parent = map.get(parentPath);
      if (parent && parent.children) {
        parent.children.push(node);
      }
    }
  }

  return root;
}
