import { Zap } from "lucide-react";
import { LOADING_STEPS } from "@/constants";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg/90 backdrop-blur-sm">
      <div className="glass rounded-2xl p-8 border border-border text-center max-w-sm w-full mx-6">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" />
            <div className="absolute inset-0 rounded-full border-2 border-t-accent border-transparent animate-spin" />
            <div
              className="absolute inset-2 rounded-full border border-t-electric border-transparent animate-spin"
              style={{ animationDuration: "1.5s", animationDirection: "reverse" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={20} className="text-accent" />
            </div>
          </div>
        </div>

        <h3 className="font-display font-600 text-white mb-2">
          Analyzing Repository
        </h3>
        <p className="text-sm text-muted mb-4">
          Fetching code, reading structure, generating insights…
        </p>

        {/* Steps */}
        <div className="space-y-2">
          {LOADING_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2 text-xs text-muted">
              <div
                className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse"
                style={{ animationDelay: `${i * 300}ms` }}
              />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
