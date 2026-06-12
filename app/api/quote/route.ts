import { NextResponse } from "next/server";
import { dispatchQuoteSubmission } from "@/lib/dispatch-submission";
import { quoteSchema } from "@/lib/validators/quote";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = quoteSchema.parse(body);

    await dispatchQuoteSubmission(data);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Quote submission failed:", e);
    const message = e instanceof Error ? e.message : "Invalid request";
    const isSheetError = message.includes("Google Sheets") || message.includes("Sheet");
    return NextResponse.json(
      { ok: false, error: isSheetError ? message : "Invalid request" },
      { status: isSheetError ? 502 : 400 }
    );
  }
}
