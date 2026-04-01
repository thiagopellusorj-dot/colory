"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";

type Plano = "anual" | "semanal";

export default function AssinarPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().paywall;
  const [planoSelecionado, setPlanoSelecionado] = useState<Plano>("anual");
  const nome = store.nome_filho || "seu filho";

  // Guard
  useEffect(() => {
    if (!store.nome_filho) {
      router.replace("/");
    }
  }, [store.nome_filho, router]);

  useEffect(() => {
    posthog.capture("paywall_viewed");
  }, []);

  // Headline personalizado pela P4
  const headline =
    txt.headlines[store.objetivo] || txt.headlineDefault;

  const handleComprar = (plano: Plano) => {
    setPlanoSelecionado(plano);
    posthog.capture("paywall_plan_selected", { plano });
    posthog.capture("purchase_initiated", { plano });

    const link =
      plano === "anual"
        ? process.env.NEXT_PUBLIC_PERFECTPAY_LINK_ANUAL
        : process.env.NEXT_PUBLIC_PERFECTPAY_LINK_SEMANAL;

    if (link && link !== "https://perfectpay.com.br/pay/xxx") {
      window.location.href = link;
    } else {
      alert("Link de pagamento será configurado em breve.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="flex-1 flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Imagem borrada */}
          {store.url_foto_gerada && (
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={store.url_foto_gerada}
                alt="Preview borrado"
                fill
                className="object-cover blur-xl scale-110"
                sizes="(max-width: 768px) 90vw, 400px"
                unoptimized
              />
              <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center">
                <div className="bg-white/90 rounded-2xl px-6 py-4 text-center shadow-lg">
                  <span className="text-3xl">🔒</span>
                  <p className="text-sm font-semibold text-purple-700 mt-1">
                    {txt.subtitleBlur}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Headline personalizado */}
          <h1 className="text-2xl font-bold text-gray-900 text-center leading-tight">
            {headline}
          </h1>

          {/* Âncora de preço */}
          <p className="text-center text-sm text-gray-400 line-through">
            {txt.ancora}
          </p>

          {/* Planos */}
          <div className="space-y-3">
            {/* Plano Anual — destacado */}
            <button
              onClick={() => setPlanoSelecionado("anual")}
              className={`w-full relative rounded-2xl p-4 text-left transition-all ${
                planoSelecionado === "anual"
                  ? "border-2 border-purple-600 bg-purple-50 shadow-md"
                  : "border-2 border-gray-200"
              }`}
            >
              {/* Badge "Mais popular" */}
              <div className="absolute -top-3 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {txt.maisPopular}
              </div>

              <div className="flex items-center justify-between mt-1">
                <div>
                  <p className="font-semibold text-gray-900">
                    {txt.planoAnualNome}
                  </p>
                  <p className="text-xs text-purple-600 font-medium">
                    {txt.planoAnualDestaque}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {txt.planoAnualPreco}
                  </span>
                  <span className="text-sm text-gray-500">
                    {txt.planoAnualPeriodo}
                  </span>
                </div>
              </div>

              {/* Radio indicator */}
              <div className="absolute top-5 right-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    planoSelecionado === "anual"
                      ? "border-purple-600"
                      : "border-gray-300"
                  }`}
                >
                  {planoSelecionado === "anual" && (
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                  )}
                </div>
              </div>
            </button>

            {/* Plano Semanal */}
            <button
              onClick={() => setPlanoSelecionado("semanal")}
              className={`w-full relative rounded-2xl p-4 text-left transition-all ${
                planoSelecionado === "semanal"
                  ? "border-2 border-purple-600 bg-purple-50 shadow-md"
                  : "border-2 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    {txt.planoSemanalNome}
                  </p>
                  <p className="text-xs text-gray-500">
                    {txt.planoSemanalObs}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">
                    {txt.planoSemanalPreco}
                  </span>
                  <span className="text-sm text-gray-500">
                    {txt.planoSemanalPeriodo}
                  </span>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    planoSelecionado === "semanal"
                      ? "border-purple-600"
                      : "border-gray-300"
                  }`}
                >
                  {planoSelecionado === "semanal" && (
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* CTA */}
          <button
            onClick={() => handleComprar(planoSelecionado)}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-purple-200"
          >
            {planoSelecionado === "anual"
              ? txt.ctaAnual(nome)
              : txt.ctaSemanal}
          </button>

          {/* Garantia */}
          <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
            <span className="text-2xl">🔒</span>
            <div>
              <p className="font-semibold text-green-800 text-sm">
                {txt.garantiaTitulo}
              </p>
              <p className="text-xs text-green-700">{txt.garantiaTexto}</p>
            </div>
          </div>

          {/* Review */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: txt.reviewEstrelas }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-700 italic">
              &ldquo;{txt.reviewTexto}&rdquo;
            </p>
            <p className="text-xs text-gray-500 font-medium">
              — {txt.reviewNome}
            </p>
          </div>

          {/* Geração free usada */}
          <p className="text-center text-xs text-gray-400">
            {txt.geracoesFree}
          </p>
        </div>
      </div>
    </main>
  );
}
