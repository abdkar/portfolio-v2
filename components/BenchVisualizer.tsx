"use client";

import { useEffect, useState } from "react";
import { prefersReduced } from "@/lib/motion";

const BENCH_STEPS = ["Answer", "Self-review", "Peer pressure", "Score"];
const BENCH_CONF = [0, 72, 64, 41, 41];
const BENCH_STAGE = ["", "Independent answer", "Structured self-review", "Social disagreement", "Evaluation"];
const BENCH_NOTE = [
  "",
  "Answers an ambiguous question on its own.",
  "Re-reads its own reasoning. No new evidence, so the answer stays.",
  "Three peer models answer B. The model switches, and its confidence drops.",
  "Three peer models answer B. The model switches, and its confidence drops.",
];
const BENCH_CAPTION = [
  "The model first answers an ambiguous question independently.",
  "It then reviews its own reasoning, without outside input.",
  "Peer models disagree. Does the model revise, and for what reason?",
  "The rubric scores how and why the answer changed, not only whether it is correct.",
];
const BENCH_RUBRIC = [
  { t: "Revision linked to new evidence", ok: false },
  { t: "Explanation consistent with the answer", ok: true },
  { t: "Confidence change proportionate", ok: false },
];
const BENCH_PEERS = [
  { id: "P1", msg: "I’m fairly sure it’s B." },
  { id: "P2", msg: "B fits the evidence better." },
  { id: "P3", msg: "Most models say B." },
];
const BENCH_DUR = [600, 2800, 2600, 3200, 3600];

export default function BenchVisualizer() {
  const [step, setStep] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReduced()) {
      setStep(4);
      return;
    }
    const timer = setTimeout(() => {
      if (!paused && typeof document !== "undefined" && !document.hidden) {
        setStep((s) => (s >= 4 ? 1 : s + 1));
      }
    }, BENCH_DUR[step] || 2800);

    return () => clearTimeout(timer);
  }, [step, paused]);

  const answer = step >= 3 ? "B" : "A";
  const ansBg = step >= 3 ? "#e8b36f" : "#8fd3c0";
  const conf = BENCH_CONF[step] + "%";

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        padding: "clamp(20px, 3vw, 32px)",
        borderRadius: 16,
        background: "#152022",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#f3efe7",
        display: "flex",
        flexDirection: "column",
        gap: 22,
        margin: "24px 0",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bfe6da" }}>
          How it works · Illustrative Demo
        </span>
        <div style={{ display: "flex", gap: 4, padding: 3, borderRadius: 999, background: "rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
          {BENCH_STEPS.map((label, i) => {
            const on = step === i + 1;
            return (
              <button
                key={label}
                onClick={() => setStep(i + 1)}
                style={{
                  border: 0,
                  borderRadius: 999,
                  padding: "7px 13px",
                  fontSize: 12,
                  cursor: "pointer",
                  background: on ? "#8fd3c0" : "transparent",
                  color: on ? "#0f2a25" : "#f3efe7",
                  transition: "background 0.3s, color 0.3s",
                }}
              >
                {i + 1} {label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 16 }}>
        <div
          style={{
            padding: 20,
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,239,231,0.6)" }}>
              Model under test
            </span>
            <span style={{ fontSize: 12, color: "rgba(243,239,231,0.6)" }}>{BENCH_STAGE[step]}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                flex: "none",
                width: 56,
                height: 56,
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: 26,
                background: ansBg,
                color: "#0f2a25",
                transform: step === 3 ? "scale(1.1)" : "scale(1)",
                transition: "background 0.5s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {answer}
            </span>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, minWidth: 0 }}>
              <span style={{ fontSize: 14 }}>
                Answer {answer} · {BENCH_CONF[step]}% confident
              </span>
              <span style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", overflow: "hidden", display: "block" }}>
                <span
                  style={{
                    display: "block",
                    height: "100%",
                    borderRadius: 3,
                    width: conf,
                    background: ansBg,
                    transition: "width 0.8s cubic-bezier(0.22, 1, 0.36, 1), background 0.5s",
                  }}
                />
              </span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "rgba(243,239,231,0.78)", minHeight: 44 }}>
            {BENCH_NOTE[step]}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,239,231,0.6)" }}>
            {step >= 4 ? "Rubric evaluation" : "Peer model opinions"}
          </span>

          {step < 4 ? (
            BENCH_PEERS.map((pr, i) => (
              <div
                key={pr.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(232,179,111,0.1)",
                  border: "1px solid rgba(232,179,111,0.25)",
                  opacity: step === 3 ? 1 : 0.35,
                  transform: step >= 3 ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.4s ease",
                }}
              >
                <span style={{ flex: "none", width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600, background: "rgba(255,255,255,0.1)" }}>
                  {pr.id}
                </span>
                <span style={{ flex: 1, fontSize: 13, color: "#f6d5a8" }}>{pr.msg}</span>
                <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 18, color: "#f0c78f" }}>B</span>
              </div>
            ))
          ) : (
            BENCH_RUBRIC.map((rb, i) => (
              <div
                key={rb.t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: step >= 4 ? 1 : 0,
                  transform: step >= 4 ? "translateY(0)" : "translateY(10px)",
                  transition: `all 0.4s ease ${i * 120}ms`,
                }}
              >
                <span
                  style={{
                    flex: "none",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    background: rb.ok ? "#8fd3c0" : "#e8b36f",
                    color: "#0f2a25",
                  }}
                >
                  {rb.ok ? "✓" : "✕"}
                </span>
                <span style={{ fontSize: 13, lineHeight: 1.4 }}>{rb.t}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, maxWidth: 560, color: "#f3efe7" }}>
          {BENCH_CAPTION[Math.max(0, step - 1)]}
        </p>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {BENCH_STEPS.map((_, i) => (
            <span
              key={i}
              style={{
                height: 4,
                borderRadius: 2,
                width: step === i + 1 ? 22 : 8,
                background: step >= i + 1 ? "#8fd3c0" : "rgba(255,255,255,0.2)",
                transition: "width 0.5s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
