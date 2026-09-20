import type { Metadata } from "next";
import { BadgeCheck, CopyCheck, Database, GitBranch, Network, Route, ScanSearch, ShieldCheck, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About Arjun Choudhary, AI Automation & Business Systems Builder.",
};

const principles = [
  { title: "Validate early", text: "Clean inputs before downstream automation.", icon: BadgeCheck },
  { title: "Prevent duplicates", text: "Use deduplication, idempotency and suppression.", icon: CopyCheck },
  { title: "Keep human approval", text: "High-impact decisions remain human-controlled.", icon: UserCheck },
  { title: "Test failure paths", text: "Design retries, edge cases and handoffs deliberately.", icon: Route },
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
              <div><span className="eyebrow">Working method</span><h2 className="how-work-title" id="how-i-work" aria-label="How I work"><span aria-hidden="true">How</span><span aria-hidden="true">I</span><span aria-hidden="true">work</span></h2></div>
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
          <section className="principles-section" aria-labelledby="build-principles">
            <div className="principles-heading"><span className="eyebrow">Build principles</span><h2 id="build-principles">Controls designed in from the start.</h2></div>
            <div className="principle-grid">{principles.map((principle) => <article className="principle-control" key={principle.title}>
              <principle.icon size={20} />
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>)}</div>
          </section>
        </div>
      </section>
    </main>
  );
}
