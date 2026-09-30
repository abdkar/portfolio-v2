"use client";
/** Scroll reveal: children rise + fade in the first time they enter the screen. */
import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { getMotion } from "@/config/motion";
import { prefersReduced } from "@/lib/motion";

type Props = {
  as?: ElementType;
  delay?: number;
  variant?: "up" | "line" | "vline";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

export default function Reveal({ as: Tag = "div", delay = 0, variant = "up", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = getMotion();
    if (!el || prefersReduced() || !m.features.scrollReveal) return;
    const keyframes =
      variant === "line"
        ? [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }]
        : variant === "vline"
          ? [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }]
          : [{ opacity: 0, translate: `0 ${m.dist(m.distance.reveal)}px` }, { opacity: 1, translate: "0 0" }];
    const anim = el.animate(keyframes, {
      duration: m.dur(variant === "up" ? m.duration.reveal : m.duration.line),
      delay,
      easing: m.ease,
      fill: "backwards",
    });
    anim.pause();
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anim.play();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      anim.cancel();
    };
  }, [delay, variant]);

  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
}
