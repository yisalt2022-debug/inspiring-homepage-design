import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Tag, Clock, FileCheck, ShieldCheck, Zap, Mail, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title ?? "商品"} — NullSec Store` },
      { name: "description", content: loaderData?.product.desc ?? "" },
    ],
  }),
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-3xl font-bold text-primary text-glow">404 // 商品不存在</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline font-mono">返回首页</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-center font-mono">
      <div>
        <p className="text-destructive">// ERROR: {error.message}</p>
        <Link to="/" className="mt-4 inline-block text-primary underline">返回首页</Link>
      </div>
    </div>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      <CursorGlow />

      <SiteHeader />

      {/* Breadcrumb */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-primary transition flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> 返回首页
          </Link>
          <span>/</span>
          <span className="text-primary">{product.cat}</span>
          <span>/</span>
          <span className="text-foreground/80 truncate">{product.title}</span>
        </div>
      </div>

      {/* Main */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 animate-fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visual / hero card */}
          <Card className="scanlines lg:col-span-2 bg-gradient-to-br from-primary/15 via-card/60 to-secondary/40 border-primary/30 p-8 md:p-10 backdrop-blur relative overflow-hidden">
            <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/60" />
            <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/60" />
            <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/60" />
            <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/60" />

            <div className="absolute -right-10 -bottom-10 opacity-10 animate-float">
              <ShieldCheck className="h-64 w-64 text-primary" strokeWidth={1} />
            </div>

            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline" className="border-primary/40 text-primary font-mono">
                <Tag className="h-3 w-3 mr-1" /> {product.cat}
              </Badge>
              {product.tag && (
                <Badge className="bg-primary/15 text-primary border border-primary/30 font-mono">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
                  {product.tag}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="animate-glitch inline-block">{product.title}</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
              {product.longDesc ?? product.desc}
            </p>

            {product.features && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm font-mono text-foreground/90 border border-border/40 rounded px-3 py-2 bg-background/30"
                  >
                    <span className="text-primary">▸</span> {f}
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Order panel */}
          <Card className="neon-border bg-card/70 backdrop-blur border-border p-6 flex flex-col h-fit lg:sticky lg:top-20">
            <div className="text-[10px] text-muted-foreground font-mono">PRICE</div>
            <div className="text-4xl font-bold text-primary text-glow font-mono mt-1">
              ¥{product.price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground font-mono mt-1">
              // 含 13% 增值税专票
            </div>

            <div className="mt-5 space-y-3 text-sm">
              {product.duration && (
                <div className="flex items-center justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground font-mono flex items-center gap-2">
                    <Clock className="h-4 w-4" /> 交付周期
                  </span>
                  <span className="text-foreground">{product.duration}</span>
                </div>
              )}
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground font-mono flex items-center gap-2">
                  <FileCheck className="h-4 w-4" /> 报告类型
                </span>
                <span className="text-foreground">PDF + Excel</span>
              </div>
              <div className="flex items-center justify-between border-b border-border/40 pb-2">
                <span className="text-muted-foreground font-mono flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> 协议保障
                </span>
                <span className="text-foreground">NDA + 授权书</span>
              </div>
            </div>

            <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_oklch(0.85_0.22_145/0.5)]">
              <Zap className="h-4 w-4" /> 立即下单
            </Button>
            <Link to="/cart">
              <Button
                variant="outline"
                className="mt-2 w-full border-primary/40 text-primary hover:bg-primary/10"
              >
                <Activity className="h-4 w-4" /> 加入购物车
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Deliverables */}
      {product.deliverables && (
        <section
          className="relative z-10 container mx-auto px-4 md:px-6 mt-8 animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          <h2 className="text-lg font-bold mb-4 font-mono">
            <span className="text-primary">// </span>交付物
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {product.deliverables.map((d, i) => (
              <Card
                key={d}
                className="bg-card/60 border-border hover:border-primary/50 p-4 transition-all"
              >
                <div className="text-[10px] text-muted-foreground font-mono">
                  ITEM_{String(i + 1).padStart(2, "0")}
                </div>
                <div className="text-sm font-medium mt-1">{d}</div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="relative z-10 container mx-auto px-4 md:px-6 mt-12 pb-16">
          <h2 className="text-lg font-bold mb-4 font-mono">
            <span className="text-primary">// </span>同类推荐
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
