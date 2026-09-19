import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="page-main"><section className="page-hero"><div className="shell"><span className="eyebrow">404</span><h1>This page is not part of the system.</h1><p>The link may be outdated or the project may have moved.</p><div className="hero-actions"><Link className="button button-primary" href="/"><ArrowLeft size={16} /> Return home</Link></div></div></section></main>;
}
