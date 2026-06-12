import { NextResponse } from "next/server";
import { z } from "zod";
import { syncGoogleSheetRow } from "@/lib/google-sheets";
import { buildQuotePhotoSyncRow } from "@/lib/sheet-row";
import { quotePhotoSyncSchema } from "@/lib/validators/quote-photos";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quotePhotoSyncSchema.parse(body);

    const sheetResult = await syncGoogleSheetRow(buildQuotePhotoSyncRow(data));
    if (!sheetResult.ok) {
      if ("skipped" in sheetResult && sheetResult.skipped) {
        return NextResponse.json({ ok: true, skipped: true });
      }
      return NextResponse.json(
        { ok: false, error: sheetResult.error ?? "Failed to sync photos to Google Sheets" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Quote photo sync failed:", e);
    const message =
      e instanceof z.ZodError
        ? e.issues.map((issue) => issue.message).join("; ")
        : "Invalid request";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
