"use client";

import { useEffect, useState } from "react";
import { prefersReduced } from "@/lib/motion";

const REHAB_STEPS = ["Measure", "Combine", "Validate", "Interpret"];
const REHAB_KNEE = "M0 50 C 30 50, 45 12, 75 10 S 120 50, 150 50 S 195 12, 225 10 S 270 50, 300 50";

const REHAB_EMG = (() => {
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let d = "M0 30";
  for (let x = 3; x <= 300; x += 3) {
    const burst = Math.exp(-Math.pow(((x % 150) - 55) / 22, 2));
    const a = 3 + burst * 26;
    d += " L" + x + " " + (30 + (rnd() * 2 - 1) * a).toFixed(1);
  }
  return d;
})();

const REHAB_BARS = [
  { t: "Knee flexion at landing", v: 0.82, c: "#8fd3c0" },
  { t: "Hamstring EMG onset", v: 0.64, c: "#e8b36f" },
  { t: "Hip rotation", v: 0.41, c: "#8fd3c0" },
  { t: "Quadriceps EMG amplitude", v: 0.33, c: "#e8b36f" },
];

const REHAB_CAPTION = [
  "Movement (biomechanics) and muscle activity (EMG) are recorded during the same tasks.",
  "The two modalities are studied separately and in combination.",
  "Validation keeps each participant’s data on one side of the split.",
  "Feature interpretation shows which measurements the model relies on.",
];

const REHAB_DUR = [600, 3000, 2600, 3200, 3600];

export default function RehabVisualizer() {
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
    }, REHAB_DUR[step] || 2800);

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
          How it works · Illustrative Demo
        </span>
        <div style={{ display: "flex", gap: 4, padding: 3, borderRadius: 999, background: "rgba(255,255,255,0.08)", flexWrap: "wrap" }}>
          {REHAB_STEPS.map((label, i) => {
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12 }}>
              <span style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,239,231,0.6)" }}>Movement</span>
              <span style={{ color: "#8fd3c0" }}>Knee angle</span>
            </div>
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" style={{ width: "100%", height: 64, display: "block", overflow: "visible" }}>
              <line x1="0" y1="59" x2="300" y2="59" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <path
                d={REHAB_KNEE}
                pathLength="1"
                fill="none"
                stroke="#8fd3c0"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: step >= 1 ? 0 : 1,
                  transition: "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />
            </svg>
          </div>

          <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 12 }}>
              <span style={{ fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,239,231,0.6)" }}>Muscle activity</span>
              <span style={{ color: "#e8b36f" }}>EMG · hamstring</span>
            </div>
            <svg viewBox="0 0 300 60" preserveAspectRatio="none" style={{ width: "100%", height: 64, display: "block", overflow: "visible" }}>
              <line x1="0" y1="59" x2="300" y2="59" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <path
                d={REHAB_EMG}
                pathLength="1"
                fill="none"
                stroke="#e8b36f"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: step >= 1 ? 0 : 1,
                  transition: "stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 300ms",
                }}
              />
            </svg>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid rgba(143,211,192,0.35)",
              background: "rgba(143,211,192,0.08)",
              opacity: step >= 2 ? 1 : 0.3,
              transform: step >= 2 ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.5s, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <span style={{ fontSize: 12, padding: "4px 9px", borderRadius: 999, background: "rgba(143,211,192,0.2)", color: "#bfe6da" }}>Movement</span>
            <span style={{ color: "rgba(243,239,231,0.5)" }}>+</span>
            <span style={{ fontSize: 12, padding: "4px 9px", borderRadius: 999, background: "rgba(232,179,111,0.2)", color: "#f6d5a8" }}>EMG</span>
            <span style={{ color: "rgba(243,239,231,0.5)" }}>→</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Combined model</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: step >= 3 ? 1 : 0.4, transition: "opacity 0.5s" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,239,231,0.6)" }}>
              Split by participant
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", gap: 6 }}>
              {[1, 2, 3, 4, 5, 6].map((n, i) => {
                const isTest = step >= 3 && n >= 5;
                return (
                  <span
                    key={n}
                    style={{
                      height: 34,
                      borderRadius: 7,
                      display: "grid",
                      placeItems: "center",
                      fontSize: 12,
                      fontWeight: 600,
                      background: isTest ? "#8fd3c0" : "rgba(255,255,255,0.08)",
                      color: isTest ? "#0f2a25" : "rgba(243,239,231,0.75)",
                      transition: `all 0.5s ease ${i * 60}ms`,
                    }}
                  >
                    P{n}
                  </span>
                );
              })}
            </div>
            <span style={{ fontSize: 12, color: "rgba(243,239,231,0.6)" }}>
              Test participants (P5, P6) are never seen during training.
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, opacity: step >= 4 ? 1 : 0.4, transition: "opacity 0.5s" }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(243,239,231,0.6)" }}>
              Feature contribution
            </span>
            {REHAB_BARS.map((br, i) => (
              <div key={br.t} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 10, alignItems: "center", fontSize: 12 }}>
                <span style={{ color: "rgba(243,239,231,0.85)" }}>{br.t}</span>
                <span style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden", display: "block" }}>
                  <span
                    style={{
                      display: "block",
                      height: "100%",
                      borderRadius: 4,
                      width: step >= 4 ? `${br.v * 100}%` : "0%",
                      background: br.c,
                      transition: `width 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms`,
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-end", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, maxWidth: 560, color: "#f3efe7" }}>
          {REHAB_CAPTION[Math.max(0, step - 1)]}
        </p>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {REHAB_STEPS.map((_, i) => (
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
