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

  try {
    // FormSubmit's AJAX endpoint documents form fields, not a JSON request body.
    const form = new URLSearchParams({
      name,
      email,
      company: company || "Not provided",
      message,
      _subject: "New portfolio contact",
      _captcha: "false",
    });
    const result = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: form,
      signal: AbortSignal.timeout(10_000),
    });
    if (!result.ok) {
      console.error("Contact email provider returned status", result.status);
      return response("The message could not be sent right now. Please use the email link instead.", 502);
    }
    const outcome: unknown = await result.json();
    if (!outcome || typeof outcome !== "object" || !("success" in outcome) || ![true, "true"].includes(outcome.success as boolean | string)) {
      console.error("Contact email provider did not confirm submission");
      return response("The message could not be sent right now. Please use the email link instead.", 502);
    }
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    console.error("Contact email provider request failed");
    return response("The message could not be sent right now. Please use the email link instead.", 502);
  }
}
