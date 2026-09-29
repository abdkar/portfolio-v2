"use client";
/** Fixed 01–04 side navigation on wide screens. The active section lights up while scrolling. */
import { useEffect, useState } from "react";
import { getMotion } from "@/config/motion";

const ITEMS = [
  { id: "work", n: "01", label: "Work" },
  { id: "about", n: "02", label: "Background" },
  { id: "publications", n: "03", label: "Publications" },
  { id: "contact", n: "04", label: "Contact" },
];

export default function SectionRail() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive((e.target as HTMLElement).dataset.section ?? "")),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (!getMotion().features.sectionRail) return null;

  return (
    <nav className="rail" aria-label="Sections">
      {ITEMS.map((it) => (
        <a key={it.id} href={`#${it.id}`} className={active === it.id ? "active" : ""}>
          <span className="rail-line" />
          <span className="rail-n">{it.n}</span>
          <span className="rail-label">{it.label}</span>
        </a>
      ))}
    </nav>
  );
}
