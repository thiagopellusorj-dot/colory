"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { useFunilStore } from "@/store/funilStore";

export default function Oto3Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";

  return (
    <OtoLayout
      otoId="clube"
      passoLabel="Última oferta — Não aparecerá novamente"
      alertaTexto="Depois desta página, o preço volta ao normal."
      validacaoTexto="Quase lá! Só mais uma coisa..."
      fomoTexto={`Você já tem as páginas de colorir. Talvez já tenha o livro e a música. Mas e se o ${nome} pudesse receber atividades novas TODA SEMANA? Sem você precisar pensar, buscar ou criar nada?`}
      curiosidadeTexto={`Um clube inteiro de atividades personalizadas. Colorir, recortar, ligar os pontos, caça-palavras — tudo com o ${nome} como tema.`}
      reframeTitulo="1 ano inteiro de atividades. Sem tela. Sem repetir."
      reframeTexto={`São 52 semanas de conteúdo novo pra manter o ${nome} entretido, aprendendo e longe das telas. Você recebe toda semana no email, imprime e pronto. Zero esforço pra você, máxima diversão pra ele.`}
      beneficios={[
        "Atividades novas toda semana — nunca repete",
        `Personalizadas com o nome do ${nome}`,
        "Colorir, recortar, ligar pontos, caça-palavras e mais",
        "Receba por email — é só imprimir",
        "Longe das telas: atividade real, com papel e lápis",
        "Ideal pra viagens, restaurantes e fins de semana",
      ]}
      depoimentos={[
        {
          nome: "Mariana C.",
          texto: "Toda sexta meu filho já pergunta: 'mãe, chegou minha atividade?'. Virou a tradição do fim de semana. Ele adora e eu tenho 1 hora de paz.",
          cidade: "Campinas",
        },
        {
          nome: "Carolina B.",
          texto: "Cancelei 2 apps de tablet depois que assinei o clube. Meu filho prefere as atividades impressas. E eu prefiro ele longe da tela.",
          cidade: "Salvador",
        },
        {
          nome: "Thais R.",
          texto: "Levo nas viagens de carro. É a única coisa que mantém ele quieto por 1 hora sem iPad. Já valeu o investimento do ano inteiro.",
          cidade: "Goiânia",
        },
      ]}
      modulos={[
        {
          emoji: "📋",
          titulo: "52 Pacotes de Atividades Semanais",
          descricao: "1 ano completo de conteúdo",
          valorIndividual: "R$156",
        },
        {
          emoji: "🎨",
          titulo: "Páginas de Colorir Temáticas",
          descricao: "Datas comemorativas, estações, temas infantis",
          valorIndividual: "R$40",
        },
        {
          emoji: "✂️",
          titulo: "Recorte, Cole e Monte",
          descricao: "Atividades de coordenação motora",
          valorIndividual: "R$30",
        },
        {
          emoji: "🔤",
          titulo: "Caça-Palavras e Ligar Pontos",
          descricao: "Aprendizado disfarçado de diversão",
          valorIndividual: "R$25",
        },
        {
          emoji: "📧",
          titulo: "Entrega Semanal por Email",
          descricao: "Receba, imprima e pronto",
          valorIndividual: "R$0",
        },
      ]}
      valorTotal="R$251"
      precoOriginal="R$197"
      precoFinal="R$97"
      periodoPagamento="pagamento único — acesso por 1 ano"
      perfectPayLink={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO3_UPSELL ?? ""}
      nextRoute="/oto3/down"
    />
  );
}
