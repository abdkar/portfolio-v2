"use client";
/** Number that counts up from 0 once it scrolls into view. */
import { useEffect, useRef, useState } from "react";
import { getMotion } from "@/config/motion";
import { prefersReduced } from "@/lib/motion";

export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [n, setN] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = getMotion();
    if (!el || prefersReduced() || !m.features.countUp) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const d = m.dur(m.duration.countUp);
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / d);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <strong ref={ref}>
      {n}
      {suffix}
    </strong>
  );
}
