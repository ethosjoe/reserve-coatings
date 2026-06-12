export async function forwardToCrm(payload: Record<string, unknown>) {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) return { ok: true, skipped: true };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      source: "reserve-coatings-website",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) throw new Error(`CRM webhook failed: ${res.status}`);
  return { ok: true };
}
