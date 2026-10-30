import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { professionalExperience, projects } from "@/data/portfolio";

export const metadata: Metadata = { title: "Projects", description: "Automation and AI-enabled business systems designed and built by Arjun Choudhary." };

export default function ProjectsPage() {
  return <main className="page-main"><section className="page-hero"><div className="shell"><span className="eyebrow">Project portfolio</span><h1>Systems that connect the full operating flow.</h1><p>Seven focused case studies covering intake, data reconciliation, decisions, communications, human review and operational handoff.</p></div></section><section className="section-pad"><div className="shell"><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} large={project.priority < 3} />)}</div></div></section><section className="section-pad section-tint"><div className="shell"><div className="section-heading"><div><span className="eyebrow">Selected professional experience</span><h2>Additional work, summarized without company details.</h2></div><p>Private employer projects are listed only at a high level. No client data, internal assets, implementation diagrams or repositories are shared.</p></div><div className="exploring-grid">{professionalExperience.map((item) => <article key={item.title}><span>Professional work</span><h3>{item.title}</h3><p>{item.summary}</p></article>)}</div></div></section></main>;
}
