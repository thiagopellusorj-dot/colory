"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { trackMeta } from "@/lib/tracking";
import { t } from "@/lib/i18n";

export default function PreviewPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().resultado;
  const appTxt = t().app;
  const nome = store.nome_filho || t().landing.seuFilho;
  const [showingOriginal, setShowingOriginal] = useState(false);
  const hasTrackedView = useRef(false);

  // Guard: sem imagem gerada → volta pro upload
  useEffect(() => {
    if (!store.url_foto_gerada) {
      router.replace("/upload");
    }
  }, [store.url_foto_gerada, router]);

  // Meta Pixel: ViewContent — preview do resultado
  useEffect(() => {
    if (!hasTrackedView.current && store.url_foto_gerada) {
      hasTrackedView.current = true;
      trackMeta("ViewContent", {
        content_category: "colory_preview",
        content_name: store.nome_filho || "unknown",
      });
    }
  }, [store.url_foto_gerada, store.nome_filho]);

  const handleBaixar = () => {
    posthog.capture("resultado_download_clicked");
    router.push("/assinar");
  };

  if (!store.url_foto_gerada) return null;

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{txt.title(nome)}</h1>
            <p className="text-gray-500">{txt.subtitle}</p>
          </div>

          {/* Imagem gerada com before/after */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-purple-100">
            <div className="relative aspect-[3/4]">
              <Image
                src={showingOriginal && store.url_foto_original ? store.url_foto_original : store.url_foto_gerada}
                alt={showingOriginal ? appTxt.resultadoFotoOriginal : appTxt.resultadoPaginaColorir}
                fill
                className="object-contain bg-gray-50 transition-opacity duration-200"
                sizes="(max-width: 768px) 90vw, 400px"
                unoptimized
              />
              {/* Label */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {showingOriginal ? `📷 ${appTxt.resultadoFotoOriginal}` : `🎨 ${appTxt.resultadoPaginaColorir}`}
              </div>
            </div>

            {/* Botão comparar */}
            {store.url_foto_original && (
              <button
                onMouseDown={() => setShowingOriginal(true)}
                onMouseUp={() => setShowingOriginal(false)}
                onMouseLeave={() => setShowingOriginal(false)}
                onTouchStart={() => setShowingOriginal(true)}
                onTouchEnd={() => setShowingOriginal(false)}
                className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1.5 select-none active:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                </svg>
                {appTxt.resultadoSegurarComparar}
              </button>
            )}
          </div>

          {/* Botão "Baixar" fake → vai para paywall */}
          <button
            onClick={handleBaixar}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
          >
            <span>⬇</span> {txt.baixar}
          </button>
        </div>
      </div>
    </main>
  );
}
