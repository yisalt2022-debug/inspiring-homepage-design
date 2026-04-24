import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { z } from "zod";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const searchSchema = z.object({
  q: z.string().optional().default(""),
});

export const Route = createFileRoute("/search")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "搜索 — NullSec Store" },
      { name: "description", content: "在 NullSec Store 中搜索安全服务与商品。" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const query = q.trim().toLowerCase();
  const results = query
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query) ||
          p.cat.toLowerCase().includes(query),
      )
    : [];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      <CursorGlow />
      <SiteHeader defaultQuery={q} />

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-primary transition flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> 返回首页
          </Link>
          <span>/</span>
          <span className="text-foreground/80">搜索结果</span>
        </div>
      </div>

      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 animate-fade-up">
        <div className="flex items-center gap-3 text-primary font-mono text-xs">
          <SearchIcon className="h-3 w-3" /> // SEARCH RESULT
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 break-all">
          <span className="text-muted-foreground">关键词：</span>
          <span className="text-primary text-glow">{q || "—"}</span>
        </h1>
        <p className="text-muted-foreground text-sm font-mono mt-2">
          匹配到 <span className="text-primary">{results.length}</span> 个商品
        </p>
      </section>

      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 pb-16">
        {!query ? (
          <div className="text-center py-20 font-mono text-muted-foreground">
            // 请输入关键词进行搜索
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <div className="font-mono text-muted-foreground mb-4">
              // 没有找到与 "{q}" 匹配的商品
            </div>
            <Link to="/" className="text-primary underline font-mono text-sm">
              查看全部商品 →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
