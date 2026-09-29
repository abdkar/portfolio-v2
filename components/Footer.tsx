import Link from "next/link";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-name">{site.name}</p>
            <p className="footer-sub">Trustworthy AI · Scientific software · Reproducible research</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <Link href="/work">Work</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/expertise">Expertise</Link>
            <Link href="/publications">Publications</Link>
            <a href={site.cv} target="_blank" rel="noopener">CV</a>
            <Link href="/#contact">Contact</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
