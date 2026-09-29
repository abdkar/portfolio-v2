"use client";
/**
 * TrustCV diagram. Squares = samples, letters = participants.
 * Teal = test fold. Orange ring = participant leaking into both train and test.
 * Alternates between a random split and a participant-aware split.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { getMotion } from "@/config/motion";
import { prefersReduced } from "@/lib/motion";

type Mode = "random" | "participant";
const FOLDS = 4;

function shuffledFolds(total: number) {
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const a = [...Array(total).keys()];
  for (let i = total - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const size = total / FOLDS;
  return [...Array(FOLDS).keys()].map((f) => a.slice(f * size, f * size + size));
}

export default function CVGrid() {
  const { cvGrid, features } = getMotion();
  const P = cvGrid.participants;
  const S = cvGrid.samplesPerParticipant;
  const random = useMemo(() => shuffledFolds(P * S), [P, S]);
  const [{ fold, mode }, setView] = useState<{ fold: number; mode: Mode }>({ fold: 0, mode: "random" });
  const paused = useRef(false);
  const visible = useRef(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced() || !features.cvGrid) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    const t = setInterval(() => {
      if (paused.current || !visible.current || document.hidden) return;
      setView((v) =>
        v.fold === FOLDS - 1 ? { fold: 0, mode: v.mode === "random" ? "participant" : "random" } : { fold: v.fold + 1, mode: v.mode },
      );
    }, cvGrid.stepMs);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, [cvGrid.stepMs, features.cvGrid]);

  const perFold = P / FOLDS;
  const test = new Set(
    mode === "participant"
      ? [...Array(perFold).keys()].flatMap((k) => {
          const p = fold * perFold + k;
          return [...Array(S).keys()].map((s) => p * S + s);
        })
      : random[fold],
  );
  const leaked = new Set<number>();
  for (let p = 0; p < P; p++) {
    const inTest = [...Array(S).keys()].filter((s) => test.has(p * S + s)).length;
    if (inTest > 0 && inTest < S) leaked.add(p);
  }

  const cells = [];
  for (let r = 0; r < S; r++)
    for (let c = 0; c < P; c++) {
      const idx = c * S + r;
      const cls = ["cv-cell", test.has(idx) ? "test" : "", leaked.has(c) ? "leak" : ""].join(" ");
      cells.push(
        <span key={idx} className={cls}>
          {String.fromCharCode(65 + c)}
        </span>,
      );
    }

  const choose = (m: Mode) => setView({ fold: 0, mode: m });

  return (
    <div
      ref={ref}
      className="cv"
      data-cvcard=""
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="cv-top">
        <span className="cv-label">
          TrustCV · Fold {fold + 1} of {FOLDS}
        </span>
        <div className="cv-toggle">
          <button aria-pressed={mode === "random"} onClick={() => choose("random")}>
            Random split
          </button>
          <button className="part" aria-pressed={mode === "participant"} onClick={() => choose("participant")}>
            By participant
          </button>
        </div>
      </div>
      <div className="cv-grid" style={{ gridTemplateColumns: `repeat(${P}, minmax(0, 1fr))` }}>
        {cells}
      </div>
      <div className="cv-foot">
        <p className={mode === "random" ? "warn" : ""} aria-live="polite">
          {mode === "random"
            ? `${leaked.size} of ${P} participants appear in both train and test. Scores will look optimistic.`
            : `0 of ${P} participants cross the split. Each test fold contains unseen people.`}
        </p>
        <span className="cv-note">Illustrative</span>
      </div>
    </div>
  );
}
