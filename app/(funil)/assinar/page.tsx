"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useFunilStore } from "@/store/funilStore";
import { posthog } from "@/lib/posthog";
import { trackMeta } from "@/lib/tracking";
import { t, getLocale } from "@/lib/i18n";

type Plano = "anual" | "mensal";

const TIMER_KEY = "colory-paywall-timer";
const TIMER_DURATION = 15 * 60; // 15 minutos

export default function AssinarPage() {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().paywall;
  const [planoSelecionado, setPlanoSelecionado] = useState<Plano>("anual");
  const [timerSeconds, setTimerSeconds] = useState(TIMER_DURATION);
  const nome = store.nome_filho || t().landing.seuFilho;
  const genero = store.genero;
  const artigo = genero === "menina" ? "a" : "o";
  const artigoDe = genero === "menina" ? "da" : "do";
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [cupomCopiado, setCupomCopiado] = useState(false);
  const hasTrackedPaywallView = useRef(false);

  // Exit-intent: desktop (mouseleave) + mobile (back button)
  const handleExitIntent = useCallback(() => {
    if (sessionStorage.getItem("colory-exit-shown")) return;
    sessionStorage.setItem("colory-exit-shown", "1");
    setShowExitPopup(true);
    posthog.capture("exit_intent_shown");
  }, []);

  useEffect(() => {
    // Desktop: mouse leaves window
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) handleExitIntent();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: back button
    history.pushState(null, "", window.location.href);
    const handlePopState = () => {
      handleExitIntent();
      history.pushState(null, "", window.location.href);
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [handleExitIntent]);

  useEffect(() => {
    const isDev = new URLSearchParams(window.location.search).get("dev") === "1";
    if (!store.nome_filho && !isDev) {
      router.replace("/");
    }
  }, [store.nome_filho, router]);

  useEffect(() => {
    posthog.capture("paywall_viewed");
  }, []);

  // Meta Pixel: ViewContent — paywall
  useEffect(() => {
    if (!hasTrackedPaywallView.current && store.nome_filho) {
      hasTrackedPaywallView.current = true;
      trackMeta("ViewContent", {
        content_category: "colory_paywall",
        content_name: store.nome_filho,
      });
    }
  }, [store.nome_filho]);

  // Timer persistente
  useEffect(() => {
    const stored = localStorage.getItem(TIMER_KEY);
    if (stored) {
      const elapsed = Math.floor((Date.now() - Number(stored)) / 1000);
      setTimerSeconds(Math.max(0, TIMER_DURATION - elapsed));
    } else {
      localStorage.setItem(TIMER_KEY, String(Date.now()));
    }
  }, []);

  useEffect(() => {
    if (timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSeconds]);

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const headline = txt.headlines[store.objetivo] || (typeof txt.headlineDefault === "function" ? txt.headlineDefault(genero || undefined) : txt.headlineDefault);

  // Hook emocional baseado no quiz
  const getEmotionalHook = () => {
    const tempoTela = store.tempo_tela;
    const conexao = store.conexao;
    const pronome = genero === "menina" ? "ela" : "ele";
    const pronome2 = genero === "menina" ? "duas" : "dois";

    let hookTela = "";
    if (tempoTela === "mais_4h" || tempoTela === "2_4h") {
      hookTela = txt.hookTelaAlto(artigo, nome, pronome);
    } else if (tempoTela === "1_2h") {
      hookTela = txt.hookTelaMedio(artigoDe, nome);
    } else if (tempoTela === "menos_1h") {
      hookTela = txt.hookTelaBaixo(artigoDe, nome);
    }

    let hookConexao = "";
    if (conexao === "corrido" || conexao === "falta" || conexao === "mais_momentos") {
      hookConexao = txt.hookConexao(artigo, nome, pronome2);
    }

    return { hookTela, hookConexao };
  };

  const { hookTela, hookConexao } = getEmotionalHook();

  const handleComprar = (plano: Plano) => {
    setPlanoSelecionado(plano);
    const locale = getLocale();
    posthog.capture("purchase_initiated", { plano, locale });

    // Meta Pixel: InitiateCheckout — sem `value` numérico de propósito.
    // O valor real vem do Purchase server-side que a UTMify dispara via CAPI.
    trackMeta("InitiateCheckout", {
      currency: "BRL",
      content_name: plano,
    });

    const isIntl = locale !== "pt-BR";
    const link =
      plano === "anual"
        ? (isIntl ? process.env.NEXT_PUBLIC_CHECKOUT_LINK_ANUAL_INTL : process.env.NEXT_PUBLIC_PERFECTPAY_LINK_ANUAL)
        : (isIntl ? process.env.NEXT_PUBLIC_CHECKOUT_LINK_MENSAL_INTL : process.env.NEXT_PUBLIC_PERFECTPAY_LINK_MENSAL);

    if (!link || link === "https://perfectpay.com.br/pay/xxx") {
      alert(t().oto.alertaPagamento);
      return;
    }

    // Forward manual das UTMs. O script da UTMify grava as UTMs no localStorage
    // mas só intercepta cliques em <a> tags — como aqui usamos window.location.href
    // (navegação programática), precisamos appendar manualmente. Sem isso a UTMify
    // não consegue atribuir a venda à campanha certa.
    const fullUrl = new URL(link);
    if (typeof window !== "undefined") {
      const attributionKeys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_content",
        "utm_term",
        "src",
        "sck",
        "xcod",
        "fbclid",
      ];
      attributionKeys.forEach((key) => {
        const value = window.localStorage.getItem(key);
        if (value) fullUrl.searchParams.set(key, value);
      });
    }

    window.location.href = fullUrl.toString();
  };

  // Componente CTA reutilizável
  const CtaButton = () => (
    <div className="space-y-2">
      <button
        onClick={() => handleComprar(planoSelecionado)}
        className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-purple-200"
      >
        {planoSelecionado === "anual"
          ? txt.ctaAnual(nome, genero || undefined)
          : txt.ctaMensal}
      </button>
      <p className="text-center text-xs text-gray-500">
        {txt.ctaTestar(artigo, nome)}
      </p>
      <p className="text-center text-[10px] text-gray-400">
        {txt.ctaCancelar}
      </p>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* HERO — imagem borrada + nome da criança */}
      <div className="relative">
        {store.url_foto_gerada ? (
          <div className="relative h-44 overflow-hidden">
            <Image
              src={store.url_foto_gerada}
              alt="Preview"
              fill
              className="object-cover blur-xl scale-125 brightness-75"
              sizes="100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-white" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 text-center shadow-lg">
                <p className="text-lg font-bold text-gray-900">
                  {txt.heroTitulo(artigoDe, nome)}
                </p>
                <p className="text-xs text-purple-600 font-medium mt-1">
                  {txt.heroDesbloquear}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-20 bg-gradient-to-b from-purple-100 to-white" />
        )}
      </div>

      <div className="flex-1 flex flex-col items-center px-5 pt-5">
        <div className="w-full max-w-md space-y-5">

          {/* Headline */}
          <h1 className="text-xl font-bold text-gray-900 text-center leading-tight">
            {headline}
          </h1>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {["👩", "👩‍🦰", "👩‍🦱"].map((emoji, i) => (
                <span key={i} className="text-lg bg-purple-100 rounded-full w-7 h-7 flex items-center justify-center border-2 border-white">
                  {emoji}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-bold text-purple-600">{txt.socialProofV2Count}</span> {txt.socialProofV2Text}
            </p>
          </div>

          {/* Âncora */}
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
                  <p className="text-xs text-gray-400 mt-0.5">{txt.planoAnualObs}</p>
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

            {/* Plano Mensal */}
            <button
              onClick={() => setPlanoSelecionado("mensal")}
              className={`w-full relative rounded-2xl p-4 text-left transition-all ${
                planoSelecionado === "mensal"
                  ? "border-2 border-purple-600 bg-purple-50 shadow-md"
                  : "border-2 border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{txt.planoMensalNome}</p>
                  <p className="text-xs text-gray-500">{txt.planoMensalObs}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-900">{txt.planoMensalPreco}</span>
                  <span className="text-sm text-gray-500">{txt.planoMensalPeriodo}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  planoSelecionado === "mensal" ? "border-purple-600" : "border-gray-300"
                }`}>
                  {planoSelecionado === "mensal" && <div className="w-3 h-3 rounded-full bg-purple-600" />}
                </div>
              </div>
            </button>
          </div>

          {/* CTA principal + micro-compromisso */}
          <CtaButton />

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
            <span>🔒 {txt.trustPagamento}</span>
            <span>•</span>
            <span>↩️ {txt.trustGarantia}</span>
            <span>•</span>
            <span>⚡ {txt.trustAcesso}</span>
          </div>

          {/* Future pacing — visualização do momento */}
          <div className="bg-gradient-to-b from-purple-50 to-white rounded-2xl p-5 space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed italic">
              &ldquo;{txt.futurePacing(artigo, nome, genero === "menina" ? "duas" : "dois")}&rdquo;
            </p>
          </div>

          {/* Imagem mãe + filho colorindo */}
          <div className="rounded-2xl overflow-hidden shadow-md">
            <div className="relative aspect-[16/10]">
              <Image
                src="/images/lp/mae-filho-colorindo.png"
                alt="Mãe e filho colorindo juntos"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </div>
            <p className="text-center text-xs text-gray-500 py-2 bg-white">
              {txt.momentosSemPreco}
            </p>
          </div>

          {/* Comparativo — o que inclui */}
          <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm text-center">
              {txt.beneficiosTitulo}
            </h3>
            <div className="space-y-2.5">
              {[
                { icon: "🎨", text: txt.beneficio1 },
                { icon: "📸", text: txt.beneficio2(nome, genero || undefined) },
                { icon: "✨", text: txt.beneficio3 },
                { icon: "📄", text: txt.beneficio4 },
                { icon: "📱", text: txt.beneficio5 },
                { icon: "🔄", text: txt.beneficio6(nome, genero || undefined) },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base flex-shrink-0">{item.icon}</span>
                  <p className="text-sm text-gray-700">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA meio da página */}
          <CtaButton />

          {/* Depoimentos melhorados */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm text-center">
              {txt.depoimentosV2Titulo}
            </h3>
            {txt.depoimentosV2.map((dep, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xs">★</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">✓ {txt.verificado}</span>
                </div>
                <p className="text-sm text-gray-700 italic">&ldquo;{dep.texto}&rdquo;</p>
                <p className="text-xs text-gray-500 font-medium">— {dep.nome}, {dep.cidade}</p>
              </div>
            ))}
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

          {/* FAQ */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm text-center">
              {txt.faqTituloV2}
            </h3>
            {(txt.faqs || []).map((faq: { p: string; r: string }, i: number) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800">{faq.p}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{faq.r}</p>
              </div>
            ))}
          </div>

          {/* CTA final */}
          <CtaButton />

          <p className="text-center text-xs text-gray-400 pb-6">
            {txt.geracoesFree}
          </p>
        </div>
      </div>

      {/* Exit-intent popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-5 shadow-2xl animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-4xl block">🎁</span>
              <h2 className="text-xl font-bold text-gray-900">{txt.exitIntentTitulo}</h2>
              <p className="text-sm text-gray-600">{txt.exitIntentSubtitulo}</p>
            </div>

            {/* Cupom */}
            <div className="bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-purple-600 tracking-widest">{txt.exitIntentCupom}</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(txt.exitIntentCupom);
                  setCupomCopiado(true);
                  setTimeout(() => setCupomCopiado(false), 2000);
                }}
                className="mt-2 text-xs text-purple-500 font-medium hover:underline"
              >
                {cupomCopiado ? txt.exitIntentCopiado : txt.exitIntentCopiar}
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={() => {
                posthog.capture("exit_intent_cta_clicked");
                setShowExitPopup(false);
                handleComprar(planoSelecionado);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg"
            >
              {txt.exitIntentCta}
            </button>

            {/* Fechar */}
            <button
              onClick={() => {
                posthog.capture("exit_intent_dismissed");
                setShowExitPopup(false);
              }}
              className="w-full text-gray-400 hover:text-gray-600 text-xs py-2 transition-colors"
            >
              {txt.exitIntentFechar}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
