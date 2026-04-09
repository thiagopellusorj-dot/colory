"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";

const ETAPAS_DELAY = [0, 2000, 5000, 8000];

export default function ProcessandoPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().processando;
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [fatoIndex, setFatoIndex] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const hasStarted = useRef(false);
  const nome = store.nome_filho || t().landing.seuFilho;

  const etapas = [
    txt.etapa1(nome),
    txt.etapa2,
    txt.etapa3,
    txt.etapa4,
  ];

  // Guard
  useEffect(() => {
    if (!store.url_foto_original) {
      router.replace("/upload");
    }
  }, [store.url_foto_original, router]);

  // Animação das etapas
  useEffect(() => {
    const timers = ETAPAS_DELAY.map((delay, i) =>
      setTimeout(() => setEtapaAtual(i), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Rotação de fatos curiosos
  useEffect(() => {
    if (!store.url_foto_original) return;
    const interval = setInterval(() => {
      setFatoIndex((prev) => (prev + 1) % txt.fatos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [txt.fatos.length, store.url_foto_original]);

  // Chamar Gemini API
  useEffect(() => {
    if (hasStarted.current || !store.url_foto_original) return;
    hasStarted.current = true;

    const timeoutId = setTimeout(() => setIsTimeout(true), 45000);

    async function gerarImagem() {
      try {
        const response = await fetch("/api/gerar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_base64: store.url_foto_original, estilo: store.estilo || "detailed" }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.details || errData.error || `HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.url) {
          store.setFotoGerada(data.url);
          posthog.capture("upload_completed");
          setEtapaAtual(3);
          setTimeout(() => router.push("/contato"), 1500);
        } else {
          throw new Error(data.error || "No URL in response");
        }
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error("Erro ao gerar:", msg);
        setErro(msg);
      } finally {
        clearTimeout(timeoutId);
      }
    }

    gerarImagem();

    return () => clearTimeout(timeoutId);
  }, [store, router]);

  const handleRetry = () => {
    setErro(null);
    setIsTimeout(false);
    hasStarted.current = false;
    setEtapaAtual(0);
  };

  if (erro) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">😕</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{txt.erro}</h2>
          {typeof erro === "string" && erro.length > 0 && (
            <p className="text-xs text-gray-400 break-all">{erro.slice(0, 200)}</p>
          )}
          <button
            onClick={handleRetry}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-semibold text-lg transition-all"
          >
            {txt.tentarNovamente}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-8">
          {store.url_foto_original && (
            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={store.url_foto_original}
                alt="Foto enviada"
                fill
                className="object-cover"
                sizes="128px"
              />
              <div className="absolute bottom-0 inset-x-0 bg-purple-600 text-white text-xs py-1 text-center font-medium">
                ✨ Coloring Book
              </div>
            </div>
          )}

          <div className="space-y-4">
            {etapas.map((etapa, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  i <= etapaAtual ? "opacity-100" : "opacity-0 translate-y-2"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    i < etapaAtual
                      ? "bg-purple-600 text-white"
                      : i === etapaAtual
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i < etapaAtual ? (
                    <span className="text-sm">✓</span>
                  ) : i === etapaAtual ? (
                    <span className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span className="text-sm">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i < etapaAtual
                      ? "text-purple-600"
                      : i === etapaAtual
                        ? "text-gray-900"
                        : "text-gray-400"
                  }`}
                >
                  {etapa}
                </span>
              </div>
            ))}
          </div>

          {isTimeout && (
            <p className="text-center text-sm text-amber-600 font-medium animate-fade-in">
              {txt.timeout}
            </p>
          )}

          <div className="bg-purple-50 rounded-2xl p-5 space-y-2">
            <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
              {txt.fatoLabel}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed animate-fade-in" key={fatoIndex}>
              {txt.fatos[fatoIndex]}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
