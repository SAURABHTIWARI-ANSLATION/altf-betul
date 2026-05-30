import { useEffect, useRef } from "react";

// High-end abstract fluid background.
// Renders a low-res field of overlapping soft color sources whose centers
// drift along smooth Lissajous (sine) paths, then blurs the whole thing
// heavily — producing silky, slow-moving liquid mesh gradients that loop
// forever seamlessly (motion is purely sine-driven, so there's no seam).
export default function LiveBackground() {
  const canvasRef = useRef(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w, h, dpr;

    // refined, muted palette: warm clay, deep plum, dusty teal, soft mauve
    const sources = [
      { color: "210,150,120", r: 0.7, ax: 0.26, ay: 0.2, fx: 0.6, fy: 0.43, px: 0.0, py: 1.1 },
      { color: "120,80,150", r: 0.78, ax: 0.3, ay: 0.26, fx: 0.41, fy: 0.67, px: 2.3, py: 0.4 },
      { color: "70,160,158", r: 0.72, ax: 0.28, ay: 0.22, fx: 0.55, fy: 0.39, px: 4.1, py: 3.2 },
      { color: "150,110,180", r: 0.6, ax: 0.22, ay: 0.27, fx: 0.48, fy: 0.58, px: 1.4, py: 5.0 },
      { color: "200,120,130", r: 0.55, ax: 0.2, ay: 0.18, fx: 0.7, fy: 0.34, px: 3.6, py: 2.1 },
      { color: "90,90,170", r: 0.66, ax: 0.25, ay: 0.24, fx: 0.37, fy: 0.62, px: 5.2, py: 0.9 },
    ];

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let t = 0;
    const draw = () => {
      t += 0.0012; // very slow, luxurious motion

      // deep base
      ctx.fillStyle = "#0b0912";
      ctx.fillRect(0, 0, w, h);

      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);

      // additive soft color sources -> liquid mesh
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < sources.length; i++) {
        const s = sources[i];
        // smooth Lissajous drift (two different frequencies => organic path)
        const cx = w * (0.5 + s.ax * Math.sin(t * s.fx * 6.283 + s.px));
        const cy = h * (0.5 + s.ay * Math.sin(t * s.fy * 6.283 + s.py));
        const breathe = 0.92 + 0.08 * Math.sin(t * 1.7 + i * 1.3);
        const rad = minDim * s.r * breathe;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${s.color},0.34)`);
        g.addColorStop(0.35, `rgba(${s.color},0.16)`);
        g.addColorStop(0.7, `rgba(${s.color},0.05)`);
        g.addColorStop(1, `rgba(${s.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // a slow diagonal sheen sweeping through for that "fluid" highlight
      const sweepX = w * (0.5 + 0.5 * Math.sin(t * 0.9));
      const sweepY = h * (0.5 + 0.5 * Math.cos(t * 0.7));
      const sheen = ctx.createRadialGradient(
        sweepX,
        sweepY,
        0,
        sweepX,
        sweepY,
        maxDim * 0.9
      );
      sheen.addColorStop(0, "rgba(235,225,255,0.05)");
      sheen.addColorStop(0.4, "rgba(235,225,255,0.015)");
      sheen.addColorStop(1, "rgba(235,225,255,0)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      // premium vignette
      const vig = ctx.createRadialGradient(
        w / 2,
        h / 2,
        minDim * 0.25,
        w / 2,
        h / 2,
        maxDim * 0.78
      );
      vig.addColorStop(0, "rgba(8,7,12,0)");
      vig.addColorStop(1, "rgba(6,5,10,0.78)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full block"
      style={{
        pointerEvents: "none",
        zIndex: 0,
        // heavy blur + saturation gives the silky, high-end liquid look;
        // scale-up hides the soft blurred edges of the canvas
        filter: "blur(60px) saturate(135%) contrast(105%)",
        transform: "scale(1.25)",
      }}
    />
  );
}
