"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { posthog } from "@/lib/posthog";
import { t } from "@/lib/i18n";
import { useFunilStore } from "@/store/funilStore";

const TIMER_KEY = "colory-oto-timer-start";
const TIMER_DURATION = 10 * 60 * 1000; // 10 minutos

interface OtoLayoutProps {
  otoId: string;
  emoji: string;
  titulo: string;
  descricao: string;
  precoOriginal?: string;
  precoAtual: string;
  periodoPagamento?: string;
  perfectPayEnvVar: string;
  nextRoute: string;
  onDecline?: () => void; // override para downsell
}

export function OtoLayout({
  otoId,
  emoji,
  titulo,
  descricao,
  precoOriginal,
  precoAtual,
  periodoPagamento,
  perfectPayEnvVar,
  nextRoute,
  onDecline,
}: OtoLayoutProps) {
  const router = useRouter();
  const store = useFunilStore();
  const txt = t().oto;
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);

  // Iniciar timer no localStorage (só na primeira vez)
  useEffect(() => {
    const stored = localStorage.getItem(TIMER_KEY);
    if (!stored) {
      localStorage.setItem(TIMER_KEY, Date.now().toString());
    }
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const start = parseInt(localStorage.getItem(TIMER_KEY) || "0");
      if (!start) return;

      const elapsed = Date.now() - start;
      const remaining = Math.max(0, TIMER_DURATION - elapsed);
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

    const link = perfectPayEnvVar;
    if (link && link !== "https://perfectpay.com.br/pay/xxx") {
      window.location.href = link;
    } else {
      alert("Link de pagamento será configurado em breve.");
    }
  };

  const handleDecline = () => {
    posthog.capture("oto_declined", { oto: otoId });
    if (onDecline) {
      onDecline();
    } else {
      router.push(nextRoute);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Timer */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-semibold">
        {txt.timerLabel}{" "}
        <span className="font-mono">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md space-y-6">
          {/* Emoji */}
          <div className="text-center">
            <span className="text-6xl">{emoji}</span>
          </div>

          {/* Titulo + Descricao */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {titulo}
            </h1>
            <p className="text-gray-600">{descricao}</p>
          </div>

          {/* Preço */}
          <div className="text-center space-y-1">
            {precoOriginal && (
              <p className="text-gray-400 line-through text-lg">
                {precoOriginal}
              </p>
            )}
            <p className="text-4xl font-bold text-purple-600">
              {precoAtual}
            </p>
            {periodoPagamento && (
              <p className="text-sm text-gray-500">{periodoPagamento}</p>
            )}
          </div>

          {/* Botões */}
          <div className="space-y-3">
            <button
              onClick={handleAccept}
              className="w-full bg-purple-600 hover:bg-purple-700 active:scale-[0.98] text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-purple-200"
            >
              {txt.simQuero}
            </button>

            <button
              onClick={handleDecline}
              className="w-full text-gray-400 hover:text-gray-600 py-3 text-sm transition-colors"
            >
              {txt.naoObrigado}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
