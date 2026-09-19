import { ArrowDown, ArrowRight, CircleDot, GitBranch, Network } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ArchitectureDiagram({ project }: { project: Project }) {
  return <div className="architecture" aria-label={`${project.title} architecture`}>
    <div className="architecture-label"><Network size={17} /> Inputs</div>
    <div className="source-row">{project.sources.map((source) => <span key={source}><CircleDot size={13} />{source}</span>)}</div>
    <ArrowDown className="architecture-down" aria-hidden="true" />
    <div className="flow-grid">{project.flow.map((step, index) => <div className="flow-node-wrap" key={step}><div className={index === project.flow.length - 1 ? "flow-node flow-node-output" : "flow-node"}><small>{String(index + 1).padStart(2,"0")}</small><strong>{step}</strong></div>{index < project.flow.length - 1 && <ArrowRight className="flow-arrow" size={17} aria-hidden="true" />}</div>)}</div>
    {project.branches && <><div className="branch-divider"><GitBranch size={16} /> intent-based paths</div><div className="branch-grid">{project.branches.map((branch) => <div className="branch" key={branch.label}><strong>{branch.label}</strong>{branch.steps.map((step, index) => <span key={step}>{step}{index < branch.steps.length - 1 && <i>→</i>}</span>)}</div>)}</div></>}
  </div>;
}
