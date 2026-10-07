import { cn } from "@/lib/utils";

/**
 * JIPOSNET logo — a WiFi signal rising from a node, enclosed in a
 * rounded signal-badge. Pure SVG, inherits sizing via `className`.
 */
export function JipoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="jipo-badge" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1F3A" />
          <stop offset="0.55" stopColor="#0A2E66" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
        <linearGradient id="jipo-wave" x1="14" y1="26" x2="36" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00D4FF" />
          <stop offset="1" stopColor="#7FDFFF" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#jipo-badge)" />
      <rect
        x="2.9"
        y="2.9"
        width="42.2"
        height="42.2"
        rx="12.2"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
      />

      {/* WiFi arcs */}
      <path
        d="M16.2 24.6a11.5 11.5 0 0 1 15.6 0"
        stroke="url(#jipo-wave)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M20.3 29.1a5.8 5.8 0 0 1 7.4 0"
        stroke="url(#jipo-wave)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* Node dot with cyan core */}
      <circle cx="24" cy="34.4" r="3.1" fill="#00D4FF" />
      <circle cx="24" cy="34.4" r="5.4" stroke="rgba(0,212,255,0.4)" strokeWidth="1.2" />
    </svg>
  );
}

export function JipoLogo({
  className,
  wordmarkClassName,
  variant = "dark",
}: {
  className?: string;
  wordmarkClassName?: string;
  /** `dark` = navy wordmark (light backgrounds), `light` = white wordmark (navy backgrounds) */
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <JipoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-bold tracking-tight",
            wordmarkClassName,
            variant === "dark" ? "text-jipo-navy" : "text-white"
          )}
        >
          JIPOS<span className="text-jipo-blue">NET</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium uppercase tracking-[0.22em]",
            variant === "dark" ? "text-jipo-slate" : "text-white/60"
          )}
        >
          Hargorejo • Lampung
        </span>
      </span>
    </span>
  );
}
