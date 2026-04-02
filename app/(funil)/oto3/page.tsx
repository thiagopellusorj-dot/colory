"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { t, getLocale } from "@/lib/i18n";

export default function Oto3Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";
  const txt = t().oto;

  return (
    <OtoLayout
      otoId="clube"
      passoLabel={txt.oto3PassoLabel}
      alertaTexto={txt.oto3AlertaTexto}
      validacaoTexto={txt.oto3ValidacaoTexto}
      fomoTexto={txt.oto3FomoTexto(nome)}
      curiosidadeTexto={txt.oto3CuriosidadeTexto(nome)}
      reframeTitulo={txt.oto3ReframeTitulo}
      reframeTexto={txt.oto3ReframeTexto(nome)}
      beneficios={txt.oto3Beneficios(nome)}
      depoimentos={txt.oto3Depoimentos}
      modulos={txt.oto3Modulos}
      valorTotal={txt.oto3ValorTotal}
      precoOriginal={txt.oto3PrecoOriginal}
      precoFinal={txt.oto3PrecoFinal}
      periodoPagamento={txt.oto3PeriodoPagamento}
      perfectPayLink={getLocale() !== "pt-BR"
        ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO3_INTL ?? "")
        : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3_UPSELL ?? "")}
      nextRoute="/oto3/down"
    />
  );
}
