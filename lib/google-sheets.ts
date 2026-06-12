import type { SheetRow } from "@/lib/sheet-row";

async function postToGoogleSheetWebhook(row: SheetRow) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not set — skipping sheet sync");
    return { ok: true, skipped: true as const };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      redirect: "follow",
    });

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      parsed = null;
    }

    if (!res.ok) {
      console.error(`Google Sheets webhook failed: HTTP ${res.status}`, text);
      return { ok: false as const, error: `HTTP ${res.status}` };
    }

    if (!parsed || parsed.ok !== true) {
      const err = parsed?.error ?? (text.startsWith("<") ? "Invalid webhook response" : text.slice(0, 200));
      console.error("Google Sheets webhook returned error:", err);
      return { ok: false as const, error: err || "Sheet rejected payload" };
    }

    return { ok: true as const };
  } catch (err) {
    console.error("Google Sheets webhook error:", err);
    return { ok: false as const, error: String(err) };
  }
}

/** Upserts when row includes submissionId; otherwise appends (handled by Apps Script). */
export async function syncGoogleSheetRow(row: SheetRow) {
  return postToGoogleSheetWebhook(row);
}

/** @deprecated Use syncGoogleSheetRow */
export async function appendToGoogleSheet(row: SheetRow) {
  return syncGoogleSheetRow(row);
}
