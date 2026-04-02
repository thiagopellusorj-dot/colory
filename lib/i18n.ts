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

      // P4 — Tempo de tela
      tempoTelaTitle: (nome: string) =>
        `Quanto tempo por dia o ${nome} passa em frente às telas?`,
      tempoTela1h: "Menos de 1 hora",
      tempoTela2h: "1 a 2 horas",
      tempoTela4h: "2 a 4 horas",
      tempoTela4hMais: "Mais de 4 horas",
      feedbackTela1h: "Ótimo! Atividades offline ajudam a manter assim!",
      feedbackTela2h: "Normal, mas trocar parte por algo criativo faz diferença!",
      feedbackTela4h: "Muitas mães passam por isso. Temos a solução perfeita!",
      feedbackTela4hMais: "Você não está sozinha. Vamos mudar isso juntas!",

      // P5 — Conexão
      conexaoTitle: (nome: string) =>
        `Você sente que poderia ter mais momentos de conexão com o ${nome}?`,
      conexaoSim: "Sim, quero mais momentos juntos",
      conexaoCorrido: "Sim, o dia a dia corrido não ajuda",
      conexaoFalta: "Às vezes sinto falta disso",
      feedbackConexaoSim: "Colorir juntos cria esses momentos mágicos!",
      feedbackConexaoCorrido: "Entendemos! Em 5 minutos vocês já estão colorindo juntos.",
      feedbackConexaoFalta: "Cada página é uma oportunidade de conexão!",

      // P6 — Objetivo
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
          "Troque o tempo de tela por algo que ele vai colorir e guardar pra sempre",
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
      planoAnualDestaque: "Economize 79%",
      planoAnualObs: "apenas R$8,33/mês",
      planoMensalNome: "Plano Mensal",
      planoMensalPreco: "R$39,90",
      planoMensalPeriodo: "/mês",
      planoMensalObs: "cancele quando quiser",
      ancora: "Sem o plano: R$478/ano",

      // Trust
      garantiaTitulo: "Garantia de 7 dias",
      garantiaTexto:
        "Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.",
      reviewNome: "Camila S.",
      reviewTexto:
        "Meu filho amou! Já imprimimos mais de 20 páginas. Ele pede toda semana pra fazer uma nova.",
      reviewEstrelas: 5,

      // CTA
      ctaAnual: (nome: string) =>
        `Desbloquear a página do ${nome} agora`,
      ctaMensal: "Começar por R$39,90/mês",

      // Eventos
      geracoesFree: "Você usou sua geração gratuita",
    },

    // OTOs
    oto: {
      timerLabel: "Oferta expira em",
      simQuero: "SIM, eu quero!",
      naoObrigado: "Não, obrigado",

      // OTO1 — Livro
      oto1Titulo: (nome: string) =>
        `Transforme as aventuras do ${nome} em um livro de história!`,
      oto1Desc:
        "2 livros PDF personalizados com seu filho como protagonista. Histórias únicas que ele vai pedir pra ler toda noite.",
      oto1De: "R$97",
      oto1Por: "R$67",
      oto1Emoji: "📖",

      // OTO1 Downsell
      oto1DownsellTitulo: "Que tal começar com 1 livro?",
      oto1DownsellDesc:
        "1 livro PDF personalizado com seu filho como protagonista. Uma história única só dele.",
      oto1DownsellPor: "R$47",

      // OTO2 — Música
      oto2Titulo: (nome: string) =>
        `Uma música só do ${nome}!`,
      oto2Desc:
        "Música personalizada com o nome e características do seu filho. Perfeita pra tocar no carro, na hora de dormir ou no aniversário.",
      oto2Por: "R$37",
      oto2Emoji: "🎵",

      // OTO3 — Clube
      oto3Titulo: (nome: string) =>
        `${nome} no Clube de Atividades!`,
      oto3Desc:
        "Acesso anual ao clube com atividades semanais personalizadas: colorir, recortar, ligar os pontos e muito mais.",
      oto3Por: "R$97",
      oto3PorPeriodo: "pagamento único",
      oto3Emoji: "🎨",
    },

    // App — Criar
    app: {
      criarTitle: "Nova Página de Colorir",
      criarSubtitle: "Escolha uma foto e um estilo para criar",
      selecioneFilho: "Para quem é a página?",
      adicionarFilho: "Adicionar filho",
      estiloTitle: "Estilo da página",
      estilos: {
        classico: "Clássico",
        cartoon: "Cartoon",
        detalhado: "Detalhado",
        simples: "Simples",
        mandala: "Mandala",
        anime: "Anime",
      } as Record<string, string>,
      estiloBloqueado: "Disponível no Clube",
      enviarFoto: "Enviar foto",
      gerarPagina: "Gerar página de colorir",
      trocarFoto: "Trocar foto",

      // Gerando
      gerandoTitle: "Criando sua página...",

      // Resultado
      resultadoTitle: (nome: string) => `A página do ${nome} ficou pronta!`,
      resultadoSubtitle: "Imprima e divirta-se colorindo!",
      baixar: "Baixar Imagem",
      compartilhar: "Compartilhar",
      criarOutra: "Criar outra página",
      ofertaEspecial: "Oferta especial para você",
      desbloquear: "Desbloquear",

      // Páginas
      paginasTitle: "Minhas Páginas",
      paginasEmpty: "Você ainda não criou nenhuma página",
      paginasEmptyCta: "Criar minha primeira página",
      filtrarPor: "Filtrar por:",
      todos: "Todos",
      clubeCard: "Desbloqueie estilos exclusivos e atividades semanais!",
      clubeCta: "Conhecer o Clube",

      // Configurações
      configTitle: "Minha Conta",
      configEmail: "E-mail",
      configPlano: "Plano",
      configFilhos: "Filhos cadastrados",
      configAdicionarFilho: "Adicionar filho",
      configNome: "Nome",
      configGenero: "Gênero",
      configIdade: "Idade",
      configSalvar: "Salvar",
      configSair: "Sair da conta",
      configSuporte: "Precisa de ajuda? Fale conosco no WhatsApp",
    },

    // Obrigado
    obrigado: {
      titulo: (nome: string) =>
        `Pronto! A página do ${nome} está liberada!`,
      subtitulo: "Enviamos também no seu WhatsApp e e-mail.",
      baixar: "Baixar Imagem",
      resumoTitulo: "Resumo da sua compra",
      plano: "Plano",
      otos: "Extras",
      nomesProdutos: {
        livro: "📖 Livro Personalizado",
        livro_downsell: "📖 Livro Personalizado (1 un.)",
        musica: "🎵 Música Personalizada",
        clube: "🎨 Clube de Atividades",
      } as Record<string, string>,
      acessoApp: "Acesse o app completo pelo link que enviamos no seu e-mail.",
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
