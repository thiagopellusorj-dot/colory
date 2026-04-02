"use client";

import { OtoLayout } from "@/components/funil/OtoLayout";
import { BookPreview } from "@/components/funil/BookPreview";
import { ComoFunciona } from "@/components/funil/ComoFunciona";
import { TransformacaoVisual } from "@/components/funil/TransformacaoVisual";
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

const temas = [
  "Dinossauros",
  "Princesas",
  "Aventura",
  "Unicórnios",
  "Espaço",
  "Piratas",
  "Animais",
  "Super-Heróis",
];

export default function Oto1Page() {
  const store = useFunilStore();
  const nome = store.nome_filho || "seu filho";
  return (
    <OtoLayout
      otoId="livro"
      passoLabel="Passo 1 de 2 — Não feche esta página"
      alertaTexto="Sua compra NÃO está finalizada ainda..."
      validacaoTexto="Sua assinatura do Colory foi confirmada!"
      fomoTexto={`Você acabou de dar um passo incrível pro ${nome}. Mas precisamos ser honestos: sair desta página agora pode fazer você perder a oportunidade de transformar a experiência dele em algo muito maior.`}
      curiosidadeTexto={`E se o ${nome} pudesse ser o HERÓI da própria história? Imagine ele abrindo um livro e vendo o próprio rosto em cada página.`}
      previewSection={
        <div className="space-y-6">
          <BookPreview nomeFilho={nome} />
          <ComoFunciona />
          <TransformacaoVisual />
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide text-center font-semibold mb-3">
              Temas disponíveis
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {temas.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      }
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
          texto:
            "Comprei achando que era bobeira. Meu filho de 4 anos decorou a história inteira. Ele conta pra todo mundo que 'tem um livro dele'. Já fiz 3 cópias pra dar de presente.",
          cidade: "São Paulo",
        },
        {
          nome: "Patrícia S.",
          texto:
            "A vovó chorou quando viu o neto como personagem. Virou o presente de Natal mais especial que já demos. Vale cada centavo.",
          cidade: "Rio de Janeiro",
        },
        {
          nome: "Amanda K.",
          texto:
            "Toda noite minha filha pede: 'mãe, lê o MEU livro'. Ela se sente tão especial. Melhor investimento que já fiz em conteúdo pra ela.",
          cidade: "Florianópolis",
        },
      ]}
      modulos={[
        {
          emoji: "\uD83D\uDCD6",
          titulo: "2 Livros PDF Personalizados",
          descricao: `Histórias únicas com ${nome} como protagonista`,
          valorIndividual: "R$67",
        },
        {
          emoji: "\uD83C\uDFA8",
          titulo: "Ilustrações com IA",
          descricao: "Rosto do seu filho em cada página da história",
          valorIndividual: "R$40",
        },
        {
          emoji: "\uD83D\uDDA8\uFE0F",
          titulo: "Alta Resolução para Impressão",
          descricao: "PDF pronto pra imprimir em casa ou gráfica",
          valorIndividual: "R$20",
        },
        {
          emoji: "\uD83C\uDF81",
          titulo: "Bônus: Capa Personalizada",
          descricao: `Nome do ${nome} na capa como autor e herói`,
          valorIndividual: "R$15",
        },
      ]}
      valorTotal="R$142"
      precoOriginal="R$97"
      precoFinal="R$67"
      garantiaSection={<GarantiaBadge />}
      faqItems={faqItems}
      perfectPayLink={process.env.NEXT_PUBLIC_PERFECTPAY_LINK_OTO1_UPSELL ?? ""}
      nextRoute="/oto1/down"
    />
  );
}
