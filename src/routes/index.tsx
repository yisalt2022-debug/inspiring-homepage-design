import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag, Zap, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NullSec Store — 安全工具与服务" },
      { name: "description", content: "白帽安全团队提供的合规工具、培训与渗透测试服务。" },
    ],
  }),
});

const ticker = [
  "// 0day patched in 12min",
  "▲ 1,287 vulns reported",
  "● 7×24 IR online",
  "✓ ISO 27001 certified",
  "» 99.98% SLA uptime",
  "# 423 white-hats verified",
];

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      <CursorGlow />

      {/* Top scanline */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-px opacity-70"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.85 0.22 145 / 0.8), transparent)",
        }}
      />

      <SiteHeader />

      {/* Marquee ticker */}
      <div className="relative z-10 border-b border-border/40 bg-background/40 backdrop-blur-sm overflow-hidden py-2">
        <div className="flex w-max animate-marquee gap-12 text-xs font-mono text-primary/80 whitespace-nowrap">
          {[...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Hero banner */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 pt-5 md:pt-8 animate-fade-up">
        <Card className="scanlines bg-gradient-to-br from-primary/15 via-card/60 to-secondary/40 border-primary/30 p-5 md:p-12 backdrop-blur relative overflow-hidden">
          <span className="absolute top-2 left-2 w-3 h-3 md:w-4 md:h-4 border-t border-l border-primary/60" />
          <span className="absolute top-2 right-2 w-3 h-3 md:w-4 md:h-4 border-t border-r border-primary/60" />
          <span className="absolute bottom-2 left-2 w-3 h-3 md:w-4 md:h-4 border-b border-l border-primary/60" />
          <span className="absolute bottom-2 right-2 w-3 h-3 md:w-4 md:h-4 border-b border-r border-primary/60" />

          <div className="absolute top-0 right-0 px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-mono text-primary/70 border-l border-b border-primary/30">
            // featured
          </div>

          <div className="absolute -right-6 -bottom-6 opacity-10 animate-float">
            <ShieldCheck className="h-32 w-32 md:h-48 md:w-48 text-primary" strokeWidth={1} />
          </div>

          <Badge variant="outline" className="border-primary/40 text-primary font-mono mb-3 md:mb-4 text-[10px] md:text-xs">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            LIMITED OFFER
          </Badge>
          <h1 className="text-2xl md:text-5xl font-bold leading-tight">
            合规白帽工具 ·{" "}
            <span className="text-primary text-glow inline-block animate-glitch">
              企业安全一站式
            </span>
          </h1>
          <p className="mt-3 md:mt-4 text-xs md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            所有服务均签署 NDA 与授权协议，输出标准化报告。下方为可直接下单的商品与服务套餐。
          </p>
          <div className="mt-4 md:mt-6 flex flex-wrap gap-2 md:gap-3">
            <Link to="/category/$slug" params={{ slug: "pentest" }}>
              <Button
                size="sm"
                className="md:h-10 md:px-5 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_oklch(0.85_0.22_145/0.5)]"
              >
                <Zap className="h-4 w-4" />
                查看热销
              </Button>
            </Link>
            <Link to="/category/$slug" params={{ slug: "all" }}>
              <Button
                size="sm"
                variant="outline"
                className="md:h-10 md:px-5 border-primary/40 text-primary hover:bg-primary/10"
              >
                <Activity className="h-4 w-4" />
                浏览全部
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Categories */}
      <section
        className="relative z-10 container mx-auto px-4 md:px-6 mt-8 animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className={`shrink-0 px-4 py-2 rounded-md text-sm font-mono transition-all border hover:-translate-y-0.5 ${
                i === 0
                  ? "bg-primary/15 border-primary/50 text-primary shadow-[0_0_15px_oklch(0.85_0.22_145/0.3)]"
                  : "bg-card/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_oklch(0.85_0.22_145/0.2)]"
              }`}
            >
              <Tag className="h-3 w-3 inline mr-1.5 -mt-0.5" />
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
