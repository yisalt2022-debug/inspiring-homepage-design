import { createFileRoute } from "@tanstack/react-router";
import { Shield, Terminal, Bug, Lock, Radar, FileSearch, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NullSec — 白帽渗透测试与红队服务" },
      {
        name: "description",
        content:
          "NullSec 是一支专业白帽安全团队，提供漏洞扫描、渗透测试、红蓝对抗与应急响应服务，帮助企业守住安全边界。",
      },
    ],
  }),
});

const services = [
  {
    icon: Bug,
    title: "Web 渗透测试",
    desc: "基于 OWASP Top 10 与业务逻辑场景，系统化识别 Web 应用漏洞。",
    tag: "PENTEST",
  },
  {
    icon: Radar,
    title: "外网资产测绘",
    desc: "自动化发现暴露面，端口、子域、证书、指纹一图掌握。",
    tag: "RECON",
  },
  {
    icon: Shield,
    title: "红蓝对抗演练",
    desc: "模拟真实攻击者 TTPs，检验蓝队检测响应能力。",
    tag: "RED TEAM",
  },
  {
    icon: FileSearch,
    title: "代码安全审计",
    desc: "源码级审计与 SAST，定位深层逻辑与依赖链风险。",
    tag: "AUDIT",
  },
  {
    icon: Lock,
    title: "等保合规咨询",
    desc: "等保 2.0 / ISO 27001 落地辅导，差距分析到整改闭环。",
    tag: "COMPLIANCE",
  },
  {
    icon: Terminal,
    title: "应急响应 IR",
    desc: "7×24 小时应急响应，入侵溯源、样本分析、恢复建议。",
    tag: "IR",
  },
];

const stats = [
  { num: "1200+", label: "已交付项目" },
  { num: "350+", label: "服务客户" },
  { num: "5800+", label: "披露漏洞" },
  { num: "24/7", label: "应急响应" },
];

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* scan line effect */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-0 right-0 h-px bg-primary/40 animate-scan" />
      </div>

      {/* Nav */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 border border-primary/30">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-base font-bold tracking-wider text-foreground">
                NULL<span className="text-primary">SEC</span>
              </div>
              <div className="text-[10px] text-muted-foreground -mt-1">offensive security lab</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#services" className="text-muted-foreground hover:text-primary transition">
              ./services
            </a>
            <a href="#stats" className="text-muted-foreground hover:text-primary transition">
              ./stats
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition">
              ./contact
            </a>
          </nav>
          <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10">
            发起委托
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <Badge variant="outline" className="mb-6 border-primary/40 text-primary font-mono">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            SYSTEM ONLINE · v3.2.1
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            像攻击者一样思考，
            <br />
            <span className="text-primary text-glow">守住你的边界</span>
            <span className="text-primary animate-blink">_</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            NullSec 是一支专注于攻防对抗的白帽安全团队。我们用真实攻击者的视角审视你的系统，
            在恶意行为者之前，发现并闭环每一个风险。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow border-glow">
              获取安全评估 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/40 text-foreground hover:bg-primary/10">
              查看案例报告
            </Button>
          </div>

          {/* terminal block */}
          <Card className="mt-14 bg-card/60 backdrop-blur border-primary/20 p-0 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/50 px-4 py-2 bg-secondary/40">
              <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="ml-3 text-xs text-muted-foreground">~/recon/target.sh</span>
            </div>
            <div className="p-5 text-sm leading-relaxed font-mono">
              <div><span className="text-primary">$</span> nullsec scan --target client.com --depth full</div>
              <div className="text-muted-foreground">[*] Enumerating subdomains... <span className="text-primary">42 found</span></div>
              <div className="text-muted-foreground">[*] Probing services on 128 hosts...</div>
              <div className="text-muted-foreground">[*] Running auth bypass checks...</div>
              <div className="text-primary">[+] 3 critical · 7 high · 12 medium findings</div>
              <div className="text-muted-foreground">[*] Generating report → <span className="text-primary underline">report-2025-04.pdf</span></div>
              <div><span className="text-primary">$</span> <span className="animate-blink">▋</span></div>
            </div>
          </Card>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 container mx-auto px-6 py-20 border-t border-border/50">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="text-xs text-primary font-mono mb-2">// 02 — capabilities</div>
            <h2 className="text-3xl md:text-4xl font-bold">服务能力矩阵</h2>
          </div>
          <div className="hidden md:block text-sm text-muted-foreground font-mono">
            6 modules · always loaded
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <Card
              key={s.title}
              className="group bg-card/60 backdrop-blur border-border hover:border-primary/60 transition-all p-6 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 px-2 py-1 text-[10px] font-mono text-primary/60 border-l border-b border-primary/20">
                {s.tag}
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 border border-primary/30 mb-5 group-hover:bg-primary/20 transition">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-5 flex items-center text-xs text-primary font-mono opacity-0 group-hover:opacity-100 transition">
                read more <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative z-10 container mx-auto px-6 py-20 border-t border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 border border-border/50 rounded-lg overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-card/60 backdrop-blur p-8 text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary text-glow font-mono">{s.num}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative z-10 container mx-auto px-6 py-24 border-t border-border/50">
        <Card className="bg-gradient-to-br from-card/80 to-secondary/40 backdrop-blur border-primary/30 p-12 md:p-16 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              下一次入侵之前，<br />
              <span className="text-primary text-glow">先让我们试一次。</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              所有委托均签署 NDA 与授权协议，输出包含可复现 PoC 与修复建议的专业报告。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow border-glow">
                预约安全评估
              </Button>
              <Button size="lg" variant="outline" className="border-primary/40 hover:bg-primary/10">
                下载样本报告
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground font-mono">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 法律授权</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> NDA 保密</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> CNVD/CNNVD 协作</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> ISO 27001</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© 2025 NULLSEC · offensive security lab</div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
            all systems operational
          </div>
        </div>
      </footer>
    </div>
  );
}
