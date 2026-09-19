import Link from "next/link";
import { site } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer"><div className="shell footer-wrap">
      <div><strong>Arjun Choudhary</strong><p>AI automation built around real operational decisions.</p></div>
      <div className="footer-links"><Link href="/projects">Projects</Link><a href={`mailto:${site.email}`}>Email</a><a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={site.github} target="_blank" rel="noreferrer">GitHub</a></div>
    </div></footer>
  );
}
