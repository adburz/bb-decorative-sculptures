import type { APIRoute } from "astro";
import { contactSchema } from "~/lib/validation/contact";

export const prerender = false;

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function verifyTurnstile(token: string, clientIp: string | null): Promise<boolean> {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (clientIp) params.set("remoteip", clientIp);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body: params });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const code = parsed.error.issues[0]?.message ?? "validation_failed";
    return json(400, { ok: false, error: code });
  }
  const data = parsed.data;

  if (data.company && data.company.length > 0) {
    return json(400, { ok: false, error: "honeypot_filled" });
  }

  const clientIp =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    clientAddress ??
    null;

  const turnstileOk = await verifyTurnstile(data["cf-turnstile-response"], clientIp);
  if (!turnstileOk) {
    return json(400, { ok: false, error: "turnstile_failed" });
  }

  const accessKey = import.meta.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    if (import.meta.env.DEV) {
      console.info("[api/contact] WEB3FORMS_ACCESS_KEY not set — dev echo", data);
      return json(200, { ok: true, dev: true });
    }
    return json(500, { ok: false, error: "not_configured" });
  }

  const sculptureLine = data.sculpture ? `Sculpture: ${data.sculpture}` : "";
  const ipLine = clientIp ? `IP: ${clientIp}` : "";
  const contextLines = [sculptureLine, ipLine].filter(Boolean).join("\n");
  const body = contextLines ? `${data.message}\n\n---\n${contextLines}` : data.message;
  const subject = data.subject || `Zapytanie od ${data.name}`;

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: `[rzezbadekoracyjna.pl] ${data.name}`,
        subject,
        email: data.email,
        message: body,
        botcheck: "",
      }),
    });

    if (!res.ok) {
      return json(502, { ok: false, error: "upstream_failed" });
    }
    const result = (await res.json()) as { success?: boolean; message?: string };
    if (!result.success) {
      return json(502, { ok: false, error: result.message ?? "upstream_failed" });
    }
    return json(200, { ok: true });
  } catch {
    return json(502, { ok: false, error: "network_error" });
  }
};
