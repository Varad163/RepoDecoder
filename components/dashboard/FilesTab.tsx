import { Code } from "lucide-react";
import { FileNode, RepoMetadata } from "@/types";
import { FileExplorer } from "@/components/FileExplorer";
import { formatBytes } from "@/lib/utils";

interface FilesTabProps {
  repo: RepoMetadata;
  fileStructure: FileNode[];
}

export function FilesTab({ repo, fileStructure }: FilesTabProps) {
  return (
    <div className="glass rounded-2xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 className="font-display font-600 text-white flex items-center gap-2">
          <Code size={16} className="text-electric" /> File Structure
        </h2>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Code size={11} /> {repo.name}
          </span>
          <span>{formatBytes(repo.size)}</span>
        </div>
      </div>
      <div className="p-4 max-h-[600px] overflow-y-auto">
        <FileExplorer nodes={fileStructure} />
      </div>
    </div>
  );
}
