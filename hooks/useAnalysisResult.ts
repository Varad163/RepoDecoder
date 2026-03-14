"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnalysisResult } from "@/types";

export function useAnalysisResult() {
  const router = useRouter();
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysis_result");
    if (!stored) {
      router.push("/");
      return;
    }
    try {
      setData(JSON.parse(stored));
      setMounted(true);
    } catch {
      router.push("/");
    }
  }, [router]);

  return { data, mounted };
}
