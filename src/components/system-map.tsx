import { ArrowDown, ArrowRight, Database, GitBranch, ShieldCheck, Sparkles, Workflow } from "lucide-react";

const stages = [
  { label: "Data sources", note: "Forms, APIs, CRM and events", icon: Database },
  { label: "Automation", note: "Normalize, schedule and sync", icon: Workflow },
  { label: "Business logic", note: "Qualify, branch and suppress", icon: GitBranch },
  { label: "AI + human decisions", note: "Context, review and approval", icon: Sparkles },
  { label: "Operational output", note: "Dashboards, follow-up and handoff", icon: ShieldCheck },
];

export function SystemMap() {
  const SourceIcon = stages[0].icon;
  const OutputIcon = stages[4].icon;

  return <div className="system-map" aria-label="How Arjun builds operational systems">
    <div className="system-edge-node">
      <span className="system-step">01 · Input</span>
      <SourceIcon size={21} />
      <strong>{stages[0].label}</strong>
      <small>{stages[0].note}</small>
    </div>
    <ArrowRight className="system-direction system-direction-right" size={20} aria-hidden="true" />
    <ArrowDown className="system-direction system-direction-down" size={20} aria-hidden="true" />
    <div className="system-core">
      {stages.slice(1, 4).map((stage, index) => <div className="system-core-step" key={stage.label}>
        <stage.icon size={18} />
        <div><span className="system-step">0{index + 2}</span><strong>{stage.label}</strong><small>{stage.note}</small></div>
        {index < 2 && <ArrowDown className="core-arrow" size={15} aria-hidden="true" />}
      </div>)}
    </div>
    <ArrowRight className="system-direction system-direction-right" size={20} aria-hidden="true" />
    <ArrowDown className="system-direction system-direction-down" size={20} aria-hidden="true" />
    <div className="system-edge-node system-output-node">
      <span className="system-step">05 · Output</span>
      <OutputIcon size={21} />
      <strong>{stages[4].label}</strong>
      <small>{stages[4].note}</small>
    </div>
  </div>;
}
