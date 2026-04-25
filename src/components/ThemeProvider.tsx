import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeName = "matrix" | "cyber";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "nullsec-theme";

function applyTheme(theme: ThemeName) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "cyber") root.classList.add("theme-cyber");
  else root.classList.remove("theme-cyber");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("matrix");

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (saved === "cyber" || saved === "matrix") {
        setThemeState(saved);
        applyTheme(saved);
      }
    } catch {
      /* noop */
    }
  }, []);

  const setTheme = useCallback((t: ThemeName) => {
    setThemeState(t);
    applyTheme(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* noop */
    }
    // Brief flash transition
    if (typeof document !== "undefined") {
      const flash = document.createElement("div");
      flash.className = "theme-flash";
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 650);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "matrix" ? "cyber" : "matrix");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Safe fallback (e.g. during SSR before provider mounts)
    return { theme: "matrix" as ThemeName, setTheme: () => {}, toggleTheme: () => {} };
  }
  return ctx;
}
