"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { BookPreview } from "@/components/funil/BookPreview";
import { ComoFunciona } from "@/components/funil/ComoFunciona";
import { TransformacaoVisual } from "@/components/funil/TransformacaoVisual";
import { GarantiaBadge } from "@/components/funil/GarantiaBadge";
import { useFunilStore } from "@/store/funilStore";
import { t, getLocale } from "@/lib/i18n";

export default function Oto1Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";
  const txt = t().oto;

  return (
    <OtoLayout
      otoId="livro"
      passoLabel={txt.oto1PassoLabel}
      alertaTexto={txt.oto1AlertaTexto}
      validacaoTexto={txt.oto1ValidacaoTexto}
      fomoTexto={txt.oto1FomoTexto(nome)}
      curiosidadeTexto={txt.oto1CuriosidadeTexto(nome)}
      previewSection={
        <div className="space-y-6">
          <BookPreview nomeFilho={nome} />
          <ComoFunciona />
          <TransformacaoVisual />
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
