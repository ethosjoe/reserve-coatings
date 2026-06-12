import { Resend } from "resend";
import { forwardToCrm } from "@/lib/crm";
import { syncGoogleSheetRow } from "@/lib/google-sheets";
import { buildLeadSheetRow, buildQuoteSheetRow } from "@/lib/sheet-row";
import { formatCurrency } from "@/lib/pricing";
import { leadConfirmationEmail, leadInternalEmail } from "@/lib/email/templates";
import type { LeadInput } from "@/lib/validators/lead";
import type { QuoteInput } from "@/lib/validators/quote";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendLeadEmails(data: LeadInput) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) return;

  try {
    const confirm = leadConfirmationEmail(data.firstName);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: data.email,
      subject: confirm.subject,
      html: confirm.html,
    });

    if (process.env.RESEND_TO_EMAIL) {
      const internal = leadInternalEmail(data);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: internal.subject,
        html: internal.html,
      });
    }
  } catch (err) {
    console.error("Lead email dispatch failed:", err);
  }
}

async function sendQuoteEmails(data: QuoteInput) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) return;

  try {
    const confirm = leadConfirmationEmail(data.firstName);
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: data.email,
      subject: `Your Reserve estimate: ${formatCurrency(data.estimateLow)} – ${formatCurrency(data.estimateHigh)}`,
      html: `${confirm.html}<p>Estimate range: <strong>${formatCurrency(data.estimateLow)} – ${formatCurrency(data.estimateHigh)}</strong></p>`,
    });

    if (process.env.RESEND_TO_EMAIL) {
      const internal = leadInternalEmail(data);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.RESEND_TO_EMAIL,
        subject: internal.subject,
        html: internal.html,
      });
    }
  } catch (err) {
    console.error("Quote email dispatch failed:", err);
  }
}

/** Google Sheets is primary; CRM/email failures must not block user success. */
export async function dispatchLeadSubmission(data: LeadInput) {
  const sheetResult = await syncGoogleSheetRow(buildLeadSheetRow(data));
  if (!sheetResult.ok) {
    if ("skipped" in sheetResult && sheetResult.skipped) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set — lead saved without sheet row");
    } else {
      console.error("Google Sheets append failed for lead:", sheetResult.error);
      throw new Error(sheetResult.error ?? "Failed to save inquiry to Google Sheets");
    }
  }

  await Promise.allSettled([
    forwardToCrm({ type: "lead", ...data }),
    sendLeadEmails(data),
  ]);
}

export async function dispatchQuoteSubmission(data: QuoteInput) {
  const row = buildQuoteSheetRow(data);
  if (row.photoUrls) {
    console.info(
      `Quote sheet sync: submissionId=${row.submissionId || "none"} photoCount=${row.photoUrls.split("\n").filter(Boolean).length}`
    );
  }
  const sheetResult = await syncGoogleSheetRow(row);
  if (!sheetResult.ok) {
    if ("skipped" in sheetResult && sheetResult.skipped) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL not set — quote saved without sheet row");
    } else {
      console.error("Google Sheets append failed for quote:", sheetResult.error);
      throw new Error(sheetResult.error ?? "Failed to save inquiry to Google Sheets");
    }
  }

  await Promise.allSettled([
    forwardToCrm({
      type: "instant_quote",
      ...data,
      estimateRange: `${formatCurrency(data.estimateLow)} – ${formatCurrency(data.estimateHigh)}`,
    }),
    sendQuoteEmails(data),
  ]);
}
