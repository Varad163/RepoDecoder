import { BarChart2, Shield, ArrowRight } from "lucide-react";
import { HOME_FEATURES } from "@/constants";

const ICONS = [
  <BarChart2 size={20} className="text-accent" key="bar" />,
  <Shield size={20} className="text-electric" key="shield" />,
  <ArrowRight size={20} className="text-amber" key="arrow" />,
];

export function FeaturesGrid() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
      <div className="opacity-0 animate-fade-up delay-500 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {HOME_FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="glass rounded-xl p-5 border border-border hover:border-white/10 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {ICONS[i]}
            </div>
            <h3 className="font-display font-600 text-white mb-1.5 text-sm">
              {f.title}
            </h3>
            <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
