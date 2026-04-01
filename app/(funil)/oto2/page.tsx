"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { t } from "@/lib/i18n";

export default function Oto2Page() {
  const store = useFunilStore();
  const txt = t().oto;
  const nome = store.nome_filho || "seu filho";

  return (
    <OtoLayout
      otoId="musica"
      emoji={txt.oto2Emoji}
      titulo={txt.oto2Titulo(nome)}
      descricao={txt.oto2Desc}
      precoAtual={txt.oto2Por}
      perfectPayEnvVar={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO2 ?? ""}
      nextRoute="/oto3"
    />
  );
}
