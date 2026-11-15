import { useEffect } from "react";

function useSkyPointer() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      frame = 0;
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      root.style.setProperty("--px", cx.toFixed(3));
      root.style.setProperty("--py", cy.toFixed(3));
      if (Math.abs(tx - cx) > 0.004 || Math.abs(ty - cy) > 0.004) frame = requestAnimationFrame(tick);
    };

    const aim = (x: number, y: number) => {
      tx = Math.max(-1, Math.min(1, (x / window.innerWidth) * 2 - 1));
      ty = Math.max(-1, Math.min(1, (y / window.innerHeight) * 2 - 1));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onPoint = (event: PointerEvent) => aim(event.clientX, event.clientY);
    const rest = () => aim(window.innerWidth / 2, window.innerHeight / 2);
    const onUp = (event: PointerEvent) => {
      if (event.pointerType === "touch") rest();
    };

    window.addEventListener("pointerdown", onPoint, { passive: true });
    window.addEventListener("pointermove", onPoint, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerleave", rest);

    return () => {
      window.removeEventListener("pointerdown", onPoint);
      window.removeEventListener("pointermove", onPoint);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", rest);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty("--px");
      root.style.removeProperty("--py");
    };
  }, []);
}

export function Sky() {
  useSkyPointer();
  return (
    <div className="sky" aria-hidden>
      <div className="sky-layer sky-far">
        <div className="sky-stars sky-stars-far" />
      </div>
      <div className="sky-layer sky-mid">
        <div className="sky-stars sky-stars-mid" />
        <div className="sky-meteor" />
      </div>
      <div className="sky-layer sky-near">
        <div className="sky-stars sky-stars-near" />
      </div>
    </div>
  );
}

export function GlassOrb({ size = "sm" }: { size?: "sm" | "lg" }) {
  return (
    <div className="glass-orb-tilt" aria-hidden>
      <div className={size === "lg" ? "glass-orb glass-orb-lg" : "glass-orb"}>
        <div className="glass-orb-dust" />
        <div className="glass-orb-field" />
        <div className="glass-orb-rim" />
        <div className="glass-orb-sheen" />
        <div className="glass-orb-moon" />
      </div>
    </div>
  );
}
