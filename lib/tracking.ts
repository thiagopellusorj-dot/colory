/**
 * Helper de tracking do Meta Pixel.
 * Nunca chamar window.fbq direto nas páginas — sempre trackMeta().
 *
 * O Purchase NÃO sai daqui — fica 100% a cargo da UTMify via Conversions API.
 * Ver TrackingProvider.tsx para o carregamento dos scripts.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    pixelId?: string;
  }
}

type MetaEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "InitiateCheckout"
  | "CompleteRegistration";

export function trackMeta(event: MetaEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params ?? {});
}
