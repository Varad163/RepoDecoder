import { Github, Search } from "lucide-react";
import { EXAMPLE_REPOS } from "@/constants";

interface HeroSectionProps {
  url: string;
  loading: boolean;
  error: string;
  onUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function HeroSection({
  url,
  loading,
  error,
  onUrlChange,
  onSubmit,
}: HeroSectionProps) {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24">
      {/* Badge */}
      <div className="opacity-0 animate-fade-up mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-accent/20 text-xs text-accent font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Powered by Groq AI · llama-3.3-70b
      </div>

      {/* Heading */}
      <h1 className="opacity-0 animate-fade-up delay-100 font-display font-800 text-5xl sm:text-6xl lg:text-7xl text-white leading-[1.05] tracking-tight max-w-4xl mb-6">
        Understand any{" "}
        <span className="text-gradient">GitHub repo</span>
        <br />in seconds
      </h1>

      <p className="opacity-0 animate-fade-up delay-200 text-lg text-muted max-w-xl mb-12 leading-relaxed">
        Paste any repository URL and get an instant AI-powered breakdown —
        architecture, tech stack, complexity, and actionable improvements.
      </p>

      {/* Search form */}
      <form onSubmit={onSubmit} className="opacity-0 animate-fade-up delay-300 w-full max-w-2xl">
        <div className="glass rounded-2xl p-1.5 border border-border hover:border-accent/30 focus-within:border-accent/50 transition-all duration-300 glow-green">
          <div className="flex items-center gap-3">
            <div className="pl-4 text-muted">
              <Github size={20} />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://github.com/owner/repository"
              className="flex-1 bg-transparent text-white placeholder:text-muted/60 outline-none py-3 text-sm font-mono"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-3 bg-accent text-bg font-display font-600 text-sm rounded-xl hover:bg-accent/90 active:scale-95 transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                  Analyzing…
                </>
              ) : (
                <>
                  <Search size={15} />
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-3 text-red-400 text-sm text-left px-2">{error}</p>
        )}
      </form>

      {/* Example repos */}
      <ExampleRepos onSelect={onUrlChange} />
    </section>
  );
}

function ExampleRepos({ onSelect }: { onSelect: (url: string) => void }) {
  return (
    <div className="opacity-0 animate-fade-up delay-400 mt-5 flex flex-wrap items-center justify-center gap-2">
      <span className="text-xs text-muted/60">Try:</span>
      {EXAMPLE_REPOS.map((repo) => {
        const name = repo.replace("https://github.com/", "");
        return (
          <button
            key={repo}
            onClick={() => onSelect(repo)}
            className="text-xs px-3 py-1 rounded-full border border-border text-muted hover:text-white hover:border-accent/30 transition-all font-mono"
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
