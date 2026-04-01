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
    // Resultado (funil)
    resultado: {
      title: (nome: string) => `A página do ${nome} ficou pronta!`,
      subtitle: "Veja como ficou a página de colorir personalizada",
      baixar: "Baixar Imagem",
      aguardando: "Estamos finalizando sua página...",
      aguardandoSub: "Falta pouco! Enquanto isso...",
      fallback:
        "Sua página está sendo finalizada com carinho ✨ Enviaremos no seu WhatsApp em alguns minutos.",
    },

    // Contato
    contato: {
      title: "Falta pouco para ver o resultado!",
      subtitle:
        "Deixe seu contato para receber a página de colorir personalizada",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "(11) 99999-9999",
      emailLabel: "E-mail",
      emailPlaceholder: "seu@email.com",
      lgpd: "Concordo em receber comunicações sobre o Colory",
      continuar: "Ver resultado",
    },

    // Paywall
    paywall: {
      // Headlines por objetivo (P4)
      headlines: {
        sem_tela:
          "Troque 1 hora de celular por algo que ele vai colorir e guardar pra sempre.",
        lembranca:
          "Essa é a memória que vai ficar na geladeira da vovó por anos.",
        criativo:
          "Imprima, sente com ele e criem juntos. Esse momento não tem preço.",
        aprendizado:
          "Coordenação, criatividade e foco — colorindo o próprio rosto.",
      } as Record<string, string>,
      headlineDefault:
        "Desbloqueie a página de colorir personalizada do seu filho agora.",
      subtitleBlur: "Sua página está pronta! Desbloqueie para baixar.",

      // Planos
      maisPopular: "Mais popular",
      planoAnualNome: "Plano Anual",
      planoAnualPreco: "R$99,90",
      planoAnualPeriodo: "/ano",
      planoAnualDestaque: "Economize 83%",
      planoSemanalNome: "Plano Semanal",
      planoSemanalPreco: "R$14,90",
      planoSemanalPeriodo: "/semana",
      planoSemanalObs: "equivale a R$29,90/mês",
      ancora: "Sem o plano: R$514/ano",

      // Trust
      garantiaTitulo: "Garantia de 30 dias",
      garantiaTexto:
        "Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.",
      reviewNome: "Camila S.",
      reviewTexto:
        "Meu filho amou! Já imprimimos mais de 20 páginas. Ele pede toda semana pra fazer uma nova.",
      reviewEstrelas: 5,

      // CTA
      ctaAnual: (nome: string) =>
        `Desbloquear a página do ${nome} agora`,
      ctaSemanal: "Começar por R$14,90/semana",

      // Eventos
      geracoesFree: "Você usou sua geração gratuita",
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
