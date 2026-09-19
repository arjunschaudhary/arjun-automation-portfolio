import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { capabilities, exploring, integrationGroups, projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";
import { SystemMap } from "@/components/system-map";

export default function HomePage() {
  const featured = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);
  return <main>
    <section className="hero section-pad"><div className="shell hero-grid">
      <div className="hero-copy"><span className="availability"><i /> Open to automation and business systems roles</span><p className="hero-name">Arjun Choudhary</p><h1>AI Automation &amp;<br />Business Systems Builder</h1><p className="hero-lede">I design automation systems that connect APIs, AI, operational dashboards and business workflows—from lead intake and engagement to follow-up, reporting and handoff.</p><div className="hero-actions"><Link className="button button-primary" href="/projects">Explore systems <ArrowRight size={16} /></Link><Link className="button button-secondary" href="/contact">Discuss an opportunity</Link></div></div>
      <div className="hero-panel"><span className="panel-kicker">Operating model</span><SystemMap /></div>
    </div></section>
    <section className="capability-strip" aria-label="Core capabilities"><div className="shell capability-row">{capabilities.map((capability) => <span key={capability}>{capability}</span>)}</div></section>
    <section className="section-pad"><div className="shell">
      <div className="section-heading"><div><span className="eyebrow">Selected systems</span><h2>Complete operational workflows, not isolated automations.</h2></div><p>Each case study shows the inputs, decisions, integrations, reliability controls and handoffs behind the interface.</p></div>
      <div className="project-grid featured-grid">{featured.map((project, index) => <ProjectCard key={project.slug} project={project} large={index < 2} />)}</div>
      <div className="project-grid compact-projects">{additional.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      <div className="section-link"><Link href="/projects">See all projects and technical detail <ArrowRight size={16} /></Link></div>
    </div></section>
    <section className="section-pad section-tint"><div className="shell"><div className="section-heading narrow-heading"><div><span className="eyebrow">Integration experience</span><h2>Tools grouped by the job they perform.</h2></div></div><div className="integration-grid">{integrationGroups.map((group) => <article key={group.label}><h3>{group.label}</h3><ul>{group.items.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul></article>)}</div></div></section>
    <section className="section-pad"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Currently exploring</span><h2>Active research and early-stage builds.</h2></div><p>These are intentionally separated from completed flagship systems.</p></div><div className="exploring-grid">{exploring.map((item) => <article key={item.title}><span>Exploring</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div></section>
    <section className="section-pad cta-section"><div className="shell cta-card"><div><span className="eyebrow">Recruiting or collaborating?</span><h2>Let’s talk about the operational problem first.</h2><p>I can walk through the architecture, tradeoffs and reliability decisions behind these systems.</p></div><Link className="button button-light" href="/contact">Contact Arjun <ArrowRight size={16} /></Link></div></section>
  </main>;
}
