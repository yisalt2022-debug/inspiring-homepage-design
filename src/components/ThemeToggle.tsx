import { useTheme } from "./ThemeProvider";
import { Cpu, Leaf } from "lucide-react";

/**
 * Two-state visual switch between Matrix (green) and Cyber (blue/violet) themes.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isCyber = theme === "cyber";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`切换到 ${isCyber ? "Matrix" : "Cyber"} 主题`}
      title={`当前: ${isCyber ? "CYBER" : "MATRIX"} · 点击切换`}
      className={`group relative inline-flex items-center gap-1 rounded-md border border-primary/40 bg-card/40 backdrop-blur-sm px-1 py-1 transition-all hover:border-primary/70 hover:shadow-[0_0_18px_color-mix(in_oklab,var(--primary)_45%,transparent)] ${
        compact ? "h-9" : "h-9 md:h-10"
      }`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center rounded transition-all ${
          !isCyber
            ? "bg-primary/20 text-primary shadow-[inset_0_0_10px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
            : "text-muted-foreground"
        }`}
      >
        <Leaf className="h-3.5 w-3.5" />
      </span>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded transition-all ${
          isCyber
            ? "bg-primary/20 text-primary shadow-[inset_0_0_10px_color-mix(in_oklab,var(--primary)_45%,transparent)]"
            : "text-muted-foreground"
        }`}
      >
        <Cpu className="h-3.5 w-3.5" />
      </span>
      {!compact && (
        <span className="hidden lg:inline ml-1 mr-1.5 text-[10px] font-mono text-muted-foreground tracking-widest">
          {isCyber ? "CYBER" : "MATRIX"}
        </span>
      )}
    </button>
  );
}
