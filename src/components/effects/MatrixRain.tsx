import { useEffect, useRef } from "react";

/**
 * Matrix-style digital rain background canvas.
 * Pure visual effect, fixed full-screen, low opacity.
 */
export function MatrixRain() {
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
    let drops: number[] = [];
    const fontSize = 14;
    const chars =
      "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉABCDEF<>{}[]#$%&*";

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      columns = Math.floor(width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    let last = 0;
    const draw = (t: number) => {
      animationId = requestAnimationFrame(draw);
      // Throttle to ~30fps
      if (t - last < 55) return;
      last = t;

      ctx.fillStyle = "rgba(10, 20, 15, 0.18)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Bright head
        ctx.fillStyle = "rgba(180, 255, 200, 0.95)";
        ctx.fillText(text, x, y);
        // Trail
        ctx.fillStyle = "rgba(120, 230, 150, 0.55)";
        ctx.fillText(text, x, y - fontSize);

        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
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
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.08]"
      aria-hidden
    />
  );
}
