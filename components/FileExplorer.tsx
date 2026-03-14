"use client";

import { useState } from "react";
import { ChevronRight, Folder, FolderOpen, File, FileCode, FileText, Image } from "lucide-react";
import { FileNode } from "@/types";
import { cn } from "@/lib/utils";

const FILE_ICONS: Record<string, React.ReactNode> = {
  ts: <FileCode size={13} className="text-blue-400" />,
  tsx: <FileCode size={13} className="text-blue-400" />,
  js: <FileCode size={13} className="text-yellow-400" />,
  jsx: <FileCode size={13} className="text-yellow-400" />,
  py: <FileCode size={13} className="text-blue-300" />,
  rs: <FileCode size={13} className="text-orange-400" />,
  go: <FileCode size={13} className="text-cyan-400" />,
  md: <FileText size={13} className="text-gray-400" />,
  json: <FileCode size={13} className="text-yellow-300" />,
  css: <FileCode size={13} className="text-purple-400" />,
  html: <FileCode size={13} className="text-orange-300" />,
  png: <Image size={13} className="text-pink-400" />,
  jpg: <Image size={13} className="text-pink-400" />,
  svg: <Image size={13} className="text-pink-300" />,
};

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() || "";
  return FILE_ICONS[ext] || <File size={13} className="text-muted" />;
}

function FileNodeRow({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 1);
  const isDir = node.type === "dir";

  return (
    <div>
      <button
        onClick={() => isDir && setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-1.5 py-[3px] px-2 rounded-md text-xs transition-colors group",
          isDir ? "hover:bg-white/5 cursor-pointer" : "cursor-default"
        )}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
      >
        {isDir ? (
          <>
            <ChevronRight
              size={10}
              className={cn("text-muted transition-transform shrink-0", open && "rotate-90")}
            />
            {open ? (
              <FolderOpen size={13} className="text-amber shrink-0" />
            ) : (
              <Folder size={13} className="text-amber/70 shrink-0" />
            )}
          </>
        ) : (
          <>
            <span className="w-[10px] shrink-0" />
            {getFileIcon(node.name)}
          </>
        )}
        <span className={cn("truncate", isDir ? "text-white/80" : "text-muted group-hover:text-white/70")}>
          {node.name}
        </span>
      </button>
      {isDir && open && node.children && (
        <div>
          {node.children.map((child) => (
            <FileNodeRow key={child.path} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({ nodes }: { nodes: FileNode[] }) {
  if (!nodes.length) {
    return <p className="text-muted text-xs py-4 text-center">No file structure available</p>;
  }

  return (
    <div className="font-mono text-xs leading-relaxed">
      {nodes.map((node) => (
        <FileNodeRow key={node.path} node={node} />
      ))}
    </div>
  );
}
