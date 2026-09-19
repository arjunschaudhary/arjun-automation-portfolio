import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Github, ShieldCheck } from "lucide-react";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { SyntheticDemo } from "@/components/synthetic-demo";
import { projects } from "@/data/portfolio";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const project = projects.find((item) => item.slug === slug); return project ? { title: project.title, description: project.summary } : {}; }

function DetailList({ items }: { items: string[] }) { return <ul className="detail-list">{items.map((item) => <li key={item}><CheckCircle2 size={17} /><span>{item}</span></li>)}</ul>; }

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params; const project = projects.find((item) => item.slug === slug); if (!project) notFound();
  return <main className="page-main case-page">
    <section className="case-hero"><div className="shell"><Link className="back-link" href="/projects"><ArrowLeft size={15} /> All projects</Link><div className="case-hero-grid"><div><span className="eyebrow">{project.eyebrow}</span><h1>{project.title}</h1><p>{project.summary}</p><div className="case-actions">{project.liveUrl ? <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noreferrer">{project.demoLabel} <ExternalLink size={16} /></a> : project.priority === 1 ? <a className="button button-primary" href="#portfolio-demo">{project.demoLabel} <ArrowRight size={16} /></a> : null}{project.githubUrl && <a className="button button-secondary" href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> Public repository</a>}</div></div><aside><span className={`status status-${project.statusTone}`}>{project.status}</span>{project.metric && <div className="metric"><strong>{project.metric.value}</strong><span>{project.metric.label}</span><small>{project.metric.note}</small></div>}<div className="case-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></aside></div></div></section>
    <section className="case-section"><div className="shell case-two-col"><div><span className="case-number">01</span><h2>Overview</h2><p>{project.overview}</p></div><div><span className="case-number">02</span><h2>Business problem</h2><p>{project.problem}</p></div></div></section>
    <section className="case-section section-tint"><div className="shell"><div className="case-heading"><span className="case-number">03</span><h2>System architecture</h2><p>Input → processing → decision → integration → operational output.</p></div><ArchitectureDiagram project={project} /></div></section>
    <section className="case-section"><div className="shell case-grid"><article><span className="case-number">04</span><h2>My role</h2><p>{project.role}</p></article><article><span className="case-number">05</span><h2>Key automation logic</h2><DetailList items={project.logic} /></article></div></section>
    {project.priority === 1 && <section className="case-section demo-section"><div className="shell"><div className="case-heading"><span className="case-number">06</span><h2>Interactive portfolio demo</h2><p>Recreated with synthetic project records to protect organizational information.</p></div><SyntheticDemo /></div></section>}
    <section className="case-section section-tint"><div className="shell case-grid triple"><article><span className="case-number">{project.priority === 1 ? "07" : "06"}</span><h2>Technical challenges</h2><DetailList items={project.challenges} /></article><article><span className="case-number">{project.priority === 1 ? "08" : "07"}</span><h2>Testing &amp; reliability</h2><DetailList items={project.testing} /></article><article><span className="case-number">{project.priority === 1 ? "09" : "08"}</span><h2>Integrations</h2><div className="integration-tags">{project.integrations.map((item) => <span key={item}>{item}</span>)}</div></article></div></section>
    <section className="case-section"><div className="shell outcome-card"><ShieldCheck size={28} /><div><span className="eyebrow">Result / current status</span><h2>Credible progress, stated precisely.</h2><p>{project.result}</p></div></div></section>
    <section className="case-section decisions-section"><div className="shell case-two-col"><div><span className="case-number">Engineering decisions</span><h2>What shaped the build</h2></div><DetailList items={project.decisions} /></div></section>
    <section className="next-project"><div className="shell"><Link href={`/projects/${projects[(project.priority) % projects.length].slug}`}><span>Next case study</span><strong>{projects[(project.priority) % projects.length].title}</strong><ArrowRight /></Link></div></section>
  </main>;
}
