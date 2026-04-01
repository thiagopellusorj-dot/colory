"use client";

import { useState } from "react";
import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";

export default function Oto1Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";
  const [showDownsell, setShowDownsell] = useState(false);

  if (showDownsell) {
    return (
      <OtoLayout
        otoId="livro_downsell"
        passoLabel="Última chance"
        alertaTexto="Espera! Temos algo especial pra você..."
        validacaoTexto="Entendemos que o valor pode pesar."
        fomoTexto={`E se você pudesse dar ao ${nome} pelo menos 1 livro personalizado — com ele como protagonista — por menos da metade?`}
        curiosidadeTexto={`Imagine o ${nome} abrindo um livro e vendo ELE MESMO como herói da história.`}
        reframeTitulo="1 livro. 1 história. 100% dele."
        reframeTexto="Um livro PDF personalizado com seu filho como protagonista. Pronto pra imprimir ou ler no tablet."
        beneficios={[
          "História única gerada por IA com o nome e rosto do seu filho",
          "Ilustrações personalizadas em cada página",
          "PDF em alta resolução — imprima quantas vezes quiser",
          "Seu filho como herói da própria história",
        ]}
        depoimentos={[
          {
            nome: "Juliana M.",
            texto: "Meu filho não para de pedir pra ler 'o livro dele'. Toda noite é o mesmo: 'mãe, lê o MEU livro!'",
            cidade: "Belo Horizonte",
          },
          {
            nome: "Fernanda L.",
            texto: "Dei de presente de aniversário. Ele chorou de emoção quando viu o nome dele na capa.",
            cidade: "Curitiba",
          },
        ]}
        modulos={[
          {
            emoji: "📖",
            titulo: "1 Livro PDF Personalizado",
            descricao: `História com ${nome} como protagonista`,
            valorIndividual: "R$67",
          },
          {
            emoji: "🎨",
            titulo: "Ilustrações Personalizadas",
            descricao: "Rosto do seu filho em cada página",
            valorIndividual: "R$30",
          },
        ]}
        valorTotal="R$97"
        precoOriginal="R$67"
        precoFinal="R$47"
        perfectPayLink={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1 ?? ""}
        nextRoute="/oto2"
      />
    );
  }

  return (
    <OtoLayout
      otoId="livro"
      passoLabel="Passo 1 de 2 — Não feche esta página"
      alertaTexto="Sua compra NÃO está finalizada ainda..."
      validacaoTexto="Sua assinatura do Colory foi confirmada!"
      fomoTexto={`Você acabou de dar um passo incrível pro ${nome}. Mas precisamos ser honestos: sair desta página agora pode fazer você perder a oportunidade de transformar a experiência dele em algo muito maior.`}
      curiosidadeTexto={`E se o ${nome} pudesse ser o HERÓI da própria história? Imagine ele abrindo um livro e vendo o próprio rosto em cada página.`}
      reframeTitulo="Mais que um livro. Uma memória que ele vai guardar pra sempre."
      reframeTexto={`Livros personalizados não são só entretenimento. São ferramentas que desenvolvem o amor pela leitura, fortalecem a identidade e criam momentos de conexão entre mãe e filho que não tem preço.`}
      beneficios={[
        `${nome} como protagonista — nome e rosto em cada página`,
        "Estimula o amor pela leitura desde cedo",
        "Momento de conexão: leia junto toda noite",
        "Imprima quantas vezes quiser — é seu pra sempre",
        "Presente perfeito para avós, tios e padrinhos",
      ]}
      depoimentos={[
        {
          nome: "Camila R.",
          texto: "Comprei achando que era bobeira. Meu filho de 4 anos decorou a história inteira. Ele conta pra todo mundo que 'tem um livro dele'. Já fiz 3 cópias pra dar de presente.",
          cidade: "São Paulo",
        },
        {
          nome: "Patrícia S.",
          texto: "A vovó chorou quando viu o neto como personagem. Virou o presente de Natal mais especial que já demos. Vale cada centavo.",
          cidade: "Rio de Janeiro",
        },
        {
          nome: "Amanda K.",
          texto: "Toda noite minha filha pede: 'mãe, lê o MEU livro'. Ela se sente tão especial. Melhor investimento que já fiz em conteúdo pra ela.",
          cidade: "Florianópolis",
        },
      ]}
      modulos={[
        {
          emoji: "📖",
          titulo: "2 Livros PDF Personalizados",
          descricao: `Histórias únicas com ${nome} como protagonista`,
          valorIndividual: "R$67",
        },
        {
          emoji: "🎨",
          titulo: "Ilustrações com IA",
          descricao: "Rosto do seu filho em cada página da história",
          valorIndividual: "R$40",
        },
        {
          emoji: "🖨️",
          titulo: "Alta Resolução para Impressão",
          descricao: "PDF pronto pra imprimir em casa ou gráfica",
          valorIndividual: "R$20",
        },
        {
          emoji: "🎁",
          titulo: "Bônus: Capa Personalizada",
          descricao: `Nome do ${nome} na capa como autor e herói`,
          valorIndividual: "R$15",
        },
      ]}
      valorTotal="R$142"
      precoOriginal="R$97"
      precoFinal="R$67"
      perfectPayLink={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1 ?? ""}
      nextRoute="/oto2"
      onDecline={() => setShowDownsell(true)}
    />
  );
}
