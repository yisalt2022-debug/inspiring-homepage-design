import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingCart, Terminal, Tag, Zap, ShieldCheck, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { TiltCard } from "@/components/effects/TiltCard";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NullSec Store — 安全工具与服务" },
      { name: "description", content: "白帽安全团队提供的合规工具、培训与渗透测试服务。" },
    ],
  }),
});

const categories = ["全部", "渗透测试", "安全培训", "代码审计", "应急响应", "合规咨询"];

const ticker = [
  "// 0day patched in 12min",
  "▲ 1,287 vulns reported",
  "● 7×24 IR online",
  "✓ ISO 27001 certified",
  "» 99.98% SLA uptime",
  "# 423 white-hats verified",
];

const products = [
  { title: "Web 应用渗透测试服务", desc: "基于 OWASP Top 10 与业务逻辑场景的系统化测试，输出可复现 PoC 报告。", price: 4980, tag: "热销", cat: "渗透测试" },
  { title: "外网资产测绘报告", desc: "自动化扫描子域、端口、证书与指纹，一图掌握攻击面。", price: 1280, tag: "新品", cat: "渗透测试" },
  { title: "红队对抗演练（基础版）", desc: "模拟真实攻击者 TTPs，5 天周期，检验蓝队检测响应能力。", price: 12800, tag: "推荐", cat: "渗透测试" },
  { title: "源代码安全审计", desc: "SAST + 人工审计，覆盖依赖链、逻辑漏洞与硬编码密钥。", price: 6800, cat: "代码审计" },
  { title: "白帽实战训练营（30课时）", desc: "从信息收集到权限提升，全程靶场实操，颁发结业证书。", price: 1980, tag: "限时", cat: "安全培训" },
  { title: "应急响应 IR 服务包", desc: "7×24 小时入侵响应，包含取证、溯源、样本分析与修复建议。", price: 9800, cat: "应急响应" },
  { title: "等保 2.0 合规咨询", desc: "差距分析到整改闭环，全流程辅导通过测评。", price: 15800, cat: "合规咨询" },
  { title: "钓鱼演练平台（年订阅）", desc: "面向员工的钓鱼模拟与安全意识培训，含数据看板。", price: 8800, tag: "订阅", cat: "安全培训" },
  { title: "API 安全专项测试", desc: "针对 REST/GraphQL 接口的鉴权、越权、注入与限流测试。", price: 3680, cat: "渗透测试" },
];

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background effects */}
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

      {/* Header */}
      <header className="relative z-20 border-b border-border/50 backdrop-blur-md sticky top-0 bg-background/70">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border border-primary/30 pulse-ring">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold tracking-wider animate-glitch">
                NULL<span className="text-primary">SEC</span>
              </div>
              <div className="text-[10px] text-muted-foreground -mt-1">store</div>
            </div>
          </div>
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition" />
            <Input
              placeholder="搜索商品、服务、关键词..."
              className="pl-9 bg-secondary/40 border-border/60 focus-visible:border-primary focus-visible:shadow-[0_0_20px_oklch(0.85_0.22_145/0.3)] transition-shadow"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="border-primary/40 hover:bg-primary/10 hover:shadow-[0_0_20px_oklch(0.85_0.22_145/0.4)] transition-all shrink-0"
          >
            <ShoppingCart className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </header>

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
      <section className="relative z-10 container mx-auto px-4 md:px-6 pt-8 animate-fade-up">
        <Card className="scanlines bg-gradient-to-br from-primary/15 via-card/60 to-secondary/40 border-primary/30 p-8 md:p-12 backdrop-blur relative overflow-hidden">
          {/* corner brackets */}
          <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary/60" />
          <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/60" />
          <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/60" />
          <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary/60" />

          <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono text-primary/70 border-l border-b border-primary/30">
            // featured
          </div>

          {/* Floating accent icon */}
          <div className="absolute -right-6 -bottom-6 opacity-10 animate-float">
            <ShieldCheck className="h-48 w-48 text-primary" strokeWidth={1} />
          </div>

          <Badge variant="outline" className="border-primary/40 text-primary font-mono mb-4">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            LIMITED OFFER
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            合规白帽工具 ·{" "}
            <span className="text-primary text-glow inline-block animate-glitch">
              企业安全一站式
            </span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            所有服务均签署 NDA 与授权协议，输出标准化报告。下方为可直接下单的商品与服务套餐。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_oklch(0.85_0.22_145/0.5)]">
              <Zap className="h-4 w-4" />
              查看热销
            </Button>
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              <Activity className="h-4 w-4" />
              定制方案
            </Button>
          </div>
        </Card>
      </section>

      {/* Categories */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`shrink-0 px-4 py-2 rounded-md text-sm font-mono transition-all border hover:-translate-y-0.5 ${
                i === 0
                  ? "bg-primary/15 border-primary/50 text-primary shadow-[0_0_15px_oklch(0.85_0.22_145/0.3)]"
                  : "bg-card/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_oklch(0.85_0.22_145/0.2)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {products.map((p, i) => (
            <TiltCard
              key={p.title}
              className="animate-fade-up"
            >
              <div
                style={{ animationDelay: `${0.05 * i + 0.15}s` } as React.CSSProperties}
              />
              <Card className="neon-border group bg-card/60 backdrop-blur border-border hover:border-primary/60 transition-all p-5 cursor-pointer relative overflow-hidden flex flex-col h-full">
                {/* Top sweeping line on hover */}
                <span className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-full transition-all duration-700" />

                {p.tag && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono rounded bg-primary/15 text-primary border border-primary/30 group-hover:shadow-[0_0_12px_oklch(0.85_0.22_145/0.6)] transition-shadow">
                    {p.tag}
                  </div>
                )}
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono mb-3">
                  <Tag className="h-3 w-3" />
                  {p.cat}
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition pr-12">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5 flex-1">
                  {p.desc}
                </p>
                <div className="flex items-end justify-between border-t border-border/50 pt-4">
                  <div>
                    <div className="text-[10px] text-muted-foreground font-mono">PRICE</div>
                    <div className="text-2xl font-bold text-primary text-glow font-mono">
                      ¥{p.price.toLocaleString()}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary/10 text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_oklch(0.85_0.22_145/0.5)] transition-all"
                  >
                    立即下单
                  </Button>
                </div>
              </Card>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6 backdrop-blur-sm bg-background/40">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground font-mono">
          <div>© 2025 NULLSEC STORE</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            all systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}
