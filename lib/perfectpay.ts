// Perfect Pay integration — will be implemented in Phase 4 (Paywall) and Phase 7 (Webhook)
// Webhook POST to /api/webhook
// Validate webhook signature before processing

export const PERFECTPAY_LINKS = {
  semanal: process.env.NEXT_PUBLIC_PERFECTPAY_LINK_SEMANAL ?? "",
  anual: process.env.NEXT_PUBLIC_PERFECTPAY_LINK_ANUAL ?? "",
  oto1: process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1 ?? "",
  oto2: process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO2 ?? "",
  oto3: process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3 ?? "",
};
