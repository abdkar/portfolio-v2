"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";
import { experiences, education, projects } from "@/lib/content";

export default function ExperiencePage() {
  const [tab, setTab] = useState<"experience" | "education">("experience");

  const items = tab === "experience" ? experiences : education;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">
            Experience &amp; education
          </Reveal>
          <Reveal as="h1" delay={80} className="page-title">
            A research journey across disciplines.
          </Reveal>
          <Reveal as="p" delay={160} className="page-intro">
            From mathematical foundations and microvascular imaging to clinical AI and trustworthy model evaluation. Each role connects a scientific question with a practical contribution.
          </Reveal>
          <Reveal delay={220} className="btn-row" style={{ marginTop: 32 }}>
            <button
              onClick={() => setTab("experience")}
              className={`btn btn-sm ${tab === "experience" ? "btn-primary" : ""}`}
              style={{
                background: tab === "experience" ? "var(--ink)" : "transparent",
                color: tab === "experience" ? "var(--bg)" : "var(--ink)",
              }}
            >
              Experience
            </button>
            <button
              onClick={() => setTab("education")}
              className={`btn btn-sm ${tab === "education" ? "btn-primary" : ""}`}
              style={{
                background: tab === "education" ? "var(--ink)" : "transparent",
                color: tab === "education" ? "var(--bg)" : "var(--ink)",
              }}
            >
              Education
            </button>
          </Reveal>
        </div>
      </section>

      <section className="section-bottom">
        <div className="container" style={{ maxWidth: 1080 }}>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div
              style={{
                position: "absolute",
                left: 7,
                top: 8,
                bottom: 8,
                width: 2,
                background: "linear-gradient(var(--accent), var(--line))",
              }}
            />
            {items.map((item, idx) => {
              const isPresent = "period" in item && /Present/.test(item.period);
              const relatedProject = "slug" in item && item.slug ? projects.find((p) => p.slug === item.slug) : null;

              return (
                <article
                  key={item.title + item.period}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px 40px",
                    paddingBottom: 48,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: -40,
                      top: 6,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--bg)",
                      border: `2px solid ${isPresent || idx === 0 ? "var(--accent)" : "var(--line)"}`,
                      boxShadow: isPresent ? "0 0 0 5px color-mix(in oklab, var(--accent) 22%, transparent)" : "none",
                    }}
                  />
                  <p
                    style={{
                      flex: "0 0 150px",
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    {item.period}
                  </p>
                  <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: "var(--font-serif), Georgia, serif",
                        fontWeight: 400,
                        fontSize: "clamp(24px, 2.4vw, 32px)",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {item.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: 15, color: "var(--muted)" }}>
                      {item.org} · {item.location}
                    </p>

                    {"bullets" in item && item.bullets && (
                      <ul style={{ margin: "8px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                        {item.bullets.map((b) => (
                          <li key={b} style={{ display: "flex", gap: 14, fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
                            <span
                              style={{
                                flex: "0 0 6px",
                                height: 6,
                                marginTop: 11,
                                rotate: "45deg",
                                background: "var(--accent)",
                              }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {"description" in item && item.description && (
                      <p style={{ margin: "4px 0 0", fontSize: 16, lineHeight: 1.7, color: "var(--muted)" }}>
                        {item.description}
                      </p>
                    )}

                    {relatedProject && (
                      <Link
                        href={`/work/${relatedProject.slug}`}
                        style={{
                          alignSelf: "flex-start",
                          marginTop: 8,
                          color: "var(--accent)",
                          fontSize: 15,
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        Related project: {relatedProject.name} →
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingLeft: 40, marginTop: 16 }}>
            <a href={site.cv} target="_blank" rel="noopener" className="btn btn-primary">
              <span>Download CV (PDF)</span>
              <span className="arrow">↓</span>
            </a>
            <Link href="/#contact" className="btn">
              <span>Get in touch</span>
              <span className="arrow">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
