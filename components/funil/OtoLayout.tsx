"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";
import { useFunilStore } from "@/store/funilStore";
import { FaqAccordion } from "@/components/funil/FaqAccordion";

const TIMER_KEY = "colory-oto-timer-start";
const TIMER_DURATION = 10 * 60 * 1000;

interface Depoimento {
  nome: string;
  texto: string;
  cidade: string;
}

interface ModuloItem {
  emoji: string;
  titulo: string;
  descricao: string;
  valorIndividual: string;
}

interface OtoLayoutProps {
  otoId: string;
  // Bloco 1 — Pattern Interrupt
  passoLabel: string;
  alertaTexto: string;
  // Bloco 2 — Validation + Incompleteness
  validacaoTexto: string;
  fomoTexto: string;
  // Bloco 3 — Curiosity Gap
  curiosidadeTexto: string;
  // Bloco 3.5 — Product Preview (optional)
  previewSection?: React.ReactNode;
  // Bloco 5 — Emotional Reframe
  reframeTitulo: string;
  reframeTexto: string;
  beneficios: string[];
  // Bloco 7 — Depoimentos
  depoimentos: Depoimento[];
  // Bloco 8 — Value Stack
  modulos: ModuloItem[];
  valorTotal: string;
  // Bloco 9 — Price Reveal
  precoOriginal: string;
  precoFinal: string;
  periodoPagamento?: string;
  // Objection handling (optional)
  garantiaSection?: React.ReactNode;
  faqItems?: Array<{ pergunta: string; resposta: string }>;
  // Config
  perfectPayLink: string;
  nextRoute: string;
  onDecline?: () => void;
}

export function OtoLayout({
  otoId,
  passoLabel,
  alertaTexto,
  validacaoTexto,
  fomoTexto,
  curiosidadeTexto,
  previewSection,
  reframeTitulo,
  reframeTexto,
  beneficios,
  depoimentos,
  modulos,
  valorTotal,
  precoOriginal,
  precoFinal,
  periodoPagamento,
  garantiaSection,
  faqItems,
  perfectPayLink,
  nextRoute,
  onDecline,
}: OtoLayoutProps) {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().oto;
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  useEffect(() => {
    if (!localStorage.getItem(TIMER_KEY)) {
      localStorage.setItem(TIMER_KEY, Date.now().toString());
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = parseInt(localStorage.getItem(TIMER_KEY) || "0");
      if (!start) return;
      const remaining = Math.max(0, TIMER_DURATION - (Date.now() - start));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        router.push("/obrigado");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [router]);

  useEffect(() => {
    posthog.capture("oto_viewed", { oto: otoId });
  }, [otoId]);

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  const handleAccept = () => {
    store.addOto(otoId);
    posthog.capture("oto_accepted", { oto: otoId });
    if (perfectPayLink && perfectPayLink !== "https://perfectpay.com.br/pay/xxx") {
      window.location.href = perfectPayLink;
    } else {
      alert("Link de pagamento será configurado em breve.");
    }
  };

  const handleDecline = () => {
    try { posthog.capture("oto_declined", { oto: otoId }); } catch {}
    if (onDecline) {
      onDecline();
    } else {
      window.location.href = nextRoute;
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* BLOCO 1: Pattern Interrupt + Timer */}
      <div className="bg-red-600 text-white py-3 px-4 text-center space-y-1">
        <p className="text-xs font-bold uppercase tracking-wide">
          {passoLabel}
        </p>
        <p className="text-sm font-semibold">{alertaTexto}</p>
        <p className="font-mono text-2xl font-bold">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center px-5 py-8">
        <div className="w-full max-w-md space-y-8">
          {/* BLOCO 2: Validation + Incompleteness */}
          <div className="space-y-3 text-center">
            <p className="text-green-600 font-semibold text-sm">
              ✅ {validacaoTexto}
            </p>
            <p className="text-gray-700 leading-relaxed">{fomoTexto}</p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* BLOCO 3: Curiosity Gap */}
          <p className="text-center text-lg font-bold text-gray-900 leading-snug">
            {curiosidadeTexto}
          </p>

          {/* BLOCO 4: Micro CTA */}
          <p className="text-center text-purple-600 text-sm font-medium animate-bounce">
            {txt.continueLendo}
          </p>

          {/* BLOCO 3.5: Product Preview */}
          {previewSection && (
            <div className="py-2">{previewSection}</div>
          )}

          {/* BLOCO 5: Emotional Reframe */}
          <div className="bg-purple-50 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">{reframeTitulo}</h2>
            <p className="text-gray-600 leading-relaxed">{reframeTexto}</p>

            <div className="space-y-2">
              {beneficios.map((b, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">✦</span>
                  <p className="text-sm text-gray-700">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCO 7: Depoimentos */}
          <div className="space-y-4">
            {depoimentos.map((dep, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic">
                  &ldquo;{dep.texto}&rdquo;
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  — {dep.nome}, {dep.cidade}
                </p>
              </div>
            ))}
          </div>

          {/* BLOCO 8: Value Stack */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900 text-center">
              {txt.oQueVoceRecebe}
            </h3>
            {modulos.map((mod, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
              >
                <span className="text-2xl">{mod.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {mod.titulo}
                  </p>
                  <p className="text-xs text-gray-500">{mod.descricao}</p>
                </div>
                <span className="text-xs text-gray-400 line-through whitespace-nowrap">
                  {mod.valorIndividual}
                </span>
              </div>
            ))}

            <div className="text-center pt-2">
              <p className="text-sm text-gray-500">
                {txt.valorTotalLabel} <span className="line-through">{valorTotal}</span>
              </p>
            </div>
          </div>

          {/* BLOCO 9: Price Reveal */}
          <div className="bg-gradient-to-b from-purple-600 to-purple-700 rounded-2xl p-6 text-center text-white space-y-3">
            <p className="text-sm opacity-80">{txt.precoNormal}</p>
            <p className="text-2xl line-through opacity-60">{precoOriginal}</p>
            <p className="text-sm opacity-80">{txt.hojeApenas}</p>
            <p className="text-5xl font-bold">{precoFinal}</p>
            {periodoPagamento && (
              <p className="text-sm opacity-80">{periodoPagamento}</p>
            )}

            <button
              onClick={handleAccept}
              className="w-full bg-white text-purple-700 py-4 rounded-full font-bold text-lg transition-all hover:bg-purple-50 active:scale-[0.98] shadow-lg mt-2"
            >
              {txt.simQuero}
            </button>
          </div>

          {/* Guarantee (optional) */}
          {garantiaSection && <div>{garantiaSection}</div>}

          {/* FAQ (optional) */}
          {faqItems && faqItems.length > 0 && (
            <FaqAccordion items={faqItems} />
          )}

          {/* BLOCO 11: Scarcity Final */}
          <div className="text-center space-y-2">
            <p className="text-xs text-red-500 font-semibold uppercase">
              ⚠ {txt.scarcityTitle}
            </p>
            <p className="text-xs text-gray-400">
              {txt.scarcityText}
            </p>
          </div>

          {/* CTA repetido */}
          <button
            onClick={handleAccept}
            className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-purple-200"
          >
            {txt.simQuero}
          </button>

          {/* Decline */}
          <button
            onClick={handleDecline}
            className="w-full text-gray-400 hover:text-gray-600 py-3 text-xs transition-colors"
          >
            {txt.naoObrigado}
          </button>
        </div>
      </div>
    </main>
  );
}
