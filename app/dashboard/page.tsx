"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalysisResult } from "@/hooks/useAnalysisResult";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RepoCard } from "@/components/dashboard/RepoCard";
import { TabBar, Tab } from "@/components/dashboard/TabBar";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { AnalysisTab } from "@/components/dashboard/AnalysisTab";
import { FilesTab } from "@/components/dashboard/FilesTab";
import { ReadmeTab } from "@/components/dashboard/ReadmeTab";

export default function DashboardPage() {
  const router = useRouter();
  const { data, mounted } = useAnalysisResult();
  const [tab, setTab] = useState<Tab>("overview");

  if (!data || !mounted) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-t-accent border-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { repo, analysis, fileStructure, readme } = data;

  return (
    <div className="min-h-screen bg-bg">
      <div className="bg-grid fixed inset-0 opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-accent/4 blur-[100px] rounded-full pointer-events-none" />

      <DashboardHeader repo={repo} onBack={() => router.push("/")} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <RepoCard repo={repo} analysis={analysis} />

        <TabBar active={tab} onChange={setTab} />

        <div className="animate-fade-up delay-200">
          {tab === "overview" && <OverviewTab analysis={analysis} />}
          {tab === "analysis" && <AnalysisTab analysis={analysis} />}
          {tab === "files" && <FilesTab repo={repo} fileStructure={fileStructure} />}
          {tab === "readme" && <ReadmeTab readme={readme} />}
        </div>

        <div className="mt-10 text-center text-xs text-muted/40">
          Analyzed {new Date(data.analyzedAt).toLocaleString()} · Powered by Groq AI
        </div>
      </main>
    </div>
  );
}
