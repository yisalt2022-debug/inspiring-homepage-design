import { useTheme } from "../ThemeProvider";
import { MatrixRain } from "./MatrixRain";
import { DataStream } from "./DataStream";
import { CursorGlow } from "./CursorGlow";

/**
 * Renders the appropriate ambient background for the active theme.
 * Cursor glow is shared across both themes (it picks up --primary).
 */
export function ThemedBackground() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "cyber" ? <DataStream /> : <MatrixRain />}
      <CursorGlow />

      {/* Cyber-only: corner aurora glows */}
      {theme === "cyber" && (
        <>
          <div
            className="pointer-events-none fixed -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl opacity-40 z-0"
            style={{
              background:
                "radial-gradient(circle, var(--primary), transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none fixed -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 z-0"
            style={{
              background:
                "radial-gradient(circle, var(--primary-glow), transparent 65%)",
            }}
          />
        </>
      )}
    </>
  );
}
