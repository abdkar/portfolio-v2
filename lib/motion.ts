import { motionConfig } from "@/config/motion";

/** True when animations should be skipped (user setting or master switch). */
export function prefersReduced() {
  if (typeof window === "undefined") return true;
  return !motionConfig.enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
