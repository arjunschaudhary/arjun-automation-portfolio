import { ArrowDown, ArrowRight, Database, GitBranch, ShieldCheck, Sparkles, Workflow } from "lucide-react";

const source = { number: "01", label: "Signals & Data", note: "Forms · APIs · CRM · Events", icon: Database };
const processing = [
  { number: "02", label: "Normalize", note: "Clean · Dedupe · Structure", icon: Workflow },
  { number: "03", label: "Apply Logic", note: "Rules · Eligibility · Routing", icon: GitBranch },
  { number: "04", label: "AI + Human Review", note: "Context · Judgment · Approval", icon: Sparkles },
];
const output = { number: "05", label: "Operational Action", note: "Follow-up · Dashboards · Handoff", icon: ShieldCheck };

function SystemNode({ stage, className = "" }: {
  stage: typeof source;
  className?: string;
}) {
  const Icon = stage.icon;

  return <div className={`system-node ${className}`}>
    <div className="system-node-top"><span className="system-step">{stage.number}</span><Icon size={18} /></div>
    <strong>{stage.label}</strong>
    <small>{stage.note}</small>
  </div>;
}

export function SystemMap() {
  return <div className="system-map" aria-label="How Arjun builds operational systems">
    <SystemNode stage={source} className="system-node-edge" />
    <ArrowDown className="system-flow-arrow" size={18} aria-hidden="true" />
    <div className="system-middle-row">
      {processing.map((stage, index) => <div className="system-middle-item" key={stage.label}>
        <SystemNode stage={stage} />
        {index < processing.length - 1 && <ArrowRight className="system-middle-arrow" size={16} aria-hidden="true" />}
      </div>)}
    </div>
    <ArrowDown className="system-flow-arrow" size={18} aria-hidden="true" />
    <SystemNode stage={output} className="system-node-edge system-output-node" />
  </div>;
}
