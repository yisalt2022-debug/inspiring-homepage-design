import { Link, useLocation } from "@tanstack/react-router";
import { Home, LayoutGrid, Search, ShoppingCart } from "lucide-react";

type Tab = {
  to: string;
  params?: Record<string, string>;
  label: string;
  icon: typeof Home;
  match?: string;
};

const tabs: Tab[] = [
  { to: "/", label: "首页", icon: Home },
  { to: "/category/$slug", params: { slug: "all" }, label: "分类", icon: LayoutGrid, match: "/category" },
  { to: "/search", label: "搜索", icon: Search },
  { to: "/cart", label: "购物车", icon: ShoppingCart },
];

export function MobileTabBar() {
  const { pathname } = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-primary/30 bg-background/85 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* Top neon glow line */}
      <div
        className="absolute -top-px inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 80%, transparent), transparent)",
        }}
      />
      <ul className="grid grid-cols-4 h-14">
        {tabs.map((t) => {
          const active =
            (t.match && pathname.startsWith(t.match)) ||
            (!t.match && pathname === t.to);
          const Icon = t.icon;
          const linkProps = "params" in t
            ? { to: t.to, params: t.params }
            : { to: t.to };
          return (
            <li key={t.label} className="flex">
              <Link
                {...(linkProps as any)}
                className={`flex flex-1 flex-col items-center justify-center gap-0.5 font-mono text-[10px] tracking-wider transition-colors ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-all ${
                    active ? "drop-shadow-[0_0_6px_color-mix(in_oklab,var(--primary)_80%,transparent)]" : ""
                  }`}
                />
                <span>{t.label}</span>
                {active && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary shadow-[0_0_8px_color-mix(in_oklab,var(--primary)_90%,transparent)]" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
