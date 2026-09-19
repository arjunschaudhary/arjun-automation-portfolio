import Link from "next/link";
import { Mail } from "lucide-react";

export function ContactFloat() {
  return <Link className="contact-float" href="/contact" aria-label="Contact Arjun Choudhary"><Mail size={17} /><span>Contact</span></Link>;
}
