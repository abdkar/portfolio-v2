import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">Research &amp; software</Reveal>
          <Reveal as="h1" delay={80} className="page-title">Research and software projects.</Reveal>
          <Reveal as="p" delay={160} className="page-intro">
            Projects in model validation, clinical speech, medical imaging, and infrastructure. Each project describes my contribution and links to the available code and publications.
          </Reveal>
        </div>
      </section>
      <section className="section-bottom">
        <div className="container">
          <ProjectList projects={projects} showYear heading="h2" />
        </div>
      </section>
    </>
  );
}
