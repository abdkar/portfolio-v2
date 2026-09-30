"use client";

import { useEffect, useState } from "react";
import { prefersReduced } from "@/lib/motion";

const MED_ASR = [
  ["patient", "reports", "chest", "pain", "for", "two", "days", "no", "fever"],
  ["patient", "reports", "chest", "pain", "for", "three", "days", "no", "fever"],
  ["patient", "report", "chest", "pain", "for", "two", "days", "no", "fever"],
];

const MED_FLAG = MED_ASR[0].map((_, c) => !MED_ASR.every((r) => r[c] === MED_ASR[0][c]));
const MED_OFFSET = [0, 22, -16];
const MED_STEPS = ["Transcribe", "Align", "Compare", "Review"];
const MED_CAPTIONS = [
  "Three speech-recognition systems transcribe the same audio independently.",
  "The transcripts are aligned word by word.",
  "Where the systems disagree, the position is flagged: 2 of 9 here.",
  "A clinician checks only the flagged words against the original audio.",
];
const MED_DUR = [600, 2600, 2200, 2600, 3400];

export default function TriageVisualizer() {
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
    }, MED_DUR[step] || 2500);

    return () => clearTimeout(timer);
  }, [step, paused]);

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
          How it works · Illustrative
        </span>
        <div style={{ display: "flex", gap: 4, padding: 3, borderRadius: 999, background: "rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
          {MED_STEPS.map((label, i) => {
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

      <div style={{ overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{ minWidth: 620, display: "flex", flexDirection: "column", gap: 8 }}>
          {MED_ASR.map((words, r) => (
            <div key={r} style={{ display: "grid", gridTemplateColumns: "68px repeat(9, minmax(0, 1fr))", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(243,239,231,0.6)" }}>
                {"ASR " + "ABC"[r]}
              </span>
              {words.map((w, c) => {
                const flag = MED_FLAG[c];
                const cmp = step >= 3;
                return (
                  <span
                    key={c}
                    style={{
                      height: 38,
                      borderRadius: 7,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 13,
                      fontWeight: 500,
                      opacity: step >= 1 ? 1 : 0,
                      transform: step <= 1 ? `translateX(${MED_OFFSET[r]}px)` : "translateX(0)",
                      background: cmp && flag ? "rgba(232,179,111,0.18)" : cmp ? "rgba(143,211,192,0.1)" : "rgba(255,255,255,0.07)",
                      color: cmp && flag ? "#f6d5a8" : cmp ? "rgba(191,230,218,0.75)" : "#f3efe7",
                      boxShadow: cmp && flag ? "inset 0 0 0 1.5px #e8b36f" : "none",
                      transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {w}
                  </span>
                );
              })}
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "68px repeat(9, minmax(0, 1fr))", gap: 6, minHeight: 22 }}>
            <span />
            {MED_FLAG.map((f, c) => (
              <span
                key={c}
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#f0c78f",
                  opacity: f && step >= 4 ? 1 : 0,
                  transform: f && step >= 4 ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.4s, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {f ? "▲ Review" : ""}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, maxWidth: 520, color: "#f3efe7" }}>
          {MED_CAPTIONS[Math.max(0, step - 1)]}
        </p>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {MED_STEPS.map((_, i) => (
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
