import type { Metadata } from "next";
import { ArrowUpRight, Github, Linkedin, Mail, MessageSquareText } from "lucide-react";
import { site } from "@/data/portfolio";

export const metadata: Metadata = { title: "Contact", description: "Contact Arjun Choudhary about AI automation and business systems roles or projects." };

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: "Connect professionally", href: site.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: "Review public work", href: site.github, icon: Github, external: true },
];

export default function ContactPage() {
  return <main className="page-main contact-page">
    <section className="page-hero"><div className="shell"><span className="eyebrow">Contact</span><h1>Have an operations problem that needs a system?</h1><p>I’m open to AI automation, automation engineering, business systems, process automation and AI operations opportunities.</p></div></section>
    <section className="section-pad"><div className="shell contact-page-layout">
      <article className="contact-primary"><MessageSquareText size={30} /><h2>Start with the operating context.</h2><p>Share the process, current tools, decision points and where work is getting stuck. I can then discuss a practical architecture or walk through a relevant case study.</p><small>For roles, collaborations or project conversations, email is the fastest way to reach me.</small></article>
      <div className="contact-links">{links.map((item) => <a className="contact-link" href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} key={item.label}><item.icon size={25} /><div><span>{item.label}</span><strong>{item.value}</strong></div><ArrowUpRight size={18} /></a>)}</div>
    </div></section>
  </main>;
}
