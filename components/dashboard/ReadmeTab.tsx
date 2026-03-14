import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Package } from "lucide-react";

interface ReadmeTabProps {
  readme: string | null;
}

export function ReadmeTab({ readme }: ReadmeTabProps) {
  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="font-display font-600 text-white flex items-center gap-2">
          <Package size={16} className="text-accent" /> README.md
        </h2>
      </div>
      <div className="p-6 prose-dark max-h-[700px] overflow-y-auto">
        {readme ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
        ) : (
          <p className="text-muted text-sm">
            No README found in this repository.
          </p>
        )}
      </div>
    </div>
  );
}
