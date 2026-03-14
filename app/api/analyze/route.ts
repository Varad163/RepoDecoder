import { NextRequest, NextResponse } from "next/server";
import { parseGitHubUrl, fetchRepoMetadata, fetchReadme, fetchFileStructure } from "@/lib/github";
import { analyzeWithGroq } from "@/lib/groq";
import { AnalysisResult } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Please provide a GitHub repository URL." }, { status: 400 });
    }

    // Parse the GitHub URL into owner + repo
    const { owner, repo } = parseGitHubUrl(url);

    // Fetch repo metadata and README in parallel
    const [metadata, readme] = await Promise.all([
      fetchRepoMetadata(owner, repo),
      fetchReadme(owner, repo),
    ]);

    // Fetch file tree (needs the default branch from metadata)
    const fileStructure = await fetchFileStructure(owner, repo, metadata.defaultBranch);

    // Run AI analysis via Groq
    const analysis = await analyzeWithGroq(metadata, fileStructure, readme);

    const result: AnalysisResult = {
      repo: metadata,
      fileStructure,
      readme,
      analysis,
      analyzedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
