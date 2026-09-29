"use client";
/** Project rows. Hover dims the other rows and shows a preview card that follows the cursor. */
import Link from "next/link";
import { useEffect, useRef, useState, type ElementType, type MouseEvent } from "react";
import { getMotion } from "@/config/motion";
import type { Project } from "@/lib/content";
import { canHover, prefersReduced } from "@/lib/motion";
import Reveal from "./Reveal";

export default function ProjectList({ projects, showYear = false, heading = "h3" }: { projects: Project[]; showYear?: boolean; heading?: ElementType }) {
  const Heading = heading;
  const [hover, setHover] = useState<string | null>(null);
  const [previewOn, setPreviewOn] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setPreviewOn(getMotion().features.projectPreview && canHover());
  }, []);

  useEffect(() => {
    if (!hover || !previewOn) return;
    const k = prefersReduced() ? 1 : getMotion().preview.follow;
    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      if (card.current) card.current.style.translate = `${pos.current.x}px ${pos.current.y}px`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover, previewOn]);

  const track = (e: MouseEvent) => {
    target.current = {
      x: Math.min(e.clientX + 28, window.innerWidth - 360),
      y: Math.max(12, Math.min(e.clientY - 110, window.innerHeight - 300)),
    };
  };

  const hp = projects.find((p) => p.slug === hover) ?? projects[0];

  return (
    <div className={"projects" + (hover ? " has-hover" : "")} onMouseMove={track} onMouseLeave={() => setHover(null)}>
      {projects.map((p, i) => (
        <Reveal key={p.slug}>
          <Link
            href={`/work/${p.slug}`}
            className={"row" + (hover === p.slug ? " is-hover" : "")}
            onMouseEnter={(e) => {
              track(e);
              if (!hover) pos.current = { ...target.current };
              setHover(p.slug);
            }}
          >
            <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="row-title">
              <p className="row-cat">
                {p.category}
                {showYear ? ` · ${p.year}` : ""}
              </p>
              <Heading className="row-name">{p.name}</Heading>
            </div>
            <div className="row-body">
              <p>{p.summary}</p>
              <p className="row-status">{p.status}</p>
            </div>
            <span className="row-arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      ))}

      {previewOn && (
        <div ref={card} className={"preview" + (hover ? " on" : "")} aria-hidden="true">
          <div className="preview-card">
            <div className="preview-top">
              <div className="preview-meta">
                <span>{hp.category}</span>
                <span>{hp.year}</span>
              </div>
              <p className="preview-headline">{hp.headline}</p>
            </div>
            <div className="preview-bottom">
              <div className="tags">
                {hp.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
              <span className="preview-cta">View case study →</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
