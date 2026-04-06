"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { t, getLocale } from "@/lib/i18n";

export default function Oto3DownsellPage() {
  const store = useFunilStore();
  const nome = store.nome_filho || t().landing.seuFilho;
  const txt = t().oto;

  return (
    <OtoLayout
      otoId="clube_downsell"
      passoLabel={txt.oto3DownPassoLabel}
      alertaTexto={txt.oto3DownAlertaTexto}
      validacaoTexto={txt.oto3DownValidacaoTexto}
      fomoTexto={txt.oto3DownFomoTexto(nome)}
      curiosidadeTexto={txt.oto3DownCuriosidadeTexto(nome)}
      reframeTitulo={txt.oto3DownReframeTitulo}
      reframeTexto={txt.oto3DownReframeTexto(nome)}
      beneficios={txt.oto3DownBeneficios(nome)}
      depoimentos={txt.oto3DownDepoimentos}
      modulos={txt.oto3DownModulos}
      valorTotal={txt.oto3DownValorTotal}
      precoOriginal={txt.oto3DownPrecoOriginal}
      precoFinal={txt.oto3DownPrecoFinal}
      periodoPagamento={txt.oto3DownPeriodoPagamento}
      perfectPayLink={getLocale() !== "pt-BR"
        ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO3_INTL ?? "")
        : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3_DOWN ?? "")}
      nextRoute="/obrigado"
    />
  );
}
