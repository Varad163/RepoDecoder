import { TrendingUp, CheckCircle, AlertCircle, Lightbulb } from "lucide-react";
import { AIAnalysis } from "@/types";
import { COMPLEXITY_CONFIG, PRIORITY_CONFIG } from "@/constants";

interface AnalysisTabProps {
  analysis: AIAnalysis;
}

export function AnalysisTab({ analysis }: AnalysisTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ComplexityCard complexity={analysis.complexity} />
      <CodeQualityCard codeQuality={analysis.codeQuality} />
      <ImprovementsCard improvements={analysis.suggestedImprovements} />
    </div>
  );
}

function ComplexityCard({
  complexity,
}: {
  complexity: AIAnalysis["complexity"];
}) {
  const cx = COMPLEXITY_CONFIG[complexity.level];
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-electric" /> Complexity Analysis
      </h2>
      <div className="flex items-center gap-4 mb-4">
        <div className={`text-sm px-3 py-1.5 rounded-lg border ${cx.bg} font-display font-600`}>
          {complexity.level}
        </div>
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${(complexity.score / 10) * 100}%`,
              backgroundColor: cx.color,
            }}
          />
        </div>
        <span className="text-sm font-mono text-white">{complexity.score}/10</span>
      </div>
      <p className="text-sm text-muted leading-relaxed">{complexity.reasoning}</p>
    </div>
  );
}

function CodeQualityCard({
  codeQuality,
}: {
  codeQuality: AIAnalysis["codeQuality"];
}) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-4 flex items-center gap-2">
        <CheckCircle size={16} className="text-accent" /> Code Quality
      </h2>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-1000"
            style={{ width: `${(codeQuality.score / 10) * 100}%` }}
          />
        </div>
        <span className="text-sm font-mono text-white">{codeQuality.score}/10</span>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-accent mb-1.5 font-display font-500">
            Highlights
          </p>
          {codeQuality.highlights.map((h) => (
            <div key={h} className="flex items-start gap-1.5 text-xs text-muted mb-1">
              <CheckCircle size={11} className="text-accent mt-0.5 shrink-0" />
              {h}
            </div>
          ))}
        </div>
        <div>
          <p className="text-xs text-red-400 mb-1.5 font-display font-500">
            Concerns
          </p>
          {codeQuality.concerns.map((c) => (
            <div key={c} className="flex items-start gap-1.5 text-xs text-muted mb-1">
              <AlertCircle size={11} className="text-red-400 mt-0.5 shrink-0" />
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImprovementsCard({
  improvements,
}: {
  improvements: AIAnalysis["suggestedImprovements"];
}) {
  return (
    <div className="lg:col-span-2 glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-5 flex items-center gap-2">
        <Lightbulb size={16} className="text-amber" /> Suggested Improvements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {improvements.map((imp, i) => (
          <div
            key={i}
            className="glass-light rounded-xl p-4 border border-border hover:border-white/10 transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display font-500 text-white text-sm">
                {imp.title}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${PRIORITY_CONFIG[imp.priority]}`}
              >
                {imp.priority}
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed">{imp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
