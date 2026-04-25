import { useEffect, useRef } from "react";

/**
 * Cyber-theme background: cascading hex/binary "data stream" with
 * blue→violet vertical gradient and bright leading head per column.
 *
 * Reads --primary / --primary-glow from CSS variables so it always matches
 * the active theme. Throttled to ~30 fps for performance.
 */
export function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: { y: number; speed: number; len: number }[] = [];
    const fontSize = 14;
    const chars = "0123456789ABCDEF<>{}[]/$#@*+-=";

    // Read theme colors from CSS variables (rgb-like fallback strings)
    const readColor = (name: string, fallback: string) => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return v || fallback;
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * -50,
        speed: 0.5 + Math.random() * 0.9,
        len: 8 + Math.floor(Math.random() * 16),
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (t: number) => {
      animationId = requestAnimationFrame(draw);
      if (t - last < 50) return;
      last = t;

      // Trail fade — slight blue tint
      ctx.fillStyle = "rgba(10, 10, 28, 0.16)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      const primary = readColor("--primary", "oklch(0.72 0.21 265)");
      const glow = readColor("--primary-glow", "oklch(0.78 0.24 295)");

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const x = i * fontSize;
        const headY = d.y * fontSize;

        // Bright head
        ctx.fillStyle = `color-mix(in oklab, ${glow} 95%, transparent)`;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 8;
        const headChar = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(headChar, x, headY);
        ctx.shadowBlur = 0;

        // Trail with fading opacity (blue tones)
        for (let k = 1; k < d.len; k++) {
          const alpha = Math.max(0, 1 - k / d.len) * 0.85;
          ctx.fillStyle = `color-mix(in oklab, ${primary} ${Math.round(alpha * 100)}%, transparent)`;
          const c = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(c, x, headY - k * fontSize);
        }

        if (headY > height + d.len * fontSize && Math.random() > 0.97) {
          d.y = -Math.random() * 20;
          d.speed = 0.5 + Math.random() * 0.9;
        }
        d.y += d.speed;
      }
    };
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.18]"
      aria-hidden
    />
  );
}
