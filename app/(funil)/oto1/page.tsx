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

export default function Oto1Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || t().landing.seuFilho;
  const txt = t().oto;

  return (
    <OtoLayout
      otoId="livro"
      passoLabel={txt.oto1PassoLabel}
      alertaTexto={txt.oto1AlertaTexto}
      validacaoTexto={txt.oto1ValidacaoTexto}
      fomoTexto={txt.oto1FomoTexto(nome)}
      fomoDestaque={txt.oto1FomoDestaque}
      curiosidadeTexto={txt.oto1CuriosidadeTexto(nome)}
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
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide text-center font-semibold mb-3">
              {txt.oto1TemasLabel}
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {txt.oto1Temas.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
      reframeTitulo={txt.oto1ReframeTitulo}
      reframeTexto={txt.oto1ReframeTexto}
      beneficios={txt.oto1Beneficios(nome)}
      depoimentos={txt.oto1Depoimentos}
      modulos={txt.oto1Modulos(nome)}
      valorTotal={txt.oto1ValorTotal}
      precoOriginal={txt.oto1PrecoOriginal}
      precoFinal={txt.oto1PrecoFinal}
      garantiaSection={<GarantiaBadge />}
      faqItems={txt.oto1Faqs}
      perfectPayLink={getLocale() !== "pt-BR"
        ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO1_INTL ?? "")
        : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_UPSELL ?? "")}
      nextRoute="/oto1/down"
    />
  );
}
