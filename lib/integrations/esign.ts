/**
 * DocuSeal / HelloSign e-signature — stub for post-launch.
 * Set DOCUSEAL_API_KEY or HELLOSIGN_API_KEY per README.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function sendProposalForSignature(_params: {
  signerEmail: string;
  documentUrl: string;
}) {
  if (!process.env.DOCUSEAL_API_KEY && !process.env.HELLOSIGN_API_KEY) {
    return { ok: false, stub: true };
  }
  return { ok: true, stub: true };
}
