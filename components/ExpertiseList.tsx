"use client";
/** Accordion: + rotates to ×, panel eases open, skills appear as chips. */
import Link from "next/link";
import { useState } from "react";
import { domains } from "@/lib/content";
import Reveal from "./Reveal";

export default function ExpertiseList() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      {domains.map((d, i) => {
        const isOpen = open === i;
        const panelId = `domain-${i}`;
        return (
          <Reveal as="article" key={d.title} className={"acc" + (isOpen ? " open" : "")}>
            <button className="acc-btn" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
              <h2>{d.title}</h2>
              <p>{d.description}</p>
              <span className="acc-plus" aria-hidden="true">+</span>
            </button>
            <div id={panelId} className="acc-panel">
              <div className="acc-inner">
                <div className="acc-content">
                  <p className="tabs-title">Methods and tools</p>
                  <div className="chips">
                    {d.skills.map((s) => (
                      <span key={s} className="skill">{s}</span>
                    ))}
                  </div>
                  <Link href={`/work/${d.slug}`} className="text-link" tabIndex={isOpen ? 0 : -1}>
                    Related work: {d.work} →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
