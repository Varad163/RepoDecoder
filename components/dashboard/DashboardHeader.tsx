import { ArrowLeft, ExternalLink, Github, Zap } from "lucide-react";
import { RepoMetadata } from "@/types";

interface DashboardHeaderProps {
  repo: RepoMetadata;
  onBack: () => void;
}

export function DashboardHeader({ repo, onBack }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-border px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
          <span className="text-border">|</span>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Zap size={12} className="text-accent" />
            </div>
            <span className="font-display font-600 text-white text-sm">
              GitLens AI
            </span>
          </div>
        </div>
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-muted hover:text-white transition-colors"
        >
          <Github size={14} />
          <span className="hidden sm:block">{repo.fullName}</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </header>
  );
}
