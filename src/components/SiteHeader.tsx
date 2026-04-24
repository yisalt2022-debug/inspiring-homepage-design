import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingCart, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function SiteHeader({ defaultQuery = "" }: { defaultQuery?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState(defaultQuery);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="relative z-20 border-b border-border/50 backdrop-blur-md sticky top-0 bg-background/70">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border border-primary/30 pulse-ring">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <div className="hidden sm:block">
            <div className="text-base font-bold tracking-wider group-hover:animate-glitch">
              NULL<span className="text-primary">SEC</span>
            </div>
            <div className="text-[10px] text-muted-foreground -mt-1">store</div>
          </div>
        </Link>
        <form onSubmit={submit} className="flex-1 max-w-xl relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索商品、服务、关键词..."
            className="pl-9 bg-secondary/40 border-border/60 focus-visible:border-primary focus-visible:shadow-[0_0_20px_oklch(0.85_0.22_145/0.3)] transition-shadow"
          />
        </form>
        <Link to="/cart">
          <Button
            variant="outline"
            size="icon"
            className="border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_oklch(0.85_0.22_145/0.4)] transition-all shrink-0"
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
