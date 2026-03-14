import Groq from "groq-sdk";
import { RepoMetadata, FileNode, AIAnalysis } from "@/types";

// Groq free tier: 30 requests/min, 14,400 req/day — no credit card needed
// Sign up at https://console.groq.com → API Keys → Create Key
// Model: llama-3.3-70b-versatile (fast, smart, generous free quota)
const GROQ_MODEL = "llama-3.3-70b-versatile";

function getClient(): Groq {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set. Get a free key at https://console.groq.com");
  return new Groq({ apiKey: key });
}

function flattenTree(nodes: FileNode[], depth = 0): string {
  return nodes
    .map((n) => {
      const indent = "  ".repeat(depth);
      const icon = n.type === "dir" ? "📁" : "📄";
      const children = n.children ? "\n" + flattenTree(n.children, depth + 1) : "";
      return `${indent}${icon} ${n.name}${children}`;
    })
    .join("\n");
}

function buildPrompt(repo: RepoMetadata, fileStructure: FileNode[], readme: string | null): string {
  const langList = Object.entries(repo.languages)
    .sort(([, a], [, b]) => b - a)
    .map(([lang]) => lang)
    .join(", ");

  const fileTree = flattenTree(fileStructure.slice(0, 40));
  const readmeSnippet = readme ? readme.slice(0, 1500) : "No README found.";

  return `You are an expert software architect. Analyze this GitHub repository and return ONLY valid JSON. No markdown, no code blocks, no explanation — just the raw JSON object.

Repository: ${repo.fullName}
Description: ${repo.description || "No description"}
Primary Language: ${repo.language || "Unknown"}
Languages: ${langList}
Stars: ${repo.stars} | Forks: ${repo.forks} | Size: ${repo.size} KB
Topics: ${repo.topics.join(", ") || "none"}
License: ${repo.license || "None"}

File Structure:
${fileTree}

README (excerpt):
${readmeSnippet}

Respond with ONLY this JSON structure, no other text:
{
  "projectType": "e.g. Full Stack Web App",
  "techStack": ["tech1", "tech2", "tech3"],
  "architecture": {
    "pattern": "e.g. MVC, JAMstack, Microservices, Monolith",
    "description": "2-3 sentences describing the architecture",
    "components": ["component1", "component2", "component3"]
  },
  "mainFeatures": ["feature1", "feature2", "feature3", "feature4", "feature5"],
  "complexity": {
    "level": "Beginner",
    "score": 5,
    "reasoning": "Short explanation of why this complexity level"
  },
  "suggestedImprovements": [
    { "title": "Improvement title", "description": "Detailed description", "priority": "High" },
    { "title": "Improvement title", "description": "Detailed description", "priority": "Medium" },
    { "title": "Improvement title", "description": "Detailed description", "priority": "Low" }
  ],
  "summary": "2-3 paragraph comprehensive summary of the project",
  "codeQuality": {
    "score": 7,
    "highlights": ["positive aspect 1", "positive aspect 2"],
    "concerns": ["concern 1", "concern 2"]
  }
}`;
}

export async function analyzeWithGroq(
  repo: RepoMetadata,
  fileStructure: FileNode[],
  readme: string | null
): Promise<AIAnalysis> {
  const client = getClient();
  const prompt = buildPrompt(repo, fileStructure, readme);

  console.log(`[Groq] Analyzing ${repo.fullName} with ${GROQ_MODEL}`);

  const completion = await client.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: "You are an expert software architect. Always respond with valid JSON only — no markdown, no code fences, no extra text.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 2048,
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) throw new Error("Groq returned an empty response. Please try again.");

  // Strip any accidental markdown fences
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as AIAnalysis;
  } catch {
    console.error("[Groq] Raw response:", text.slice(0, 300));
    throw new Error("AI returned invalid JSON. Please try again.");
  }
}
