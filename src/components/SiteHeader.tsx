import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Terminal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export function SiteHeader({ defaultQuery = "" }: { defaultQuery?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState(defaultQuery);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileSearchOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="relative z-20 border-b border-border/50 backdrop-blur-md sticky top-0 bg-background/70">
      <div className="container mx-auto flex h-14 md:h-16 items-center gap-3 md:gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-md bg-primary/10 border border-primary/30 pulse-ring">
            <Terminal className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
          <div className="block">
            <div className="text-sm md:text-base font-bold tracking-wider group-hover:animate-glitch leading-none">
              NULL<span className="text-primary">SEC</span>
            </div>
            <div className="hidden sm:block text-[10px] text-muted-foreground mt-0.5">store</div>
          </div>
        </Link>

        {/* Theme switcher — placed right after logo so it's always visible */}
        <ThemeToggle />

        {/* Desktop search */}
        <form onSubmit={submit} className="hidden md:block flex-1 max-w-xl relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索商品、服务、关键词..."
            className="pl-9 bg-secondary/40 border-border/60 focus-visible:border-primary focus-visible:shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_30%,transparent)] transition-shadow"
          />
        </form>

        {/* Spacer for mobile */}
        <div className="flex-1 md:hidden" />

        {/* Mobile search toggle */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setMobileSearchOpen((v) => !v)}
          className="md:hidden h-9 w-9 border-primary/40 hover:bg-primary/10 shrink-0"
          aria-label="搜索"
        >
          <Search className="h-4 w-4 text-primary" />
        </Button>

        <Link to="/cart">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 md:h-10 md:w-10 border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_45%,transparent)] transition-all shrink-0"
            aria-label="购物车"
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
          </Button>
        </Link>
      </div>

      {/* Mobile search expand panel */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-primary/20 bg-background/90 backdrop-blur-md px-4 py-3 animate-fade-up">
          <form onSubmit={submit} className="relative flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
              <Input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="搜索商品、服务..."
                className="pl-9 h-10 bg-secondary/50 border-primary/30 font-mono text-sm focus-visible:border-primary"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMobileSearchOpen(false)}
              className="h-10 w-10 shrink-0 text-muted-foreground"
              aria-label="关闭"
            >
              <X className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
