import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactFloat } from "@/components/contact-float";
import { site } from "@/data/portfolio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url), title: { default: `${site.name} — ${site.title}`, template: `%s — ${site.name}` }, description: site.description,
  openGraph: { title: `${site.name} — ${site.title}`, description: site.description, url: site.url, siteName: site.name, type: "website" }, robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content">{children}</div><ContactFloat /><SiteFooter /><Analytics /></body></html>;
}
