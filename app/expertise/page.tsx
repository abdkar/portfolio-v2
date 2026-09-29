import type { Metadata } from "next";
import ExpertiseList from "@/components/ExpertiseList";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Expertise" };

export default function ExpertisePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">Capabilities in practice</Reveal>
          <Reveal as="h1" delay={80} className="page-title">Methods and technical expertise.</Reveal>
          <Reveal as="p" delay={160} className="page-intro">
            Methods I use in research and software development, with examples from completed and ongoing projects.
          </Reveal>
        </div>
      </section>
      <section className="section-bottom">
        <div className="container">
          <ExpertiseList />
        </div>
      </section>
    </>
  );
}
