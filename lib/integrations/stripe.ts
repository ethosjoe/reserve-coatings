/**
 * Stripe deposit-on-signature — stub for post-launch.
 * See README "Stripe go-live" before enabling.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createDepositCheckoutSession(_params: {
  customerEmail: string;
  amountCents: number;
  proposalId: string;
}) {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY not configured");
  }
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  // return stripe.checkout.sessions.create({ ... });
  return { url: null, stub: true };
}
