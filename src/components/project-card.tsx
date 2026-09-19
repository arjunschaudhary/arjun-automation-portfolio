"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, X } from "lucide-react";
import { useRef } from "react";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const stepCount = large ? 5 : 4;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `quick-view-${project.slug}`;

  return <>
    <article className={`project-card ${large ? "project-card-large" : ""}`}>
      <div className="project-card-top"><span className="eyebrow">{project.eyebrow}</span><span className={`status status-${project.statusTone}`}>{project.status}</span></div>
      <div><h3>{project.title}</h3><p>{project.summary}</p></div>
      <div className="mini-flow" aria-label={`${project.title} process`}>{project.flow.slice(0, stepCount).map((step, index) => <span key={step}>{step}{index < Math.min(project.flow.length, stepCount) - 1 && <i>→</i>}</span>)}</div>
      <div className="tag-row">{project.stack.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
      <div className="card-actions">
        <button className="quick-view-button" type="button" onClick={() => dialogRef.current?.showModal()} aria-haspopup="dialog"><Eye size={15} /> Quick view</button>
        <Link href={`/projects/${project.slug}`}>Full case study <ArrowRight size={16} /></Link>
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live app <ExternalLink size={14} /></a>}
      </div>
    </article>
    <dialog className="quick-view-dialog" ref={dialogRef} aria-labelledby={titleId} onClick={(event) => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="quick-view-panel">
        <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close quick view"><X size={19} /></button>
        <span className="eyebrow">{project.eyebrow}</span>
        <h2 id={titleId}>{project.title}</h2>
        <p>{project.summary}</p>
        <span className={`status status-${project.statusTone}`}>{project.status}</span>
        <div className="quick-view-flow">{project.flow.slice(0, 5).map((step, index) => <span key={step}><small>{String(index + 1).padStart(2, "0")}</small>{step}</span>)}</div>
        <div className="tag-row">{project.stack.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>
        <div className="quick-view-actions"><Link className="button button-primary" href={`/projects/${project.slug}`}>View full case study <ArrowRight size={16} /></Link>{project.liveUrl && <a className="button button-secondary" href={project.liveUrl} target="_blank" rel="noreferrer">Open live app <ExternalLink size={15} /></a>}</div>
      </div>
    </dialog>
  </>;
}
