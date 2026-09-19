import type { Metadata } from "next";
import { CheckCircle2, Database, GitBranch, Network, ScanSearch, ShieldCheck } from "lucide-react";
import { capabilities, integrationGroups } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: "About Arjun Choudhary, AI Automation & Business Systems Builder.",
};

const principles = [
  "Understand the process before selecting tools.",
  "Normalize data before applying AI or business rules.",
  "Design retries, deduplication and suppression early.",
  "Retain human approval for high-impact actions.",
  "Test the full handoff, not only the happy path.",
];

const workSteps = [
  { number: "01", title: "Map the process", text: "Inputs, owners, handoffs and failure points.", icon: ScanSearch },
  { number: "02", title: "Structure the data", text: "Clean fields and one reliable source of truth.", icon: Database },
  { number: "03", title: "Encode the logic", text: "Rules, eligibility, branching and stop conditions.", icon: GitBranch },
  { number: "04", title: "Connect the system", text: "APIs, AI, dashboards and human approval.", icon: Network },
  { number: "05", title: "Test the journey", text: "Retries, duplicates, edge cases and visible status.", icon: ShieldCheck },
];

export default function AboutPage() {
  return (
    <main className="page-main">
      <section className="page-hero">
        <div className="shell">
          <span className="eyebrow">About</span>
          <h1>I translate operational problems into systems people can use and trust.</h1>
          <p>My work sits between workflow design, APIs, AI, data structure, dashboards and the human decisions that should remain human.</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="shell">
          <section className="how-work-section" aria-labelledby="how-i-work">
            <div className="how-work-heading">
              <div><span className="eyebrow">Working method</span><h2 id="how-i-work">How I work</h2></div>
              <p>I turn the operating process into a visible, testable system—from first input to final handoff.</p>
            </div>
            <div className="work-flow" aria-label="Five-step system building process">
              {workSteps.map((step) => <article className="work-node" key={step.number}>
                <div className="work-node-top"><span>{step.number}</span><step.icon size={19} /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>)}
            </div>
          </section>
          <article className="principle-card principle-card-wide">
            <div><span className="eyebrow">Build principles</span><h2>Controls designed in from the start.</h2></div>
            <ul>{principles.map((item) => <li key={item}><CheckCircle2 />{item}</li>)}</ul>
          </article>
          <div className="about-capabilities">
            <span className="eyebrow">Core capabilities</span>
            <div>{capabilities.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="integration-grid about-integrations">
            {integrationGroups.map((group) => <article key={group.label}><h3>{group.label}</h3><ul>{group.items.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}
