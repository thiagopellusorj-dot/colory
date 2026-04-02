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

  useEffect(() => {
    if (!store.nome_filho) {
      router.replace("/");
    }
  }, [store.nome_filho, router]);

  useEffect(() => {
    posthog.capture("paywall_viewed");
  }, []);

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
      {/* HERO COMPACTO — imagem borrada + headline + CTA na primeira dobra */}
      <div className="relative">
        {/* Imagem borrada como background — altura compacta */}
        {store.url_foto_gerada ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={store.url_foto_gerada}
              alt="Preview"
              fill
              className="object-cover blur-xl scale-125 brightness-90"
              sizes="100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-white" />
            {/* Lock badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 text-center shadow-lg">
                <span className="text-2xl">🔒</span>
                <p className="text-xs font-semibold text-purple-700 mt-0.5">
                  {txt.subtitleBlur}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-24 bg-gradient-to-b from-purple-100 to-white" />
        )}
      </div>

      <div className="flex-1 flex flex-col items-center px-5 -mt-4">
        <div className="w-full max-w-md space-y-5">
          {/* Headline personalizado */}
          <h1 className="text-xl font-bold text-gray-900 text-center leading-tight pt-2">
            {headline}
          </h1>

          {/* Contador de mães */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {["👩", "👩‍🦰", "👩‍🦱"].map((emoji, i) => (
                <span key={i} className="text-lg bg-purple-100 rounded-full w-7 h-7 flex items-center justify-center border-2 border-white">
                  {emoji}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-semibold text-purple-600">2.847 mães</span> já assinaram esta semana
            </p>
          </div>

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
              <div className="absolute -top-3 left-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {txt.maisPopular}
              </div>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <p className="font-semibold text-gray-900">{txt.planoAnualNome}</p>
                  <p className="text-xs text-purple-600 font-medium">{txt.planoAnualDestaque}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{txt.planoAnualPreco}</span>
                  <span className="text-sm text-gray-500">{txt.planoAnualPeriodo}</span>
                </div>
              </div>
              <div className="absolute top-5 right-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  planoSelecionado === "anual" ? "border-purple-600" : "border-gray-300"
                }`}>
                  {planoSelecionado === "anual" && <div className="w-3 h-3 rounded-full bg-purple-600" />}
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
                  <p className="font-semibold text-gray-900">{txt.planoSemanalNome}</p>
                  <p className="text-xs text-gray-500">{txt.planoSemanalObs}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{txt.planoSemanalPreco}</span>
                  <span className="text-sm text-gray-500">{txt.planoSemanalPeriodo}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  planoSelecionado === "semanal" ? "border-purple-600" : "border-gray-300"
                }`}>
                  {planoSelecionado === "semanal" && <div className="w-3 h-3 rounded-full bg-purple-600" />}
                </div>
              </div>
            </button>
          </div>

          {/* CTA principal */}
          <button
            onClick={() => handleComprar(planoSelecionado)}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-purple-200"
          >
            {planoSelecionado === "anual"
              ? txt.ctaAnual(nome)
              : txt.ctaSemanal}
          </button>

          {/* Trust badges inline */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
            <span>🔒 Pagamento seguro</span>
            <span>•</span>
            <span>↩️ Garantia 30 dias</span>
            <span>•</span>
            <span>⚡ Acesso imediato</span>
          </div>

          {/* O que está incluído */}
          <div className="bg-purple-50 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm text-center">
              O que você recebe ao assinar:
            </h3>
            <div className="space-y-2">
              {[
                "Páginas de colorir ilimitadas com a foto do seu filho",
                "Vários estilos artísticos para escolher",
                "PDF em alta resolução — imprima quantas vezes quiser",
                "Novas páginas toda semana — ele nunca enjoa",
                `Personalizado com o nome e rosto do ${nome}`,
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-purple-600 text-sm mt-0.5">✓</span>
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Garantia */}
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{txt.garantiaTitulo}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{txt.garantiaTexto}</p>
            </div>
          </div>

          {/* Depoimentos */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm text-center">
              O que outras mães dizem:
            </h3>
            {[
              {
                nome: "Camila S.",
                cidade: "São Paulo",
                texto: "Meu filho amou! Já imprimimos mais de 20 páginas. Ele pede toda semana pra fazer uma nova.",
              },
              {
                nome: "Renata M.",
                cidade: "Belo Horizonte",
                texto: "Melhor investimento que fiz. Ele larga o celular na hora que vê a página de colorir dele. Vale cada centavo.",
              },
              {
                nome: "Juliana P.",
                cidade: "Curitiba",
                texto: "A professora pediu pra fazer pra turma inteira depois que viu a do meu filho. Incrível!",
              },
            ].map((dep, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">&ldquo;{dep.texto}&rdquo;</p>
                <p className="text-xs text-gray-500 font-medium">— {dep.nome}, {dep.cidade}</p>
              </div>
            ))}
          </div>

          {/* FAQ rápido */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm text-center">
              Dúvidas frequentes
            </h3>
            {[
              {
                p: "Como funciona?",
                r: "Você envia a foto do seu filho, escolhe o estilo e a IA gera uma página de colorir personalizada em segundos. É só imprimir!",
              },
              {
                p: "Posso cancelar quando quiser?",
                r: "Sim! Cancele a qualquer momento sem burocracia. E nos primeiros 30 dias, devolvemos 100% do valor.",
              },
              {
                p: "Funciona no celular?",
                r: "Sim! Você cria pelo celular e recebe o PDF por e-mail. Imprima em casa ou na gráfica.",
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800">{faq.p}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{faq.r}</p>
              </div>
            ))}
          </div>

          {/* CTA repetido */}
          <button
            onClick={() => handleComprar(planoSelecionado)}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-purple-200"
          >
            {planoSelecionado === "anual"
              ? txt.ctaAnual(nome)
              : txt.ctaSemanal}
          </button>

          {/* Geração free usada */}
          <p className="text-center text-xs text-gray-400 pb-4">
            {txt.geracoesFree}
          </p>
        </div>
      </div>
    </main>
  );
}
