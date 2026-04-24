import { createFileRoute } from "@tanstack/react-router";
import { Search, ShoppingCart, Terminal, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

const products = [
  {
    title: "Web 应用渗透测试服务",
    desc: "基于 OWASP Top 10 与业务逻辑场景的系统化测试，输出可复现 PoC 报告。",
    price: 4980,
    tag: "热销",
    cat: "渗透测试",
  },
  {
    title: "外网资产测绘报告",
    desc: "自动化扫描子域、端口、证书与指纹，一图掌握攻击面。",
    price: 1280,
    tag: "新品",
    cat: "渗透测试",
  },
  {
    title: "红队对抗演练（基础版）",
    desc: "模拟真实攻击者 TTPs，5 天周期，检验蓝队检测响应能力。",
    price: 12800,
    tag: "推荐",
    cat: "渗透测试",
  },
  {
    title: "源代码安全审计",
    desc: "SAST + 人工审计，覆盖依赖链、逻辑漏洞与硬编码密钥。",
    price: 6800,
    cat: "代码审计",
  },
  {
    title: "白帽实战训练营（30课时）",
    desc: "从信息收集到权限提升，全程靶场实操，颁发结业证书。",
    price: 1980,
    tag: "限时",
    cat: "安全培训",
  },
  {
    title: "应急响应 IR 服务包",
    desc: "7×24 小时入侵响应，包含取证、溯源、样本分析与修复建议。",
    price: 9800,
    cat: "应急响应",
  },
  {
    title: "等保 2.0 合规咨询",
    desc: "差距分析到整改闭环，全流程辅导通过测评。",
    price: 15800,
    cat: "合规咨询",
  },
  {
    title: "钓鱼演练平台（年订阅）",
    desc: "面向员工的钓鱼模拟与安全意识培训，含数据看板。",
    price: 8800,
    tag: "订阅",
    cat: "安全培训",
  },
  {
    title: "API 安全专项测试",
    desc: "针对 REST/GraphQL 接口的鉴权、越权、注入与限流测试。",
    price: 3680,
    cat: "渗透测试",
  },
];

function Index() {
  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm sticky top-0 bg-background/80">
        <div className="container mx-auto flex h-16 items-center gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border border-primary/30">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <div className="text-base font-bold tracking-wider">
                NULL<span className="text-primary">SEC</span>
              </div>
              <div className="text-[10px] text-muted-foreground -mt-1">store</div>
            </div>
          </div>
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索商品、服务、关键词..."
              className="pl-9 bg-secondary/40 border-border/60 focus-visible:border-primary"
            />
          </div>
          <Button variant="outline" size="icon" className="border-primary/40 hover:bg-primary/10 shrink-0">
            <ShoppingCart className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </header>

      {/* Hero banner */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 pt-8">
        <Card className="bg-gradient-to-br from-primary/15 via-card/60 to-secondary/40 border-primary/30 p-8 md:p-12 backdrop-blur relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-mono text-primary/70 border-l border-b border-primary/30">
            // featured
          </div>
          <Badge variant="outline" className="border-primary/40 text-primary font-mono mb-4">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            LIMITED OFFER
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            合规白帽工具 · <span className="text-primary text-glow">企业安全一站式</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            所有服务均签署 NDA 与授权协议，输出标准化报告。下方为可直接下单的商品与服务套餐。
          </p>
        </Card>
      </section>

      {/* Categories */}
      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-8">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`shrink-0 px-4 py-2 rounded-md text-sm font-mono transition border ${
                i === 0
                  ? "bg-primary/15 border-primary/50 text-primary"
                  : "bg-card/40 border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
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
          {products.map((p) => (
            <Card
              key={p.title}
              className="group bg-card/60 backdrop-blur border-border hover:border-primary/60 transition-all p-5 cursor-pointer relative overflow-hidden flex flex-col"
            >
              {p.tag && (
                <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono rounded bg-primary/15 text-primary border border-primary/30">
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
                  className="bg-primary/10 text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground"
                >
                  立即下单
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-6">
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
