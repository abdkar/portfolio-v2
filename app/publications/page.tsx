"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";
import { prefersReduced } from "@/lib/motion";
import { publications, publicationStats, publicationAreas } from "@/lib/content";

export default function PublicationsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("All areas");
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter((p) => {
      const matchType =
        typeFilter === "all"
          ? true
          : typeFilter === "first"
          ? p.first
          : p.type === typeFilter;
      const matchArea = areaFilter === "All areas" || p.area === areaFilter;
      const matchQuery =
        !q ||
        (p.title + " " + p.authors + " " + p.venue + " " + p.contribution)
          .toLowerCase()
          .includes(q);
      return matchType && matchArea && matchQuery;
    });
  }, [query, typeFilter, areaFilter]);

  const years = useMemo(() => {
    return Array.from(new Set(filtered.map((p) => p.year))).sort((a, b) => b - a);
  }, [filtered]);

  useEffect(() => {
    if (prefersReduced()) return;
    listRef.current?.querySelectorAll("article").forEach((article, index) => {
      if (index >= 14) return;
      article.animate(
        [{ opacity: 0, translate: "0 14px" }, { opacity: 1, translate: "0 0" }],
        { duration: 500, delay: index * 35, easing: "cubic-bezier(.22, 1, .36, 1)", fill: "backwards" },
      );
    });
  }, [filtered]);

  const typeTabs = [
    { id: "all", label: "All", count: publicationStats.total },
    { id: "journal", label: "Journal articles", count: publicationStats.journals },
    { id: "conference", label: "Conference papers", count: publicationStats.conferences },
    { id: "preprint", label: "Preprints", count: publicationStats.preprints },
    { id: "first", label: "First author", count: publicationStats.first },
  ];

  const typeLabels: Record<string, string> = {
    journal: "Journal article",
    conference: "Conference paper",
    preprint: "Preprint",
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">
            Publications
          </Reveal>
          <Reveal as="h1" delay={80} className="page-title">
            Research, in print.
          </Reveal>
          <Reveal as="p" delay={160} className="page-intro">
            Journal articles, conference papers, and preprints. Each record identifies its publication status; recent work includes my contribution.
          </Reveal>
          <Reveal delay={220} style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px, 5vw, 64px)", marginTop: 40 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <strong style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, fontSize: 48 }}>
                {publicationStats.total}
              </strong>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Publications</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <strong style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, fontSize: 48 }}>
                {publicationStats.journals}
              </strong>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Journal articles</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <strong style={{ fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, fontSize: 48 }}>
                {publicationStats.first}
              </strong>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>First author</span>
            </div>
            <a
              href={site.links.orcid}
              target="_blank"
              rel="noopener"
              style={{ alignSelf: "center", fontSize: 14, fontWeight: 600, color: "var(--accent)" }}
            >
              Full record on ORCID ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section
        style={{
          position: "sticky",
          top: 76,
          zIndex: 20,
          background: "color-mix(in oklab, var(--bg) 92%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px clamp(20px, 4vw, 56px)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, author, or journal"
              aria-label="Search publications"
              style={{
                flex: "1 1 280px",
                height: 46,
                padding: "0 18px",
                borderRadius: 999,
                border: "1px solid var(--line)",
                background: "var(--card)",
                color: "var(--ink)",
                fontSize: 15,
                fontFamily: "inherit",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {typeTabs.map((pt) => {
                const active = typeFilter === pt.id;
                return (
                  <button
                    key={pt.id}
                    onClick={() => setTypeFilter(pt.id)}
                    aria-pressed={active}
                    style={{
                      display: "inline-flex",
                      gap: 8,
                      alignItems: "center",
                      height: 40,
                      padding: "0 14px",
                      borderRadius: 999,
                      border: `1px solid ${active ? "var(--ink)" : "var(--line)"}`,
                      background: active ? "var(--ink)" : "transparent",
                      color: active ? "var(--bg)" : "var(--ink)",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all .25s",
                    }}
                  >
                    <span>{pt.label}</span>
                    <span style={{ opacity: 0.65 }}>{pt.count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {publicationAreas.map((pa) => {
              const active = areaFilter === pa;
              return (
                <button
                  key={pa}
                  onClick={() => setAreaFilter(pa)}
                  aria-pressed={active}
                  style={{
                    height: 34,
                    padding: "0 12px",
                    borderRadius: 999,
                    border: `1px solid ${active ? "var(--accent)" : "var(--line)"}`,
                    background: active ? "var(--accentSoft)" : "transparent",
                    color: active ? "var(--accent)" : "var(--muted)",
                    fontSize: 13,
                    cursor: "pointer",
                    transition: "all .25s",
                  }}
                >
                  {pa}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications List */}
      <section style={{ padding: "32px 0 clamp(72px, 9vw, 120px)" }}>
        <div ref={listRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "0 clamp(20px, 4vw, 56px)" }}>
          <p role="status" style={{ margin: "0 0 8px", fontSize: 13, color: "var(--muted)" }}>
            {filtered.length} of {publicationStats.total} publications
          </p>

          {filtered.length === 0 && (
            <div style={{ padding: "48px 0", display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-serif), Georgia, serif", fontSize: 28 }}>
                No publications match these filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setTypeFilter("all");
                  setAreaFilter("All areas");
                }}
                style={{ background: "none", border: 0, padding: "6px 0", color: "var(--accent)", fontSize: 15, fontWeight: 600, cursor: "pointer" }}
              >
                Clear filters
              </button>
            </div>
          )}

          {years.map((y) => {
            const yearItems = filtered.filter((p) => p.year === y);
            return (
              <div
                key={y}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0 40px",
                  borderTop: "1px solid var(--line)",
                  paddingTop: 28,
                  marginTop: 28,
                }}
              >
                <h2
                  style={{
                    flex: "0 0 110px",
                    margin: "0 0 16px",
                    fontFamily: "var(--font-serif), Georgia, serif",
                    fontWeight: 400,
                    fontSize: 36,
                    color: "var(--accent)",
                    position: "sticky",
                    top: 210,
                    alignSelf: "flex-start",
                  }}
                >
                  {y}
                </h2>
                <div style={{ flex: "1 1 480px", minWidth: 0, display: "flex", flexDirection: "column" }}>
                  {yearItems.map((p) => (
                    <article
                      key={p.title}
                      style={{
                        paddingBottom: 28,
                        marginBottom: 28,
                        borderBottom: "1px solid var(--line)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            padding: "4px 9px",
                            borderRadius: 4,
                            border: "1px solid var(--line)",
                            color: p.type === "preprint" ? "var(--warn)" : "var(--accent)",
                          }}
                        >
                          {typeLabels[p.type] || p.type}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            padding: "4px 9px",
                            borderRadius: 4,
                            border: "1px solid var(--line)",
                            color: "var(--muted)",
                          }}
                        >
                          {p.area}
                        </span>

                      </div>

                      <h3 style={{ margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.5 }}>
                        {p.url ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener"
                            style={{ color: "var(--ink)" }}
                          >
                            {p.title} ↗
                          </a>
                        ) : (
                          p.title
                        )}
                      </h3>

                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
                        {p.authors}
                      </p>

                      <p style={{ margin: 0, fontSize: 14, color: "var(--muted)" }}>
                        <em style={{ color: "var(--ink)" }}>{p.venue}</em> {p.detail}
                      </p>

                      {p.contribution && (
                        <p
                          style={{
                            margin: "4px 0 0",
                            paddingLeft: 14,
                            borderLeft: "2px solid var(--accent)",
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: "var(--muted)",
                          }}
                        >
                          {p.contribution}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
