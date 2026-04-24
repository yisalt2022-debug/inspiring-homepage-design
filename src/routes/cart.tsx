import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trash2, Plus, Minus, Mail, Zap, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MatrixRain } from "@/components/effects/MatrixRain";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { products } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "购物车 — NullSec Store" },
      { name: "description", content: "查看与结算你选购的安全服务。" },
    ],
  }),
  component: CartPage,
});

// Demo cart contents
const initial = [
  { id: products[0].id, qty: 1 },
  { id: products[4].id, qty: 2 },
  { id: products[1].id, qty: 1 },
];

function CartPage() {
  const [items, setItems] = useState(initial);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const rows = items
    .map((it) => {
      const p = products.find((x) => x.id === it.id);
      return p ? { ...it, product: p } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = rows.reduce((s, r) => s + r.product.price * r.qty, 0);
  const discount = Math.floor(subtotal * 0.05);
  const total = subtotal - discount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      toast.error("请输入有效的邮箱地址");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(`订单已创建，${rows.length} 项商品将发送至 ${email}`);
    }, 800);
  };

  const update = (id: string, delta: number) =>
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it))
        .filter((it) => it.qty > 0),
    );
  const remove = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      <CursorGlow />
      <SiteHeader />

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link to="/" className="hover:text-primary transition flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> 返回首页
          </Link>
          <span>/</span>
          <span className="text-foreground/80">购物车</span>
        </div>
      </div>

      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-primary">// </span>
          <span className="animate-glitch inline-block">CART</span>
        </h1>
        <p className="text-muted-foreground text-sm font-mono mt-2">
          {rows.length} 项商品 · 安全交付，可开专票
        </p>
      </section>

      <section className="relative z-10 container mx-auto px-4 md:px-6 mt-6 pb-16">
        {rows.length === 0 ? (
          <Card className="bg-card/60 border-border p-12 text-center font-mono">
            <div className="text-muted-foreground mb-4">// 购物车为空</div>
            <Link to="/">
              <Button className="bg-primary text-primary-foreground">去逛逛</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-3">
              {rows.map((r, i) => (
                <Card
                  key={r.id}
                  className="neon-border bg-card/60 backdrop-blur border-border p-4 md:p-5 animate-fade-up"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/30">
                      <ShieldCheck className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to="/products/$id"
                          params={{ id: r.product.id }}
                          className="font-semibold hover:text-primary transition line-clamp-1"
                        >
                          {r.product.title}
                        </Link>
                        <button
                          onClick={() => remove(r.id)}
                          className="text-muted-foreground hover:text-destructive transition shrink-0"
                          aria-label="移除"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-primary/30 text-primary font-mono mt-2"
                      >
                        {r.product.cat}
                      </Badge>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-2">
                        {r.product.desc}
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 border border-border/60 rounded">
                          <button
                            onClick={() => update(r.id, -1)}
                            className="h-8 w-8 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-sm">{r.qty}</span>
                          <button
                            onClick={() => update(r.id, 1)}
                            className="h-8 w-8 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground font-mono">
                            SUBTOTAL
                          </div>
                          <div className="text-lg font-bold text-primary text-glow font-mono">
                            ¥{(r.product.price * r.qty).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <Card className="scanlines bg-gradient-to-br from-primary/10 via-card/70 to-secondary/40 border-primary/30 p-6 h-fit lg:sticky lg:top-20 backdrop-blur">
              <div className="text-xs font-mono text-primary mb-4">// CHECKOUT</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground font-mono">小计</span>
                  <span className="font-mono">¥{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-primary">
                  <span className="font-mono">会员立减 5%</span>
                  <span className="font-mono">-¥{discount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border/40 pt-3">
                  <span className="text-muted-foreground font-mono">应付总额</span>
                  <span className="text-2xl font-bold text-primary text-glow font-mono">
                    ¥{total.toLocaleString()}
                  </span>
                </div>
              </div>
              <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_oklch(0.85_0.22_145/0.5)]">
                <Zap className="h-4 w-4" /> 提交订单
              </Button>
              <div className="mt-4 text-[11px] text-muted-foreground font-mono leading-relaxed">
                · 提交后将由客户经理在 30 分钟内联系
                <br />· 所有服务签署 NDA 与授权协议
                <br />· 支持对公转账 / 微信 / 支付宝
              </div>
            </Card>
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
