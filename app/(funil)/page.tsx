"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";
import { ImageCompare } from "@/components/funil/ImageCompare";

export default function LandingPage() {
  const router = useRouter();
  const txt = t().landing;

  useEffect(() => {
    posthog.capture("landing_page_viewed");
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero — slider antes/depois interativo */}
      <div className="relative bg-gradient-to-b from-purple-100 to-white px-4 pt-8 pb-4">
        <div className="mx-auto max-w-md">
          <ImageCompare
            before="/images/lp/capa-original.jpg"
            after="/images/lp/capa-gerada.jpg"
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col items-center px-6 pt-4 pb-10">
        <div className="mx-auto max-w-md w-full text-center space-y-5">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <span className="text-xs">✨</span>
            {txt.badge}
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {txt.headline.split("páginas de colorir").map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="text-purple-600">páginas de colorir</span>
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-gray-500 text-lg">{txt.subheadline}</p>

          {/* CTA */}
          <button
            onClick={() => router.push("/quiz")}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-purple-200"
          >
            {txt.cta}
          </button>

          {txt.trust && <p className="text-xs text-gray-400">{txt.trust}</p>}
        </div>
      </div>
    </main>
  );
}
