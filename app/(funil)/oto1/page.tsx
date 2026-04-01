"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { t } from "@/lib/i18n";

export default function Oto1Page() {
  const store = useFunilStore();
  const router = useRouter();
  const txt = t().oto;
  const nome = store.nome_filho || "seu filho";
  const [showDownsell, setShowDownsell] = useState(false);

  if (showDownsell) {
    return (
      <OtoLayout
        otoId="livro_downsell"
        emoji={txt.oto1Emoji}
        titulo={txt.oto1DownsellTitulo}
        descricao={txt.oto1DownsellDesc}
        precoAtual={txt.oto1DownsellPor}
        perfectPayEnvVar={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1 ?? ""}
        nextRoute="/oto2"
      />
    );
  }

  return (
    <OtoLayout
      otoId="livro"
      emoji={txt.oto1Emoji}
      titulo={txt.oto1Titulo(nome)}
      descricao={txt.oto1Desc}
      precoOriginal={txt.oto1De}
      precoAtual={txt.oto1Por}
      perfectPayEnvVar={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1 ?? ""}
      nextRoute="/oto2"
      onDecline={() => setShowDownsell(true)}
    />
  );
}
