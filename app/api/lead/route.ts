import { NextResponse } from "next/server";
import { dispatchLeadSubmission } from "@/lib/dispatch-submission";
import { leadSchema } from "@/lib/validators/lead";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);

    await dispatchLeadSubmission(data);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Lead submission failed:", e);
    const message = e instanceof Error ? e.message : "Invalid request";
    const isSheetError = message.includes("Google Sheets") || message.includes("Sheet");
    return NextResponse.json(
      { ok: false, error: isSheetError ? message : "Invalid request" },
      { status: isSheetError ? 502 : 400 }
    );
  }
}
