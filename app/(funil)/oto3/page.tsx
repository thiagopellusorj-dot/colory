"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { t } from "@/lib/i18n";

export default function Oto3Page() {
  const store = useFunilStore();
  const txt = t().oto;
  const nome = store.nome_filho || "seu filho";

  return (
    <OtoLayout
      otoId="clube"
      emoji={txt.oto3Emoji}
      titulo={txt.oto3Titulo(nome)}
      descricao={txt.oto3Desc}
      precoAtual={txt.oto3Por}
      periodoPagamento={txt.oto3PorPeriodo}
      perfectPayEnvVar={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3 ?? ""}
      nextRoute="/obrigado"
    />
  );
}
