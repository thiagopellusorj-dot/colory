"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { t } from "@/lib/i18n";

export default function Oto2Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || t().landing.seuFilho;

  return (
    <OtoLayout
      otoId="musica"
      passoLabel="Oferta exclusiva — Só nesta página"
      alertaTexto="Não feche! Você não verá esta oferta novamente."
      validacaoTexto="Seus pedidos estão sendo preparados!"
      fomoTexto={`Agora imagine o ${nome} ouvindo uma música que foi feita SÓ pra ele. Com o nome dele. Contando a história dele. Uma música que ele vai pedir pra ouvir no carro, na hora de dormir, no aniversário...`}
      curiosidadeTexto={`Uma música personalizada com o nome do ${nome}. Feita por IA. Só dele. Pra sempre.`}
      reframeTitulo="A trilha sonora da infância dele."
      reframeTexto="Música é memória. Quando ele crescer e ouvir essa música de novo, vai lembrar de você, da infância, desse momento. Você está criando uma lembrança que ele vai carregar pro resto da vida."
      beneficios={[
        `Letra personalizada com o nome e características do ${nome}`,
        "Melodia profissional gerada por IA",
        "MP3 em alta qualidade — ouça em qualquer lugar",
        "Perfeita pra hora de dormir, no carro ou no aniversário",
        "Presente inesquecível que nenhum brinquedo substitui",
      ]}
      depoimentos={[
        {
          nome: "Renata P.",
          texto: "Tocamos no aniversário de 5 anos dele. Todas as mães ficaram emocionadas. Meu filho dançou e disse: 'essa música é MINHA, mãe!'. Não tem preço.",
          cidade: "Brasília",
        },
        {
          nome: "Gabriela T.",
          texto: "Uso pra acalmar ela na hora de dormir. Quando ela ouve o nome dela na música, sorri e fecha os olhos. Virou nosso ritual.",
          cidade: "Porto Alegre",
        },
      ]}
      modulos={[
        {
          emoji: "🎵",
          titulo: "Música Personalizada Completa",
          descricao: `Letra com nome e história do ${nome}`,
          valorIndividual: "R$47",
        },
        {
          emoji: "🎤",
          titulo: "Voz Profissional + Melodia",
          descricao: "Produção de qualidade profissional",
          valorIndividual: "R$30",
        },
        {
          emoji: "📱",
          titulo: "MP3 em Alta Qualidade",
          descricao: "Ouça offline, no carro, onde quiser",
          valorIndividual: "R$15",
        },
      ]}
      valorTotal="R$92"
      precoOriginal="R$47"
      precoFinal="R$37"
      perfectPayLink={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO2 ?? ""}
      nextRoute="/oto3"
    />
  );
}
