import Link from "next/link";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { site } from "@/data/portfolio";

export function SiteHeader() {
  return (
    <header className="site-header"><div className="shell nav-wrap">
      <Link className="brand" href="/" aria-label="Arjun Choudhary home"><span className="brand-mark"><GitBranch size={17} /></span><span>Arjun Choudhary</span></Link>
      <nav className="nav-links" aria-label="Primary navigation"><Link href="/projects">Projects</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav>
      <a className="nav-cta" href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
    </div></header>
  );
}
