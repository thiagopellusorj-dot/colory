"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { BookPreview } from "@/components/funil/BookPreview";
import { GarantiaBadge } from "@/components/funil/GarantiaBadge";
import { useFunilStore } from "@/store/funilStore";
import { t, getLocale } from "@/lib/i18n";

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
      curiosidadeTexto={txt.oto1DownCuriosidadeTexto(nome)}
      previewSection={<BookPreview nomeFilho={nome} />}
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
