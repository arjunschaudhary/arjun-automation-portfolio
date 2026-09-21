"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [startedAt, setStartedAt] = useState(0);

  useEffect(() => { setStartedAt(Date.now()); }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          email: fields.get("email"),
          company: fields.get("company"),
          message: fields.get("message"),
          website: fields.get("website"),
          startedAt,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The message could not be sent. Please try again or use the email link.");
      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The message could not be sent. Please use the email link.");
      setStatus("error");
    }
  }

  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="contact-form-row">
      <label htmlFor="contact-name">Name <span aria-hidden="true">*</span><input id="contact-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} disabled={status === "sending"} /></label>
      <label htmlFor="contact-email">Email <span aria-hidden="true">*</span><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} disabled={status === "sending"} /></label>
    </div>
    <label htmlFor="contact-company">Company / Organization <span className="contact-optional">Optional</span><input id="contact-company" name="company" type="text" autoComplete="organization" maxLength={120} disabled={status === "sending"} /></label>
    <label htmlFor="contact-message">Message <span aria-hidden="true">*</span><textarea id="contact-message" name="message" rows={6} required minLength={10} maxLength={5000} disabled={status === "sending"} placeholder="What are you working on, and where could a system help?" /></label>
    <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty<input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="contact-form-bottom">
      <button className="button button-primary contact-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"} {status !== "sending" && <ArrowRight size={18} aria-hidden="true" />}
      </button>
      <span className="contact-form-hint">Required fields are marked *</span>
    </div>
    <div className="contact-form-feedback" role="status" aria-live="polite">
      {status === "success" && <p className="contact-form-success"><CheckCircle2 size={19} aria-hidden="true" /> Message sent. Thanks for reaching out—I’ll reply by email.</p>}
      {status === "error" && <p className="contact-form-error">{error}</p>}
    </div>
  </form>;
}
