"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackMeta } from "@/lib/tracking";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const UTMIFY_PIXEL_ID = process.env.NEXT_PUBLIC_UTMIFY_PIXEL_ID;

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  // SPA PageView — pula o primeiro disparo porque o snippet oficial da Meta
  // já dispara PageView no load inicial. Sem esse skip, a primeira visita
  // contaria PageView 2x.
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);

  return (
    <>
      {/* Meta Pixel — snippet oficial */}
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* UTMify — captura UTMs da URL, persiste no localStorage e injeta nos
          links de checkout (PerfectPay está na whitelist oficial). */}
      <Script
        id="utmify-utms"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        strategy="afterInteractive"
        data-utmify-prevent-xcod-sck=""
        data-utmify-prevent-subids=""
        async
        defer
      />

      {/* UTMify Pixel — espelha eventos do fbq via Conversions API com event_id
          deduplicado. É o que vai disparar o Purchase server-side quando o
          PerfectPay fizer postback. */}
      {UTMIFY_PIXEL_ID && (
        <>
          <Script
            id="utmify-pixel-id"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.pixelId = "${UTMIFY_PIXEL_ID}";`,
            }}
          />
          <Script
            id="utmify-pixel"
            src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
            strategy="afterInteractive"
            async
            defer
          />
        </>
      )}

      {children}
    </>
  );
}
