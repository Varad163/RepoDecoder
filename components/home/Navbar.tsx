import { Github, Zap } from "lucide-react";

export function Navbar() {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
          <Zap size={16} className="text-accent" />
        </div>
        <span className="font-display font-700 text-white text-lg tracking-tight">
          GitLens AI
        </span>
      </div>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
      >
        <Github size={16} />
        <span className="hidden sm:block">GitHub</span>
      </a>
    </nav>
  );
}
