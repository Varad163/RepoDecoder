"use client";

import { useAnalyzer } from "@/hooks/useAnalyzer";
import { Navbar } from "@/components/home/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesGrid } from "@/components/home/FeaturesGrid";
import { LoadingOverlay } from "@/components/home/LoadingOverlay";

export default function Home() {
  const { url, loading, error, handleUrlChange, handleSubmit } = useAnalyzer();

  return (
    <main className="relative min-h-screen bg-bg overflow-hidden">
      {/* Background effects */}
      <div className="bg-grid absolute inset-0 opacity-100" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-electric/5 blur-[100px] rounded-full pointer-events-none" />

      <Navbar />

      <HeroSection
        url={url}
        loading={loading}
        error={error}
        onUrlChange={handleUrlChange}
        onSubmit={handleSubmit}
      />

      <FeaturesGrid />

      {loading && <LoadingOverlay />}
    </main>
  );
}
