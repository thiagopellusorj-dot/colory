"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { BookPreview } from "@/components/funil/BookPreview";
import { GarantiaBadge } from "@/components/funil/GarantiaBadge";
import { useFunilStore } from "@/store/funilStore";

const faqItems = [
  {
    pergunta: "Como personalizo o livro?",
    resposta:
      "Após confirmar o pagamento, você envia uma foto do seu filho e escolhe o tema. Nossa IA cria as ilustrações com o rosto dele em cada página. Simples assim.",
  },
  {
    pergunta: "Quanto tempo leva para receber?",
    resposta:
      "Em até 24 horas após o pagamento, você recebe o PDF personalizado no seu e-mail, pronto para imprimir.",
  },
  {
    pergunta: "Posso imprimir quantas vezes quiser?",
    resposta:
      "Sim! O arquivo PDF é seu para sempre. Imprima em casa, na gráfica, ou leia no tablet — sem limite de cópias.",
  },
];

export default function Oto1DownsellPage() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";

  return (
    <OtoLayout
      otoId="livro_downsell"
      passoLabel="Última chance — oferta reduzida"
      alertaTexto="Espera! Temos algo especial pra você..."
      validacaoTexto="Entendemos que o valor pode pesar."
      fomoTexto={`E se você pudesse dar ao ${nome} pelo menos 1 livro personalizado — com ele como protagonista — por menos da metade?`}
      curiosidadeTexto={`Imagine o ${nome} abrindo um livro e vendo ELE MESMO como herói da história.`}
      previewSection={<BookPreview nomeFilho={nome} />}
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
          texto:
            "Meu filho não para de pedir pra ler 'o livro dele'. Toda noite é o mesmo: 'mãe, lê o MEU livro!'",
          cidade: "Belo Horizonte",
        },
        {
          nome: "Fernanda L.",
          texto:
            "Dei de presente de aniversário. Ele chorou de emoção quando viu o nome dele na capa.",
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
      garantiaSection={<GarantiaBadge />}
      faqItems={faqItems}
      perfectPayLink={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_DOWN ?? ""}
      nextRoute="/oto3"
    />
  );
}
