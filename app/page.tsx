import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";
import Hero from "@/components/Hero";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";
import SectionRail from "@/components/SectionRail";
import { site } from "@/config/site";
import { marquee, projects, publicationTopics } from "@/lib/content";

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
              <a href={site.cv} target="_blank" rel="noopener" className="text-link">My research journey ↗</a>
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
                <a href={site.links.orcid} target="_blank" rel="noopener" className="btn btn-primary">
                  <span>Browse publications</span>
                  <span className="arrow">↗</span>
                </a>
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
