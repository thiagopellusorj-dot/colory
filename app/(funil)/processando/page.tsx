"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { t } from "@/lib/i18n";

const ETAPAS_DELAY = [0, 3000, 7000, 11000];
const REDIRECT_DELAY = 14000; // 14s total de animação

export default function ProcessandoPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().processando;
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [fatoIndex, setFatoIndex] = useState(0);
  const nome = store.nome_filho || "seu filho";

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
    const interval = setInterval(() => {
      setFatoIndex((prev) => (prev + 1) % txt.fatos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [txt.fatos.length]);

  // Redirect automático após 14s → /contato
  // A geração continua em background via webhook
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/contato");
    }, REDIRECT_DELAY);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-md space-y-8">
          {/* Preview da foto */}
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

          {/* Etapas */}
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

          {/* Fato curioso */}
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
