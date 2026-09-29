"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import Magnetic from "./Magnetic";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/#about", label: "Experience" },
  { href: "/expertise", label: "Expertise" },
  { href: "/#publications", label: "Publications" },
];

export default function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">(site.defaultTheme);

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark" | "light") || site.defaultTheme);
  }, []);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const isActive = (href: string) => !href.includes("#") && (path === href || path.startsWith(href + "/"));

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">AK</span>
            <span className="brand-name">
              Abdolamir
              <br />
              Karbalaie
            </span>
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={isActive(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
            <a href={site.cv} target="_blank" rel="noopener" className="nav-link">
              CV
            </a>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
              <span className="theme-glyph" />
            </button>
            <span className="header-cta">
              <Magnetic>
                <Link href="/#contact" className="btn btn-sm">
                  <span>Let’s talk</span>
                  <span className="arrow">↗</span>
                </Link>
              </Magnetic>
            </span>
            <button className="icon-btn burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <div className="mobile-menu">
          {[...NAV, { href: "/#contact", label: "Contact" }].map((n, i) => (
            <Link key={n.href} href={n.href} onClick={() => setMenu(false)} style={{ animationDelay: `${i * 60}ms` }}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {n.label}
            </Link>
          ))}
          <a href={site.cv} target="_blank" rel="noopener" style={{ animationDelay: "300ms" }}>
            <span>06</span>CV
          </a>
          <p className="menu-foot">
            {site.location} · {site.email}
          </p>
        </div>
      )}
    </>
  );
}
