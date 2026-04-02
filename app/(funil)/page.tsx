"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { posthog } from "@/lib/posthog";
import { t, setLocale, getLocale, type Locale } from "@/lib/i18n";
import { updatePosthogLocale } from "@/lib/posthog";
import { ImageCompare } from "@/components/funil/ImageCompare";

const VALID_LOCALES = ["pt-BR", "en", "es", "fr", "it"];

export default function LandingPage() {
  const router = useRouter();
  const [localeReady, setLocaleReady] = useState(false);

  // Detect language from ?lang= on first load, then force re-render
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    if (lang && VALID_LOCALES.includes(lang)) {
      setLocale(lang as Locale);
      updatePosthogLocale();
    }
    setLocaleReady(true);
  }, []);

  useEffect(() => {
    if (localeReady) {
      posthog.capture("landing_page_viewed", { locale: getLocale() });
    }
  }, [localeReady]);

  // Wait for locale detection before rendering translated content
  if (!localeReady) return null;

  const txt = t().landing;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero — imagens antes/depois */}
      <div className="relative bg-gradient-to-b from-purple-100 to-white px-4 pt-8 pb-4">
        <div className="mx-auto max-w-md space-y-3">
          {/* Grid lado a lado */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <div className="aspect-square relative">
                <Image
                  src="/images/lp/foto-original.jpg"
                  alt={txt.fotoOriginal}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 200px"
                  priority
                />
              </div>
              <p className="text-xs text-center py-2 text-gray-500 font-medium">
                {txt.fotoOriginal}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md bg-white">
              <div className="aspect-square relative">
                <Image
                  src="/images/lp/pagina-colorir.png"
                  alt={txt.paginaColorir}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 200px"
                  priority
                />
              </div>
              <p className="text-xs text-center py-2 text-purple-600 font-medium">
                {txt.paginaColorir}
              </p>
            </div>
          </div>

          {/* Slider interativo antes/depois */}
          <ImageCompare
            before="/images/lp/capa-original.jpg"
            after="/images/lp/capa-gerada.jpg"
            beforeLabel={txt.fotoOriginal}
            afterLabel={txt.paginaColorir}
            hint={txt.arrasteComparar}
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
            {txt.headline.split(txt.headlineHighlight).map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="text-purple-600">{txt.headlineHighlight}</span>
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
