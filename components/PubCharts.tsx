"use client";
import { useMemo } from "react";
import type { Publication } from "@/lib/content";

type Props = { publications: Publication[] };

export default function PubCharts({ publications }: Props) {
  /* ── per-year data ── */
  const yearData = useMemo(() => {
    const map = new Map<number, number>();
    publications.forEach((p) => map.set(p.year, (map.get(p.year) ?? 0) + 1));
    const entries = [...map.entries()].sort((a, b) => a[0] - b[0]);
    const max = Math.max(...entries.map((e) => e[1]), 1);
    return { entries, max };
  }, [publications]);

  /* ── per-area data ── */
  const areaData = useMemo(() => {
    const map = new Map<string, number>();
    publications.forEach((p) => map.set(p.area, (map.get(p.area) ?? 0) + 1));
    const entries = [...map.entries()].sort((a, b) => b[1] - a[1]);
    const max = Math.max(...entries.map((e) => e[1]), 1);
    return { entries, max };
  }, [publications]);

  const colors = [
    "hsl(159, 50%, 58%)",
    "hsl(210, 55%, 62%)",
    "hsl(340, 48%, 62%)",
    "hsl(45, 60%, 58%)",
    "hsl(265, 45%, 62%)",
    "hsl(190, 55%, 55%)",
    "hsl(20, 55%, 58%)",
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 32 }}>

      {/* Publications per year */}
      <div style={{ padding: "clamp(20px, 4vw, 32px)", borderRadius: 16, background: "var(--card)", border: "1px solid var(--line)" }}>
        <p style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
          Publications per year
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 140 }}>
          {yearData.entries.map(([year, count]) => (
            <div key={year} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)" }}>{count}</span>
              <div
                style={{
                  width: "100%",
                  maxWidth: 40,
                  height: `${(count / yearData.max) * 100}%`,
                  minHeight: 4,
                  borderRadius: "6px 6px 2px 2px",
                  background: "var(--accent)",
                  transition: "height 0.6s cubic-bezier(.4,0,.2,1)",
                  opacity: 0.85,
                }}
              />
              <span style={{ fontSize: 10, color: "var(--muted)", writingMode: "vertical-lr", transform: "rotate(180deg)", height: 36 }}>
                {year}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Papers by research area */}
      <div style={{ padding: "clamp(20px, 4vw, 32px)", borderRadius: 16, background: "var(--card)", border: "1px solid var(--line)" }}>
        <p style={{ margin: "0 0 20px", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)" }}>
          Papers by research area
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {areaData.entries.map(([area, count], i) => (
            <div key={area} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ flex: "0 0 130px", fontSize: 13, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {area}
              </span>
              <div style={{ flex: 1, height: 10, borderRadius: 999, background: "var(--line)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(count / areaData.max) * 100}%`,
                    borderRadius: 999,
                    background: colors[i % colors.length],
                    transition: "width 0.8s cubic-bezier(.4,0,.2,1)",
                  }}
                />
              </div>
              <span style={{ flex: "0 0 22px", fontSize: 12, fontWeight: 600, textAlign: "right" }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
