export interface RepoMetadata {
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  watchers: number;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  defaultBranch: string;
  size: number;
  openIssues: number;
  license: string | null;
  owner: {
    login: string;
    avatarUrl: string;
    type: string;
  };
  htmlUrl: string;
}

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  children?: FileNode[];
}

export interface AIAnalysis {
  projectType: string;
  techStack: string[];
  architecture: {
    pattern: string;
    description: string;
    components: string[];
  };
  mainFeatures: string[];
  complexity: {
    level: "Beginner" | "Intermediate" | "Advanced";
    score: number;
    reasoning: string;
  };
  suggestedImprovements: {
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
  }[];
  summary: string;
  codeQuality: {
    score: number;
    highlights: string[];
    concerns: string[];
  };
}

export interface AnalysisResult {
  repo: RepoMetadata;
  fileStructure: FileNode[];
  readme: string | null;
  analysis: AIAnalysis;
  analyzedAt: string;
}

export interface AnalyzeRequest {
  url: string;
}

export interface ApiError {
  error: string;
  code?: string;
}
