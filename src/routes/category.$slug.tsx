import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Filter } from "lucide-react";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { categories, getProductsByCategory } from "@/lib/products";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    return { cat, items: getProductsByCategory(params.slug) };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.cat.name ?? "分类"} — NullSec Store` },
      { name: "description", content: `${loaderData?.cat.name ?? ""}相关安全工具与服务。` },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-center font-mono">
      <div>
        <h1 className="text-3xl font-bold text-primary text-glow">404 // 分类不存在</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">返回首页</Link>
      </div>
    </div>
  ),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();

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
          <span className="text-primary">分类</span>
          <span>/</span>
          <span className="text-foreground/80">{cat.name}</span>
        </div>
      </div>

      {/* Title */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 animate-fade-up">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs text-primary font-mono">// CATEGORY</div>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">
              <span className="animate-glitch inline-block">{cat.name}</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-2 font-mono">
              共 {items.length} 个商品 · 全部经过白帽团队验证
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border border-border/50 rounded px-3 py-2 bg-card/40">
            <Filter className="h-3 w-3 text-primary" />
            按推荐排序
          </div>
        </div>
      </section>

      {/* Category nav */}
      <section
        className="relative z-10 container mx-auto px-4 md:px-6 mt-6 animate-fade-up"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className={`shrink-0 px-4 py-2 rounded-md text-sm font-mono transition-all border hover:-translate-y-0.5 ${
                c.slug === cat.slug
                  ? "bg-primary/15 border-primary/50 text-primary shadow-[0_0_15px_oklch(0.85_0.22_145/0.3)]"
                  : "bg-card/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 pb-16">
        {items.length === 0 ? (
          <div className="text-center py-20 font-mono text-muted-foreground">
            // 该分类下暂无商品
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
