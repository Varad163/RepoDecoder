import { Layers, Zap, Code, Package } from "lucide-react";

export type Tab = "overview" | "analysis" | "files" | "readme";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <Layers size={14} /> },
  { id: "analysis", label: "AI Analysis", icon: <Zap size={14} /> },
  { id: "files", label: "File Explorer", icon: <Code size={14} /> },
  { id: "readme", label: "README", icon: <Package size={14} /> },
];

interface TabBarProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="animate-fade-up delay-100 flex gap-1 mb-6 glass rounded-xl p-1 border border-border w-fit">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-display font-500 transition-all ${
            active === t.id
              ? "bg-accent text-bg"
              : "text-muted hover:text-white"
          }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}
