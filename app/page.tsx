import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import Hero from "@/components/Hero";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";
import ProjectList from "@/components/ProjectList";
import PubCharts from "@/components/PubCharts";
import Reveal from "@/components/Reveal";
import SectionRail from "@/components/SectionRail";
import { site } from "@/config/site";
import { marquee, projects, publicationTopics, testimonials, careerGoal, technicalSkills, teaching, leadership, spokenLanguages, publications } from "@/lib/content";

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <Hero />
      <Marquee items={marquee} />

      <section id="work" data-section="work" className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal as="p" className="eyebrow">01 / Selected work</Reveal>
              <Reveal as="h2" delay={80} className="h2">
                Selected research
                <br />
                and software.
              </Reveal>
            </div>
            <Reveal delay={160} className="stack-sm">
              <p className="lead">Software and studies in model validation, clinical speech, and language model evaluation.</p>
              <Link href="/work" className="text-link">Explore all work →</Link>
            </Reveal>
          </div>
          <Reveal variant="line" className="divider" />
          <ProjectList projects={featured} />
        </div>
      </section>

      <section id="about" data-section="about" className="section">
        <div className="container two-col">
          <div>
            <Reveal as="p" className="eyebrow">02 / Research background</Reveal>
            <Reveal as="h2" delay={80} className="h2">
              Clinical research.
              <br />
              <em className="accent">Applied machine learning.</em>
            </Reveal>
          </div>
          <div className="stack">
            <Reveal as="p" className="quote">My research focuses on evaluating models with dependent and multimodal data.</Reveal>
            <Reveal as="p" delay={60} className="body">
              My work brings together mathematics, machine learning, and scientific software. Across medical imaging, rehabilitation, speech, and infrastructure, I focus on evaluation that respects the data and evidence that people can inspect.
            </Reveal>
            <Reveal as="p" delay={120} className="body">
              I am the lead developer of TrustCV and an affiliated researcher at Karolinska Institutet’s SMAILE core facility. My research connects leakage-aware validation, uncertainty, explainability, and human oversight.
            </Reveal>
            <Reveal delay={180} className="links">
              <Link href="/experience" className="text-link">My research journey ↗</Link>
              <Link href="/expertise" className="text-link">How I work ↗</Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="publications" data-section="publications" className="section section-tight">
        <div className="container">
          <Reveal className="pub-band">
            <div className="stack stack-start">
              <p className="eyebrow">03 / Publications</p>
              <h2 className="pub-title">
                22 publications.
                <br />
                Articles, conference papers, and preprints.
              </h2>
              <p className="lead">18 journal articles, 2 conference papers, and 2 preprints. Each record identifies its publication status; recent work includes my contribution.</p>
              <Magnetic>
                <Link href="/publications" className="btn btn-primary">
                  <span>Browse publications</span>
                  <span className="arrow">→</span>
                </Link>
              </Magnetic>
            </div>
            <div className="topics">
              {publicationTopics.map((t, i) => (
                <Reveal key={t} delay={120 + i * 90} className="topic">
                  <span>↗</span>
                  {t}
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section id="testimonials" className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <Reveal as="p" className="eyebrow">What colleagues say</Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(24px, 4vw, 40px)", marginTop: 32 }}>
            {testimonials.map((t) => (
              <Reveal key={t.author} className="card" style={{ padding: "clamp(24px, 4vw, 36px)", borderRadius: 16, display: "flex", flexDirection: "column", gap: 18, background: "var(--card)", border: "1px solid var(--line)" }}>
                <svg width="32" height="26" viewBox="0 0 32 26" fill="none" aria-hidden="true">
                  <path d="M0 26V15.6C0 5.2 6.4.8 12.8 0l1.6 3.2C8 4.8 6.4 9 6.4 13h6.4V26H0Zm18.8 0V15.6C18.8 5.2 25.2.8 31.6 0l1.6 3.2c-6.4 1.6-8 5.8-8 9.8h6.4V26H18.8Z" fill="var(--accent)" opacity=".3" />
                </svg>
                <p style={{ margin: 0, fontSize: "clamp(17px, 2vw, 20px)", fontStyle: "italic", lineHeight: 1.6, fontFamily: "var(--font-serif), Georgia, serif" }}>{t.quote}</p>
                <div style={{ marginTop: "auto", paddingTop: 6 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{t.author}</p>
                  <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>{t.affiliation}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* === PUBLICATION CHARTS === */}
      <section className="section alt">
        <div className="container" style={{ maxWidth: 1000 }}>
          <Reveal as="p" className="eyebrow">Research output</Reveal>
          <Reveal as="h2" delay={80} className="h2" style={{ marginBottom: 32 }}>Publication timeline & areas.</Reveal>
          <PubCharts publications={publications} />
        </div>
      </section>

      {/* === CV / PROFILE === */}
      <section id="cv" data-section="cv" className="section">
        <div className="container" style={{ maxWidth: 1000 }}>
          <Reveal as="p" className="eyebrow">Profile & CV</Reveal>
          <Reveal as="h2" delay={80} className="h2">A decade of applied AI,<br /><em className="accent">from research to production.</em></Reveal>

          {/* Career Goal */}
          <Reveal delay={140} style={{ marginTop: 32, padding: "clamp(20px, 4vw, 32px)", borderRadius: 16, background: "var(--card)", border: "1px solid var(--line)" }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Career goal</p>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7 }}>{careerGoal}</p>
          </Reveal>

          {/* Technical Skills */}
          <Reveal delay={180} style={{ marginTop: 32 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>Key technical skills</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 20 }}>
              {([
                { label: "Languages", items: technicalSkills.languages },
                { label: "ML / AI", items: technicalSkills.mlAi },
                { label: "Data", items: technicalSkills.data },
                { label: "MLOps", items: technicalSkills.mlops },
                { label: "Visualization", items: technicalSkills.visualization },
                { label: "NLP / Speech", items: technicalSkills.nlp },
              ] as const).map((cat) => (
                <div key={cat.label} style={{ padding: "16px 18px", borderRadius: 12, background: "var(--card)", border: "1px solid var(--line)" }}>
                  <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{cat.label}</p>
                  <div className="chips" style={{ gap: 6 }}>
                    {cat.items.map((s) => <span key={s} className="chip" style={{ fontSize: 13 }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Teaching & Leadership */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 24, marginTop: 32 }}>
            <Reveal style={{ padding: "clamp(20px, 4vw, 28px)", borderRadius: 16, background: "var(--card)", border: "1px solid var(--line)" }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Teaching & supervision</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {teaching.map((t) => (
                  <li key={t} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.65, color: "var(--muted)" }}>
                    <span style={{ flex: "0 0 6px", height: 6, marginTop: 10, rotate: "45deg", background: "var(--accent)" }} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80} style={{ padding: "clamp(20px, 4vw, 28px)", borderRadius: 16, background: "var(--card)", border: "1px solid var(--line)" }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Leadership & community</p>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {leadership.map((l) => (
                  <li key={l} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.65, color: "var(--muted)" }}>
                    <span style={{ flex: "0 0 6px", height: 6, marginTop: 10, rotate: "45deg", background: "var(--accent)" }} />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Languages */}
          <Reveal delay={100} style={{ marginTop: 24 }}>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Languages</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {spokenLanguages.map((l) => (
                <span key={l.name} style={{ padding: "8px 16px", borderRadius: 999, border: "1px solid var(--line)", fontSize: 14, display: "inline-flex", gap: 8, alignItems: "center" }}>
                  <strong>{l.name}</strong>
                  <span style={{ color: "var(--muted)", fontSize: 13 }}>{l.level}</span>
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={140} style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={site.cv} target="_blank" rel="noopener" className="btn btn-primary">
              <span>Download CV (PDF)</span>
              <span className="arrow">↓</span>
            </a>
            <Link href="/experience" className="btn">
              <span>Full experience</span>
              <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="contact" data-section="contact" className="section alt bordered">
        <div className="container two-col align-center">
          <div className="stack">
            <Reveal as="p" className="eyebrow">04 / Let’s connect</Reveal>
            <Reveal as="h2" delay={80} className="h2">
              Research collaboration
              <br />
              <em className="accent">and applied ML roles.</em>
            </Reveal>
            <Reveal as="p" delay={140} className="lead">
              Contact me about research collaborations or data science and machine learning roles involving clinical data, model evaluation, or scientific software.
            </Reveal>
            <Reveal delay={200} className="chips">
              <span className="chip">Clinical &amp; applied AI</span>
              <span className="chip">Research collaboration</span>
              <span className="chip">Scientific software</span>
            </Reveal>
          </div>
          <Reveal delay={120} className="contact-card">
            <p className="eyebrow">Direct contact</p>
            <a href={`mailto:${site.email}`} className="email">{site.email}</a>
            <p className="small muted">Open your email app to write to me, or copy the address.</p>
            <div className="btn-row">
              <Magnetic>
                <a href={`mailto:${site.email}?subject=${encodeURIComponent(site.emailSubject)}`} className="btn btn-primary">
                  <span>Write an email</span>
                  <span className="arrow">↗</span>
                </a>
              </Magnetic>
              <CopyEmail />
            </div>
            <div className="socials">
              <a href={site.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
              <a href={site.links.github} target="_blank" rel="noopener">GitHub ↗</a>
              <a href={site.links.orcid} target="_blank" rel="noopener">ORCID ↗</a>
            </div>
            <p className="small muted">Based in Stockholm · Remote collaboration welcome</p>
          </Reveal>
        </div>
      </section>

      <SectionRail />
    </>
  );
}
