"use client";

import { useState } from "react";
import { Check, Clock3, FileCheck2, MapPin, Search } from "lucide-react";

const records = [
  { id: "EPC-1042", project: "Project Northstar", stage: "Proposal", owner: "Delivery Team", next: "Review revision 2", flag: "Approval required" },
  { id: "EPC-1048", project: "Project Horizon", stage: "Site visit", owner: "Field Team", next: "Visit scheduled", flag: "Calendar synced" },
  { id: "EPC-1051", project: "Project Cedar", stage: "Follow-up", owner: "Sales Team", next: "Next action due", flag: "Send window open" },
];

export function SyntheticDemo() {
  const [selected, setSelected] = useState(0);
  const record = records[selected];
  return <div className="demo-window" id="portfolio-demo">
    <div className="demo-bar"><div><span className="demo-dot red" /><span className="demo-dot yellow" /><span className="demo-dot green" /></div><span>Portfolio representation · synthetic data</span></div>
    <div className="demo-body">
      <aside className="demo-sidebar"><strong>Operations</strong>{["Command center", "Enquiries", "Site visits", "Proposals", "Delivery queue"].map((item, index) => <span className={index === 0 ? "active" : ""} key={item}>{item}</span>)}</aside>
      <div className="demo-main">
        <div className="demo-heading"><div><small>Solar EPC · synthetic workspace</small><h3>Operations command center</h3></div><button type="button"><Search size={15} /> Search</button></div>
        <div className="demo-kpis"><span><small>Active queue</small><strong>6</strong></span><span><small>Needs review</small><strong>2</strong></span><span><small>Visits today</small><strong>3</strong></span><span><small>Ready to deliver</small><strong>1</strong></span></div>
        <div className="demo-layout"><div className="demo-table"><div className="demo-table-head"><span>Record</span><span>Stage</span><span>Next action</span></div>{records.map((item, index) => <button type="button" className={selected === index ? "selected" : ""} onClick={() => setSelected(index)} key={item.id}><span><strong>{item.project}</strong><small>{item.id}</small></span><span>{item.stage}</span><span>{item.next}</span></button>)}</div>
          <div className="demo-detail"><span className="demo-chip">{record.stage}</span><h4>{record.project}</h4><p>{record.id} · Owned by {record.owner}</p><ul><li><Clock3 size={14} /><span>Next action</span><strong>{record.next}</strong></li><li><FileCheck2 size={14} /><span>Control</span><strong>{record.flag}</strong></li><li><MapPin size={14} /><span>Data mode</span><strong>Synthetic</strong></li></ul><button type="button" className="demo-action"><Check size={15} /> Mark reviewed</button></div>
        </div>
      </div>
    </div>
  </div>;
}
