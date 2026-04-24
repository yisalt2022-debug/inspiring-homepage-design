import { Link } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/effects/TiltCard";
import type { Product } from "@/lib/products";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <TiltCard className="animate-fade-up" style={{ animationDelay: `${0.05 * index + 0.1}s` }}>
      <Card className="neon-border group bg-card/60 backdrop-blur border-border hover:border-primary/60 transition-all p-4 md:p-5 cursor-pointer relative overflow-hidden flex flex-col h-full">
        <span className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-700" />

        {product.tag && (
          <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3 px-1.5 md:px-2 py-0.5 text-[9px] md:text-[10px] font-mono rounded bg-primary/15 text-primary border border-primary/30 group-hover:shadow-[0_0_12px_oklch(0.85_0.22_145/0.6)] transition-shadow">
            {product.tag}
          </div>
        )}
        <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-muted-foreground font-mono mb-2 md:mb-3">
          <Tag className="h-3 w-3" />
          {product.cat}
        </div>
        <Link
          to="/products/$id"
          params={{ id: product.id }}
          className="text-sm md:text-base font-semibold mb-1.5 md:mb-2 group-hover:text-primary transition pr-10 md:pr-12 leading-snug line-clamp-2"
        >
          {product.title}
        </Link>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3 md:mb-5 flex-1">
          {product.desc}
        </p>
        <div className="flex items-end justify-between border-t border-border/50 pt-3 md:pt-4">
          <div>
            <div className="text-[9px] md:text-[10px] text-muted-foreground font-mono">PRICE</div>
            <div className="text-xl md:text-2xl font-bold text-primary text-glow font-mono">
              ¥{product.price.toLocaleString()}
            </div>
          </div>
          <Link to="/products/$id" params={{ id: product.id }}>
            <Button
              size="sm"
              className="h-8 md:h-9 text-xs md:text-sm px-3 md:px-4 bg-primary/10 text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_oklch(0.85_0.22_145/0.5)] transition-all"
            >
              查看详情
            </Button>
          </Link>
        </div>
      </Card>
    </TiltCard>
  );
}
