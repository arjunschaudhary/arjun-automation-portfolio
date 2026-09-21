import { site } from "@/data/portfolio";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16_384;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function response(error: string, status: number) {
  return Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });
}

function field(value: unknown) {
  return typeof value === "string" ? value.trim() : null;
}

export async function POST(request: Request) {
  // A browser on another origin cannot submit to this endpoint through CORS.
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return response("Invalid submission origin.", 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return response("Expected JSON input.", 415);
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) return response("Message is too long.", 413);

  let payload: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (Buffer.byteLength(raw, "utf8") > MAX_BODY_BYTES) return response("Message is too long.", 413);
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid body");
    payload = parsed as Record<string, unknown>;
  } catch {
    return response("Please check the form and try again.", 400);
  }

  // Honeypot and short dwell time catch basic automated submissions without a CAPTCHA.
  if (payload.website) return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  const elapsed = Date.now() - Number(payload.startedAt);
  if (!Number.isFinite(elapsed) || elapsed < 3000) return response("Please wait a moment and submit again.", 400);

  const name = field(payload.name);
  const email = field(payload.email);
  const company = field(payload.company);
  const message = field(payload.message);
  if (!name || name.length < 2 || name.length > 100 || !email || email.length > 254 || !emailPattern.test(email) ||
      company === null || company.length > 120 || !message || message.length < 10 || message.length > 5000) {
    return response("Please complete the required fields with a valid name, email and message.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact email service is not configured");
    return response("The contact form is temporarily unavailable. Please use the email link instead.", 503);
  }

  try {
    const result = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [site.email],
        reply_to: email,
        subject: `Portfolio contact from ${name.replace(/[\r\n]/g, " ")}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany / Organization: ${company || "Not provided"}\n\nMessage:\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!result.ok) {
      console.error("Contact email provider returned status", result.status);
      return response("The email service could not accept your message. Please use the email link instead.", 502);
    }
    const outcome: unknown = await result.json().catch(() => null);
    if (!outcome || typeof outcome !== "object" || !("id" in outcome) || typeof outcome.id !== "string") {
      console.error("Contact email provider did not confirm submission");
      return response("The email service could not confirm your message. Please use the email link instead.", 502);
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Contact email provider request failed");
    return response("Could not connect to the email service. Please use the email link instead.", 502);
  }
}
