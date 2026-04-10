"use client";

import { useRef, useEffect } from "react";
import { OtoLayout } from "@/components/funil/OtoLayout";
import { BookPreview } from "@/components/funil/BookPreview";
import { ComoFunciona } from "@/components/funil/ComoFunciona";
import { GarantiaBadge } from "@/components/funil/GarantiaBadge";
import { useFunilStore } from "@/store/funilStore";
import { t, getLocale } from "@/lib/i18n";

function AutoPlayVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.muted = true;
      el.play().catch(() => {});
    }
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}

export default function Oto1DownsellPage() {
  const store = useFunilStore();
  const nome = store.nome_filho || t().landing.seuFilho;
  const txt = t().oto;

  return (
    <OtoLayout
      otoId="livro_downsell"
      passoLabel={txt.oto1DownPassoLabel}
      alertaTexto={txt.oto1DownAlertaTexto}
      validacaoTexto={txt.oto1DownValidacaoTexto}
      fomoTexto={txt.oto1DownFomoTexto(nome)}
      fomoDestaque={txt.oto1DownFomoDestaque}
      curiosidadeTexto={txt.oto1DownCuriosidadeTexto(nome)}
      previewSection={
        <div className="space-y-6">
          <BookPreview nomeFilho={nome} />
          <ComoFunciona />

          {/* Vídeos demonstrativos — só PT-BR por enquanto */}
          {getLocale() === "pt-BR" && (
            <div className="space-y-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide text-center font-semibold">
                {txt.oto1VideosLabel}
              </p>

              <p className="text-sm text-gray-600 text-center">
                👇 Veja como é simples personalizar o livro do {nome}:
              </p>
              <AutoPlayVideo
                src="/videos/demo-personalizacao.mp4"
                className="w-full rounded-xl shadow-md"
              />

              <p className="text-sm text-gray-600 text-center">
                📖 E o resultado final — com uma música de bônus! <span className="font-semibold text-purple-600">Ative o som 🔊</span>
              </p>
              <AutoPlayVideo
                src="/videos/demo-livro-musica.mp4"
                className="w-full rounded-xl shadow-md"
              />
            </div>
          )}
        </div>
      }
      reframeTitulo={txt.oto1DownReframeTitulo}
      reframeTexto={txt.oto1DownReframeTexto}
      beneficios={txt.oto1DownBeneficios}
      depoimentos={txt.oto1DownDepoimentos}
      modulos={txt.oto1DownModulos(nome)}
      valorTotal={txt.oto1DownValorTotal}
      precoOriginal={txt.oto1DownPrecoOriginal}
      precoFinal={txt.oto1DownPrecoFinal}
      garantiaSection={<GarantiaBadge />}
      faqItems={txt.oto1Faqs}
      perfectPayLink={getLocale() !== "pt-BR"
        ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO1_INTL ?? "")
        : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_DOWN ?? "")}
      nextRoute="/oto3"
    />
  );
}
