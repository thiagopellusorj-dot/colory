const translations = {
  "pt-BR": {
    // Landing Page
    landing: {
      badge: "Mais de 12.847 mães já criaram",
      headline: "Transforme fotos do seu filho em páginas de colorir personalizadas",
      subheadline: "Em segundos com apenas alguns cliques!",
      cta: "Criar Agora",
      trust: "Resultado em menos de 60 segundos.",
      fotoOriginal: "Foto original",
      paginaColorir: "Página de colorir",
      antesDepois: "Antes e depois",
    },

    // Quiz
    quiz: {
      // P1 — Gênero
      generoSubtitle: "Vamos começar!",
      generoTitle: "Vamos criar algo especial. Seu filho é...",
      menino: "Menino",
      menina: "Menina",
      feedbackMenino: "Ótimo! Vamos criar algo incrível pra ele!",
      feedbackMenina: "Ótimo! Vamos criar algo incrível pra ela!",

      // P2 — Idade
      idadeTitle: (pronome: string) => `Quantos anos tem ${pronome}?`,
      idade02: "0-2 anos",
      idade35: "3-5 anos",
      idade68: "6-8 anos",
      idade912: "9-12 anos",
      feedbackIdade02: "Que fofo! Vamos criar algo bem especial!",
      feedbackIdade35: "Essa é a fase mais criativa!",
      feedbackIdade68: "Idade perfeita pra colorir!",
      feedbackIdade912: "Vai adorar o resultado!",

      // P3 — Nome
      nomeTitle: (pronome: string) => `Qual o nome ${pronome}?`,
      nomePlaceholder: "Digite o nome...",
      nomeContinuar: "Continuar",

      // Transição
      transicaoTitle: (nome: string) => `Preparando algo especial para o ${nome}...`,

      // P4 — Objetivo
      objetivoTitle: (nome: string) =>
        `O que você mais quer proporcionar para o ${nome}?`,
      objetivoCriativo: "Momentos criativos",
      objetivoSemTela: "Atividade sem tela",
      objetivoLembranca: "Uma lembrança especial",
      objetivoAprendizado: "Aprendizado divertido",
      feedbackCriativo: "Perfeito! Colorir estimula a criatividade!",
      feedbackSemTela: "Ótima escolha! Atividade longe das telas!",
      feedbackLembranca: "Que lindo! Uma memória pra guardar pra sempre!",
      feedbackAprendizado: "Colorir ensina de um jeito divertido!",
    },

    // Upload
    upload: {
      title: (nome: string) => `Agora envie uma foto do ${nome}`,
      subtitle: "Escolha a melhor foto — de preferência com o rosto bem visível",
      dragDrop: "Arraste uma foto aqui",
      ou: "ou",
      selectButton: "Selecionar foto",
      trocar: "Trocar foto",
      gerar: "Gerar página de colorir",
      formatos: "JPG, PNG ou WEBP — máx. 10MB",
      comprimindo: "Otimizando imagem...",
    },

    // Processando
    processando: {
      etapa1: (nome: string) => `Foto do ${nome} recebida`,
      etapa2: "Analisando detalhes do rosto",
      etapa3: "Criando os traços para colorir...",
      etapa4: "Finalizando sua página...",
      fatos: [
        "Colorir ajuda no desenvolvimento da coordenação motora fina das crianças.",
        "Crianças que colorem regularmente têm melhor concentração na escola.",
        "A atividade de colorir reduz o estresse e a ansiedade em crianças.",
        "Colorir estimula a criatividade e a expressão artística desde cedo.",
        "Páginas de colorir personalizadas aumentam o engajamento da criança.",
      ],
      fatoLabel: "Você sabia?",
      timeout: "Está demorando mais que o esperado. Já já fica pronto!",
      erro: "Ops! Algo deu errado. Tente novamente.",
      tentarNovamente: "Tentar novamente",
    },
  },
} as const;

export type Locale = keyof typeof translations;

let currentLocale: Locale = "pt-BR";

export function setLocale(locale: Locale) {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t() {
  return translations[currentLocale];
}
