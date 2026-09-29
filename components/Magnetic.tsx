"use client";
/** Wrap any button/link: it gently follows the cursor when the mouse is near. */
import { useEffect, useRef, type ReactNode } from "react";
import { getMotion } from "@/config/motion";
import { canHover, prefersReduced } from "@/lib/motion";

export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = getMotion();
    if (!el || prefersReduced() || !canHover() || !m.features.magnetic) return;
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      const dx = e.clientX - (b.left + b.width / 2);
      const dy = e.clientY - (b.top + b.height / 2);
      const r = m.magnetic.range;
      const near = Math.abs(dx) < b.width / 2 + r && Math.abs(dy) < b.height / 2 + r;
      el.style.translate = near ? `${(dx * m.magnetStrength).toFixed(1)}px ${(dy * m.magnetStrength).toFixed(1)}px` : "0 0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
