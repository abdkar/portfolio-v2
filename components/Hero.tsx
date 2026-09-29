"use client";
/** Home hero: headline reveal, drawn underline, portrait wipe, tabs, CV diagram, count-up stats. */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getMotion } from "@/config/motion";
import { site } from "@/config/site";
import { focusAreas, stats } from "@/lib/content";
import { prefersReduced } from "@/lib/motion";
import CVGrid from "./CVGrid";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const [tab, setTab] = useState(0);
  const m = getMotion();
  const f = m.features;
  const d = m.introDelay;

  useEffect(() => {
    const r = root.current;
    if (!r || prefersReduced()) return;
    const opts = (delay: number, duration: number): KeyframeAnimationOptions => ({ delay, duration: m.dur(duration), easing: m.ease, fill: "backwards" });

    if (f.headlineReveal)
      r.querySelectorAll<HTMLElement>("[data-hl]").forEach((el, i) =>
        el.animate([{ translate: "0 110%" }, { translate: "0 0" }], opts(d.headline + i * d.headlineStagger, m.duration.headline)),
      );
    r.querySelectorAll<HTMLElement>("[data-intro]").forEach((el) =>
      el.animate(
        [{ opacity: 0, translate: `0 ${m.dist(m.distance.intro)}px` }, { opacity: 1, translate: "0 0" }],
        opts(Number(el.dataset.intro), m.duration.intro),
      ),
    );
    const u = r.querySelector<SVGPathElement>("[data-underline]");
    if (u) {
      const L = u.getTotalLength();
      u.style.strokeDasharray = String(L);
      u.animate([{ strokeDashoffset: L }, { strokeDashoffset: 0 }], opts(d.underline, m.duration.underline));
    }
    if (f.portraitReveal) {
      const fig = r.querySelector<HTMLElement>("[data-portrait]");
      fig?.animate([{ clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0 0 0 0)" }], opts(d.portrait, m.duration.portrait));
      fig?.querySelector("img")?.animate([{ scale: "1.14" }, { scale: "1" }], opts(d.portrait, m.duration.portrait * 1.5));
    }
    r.querySelector<HTMLElement>("[data-cvcard]")?.animate(
      [{ opacity: 0, translate: "0 24px" }, { opacity: 1, translate: "0 0" }],
      opts(d.cvCard, 900),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (prefersReduced()) return;
    panel.current?.animate([{ opacity: 0, translate: "0 8px" }, { opacity: 1, translate: "0 0" }], { duration: m.dur(m.duration.tabSwitch), easing: m.ease });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const area = focusAreas[tab];

  return (
    <section ref={root} id="top" data-section="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p data-intro={d.status} className="eyebrow status">
            <span className="pulse" />
            {site.location} · {site.availability}
          </p>
          <p data-intro={d.name} className="hero-name">
            {site.title}
          </p>
          <h1 className="headline">
            <span className="hl-mask">
              <span className="hl-line" data-hl="">
                AI that earns
              </span>
            </span>
            <span className="hl-mask hl-mask-last">
              <span className="hl-accent" data-hl="">
                <em>your trust.</em>
                {f.underline && (
                  <svg className="hl-underline" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
                    <path data-underline="" d="M2 12 C 70 3, 190 2, 298 9" fill="none" stroke="var(--accent)" strokeWidth="3.2" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </span>
          </h1>
          <p data-intro={d.role} className="hero-role">
            {site.role}
          </p>
          <p data-intro={d.description} className="hero-desc">
            I develop methods and software for evaluating machine learning in clinical data, medical imaging, language models, and infrastructure.
          </p>
          <div data-intro={d.buttons} className="btn-row hero-ctas">
            <Magnetic>
              <Link href="/work" className="btn btn-primary btn-lg">
                <span>Explore my work</span>
                <span className="arrow">↗</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <a href={site.cv} target="_blank" rel="noopener" className="btn btn-lg">
                <span>View my CV</span>
              </a>
            </Magnetic>
          </div>

          <div data-intro={d.tabs} className="tabs-wrap">
            <p className="tabs-title">A closer look at my work</p>
            <div role="tablist" aria-label="Research focus" className="tabs">
              {focusAreas.map((a, i) => (
                <button key={a.slug} role="tab" aria-selected={i === tab} className="tab" onClick={() => setTab(i)}>
                  {a.label}
                </button>
              ))}
            </div>
            <div ref={panel} role="tabpanel" className="tab-panel">
              <p>{area.description}</p>
              <Link href={`/work/${area.slug}`} className="text-link">
                Read about {area.name} <span>↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-side">
          <figure data-portrait="" className={"portrait" + (f.portraitGrayscaleOnHover ? " bw-hover" : "")}>
            <Image src={site.portrait} alt={`Portrait of ${site.name}`} fill priority sizes="(max-width: 960px) 100vw, 50vw" />
          </figure>
          {f.cvGrid && <CVGrid />}
          <div className="currently">
            <span className="currently-label">Currently</span>
            <span>
              {site.currently.map((c) => (
                <span key={c} className="currently-line">
                  {c}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="container stats-bar">
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <CountUp value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
        <a href="#work" className="cue">
          Selected work <span className="cue-dot">↓</span>
        </a>
      </div>
    </section>
  );
}
