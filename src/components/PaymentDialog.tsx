import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Upload, CheckCircle2, RefreshCw, X, ShieldCheck, Wallet } from "lucide-react";
import { toast } from "sonner";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  productTitle: string;
  email: string;
  onPaid: () => void;
}

const PAY_DURATION = 15 * 60; // 15 minutes in seconds

export function PaymentDialog({ open, onOpenChange, amount, productTitle, email, onPaid }: PaymentDialogProps) {
  const [secondsLeft, setSecondsLeft] = useState(PAY_DURATION);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [method, setMethod] = useState<"wechat" | "alipay" | "usdt">("wechat");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Build payload + generate QR whenever method/amount changes
  useEffect(() => {
    if (!open) return;
    const orderId = `NS${Date.now().toString(36).toUpperCase()}`;
    const payload = `nullsec://pay?method=${method}&amount=${amount}&order=${orderId}&item=${encodeURIComponent(productTitle)}`;
    QRCode.toDataURL(payload, {
      width: 320,
      margin: 1,
      color: { dark: "#000000", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setQrDataUrl).catch(() => setQrDataUrl(""));
  }, [open, method, amount, productTitle]);

  // Countdown
  useEffect(() => {
    if (!open) {
      setSecondsLeft(PAY_DURATION);
      setProofFile(null);
      setProofPreview("");
      return;
    }
    setSecondsLeft(PAY_DURATION);
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [open]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const expired = secondsLeft === 0;
  const progress = (secondsLeft / PAY_DURATION) * 100;

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("请上传图片格式的支付凭证");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("文件不能超过 5MB");
      return;
    }
    setProofFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setProofPreview(String(e.target?.result ?? ""));
    reader.readAsDataURL(file);
  };

  const handleSubmitProof = () => {
    if (!proofFile) {
      toast.error("请先上传支付凭证");
      return;
    }
    if (expired) {
      toast.error("订单已超时，请重新发起支付");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("凭证已提交，等待人工审核");
      onPaid();
      onOpenChange(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setSecondsLeft(PAY_DURATION);
    toast.info("订单已刷新");
  };

  const methods = [
    { id: "wechat" as const, label: "微信支付", color: "from-emerald-500/20 to-emerald-500/5" },
    { id: "alipay" as const, label: "支付宝", color: "from-sky-500/20 to-sky-500/5" },
    { id: "usdt" as const, label: "USDT-TRC20", color: "from-amber-500/20 to-amber-500/5" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-lg p-0 gap-0 border-primary/40 bg-card/95 backdrop-blur-xl overflow-hidden">
        {/* Decorative top line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/60" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary/60" />

        <DialogHeader className="px-6 pt-6 pb-3 text-left">
          <DialogTitle className="font-mono text-primary text-glow flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            &gt; 安全支付通道
          </DialogTitle>
          <DialogDescription className="font-mono text-xs">
            订单：{productTitle} · 交付至 {email || "—"}
          </DialogDescription>
        </DialogHeader>

        {/* Countdown bar */}
        <div className="px-6">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary animate-blink" />
              {expired ? "支付已超时" : "支付剩余时间"}
            </span>
            <span className={`text-lg font-bold tabular-nums ${expired ? "text-destructive" : "text-primary text-glow"}`}>
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </span>
          </div>
          <div className="h-1 rounded-full bg-secondary/60 overflow-hidden">
            <div
              className={`h-full transition-[width] duration-1000 ease-linear ${expired ? "bg-destructive" : "bg-gradient-to-r from-primary to-primary/60"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Method tabs */}
        <div className="px-6 mt-4 grid grid-cols-3 gap-2">
          {methods.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className={`relative text-[11px] font-mono py-2 rounded border transition-all bg-gradient-to-br ${m.color} ${
                method === m.id
                  ? "border-primary text-primary shadow-[0_0_15px_oklch(0.85_0.22_145/0.4)]"
                  : "border-border/60 text-muted-foreground hover:border-primary/40"
              }`}
            >
              {method === m.id && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary animate-blink" />
              )}
              {m.label}
            </button>
          ))}
        </div>

        {/* QR + amount */}
        <div className="px-6 mt-4 grid grid-cols-[auto_1fr] gap-4 items-center">
          <div className="relative p-2 rounded bg-white shadow-[0_0_25px_oklch(0.85_0.22_145/0.3)]">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="支付二维码" className="w-32 h-32 block" />
            ) : (
              <div className="w-32 h-32 grid place-items-center text-xs text-muted-foreground">生成中...</div>
            )}
            {expired && (
              <div className="absolute inset-0 grid place-items-center bg-background/85 backdrop-blur-sm rounded">
                <Button size="sm" type="button" onClick={handleRefresh} className="font-mono">
                  <RefreshCw className="h-3.5 w-3.5" /> 刷新
                </Button>
              </div>
            )}
            {/* corner ticks */}
            <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-primary" />
            <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-primary" />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary" />
          </div>

          <div className="space-y-2">
            <div>
              <div className="text-[10px] font-mono text-muted-foreground">应付金额</div>
              <div className="text-3xl font-bold text-primary text-glow font-mono">
                ¥{amount.toLocaleString()}
              </div>
            </div>
            <div className="flex items-start gap-1.5 text-[11px] font-mono text-muted-foreground leading-relaxed">
              <Wallet className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <span>使用 {methods.find(m => m.id === method)?.label} 扫描二维码完成支付，金额请勿修改。</span>
            </div>
          </div>
        </div>

        {/* Upload proof */}
        <div className="px-6 mt-5">
          <div className="text-[10px] font-mono text-primary tracking-wider mb-2">
            &gt; 上传支付凭证 (截图)
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {proofPreview ? (
            <div className="relative group rounded border border-primary/40 overflow-hidden bg-background/40">
              <img src={proofPreview} alt="支付凭证" className="w-full max-h-48 object-contain" />
              <button
                type="button"
                onClick={() => { setProofFile(null); setProofPreview(""); }}
                className="absolute top-2 right-2 h-7 w-7 grid place-items-center rounded-full bg-background/80 border border-border hover:border-destructive hover:text-destructive transition"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 px-2 py-1 bg-gradient-to-t from-background/95 to-transparent text-[10px] font-mono text-primary truncate">
                ✓ {proofFile?.name}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-primary/30 hover:border-primary/70 hover:bg-primary/5 rounded p-5 transition-all group"
            >
              <Upload className="h-6 w-6 mx-auto text-primary/70 group-hover:text-primary group-hover:scale-110 transition" />
              <div className="mt-2 text-xs font-mono text-foreground">点击上传支付截图</div>
              <div className="mt-0.5 text-[10px] font-mono text-muted-foreground">支持 JPG / PNG · 最大 5MB</div>
            </button>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-5 mt-2 border-t border-border/40 bg-secondary/20">
          <Button
            type="button"
            disabled={submitting || expired || !proofFile}
            onClick={handleSubmitProof}
            className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_25px_oklch(0.85_0.22_145/0.5)] font-mono"
          >
            <CheckCircle2 className="h-4 w-4" />
            {submitting ? "提交中..." : expired ? "订单已超时" : "我已支付，提交凭证"}
          </Button>
          <div className="mt-2.5 text-center text-[10px] font-mono text-muted-foreground">
            // 凭证将由系统自动核验，确认后立即发货至邮箱
          </div>
        </div>

        {/* bottom corners */}
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary/60 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/60 pointer-events-none" />
      </DialogContent>
    </Dialog>
  );
}
