import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/portfolio";

export const metadata: Metadata = { title: "Projects", description: "Automation and AI-enabled business systems designed and built by Arjun Choudhary." };

export default function ProjectsPage() {
  return <main className="page-main"><section className="page-hero"><div className="shell"><span className="eyebrow">Project portfolio</span><h1>Systems that connect the full operating flow.</h1><p>Six focused case studies covering intake, data reconciliation, decisions, communications, human review and operational handoff.</p></div></section><section className="section-pad"><div className="shell"><div className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project} large={project.priority < 3} />)}</div></div></section></main>;
}
