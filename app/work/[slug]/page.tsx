import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import TriageVisualizer from "@/components/TriageVisualizer";
import BenchVisualizer from "@/components/BenchVisualizer";
import RehabVisualizer from "@/components/RehabVisualizer";
import { projects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <section className="page-hero">
        <div className="container case-wrap stack">
          <Link href="/work" className="back">← All work</Link>
          <Reveal as="p" className="eyebrow">{p.category} · {p.year}</Reveal>
          <Reveal as="h1" delay={60} className="case-title">{p.name}</Reveal>
          <Reveal as="p" delay={120} className="case-headline">{p.headline}</Reveal>
          <Reveal as="p" delay={160} className="small muted">{p.status}</Reveal>
        </div>
      </section>

      <section className="container case-wrap case-body">
        <div className="case-grid">
          <Reveal className="stack-sm">
            <p className="eyebrow">Problem</p>
            <p className="case-text muted">{p.problem}</p>
          </Reveal>
          <Reveal delay={100} className="card stack-sm">
            <p className="eyebrow">My contribution</p>
            <p className="case-text">{p.contribution}</p>
          </Reveal>
        </div>

        {p.slug === "triage-medley" && <TriageVisualizer />}
        {p.slug === "medley-bench" && <BenchVisualizer />}
        {p.slug === "rehabilitation-ai" && <RehabVisualizer />}

        <div>
          <Reveal as="p" className="eyebrow step-title">Method</Reveal>
          {p.method.map((t, k) => (
            <Reveal key={t} delay={k * 80} className="step">
              <span className="step-n">{String(k + 1).padStart(2, "0")}</span>
              <span>{t}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="stack-sm">
          <p className="eyebrow">Outcome</p>
          <p className="outcome">{p.outcome}</p>
        </Reveal>

        <Reveal className="limit stack-sm">
          <p className="eyebrow">Scope &amp; limitations</p>
          <p className="muted">{p.limitation}</p>
        </Reveal>

        {p.links.length > 0 && (
          <Reveal className="btn-row">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener" className="pill-link">
                {l.label} ↗
              </a>
            ))}
          </Reveal>
        )}

        <Link href={`/work/${next.slug}`} className="next">
          <span className="stack-xs">
            <span className="small muted">Next project</span>
            <span className="next-name">{next.name}</span>
          </span>
          <span className="row-arrow" aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
