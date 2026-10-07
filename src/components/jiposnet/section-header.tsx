import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Consistent section header: eyebrow chip + display title + supporting
 * description, centered by default. Works on light and navy sections.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]",
          dark
            ? "bg-jipo-cyan/10 text-jipo-cyan ring-1 ring-inset ring-jipo-cyan/25"
            : "bg-jipo-blue/8 text-jipo-blue ring-1 ring-inset ring-jipo-blue/20"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dark ? "bg-jipo-cyan" : "bg-jipo-blue"
          )}
        />
        {eyebrow}
      </span>

      <h2
        className={cn(
          "font-display mt-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-jipo-navy"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-jipo-slate",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
