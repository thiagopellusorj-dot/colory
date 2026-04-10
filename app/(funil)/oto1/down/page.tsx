"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { BookPreview } from "@/components/funil/BookPreview";
import { ComoFunciona } from "@/components/funil/ComoFunciona";
import { GarantiaBadge } from "@/components/funil/GarantiaBadge";
import { useFunilStore } from "@/store/funilStore";
import { t, getLocale } from "@/lib/i18n";

export default function Oto1DownsellPage() {
  const store = useFunilStore();
  const nome = store.nome_filho || t().landing.seuFilho;
  const txt = t().oto;
  const locale = getLocale();

  const handleComprar = () => {
    const link = locale !== "pt-BR"
      ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO1_INTL ?? "")
      : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_DOWN ?? "");
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <OtoLayout
      otoId="livro_downsell"
      passoLabel={txt.oto1DownPassoLabel}
      alertaTexto={txt.oto1DownAlertaTexto}
      validacaoTexto={txt.oto1DownValidacaoTexto}
      fomoTexto={txt.oto1DownFomoTexto(nome)}
      fomoDestaque={txt.oto1DownFomoDestaque}
      curiosidadeTexto={txt.oto1DownCuriosidadeTexto(nome)}
      earlyCtaSection={
        <div className="bg-gradient-to-b from-purple-600 to-purple-700 rounded-2xl p-6 text-center text-white space-y-3">
          <p className="text-sm font-bold leading-snug">
            Aproveite essa oportunidade única de levar 1 livro e 1 música pela metade do valor!
          </p>
          <p className="text-xs opacity-80">Somente agora por</p>
          <p className="text-4xl font-bold">12x R$4,70</p>
          <p className="text-sm opacity-80">ou R$47 à vista</p>
          <button
            onClick={handleComprar}
            className="w-full bg-white text-purple-700 py-4 rounded-full font-bold text-lg transition-all hover:bg-purple-50 active:scale-[0.98] shadow-lg mt-2"
          >
            {txt.simQuero}
          </button>
        </div>
      }
      previewSection={
        <div className="space-y-6">
          <BookPreview nomeFilho={nome} />
          <ComoFunciona />
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
      perfectPayLink={locale !== "pt-BR"
        ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO1_INTL ?? "")
        : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_DOWN ?? "")}
      nextRoute="/oto3"
    />
  );
}
