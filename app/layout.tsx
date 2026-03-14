import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitLens AI — Repository Analyzer",
  description: "AI-powered GitHub repository analysis. Understand any codebase instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
