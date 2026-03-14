import { Zap, Package, CheckCircle, Layers, ChevronRight } from "lucide-react";
import { AIAnalysis } from "@/types";

interface OverviewTabProps {
  analysis: AIAnalysis;
}

export function OverviewTab({ analysis }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <SummaryCard summary={analysis.summary} />
      <TechStackCard techStack={analysis.techStack} />
      <FeaturesCard features={analysis.mainFeatures} />
      <ArchitectureCard architecture={analysis.architecture} />
    </div>
  );
}

function SummaryCard({ summary }: { summary: string }) {
  return (
    <div className="lg:col-span-2 glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-4 flex items-center gap-2">
        <Zap size={16} className="text-accent" /> Project Summary
      </h2>
      <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
        {summary}
      </p>
    </div>
  );
}

function TechStackCard({ techStack }: { techStack: string[] }) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-4 flex items-center gap-2">
        <Package size={16} className="text-electric" /> Tech Stack
      </h2>
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2.5 py-1 rounded-lg glass-light border border-border text-white/70 font-mono"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturesCard({ features }: { features: string[] }) {
  return (
    <div className="glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-4 flex items-center gap-2">
        <CheckCircle size={16} className="text-accent" /> Main Features
      </h2>
      <ul className="space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-muted">
            <ChevronRight size={14} className="text-accent shrink-0 mt-0.5" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureCard({
  architecture,
}: {
  architecture: AIAnalysis["architecture"];
}) {
  return (
    <div className="lg:col-span-2 glass rounded-2xl p-6 border border-border">
      <h2 className="font-display font-600 text-white mb-4 flex items-center gap-2">
        <Layers size={16} className="text-amber" /> Architecture
      </h2>
      <div className="mb-3">
        <span className="text-xs px-2.5 py-1 rounded-lg bg-amber/10 text-amber border border-amber/20 font-mono">
          {architecture.pattern}
        </span>
      </div>
      <p className="text-sm text-muted leading-relaxed mb-4">
        {architecture.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {architecture.components.map((c) => (
          <span
            key={c}
            className="text-xs px-2.5 py-1 rounded-lg glass-light border border-border text-muted"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
