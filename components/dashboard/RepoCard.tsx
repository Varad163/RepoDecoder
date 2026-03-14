import { Star, GitFork, Eye, AlertCircle, Scale, Clock } from "lucide-react";
import { RepoMetadata, AIAnalysis } from "@/types";
import { ScoreRing } from "@/components/ScoreRing";
import { LanguageBar } from "@/components/LanguageBar";
import { COMPLEXITY_CONFIG } from "@/constants";
import { formatNumber, timeAgo } from "@/lib/utils";

interface RepoCardProps {
  repo: RepoMetadata;
  analysis: AIAnalysis;
}

export function RepoCard({ repo, analysis }: RepoCardProps) {
  const cx = COMPLEXITY_CONFIG[analysis.complexity.level];

  return (
    <div className="animate-fade-up mb-8">
      <div className="glass rounded-2xl p-6 border border-border">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          {/* Left: avatar + info */}
          <div className="flex items-start gap-4">
            <img
              src={repo.owner.avatarUrl}
              alt={repo.owner.login}
              className="w-12 h-12 rounded-xl border border-border"
            />
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="font-display font-700 text-white text-xl">
                  {repo.name}
                </h1>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${cx.bg}`}>
                  {analysis.complexity.level}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted border border-border">
                  {analysis.projectType}
                </span>
              </div>
              <p className="text-muted text-sm mb-3">
                {repo.description || "No description provided"}
              </p>
              <RepoStats repo={repo} />
            </div>
          </div>

          {/* Right: score rings */}
          <div className="flex gap-4 shrink-0">
            <ScoreRing score={analysis.codeQuality.score} label="Quality" />
            <ScoreRing
              score={analysis.complexity.score}
              label="Complexity"
              color="#38bdf8"
            />
          </div>
        </div>

        {/* Language bar */}
        {Object.keys(repo.languages).length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <LanguageBar languages={repo.languages} />
          </div>
        )}

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {repo.topics.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-0.5 rounded-full bg-electric/10 text-electric border border-electric/20 font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function RepoStats({ repo }: { repo: RepoMetadata }) {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-muted">
      <span className="flex items-center gap-1">
        <Star size={12} className="text-amber" />
        {formatNumber(repo.stars)} stars
      </span>
      <span className="flex items-center gap-1">
        <GitFork size={12} />
        {formatNumber(repo.forks)} forks
      </span>
      <span className="flex items-center gap-1">
        <Eye size={12} />
        {formatNumber(repo.watchers)}
      </span>
      <span className="flex items-center gap-1">
        <AlertCircle size={12} />
        {repo.openIssues} issues
      </span>
      <span className="flex items-center gap-1">
        <Scale size={12} />
        {repo.license || "No license"}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={12} />
        Updated {timeAgo(repo.updatedAt)}
      </span>
    </div>
  );
}
