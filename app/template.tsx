"use client";
/** Page transition: every page fades and rises in on navigation. */
import { useEffect, useRef } from "react";
import { getMotion } from "@/config/motion";
import { prefersReduced } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const m = getMotion();
    if (!ref.current || prefersReduced() || !m.features.pageTransition) return;
    ref.current.animate([{ opacity: 0, translate: "0 18px" }, { opacity: 1, translate: "0 0" }], { duration: m.dur(m.duration.pageIn), easing: m.ease });
  }, []);
  return <div ref={ref}>{children}</div>;
}
