"use client";

import { cn } from "@/lib/utils";

interface ScoreRingProps {
  score: number;
  max?: number;
  label: string;
  size?: number;
  color?: string;
}

export function ScoreRing({ score, max = 10, label, size = 80, color = "#4ade80" }: ScoreRingProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / max) * circumference;
  const pct = Math.round((score / max) * 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={6}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color} strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: "stroke-dashoffset 1s ease", filter: `drop-shadow(0 0 6px ${color}60)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display font-700 text-white" style={{ fontSize: size * 0.22 }}>
            {score}
          </span>
        </div>
      </div>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}
