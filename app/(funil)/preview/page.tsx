"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";

const POLL_INTERVAL = 3000;
const MAX_WAIT = 120000; // 2 minutos

export default function ResultadoFunilPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().resultado;
  const txtProc = t().processando;
  const [isReady, setIsReady] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [fatoIndex, setFatoIndex] = useState(0);
  const nome = store.nome_filho || "seu filho";

  // Guard
  useEffect(() => {
    if (!store.job_id) {
      router.replace("/upload");
    }
  }, [store.job_id, router]);

  // Se já tem a URL no store, mostrar direto
  useEffect(() => {
    if (store.url_foto_gerada) {
      setImageUrl(store.url_foto_gerada);
      setIsReady(true);
    }
  }, [store.url_foto_gerada]);

  // Polling no /api/gerar/status
  const checkStatus = useCallback(async () => {
    if (!store.job_id || isReady) return;

    try {
      const res = await fetch(`/api/gerar/status?task_id=${store.job_id}`);
      const data = await res.json();

      if (data.status === "completed" && data.url) {
        store.setFotoGerada(data.url);
        setImageUrl(data.url);
        setIsReady(true);
      }
    } catch {
      // Silencioso — tenta de novo no próximo poll
    }
  }, [store, isReady]);

  useEffect(() => {
    if (isReady) return;

    const interval = setInterval(checkStatus, POLL_INTERVAL);
    const timeout = setTimeout(() => setIsTimedOut(true), MAX_WAIT);

    // Check imediato
    checkStatus();

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [checkStatus, isReady]);

  // Rotação de fatos enquanto espera
  useEffect(() => {
    if (isReady) return;
    const interval = setInterval(() => {
      setFatoIndex((prev) => (prev + 1) % txtProc.fatos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isReady, txtProc.fatos.length]);

  const handleBaixar = () => {
    posthog.capture("resultado_download_clicked");
    router.push("/assinar");
  };

  // Timeout — mostra fallback
  if (isTimedOut && !isReady) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">{txt.fallback}</p>
          <button
            onClick={() => router.push("/assinar")}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-semibold text-lg transition-all"
          >
            Continuar
          </button>
        </div>
      </main>
    );
  }

  // Aguardando — loading com fatos
  if (!isReady) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center">
            <span className="w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-gray-900">{txt.aguardando}</h2>
            <p className="text-gray-500">{txt.aguardandoSub}</p>
          </div>

          <div className="bg-purple-50 rounded-2xl p-5 space-y-2">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
              {txtProc.fatoLabel}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed animate-fade-in" key={fatoIndex}>
              {txtProc.fatos[fatoIndex]}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Imagem pronta!
  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{txt.title(nome)}</h1>
            <p className="text-gray-500">{txt.subtitle}</p>
          </div>

          {/* Imagem gerada */}
          {imageUrl && (
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-purple-100">
              <Image
                src={imageUrl}
                alt={`Página de colorir do ${nome}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
          )}

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
