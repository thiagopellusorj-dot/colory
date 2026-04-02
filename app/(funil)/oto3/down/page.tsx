"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";
import { getLocale } from "@/lib/i18n";

export default function Oto3DownsellPage() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";

  return (
    <OtoLayout
      otoId="clube_downsell"
      passoLabel="Última chance — oferta reduzida"
      alertaTexto="Espera! E se fosse pela metade do tempo e do preço?"
      validacaoTexto="Entendemos. O anual pode parecer muito."
      fomoTexto={`E se você pudesse testar o Clube por 6 meses — com tudo incluso — por menos da metade? Se o ${nome} adorar (e ele vai), você renova depois.`}
      curiosidadeTexto={`26 semanas de atividades personalizadas. Toda semana algo novo pra imprimir e brincar com o ${nome}.`}
      reframeTitulo="6 meses de atividades. Sem compromisso de 1 ano."
      reframeTexto={`Teste o Clube por meio período. São 26 semanas de conteúdo novo — colorir, recortar, ligar os pontos — tudo personalizado com o nome do ${nome}. Se ele amar, você decide se renova.`}
      beneficios={[
        "26 semanas de atividades novas — nunca repete",
        `Personalizadas com o nome do ${nome}`,
        "Colorir, recortar, ligar pontos, caça-palavras e mais",
        "Receba por email — é só imprimir",
        "Sem compromisso longo — teste por 6 meses",
        "Metade do preço do plano anual",
      ]}
      depoimentos={[
        {
          nome: "Mariana C.",
          texto: "Toda sexta meu filho já pergunta: 'mãe, chegou minha atividade?'. Virou a tradição do fim de semana.",
          cidade: "Campinas",
        },
        {
          nome: "Thais R.",
          texto: "Levo nas viagens de carro. É a única coisa que mantém ele quieto por 1 hora sem iPad.",
          cidade: "Goiânia",
        },
      ]}
      modulos={[
        {
          emoji: "📋",
          titulo: "26 Pacotes de Atividades Semanais",
          descricao: "6 meses de conteúdo personalizado",
          valorIndividual: "R$78",
        },
        {
          emoji: "🎨",
          titulo: "Páginas de Colorir Temáticas",
          descricao: "Datas comemorativas e temas infantis",
          valorIndividual: "R$20",
        },
        {
          emoji: "✂️",
          titulo: "Recorte, Cole e Monte",
          descricao: "Atividades de coordenação motora",
          valorIndividual: "R$15",
        },
        {
          emoji: "📧",
          titulo: "Entrega Semanal por Email",
          descricao: "Receba, imprima e pronto",
          valorIndividual: "R$0",
        },
      ]}
      valorTotal="R$113"
      precoOriginal="R$97"
      precoFinal="R$47"
      periodoPagamento="pagamento único — acesso por 6 meses"
      perfectPayLink={getLocale() !== "pt-BR"
        ? (process.env.NEXT_PUBLIC_CHECKOUT_LINK_OTO3_INTL ?? "")
        : (process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3_DOWN ?? "")}
      nextRoute="/obrigado"
    />
  );
}
