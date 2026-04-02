const translations = {
  "pt-BR": {
    // Landing Page
    landing: {
      badge: "Mais de 12.847 mães já criaram",
      headline: "Transforme fotos do seu filho em páginas de colorir personalizadas",
      headlineHighlight: "páginas de colorir personalizadas",
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
      idadeTitle: (genero: string) => `Quantos anos tem ${genero === "menina" ? "ela" : "ele"}?`,
      idade02: "0-2 anos",
      idade35: "3-5 anos",
      idade68: "6-8 anos",
      idade912: "9-12 anos",
      feedbackIdade02: "Que fofo! Vamos criar algo bem especial!",
      feedbackIdade35: "Essa é a fase mais criativa!",
      feedbackIdade68: "Idade perfeita pra colorir!",
      feedbackIdade912: "Vai adorar o resultado!",

      // P3 — Nome
      nomeTitle: (genero: string) => `Qual o nome ${genero === "menina" ? "dela" : "dele"}?`,
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

  en: {
    // Landing Page
    landing: {
      badge: "Over 12,847 moms have already created",
      headline: "Turn your child's photos into personalized coloring pages",
      headlineHighlight: "personalized coloring pages",
      subheadline: "In seconds with just a few clicks!",
      cta: "Create Now",
      trust: "Results in under 60 seconds.",
      fotoOriginal: "Original photo",
      paginaColorir: "Coloring page",
      antesDepois: "Before and after",
    },

    // Quiz
    quiz: {
      // P1 — Gender
      generoSubtitle: "Let's get started!",
      generoTitle: "Let's create something special. Your child is a...",
      menino: "Boy",
      menina: "Girl",
      feedbackMenino: "Great! Let's create something amazing for him!",
      feedbackMenina: "Great! Let's create something amazing for her!",

      // P2 — Age
      idadeTitle: (genero: string) => `How old is ${genero === "menina" ? "she" : "he"}?`,
      idade02: "0-2 years",
      idade35: "3-5 years",
      idade68: "6-8 years",
      idade912: "9-12 years",
      feedbackIdade02: "So cute! We'll create something really special!",
      feedbackIdade35: "This is the most creative age!",
      feedbackIdade68: "Perfect age for coloring!",
      feedbackIdade912: "They're going to love the result!",

      // P3 — Name
      nomeTitle: (genero: string) => `What's ${genero === "menina" ? "her" : "his"} name?`,
      nomePlaceholder: "Enter the name...",
      nomeContinuar: "Continue",

      // Transition
      transicaoTitle: (nome: string) => `Preparing something special for ${nome}...`,

      // P4 — Screen time
      tempoTelaTitle: (nome: string) =>
        `How much time per day does ${nome} spend in front of screens?`,
      tempoTela1h: "Less than 1 hour",
      tempoTela2h: "1 to 2 hours",
      tempoTela4h: "2 to 4 hours",
      tempoTela4hMais: "More than 4 hours",
      feedbackTela1h: "Great! Offline activities help keep it that way!",
      feedbackTela2h: "Normal, but swapping some for something creative makes a difference!",
      feedbackTela4h: "Many moms go through this. We have the perfect solution!",
      feedbackTela4hMais: "You're not alone. Let's change that together!",

      // P5 — Connection
      conexaoTitle: (nome: string) =>
        `Do you feel you could have more bonding moments with ${nome}?`,
      conexaoSim: "Yes, I want more moments together",
      conexaoCorrido: "Yes, busy days make it hard",
      conexaoFalta: "Sometimes I miss that",
      feedbackConexaoSim: "Coloring together creates those magical moments!",
      feedbackConexaoCorrido: "We get it! In 5 minutes you'll be coloring together.",
      feedbackConexaoFalta: "Every page is a chance to connect!",

      // P6 — Goal
      objetivoTitle: (nome: string) =>
        `What do you most want to give ${nome}?`,
      objetivoCriativo: "Creative moments",
      objetivoSemTela: "Screen-free activity",
      objetivoLembranca: "A special keepsake",
      objetivoAprendizado: "Fun learning",
      feedbackCriativo: "Perfect! Coloring sparks creativity!",
      feedbackSemTela: "Great choice! An activity away from screens!",
      feedbackLembranca: "How lovely! A memory to treasure forever!",
      feedbackAprendizado: "Coloring teaches in a fun way!",
    },

    // Upload
    upload: {
      title: (nome: string) => `Now upload a photo of ${nome}`,
      subtitle: "Pick the best photo — ideally with the face clearly visible",
      dragDrop: "Drag a photo here",
      ou: "or",
      selectButton: "Select photo",
      trocar: "Change photo",
      gerar: "Generate coloring page",
      formatos: "JPG, PNG or WEBP — max 10MB",
      comprimindo: "Optimizing image...",
    },

    // Processing
    processando: {
      etapa1: (nome: string) => `${nome}'s photo received`,
      etapa2: "Analyzing facial details",
      etapa3: "Creating the coloring outlines...",
      etapa4: "Finalizing your page...",
      fatos: [
        "Coloring helps develop fine motor skills in children.",
        "Kids who color regularly show better focus at school.",
        "Coloring reduces stress and anxiety in children.",
        "Coloring stimulates creativity and artistic expression from an early age.",
        "Personalized coloring pages boost a child's engagement.",
      ],
      fatoLabel: "Did you know?",
      timeout: "It's taking a bit longer than expected. Almost ready!",
      erro: "Oops! Something went wrong. Please try again.",
      tentarNovamente: "Try again",
    },

    // Result (funnel)
    resultado: {
      title: (nome: string) => `${nome}'s coloring page is ready!`,
      subtitle: "See how the personalized coloring page turned out",
      baixar: "Download Image",
      aguardando: "We're finishing your page...",
      aguardandoSub: "Almost there! In the meantime...",
      fallback:
        "Your page is being lovingly finished ✨ We'll send it to your WhatsApp in a few minutes.",
    },

    // Contact
    contato: {
      title: "Almost there!",
      subtitle:
        "Leave your contact info to receive the personalized coloring page",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "+1 (555) 123-4567",
      emailLabel: "Email",
      emailPlaceholder: "your@email.com",
      lgpd: "I agree to receive communications from Colory",
      continuar: "See result",
    },

    // Paywall
    paywall: {
      // Headlines by goal (P4)
      headlines: {
        sem_tela:
          "Swap screen time for something they'll color and keep forever",
        lembranca:
          "This is the memory that'll hang on grandma's fridge for years.",
        criativo:
          "Print it, sit with them, and create together. This moment is priceless.",
        aprendizado:
          "Coordination, creativity, and focus — by coloring their own face.",
      } as Record<string, string>,
      headlineDefault:
        "Unlock your child's personalized coloring page now.",
      subtitleBlur: "Your page is ready! Unlock to download.",

      // Plans
      maisPopular: "Most popular",
      planoAnualNome: "Annual Plan",
      planoAnualPreco: "$19.90",
      planoAnualPeriodo: "/year",
      planoAnualDestaque: "Save 79%",
      planoAnualObs: "only $1.66/month",
      planoMensalNome: "Monthly Plan",
      planoMensalPreco: "$7.90",
      planoMensalPeriodo: "/month",
      planoMensalObs: "cancel anytime",
      ancora: "Without a plan: $95/year",

      // Trust
      garantiaTitulo: "7-day guarantee",
      garantiaTexto:
        "If you don't love it, we'll refund 100% of your money. No questions asked.",
      reviewNome: "Sarah T.",
      reviewTexto:
        "My son loved it! We've already printed over 20 pages. He asks every week to make a new one.",
      reviewEstrelas: 5,

      // CTA
      ctaAnual: (nome: string) =>
        `Unlock ${nome}'s page now`,
      ctaMensal: "Start for $7.90/month",

      // Events
      geracoesFree: "You've used your free generation",
    },

    // OTOs
    oto: {
      timerLabel: "Offer expires in",
      simQuero: "YES, I want it!",
      naoObrigado: "No, thanks",

      // OTO1 — Book
      oto1Titulo: (nome: string) =>
        `Turn ${nome}'s adventures into a storybook!`,
      oto1Desc:
        "2 personalized PDF storybooks with your child as the main character. Unique stories they'll ask to read every night.",
      oto1De: "$19.90",
      oto1Por: "$13.90",
      oto1Emoji: "📖",

      // OTO1 Downsell
      oto1DownsellTitulo: "How about starting with 1 book?",
      oto1DownsellDesc:
        "1 personalized PDF storybook with your child as the main character. A unique story just for them.",
      oto1DownsellPor: "$9.90",

      // OTO2 — Music
      oto2Titulo: (nome: string) =>
        `A song just for ${nome}!`,
      oto2Desc:
        "A personalized song with your child's name and personality. Perfect for the car, bedtime, or birthday parties.",
      oto2Por: "$7.90",
      oto2Emoji: "🎵",

      // OTO3 — Club
      oto3Titulo: (nome: string) =>
        `${nome} in the Activity Club!`,
      oto3Desc:
        "Annual access to the club with personalized weekly activities: coloring, cutting, connect-the-dots, and much more.",
      oto3Por: "$19.90",
      oto3PorPeriodo: "one-time payment",
      oto3Emoji: "🎨",
    },

    // App — Create
    app: {
      criarTitle: "New Coloring Page",
      criarSubtitle: "Choose a photo and a style to create",
      selecioneFilho: "Who is the page for?",
      adicionarFilho: "Add child",
      estiloTitle: "Page style",
      estilos: {
        classico: "Classic",
        cartoon: "Cartoon",
        detalhado: "Detailed",
        simples: "Simple",
        mandala: "Mandala",
        anime: "Anime",
      } as Record<string, string>,
      estiloBloqueado: "Available in the Club",
      enviarFoto: "Upload photo",
      gerarPagina: "Generate coloring page",
      trocarFoto: "Change photo",

      // Generating
      gerandoTitle: "Creating your page...",

      // Result
      resultadoTitle: (nome: string) => `${nome}'s page is ready!`,
      resultadoSubtitle: "Print it and have fun coloring!",
      baixar: "Download Image",
      compartilhar: "Share",
      criarOutra: "Create another page",
      ofertaEspecial: "Special offer for you",
      desbloquear: "Unlock",

      // Pages
      paginasTitle: "My Pages",
      paginasEmpty: "You haven't created any pages yet",
      paginasEmptyCta: "Create my first page",
      filtrarPor: "Filter by:",
      todos: "All",
      clubeCard: "Unlock exclusive styles and weekly activities!",
      clubeCta: "Discover the Club",

      // Settings
      configTitle: "My Account",
      configEmail: "Email",
      configPlano: "Plan",
      configFilhos: "Registered children",
      configAdicionarFilho: "Add child",
      configNome: "Name",
      configGenero: "Gender",
      configIdade: "Age",
      configSalvar: "Save",
      configSair: "Sign out",
      configSuporte: "Need help? Contact us on WhatsApp",
    },

    // Thank you
    obrigado: {
      titulo: (nome: string) =>
        `Done! ${nome}'s page is unlocked!`,
      subtitulo: "We also sent it to your WhatsApp and email.",
      baixar: "Download Image",
      resumoTitulo: "Your purchase summary",
      plano: "Plan",
      otos: "Extras",
      nomesProdutos: {
        livro: "📖 Personalized Book",
        livro_downsell: "📖 Personalized Book (1 unit)",
        musica: "🎵 Personalized Song",
        clube: "🎨 Activity Club",
      } as Record<string, string>,
      acessoApp: "Access the full app via the link we sent to your email.",
    },
  },

  es: {
    // Landing Page
    landing: {
      badge: "Más de 12.847 mamás ya lo crearon",
      headline: "Convierte las fotos de tu hijo en páginas para colorear personalizadas",
      headlineHighlight: "páginas para colorear personalizadas",
      subheadline: "¡En segundos con solo unos clics!",
      cta: "Crear Ahora",
      trust: "Resultado en menos de 60 segundos.",
      fotoOriginal: "Foto original",
      paginaColorir: "Página para colorear",
      antesDepois: "Antes y después",
    },

    // Quiz
    quiz: {
      // P1 — Género
      generoSubtitle: "¡Empecemos!",
      generoTitle: "Vamos a crear algo especial. Tu hijo es...",
      menino: "Niño",
      menina: "Niña",
      feedbackMenino: "¡Genial! ¡Vamos a crear algo increíble para él!",
      feedbackMenina: "¡Genial! ¡Vamos a crear algo increíble para ella!",

      // P2 — Edad
      idadeTitle: (genero: string) => `¿Cuántos años tiene ${genero === "menina" ? "ella" : "él"}?`,
      idade02: "0-2 años",
      idade35: "3-5 años",
      idade68: "6-8 años",
      idade912: "9-12 años",
      feedbackIdade02: "¡Qué lindo! ¡Crearemos algo muy especial!",
      feedbackIdade35: "¡Esta es la etapa más creativa!",
      feedbackIdade68: "¡Edad perfecta para colorear!",
      feedbackIdade912: "¡Le va a encantar el resultado!",

      // P3 — Nombre
      nomeTitle: (genero: string) => `¿Cómo se llama ${genero === "menina" ? "ella" : "él"}?`,
      nomePlaceholder: "Escribe el nombre...",
      nomeContinuar: "Continuar",

      // Transición
      transicaoTitle: (nome: string) => `Preparando algo especial para ${nome}...`,

      // P4 — Tiempo de pantalla
      tempoTelaTitle: (nome: string) =>
        `¿Cuánto tiempo al día pasa ${nome} frente a las pantallas?`,
      tempoTela1h: "Menos de 1 hora",
      tempoTela2h: "1 a 2 horas",
      tempoTela4h: "2 a 4 horas",
      tempoTela4hMais: "Más de 4 horas",
      feedbackTela1h: "¡Genial! ¡Las actividades offline ayudan a mantenerlo así!",
      feedbackTela2h: "Normal, ¡pero cambiar parte por algo creativo hace la diferencia!",
      feedbackTela4h: "Muchas mamás pasan por esto. ¡Tenemos la solución perfecta!",
      feedbackTela4hMais: "No estás sola. ¡Vamos a cambiarlo juntas!",

      // P5 — Conexión
      conexaoTitle: (nome: string) =>
        `¿Sientes que podrías tener más momentos de conexión con ${nome}?`,
      conexaoSim: "Sí, quiero más momentos juntos",
      conexaoCorrido: "Sí, el día a día ajetreado no ayuda",
      conexaoFalta: "A veces lo extraño",
      feedbackConexaoSim: "¡Colorear juntos crea esos momentos mágicos!",
      feedbackConexaoCorrido: "¡Te entendemos! En 5 minutos ya estarán coloreando juntos.",
      feedbackConexaoFalta: "¡Cada página es una oportunidad de conexión!",

      // P6 — Objetivo
      objetivoTitle: (nome: string) =>
        `¿Qué es lo que más quieres brindarle a ${nome}?`,
      objetivoCriativo: "Momentos creativos",
      objetivoSemTela: "Actividad sin pantallas",
      objetivoLembranca: "Un recuerdo especial",
      objetivoAprendizado: "Aprendizaje divertido",
      feedbackCriativo: "¡Perfecto! ¡Colorear estimula la creatividad!",
      feedbackSemTela: "¡Gran elección! ¡Una actividad lejos de las pantallas!",
      feedbackLembranca: "¡Qué hermoso! ¡Un recuerdo para guardar por siempre!",
      feedbackAprendizado: "¡Colorear enseña de una forma divertida!",
    },

    // Upload
    upload: {
      title: (nome: string) => `Ahora envía una foto de ${nome}`,
      subtitle: "Elige la mejor foto — preferiblemente con el rostro bien visible",
      dragDrop: "Arrastra una foto aquí",
      ou: "o",
      selectButton: "Seleccionar foto",
      trocar: "Cambiar foto",
      gerar: "Generar página para colorear",
      formatos: "JPG, PNG o WEBP — máx. 10MB",
      comprimindo: "Optimizando imagen...",
    },

    // Procesando
    processando: {
      etapa1: (nome: string) => `Foto de ${nome} recibida`,
      etapa2: "Analizando los detalles del rostro",
      etapa3: "Creando los trazos para colorear...",
      etapa4: "Finalizando tu página...",
      fatos: [
        "Colorear ayuda al desarrollo de la motricidad fina en los niños.",
        "Los niños que colorean regularmente muestran mejor concentración en la escuela.",
        "La actividad de colorear reduce el estrés y la ansiedad en los niños.",
        "Colorear estimula la creatividad y la expresión artística desde temprana edad.",
        "Las páginas para colorear personalizadas aumentan el interés del niño.",
      ],
      fatoLabel: "¿Sabías que?",
      timeout: "Está tardando un poco más de lo esperado. ¡Ya casi está listo!",
      erro: "¡Ups! Algo salió mal. Inténtalo de nuevo.",
      tentarNovamente: "Intentar de nuevo",
    },

    // Resultado (embudo)
    resultado: {
      title: (nome: string) => `¡La página de ${nome} está lista!`,
      subtitle: "Mira cómo quedó la página para colorear personalizada",
      baixar: "Descargar Imagen",
      aguardando: "Estamos finalizando tu página...",
      aguardandoSub: "¡Ya casi! Mientras tanto...",
      fallback:
        "Tu página se está finalizando con mucho cariño ✨ Te la enviaremos por WhatsApp en unos minutos.",
    },

    // Contacto
    contato: {
      title: "¡Ya casi puedes ver el resultado!",
      subtitle:
        "Deja tu contacto para recibir la página para colorear personalizada",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "+34 612 345 678",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@correo.com",
      lgpd: "Acepto recibir comunicaciones de Colory",
      continuar: "Ver resultado",
    },

    // Paywall
    paywall: {
      // Headlines por objetivo (P4)
      headlines: {
        sem_tela:
          "Cambia el tiempo de pantalla por algo que coloreará y guardará para siempre",
        lembranca:
          "Este es el recuerdo que estará en la nevera de la abuela por años.",
        criativo:
          "Imprímelo, siéntate con él y creen juntos. Este momento no tiene precio.",
        aprendizado:
          "Coordinación, creatividad y concentración — coloreando su propio rostro.",
      } as Record<string, string>,
      headlineDefault:
        "Desbloquea la página para colorear personalizada de tu hijo ahora.",
      subtitleBlur: "¡Tu página está lista! Desbloquea para descargar.",

      // Planes
      maisPopular: "Más popular",
      planoAnualNome: "Plan Anual",
      planoAnualPreco: "$19.90",
      planoAnualPeriodo: "/año",
      planoAnualDestaque: "Ahorra 79%",
      planoAnualObs: "solo $1.66/mes",
      planoMensalNome: "Plan Mensual",
      planoMensalPreco: "$7.90",
      planoMensalPeriodo: "/mes",
      planoMensalObs: "cancela cuando quieras",
      ancora: "Sin el plan: $95/año",

      // Trust
      garantiaTitulo: "Garantía de 7 días",
      garantiaTexto:
        "Si no te gusta, te devolvemos el 100% de tu dinero. Sin preguntas.",
      reviewNome: "María C.",
      reviewTexto:
        "¡A mi hijo le encantó! Ya imprimimos más de 20 páginas. Cada semana pide hacer una nueva.",
      reviewEstrelas: 5,

      // CTA
      ctaAnual: (nome: string) =>
        `Desbloquear la página de ${nome} ahora`,
      ctaMensal: "Empezar por $7.90/mes",

      // Eventos
      geracoesFree: "Usaste tu generación gratuita",
    },

    // OTOs
    oto: {
      timerLabel: "La oferta expira en",
      simQuero: "¡SÍ, lo quiero!",
      naoObrigado: "No, gracias",

      // OTO1 — Libro
      oto1Titulo: (nome: string) =>
        `¡Convierte las aventuras de ${nome} en un libro de cuentos!`,
      oto1Desc:
        "2 libros PDF personalizados con tu hijo como protagonista. Historias únicas que pedirá leer cada noche.",
      oto1De: "$19.90",
      oto1Por: "$13.90",
      oto1Emoji: "📖",

      // OTO1 Downsell
      oto1DownsellTitulo: "¿Qué tal empezar con 1 libro?",
      oto1DownsellDesc:
        "1 libro PDF personalizado con tu hijo como protagonista. Una historia única solo para él.",
      oto1DownsellPor: "$9.90",

      // OTO2 — Música
      oto2Titulo: (nome: string) =>
        `¡Una canción solo para ${nome}!`,
      oto2Desc:
        "Una canción personalizada con el nombre y personalidad de tu hijo. Perfecta para el coche, la hora de dormir o el cumpleaños.",
      oto2Por: "$7.90",
      oto2Emoji: "🎵",

      // OTO3 — Club
      oto3Titulo: (nome: string) =>
        `¡${nome} en el Club de Actividades!`,
      oto3Desc:
        "Acceso anual al club con actividades semanales personalizadas: colorear, recortar, unir los puntos y mucho más.",
      oto3Por: "$19.90",
      oto3PorPeriodo: "pago único",
      oto3Emoji: "🎨",
    },

    // App — Crear
    app: {
      criarTitle: "Nueva Página para Colorear",
      criarSubtitle: "Elige una foto y un estilo para crear",
      selecioneFilho: "¿Para quién es la página?",
      adicionarFilho: "Agregar hijo",
      estiloTitle: "Estilo de la página",
      estilos: {
        classico: "Clásico",
        cartoon: "Cartoon",
        detalhado: "Detallado",
        simples: "Simple",
        mandala: "Mandala",
        anime: "Anime",
      } as Record<string, string>,
      estiloBloqueado: "Disponible en el Club",
      enviarFoto: "Enviar foto",
      gerarPagina: "Generar página para colorear",
      trocarFoto: "Cambiar foto",

      // Generando
      gerandoTitle: "Creando tu página...",

      // Resultado
      resultadoTitle: (nome: string) => `¡La página de ${nome} está lista!`,
      resultadoSubtitle: "¡Imprímela y diviértete coloreando!",
      baixar: "Descargar Imagen",
      compartilhar: "Compartir",
      criarOutra: "Crear otra página",
      ofertaEspecial: "Oferta especial para ti",
      desbloquear: "Desbloquear",

      // Páginas
      paginasTitle: "Mis Páginas",
      paginasEmpty: "Aún no has creado ninguna página",
      paginasEmptyCta: "Crear mi primera página",
      filtrarPor: "Filtrar por:",
      todos: "Todos",
      clubeCard: "¡Desbloquea estilos exclusivos y actividades semanales!",
      clubeCta: "Conocer el Club",

      // Configuración
      configTitle: "Mi Cuenta",
      configEmail: "Correo electrónico",
      configPlano: "Plan",
      configFilhos: "Hijos registrados",
      configAdicionarFilho: "Agregar hijo",
      configNome: "Nombre",
      configGenero: "Género",
      configIdade: "Edad",
      configSalvar: "Guardar",
      configSair: "Cerrar sesión",
      configSuporte: "¿Necesitas ayuda? Contáctanos por WhatsApp",
    },

    // Gracias
    obrigado: {
      titulo: (nome: string) =>
        `¡Listo! ¡La página de ${nome} está liberada!`,
      subtitulo: "También la enviamos a tu WhatsApp y correo electrónico.",
      baixar: "Descargar Imagen",
      resumoTitulo: "Resumen de tu compra",
      plano: "Plan",
      otos: "Extras",
      nomesProdutos: {
        livro: "📖 Libro Personalizado",
        livro_downsell: "📖 Libro Personalizado (1 ud.)",
        musica: "🎵 Canción Personalizada",
        clube: "🎨 Club de Actividades",
      } as Record<string, string>,
      acessoApp: "Accede a la app completa desde el enlace que enviamos a tu correo.",
    },
  },

  fr: {
    // Landing Page
    landing: {
      badge: "Plus de 12 847 mamans ont déjà créé",
      headline: "Transformez les photos de votre enfant en pages de coloriage personnalisées",
      headlineHighlight: "pages de coloriage personnalisées",
      subheadline: "En quelques secondes, en quelques clics !",
      cta: "Créer Maintenant",
      trust: "Résultat en moins de 60 secondes.",
      fotoOriginal: "Photo originale",
      paginaColorir: "Page de coloriage",
      antesDepois: "Avant et après",
    },

    // Quiz
    quiz: {
      // P1 — Genre
      generoSubtitle: "C'est parti !",
      generoTitle: "Créons quelque chose de spécial. Votre enfant est un...",
      menino: "Garçon",
      menina: "Fille",
      feedbackMenino: "Super ! Nous allons créer quelque chose d'incroyable pour lui !",
      feedbackMenina: "Super ! Nous allons créer quelque chose d'incroyable pour elle !",

      // P2 — Âge
      idadeTitle: (genero: string) => `Quel âge a-t-${genero === "menina" ? "elle" : "il"} ?`,
      idade02: "0-2 ans",
      idade35: "3-5 ans",
      idade68: "6-8 ans",
      idade912: "9-12 ans",
      feedbackIdade02: "Trop mignon ! Nous allons créer quelque chose de très spécial !",
      feedbackIdade35: "C'est l'âge le plus créatif !",
      feedbackIdade68: "L'âge parfait pour colorier !",
      feedbackIdade912: "Il va adorer le résultat !",

      // P3 — Prénom
      nomeTitle: (genero: string) => `Comment ${genero === "menina" ? "s'appelle-t-elle" : "s'appelle-t-il"} ?`,
      nomePlaceholder: "Entrez le prénom...",
      nomeContinuar: "Continuer",

      // Transition
      transicaoTitle: (nome: string) => `Nous préparons quelque chose de spécial pour ${nome}...`,

      // P4 — Temps d'écran
      tempoTelaTitle: (nome: string) =>
        `Combien de temps par jour ${nome} passe-t-il devant les écrans ?`,
      tempoTela1h: "Moins d'1 heure",
      tempoTela2h: "1 à 2 heures",
      tempoTela4h: "2 à 4 heures",
      tempoTela4hMais: "Plus de 4 heures",
      feedbackTela1h: "Super ! Les activités hors écran aident à garder cette habitude !",
      feedbackTela2h: "Normal, mais remplacer une partie par quelque chose de créatif fait la différence !",
      feedbackTela4h: "Beaucoup de mamans vivent la même chose. Nous avons la solution parfaite !",
      feedbackTela4hMais: "Vous n'êtes pas seule. Changeons cela ensemble !",

      // P5 — Connexion
      conexaoTitle: (nome: string) =>
        `Sentez-vous que vous pourriez avoir plus de moments de complicité avec ${nome} ?`,
      conexaoSim: "Oui, je veux plus de moments ensemble",
      conexaoCorrido: "Oui, le quotidien chargé n'aide pas",
      conexaoFalta: "Parfois ça me manque",
      feedbackConexaoSim: "Colorier ensemble crée ces moments magiques !",
      feedbackConexaoCorrido: "On comprend ! En 5 minutes, vous coloriez déjà ensemble.",
      feedbackConexaoFalta: "Chaque page est une occasion de se retrouver !",

      // P6 — Objectif
      objetivoTitle: (nome: string) =>
        `Qu'aimeriez-vous le plus offrir à ${nome} ?`,
      objetivoCriativo: "Des moments créatifs",
      objetivoSemTela: "Une activité sans écran",
      objetivoLembranca: "Un souvenir spécial",
      objetivoAprendizado: "Un apprentissage amusant",
      feedbackCriativo: "Parfait ! Le coloriage stimule la créativité !",
      feedbackSemTela: "Excellent choix ! Une activité loin des écrans !",
      feedbackLembranca: "Magnifique ! Un souvenir à garder pour toujours !",
      feedbackAprendizado: "Le coloriage apprend de manière ludique !",
    },

    // Upload
    upload: {
      title: (nome: string) => `Envoyez maintenant une photo de ${nome}`,
      subtitle: "Choisissez la meilleure photo — de préférence avec le visage bien visible",
      dragDrop: "Glissez une photo ici",
      ou: "ou",
      selectButton: "Sélectionner une photo",
      trocar: "Changer de photo",
      gerar: "Générer la page de coloriage",
      formatos: "JPG, PNG ou WEBP — max 10 Mo",
      comprimindo: "Optimisation de l'image...",
    },

    // Traitement
    processando: {
      etapa1: (nome: string) => `Photo de ${nome} reçue`,
      etapa2: "Analyse des détails du visage",
      etapa3: "Création des traits de coloriage...",
      etapa4: "Finalisation de votre page...",
      fatos: [
        "Le coloriage aide au développement de la motricité fine chez les enfants.",
        "Les enfants qui colorient régulièrement montrent une meilleure concentration à l'école.",
        "Le coloriage réduit le stress et l'anxiété chez les enfants.",
        "Colorier stimule la créativité et l'expression artistique dès le plus jeune âge.",
        "Les pages de coloriage personnalisées augmentent l'engagement de l'enfant.",
      ],
      fatoLabel: "Le saviez-vous ?",
      timeout: "Cela prend un peu plus de temps que prévu. C'est presque prêt !",
      erro: "Oups ! Quelque chose s'est mal passé. Veuillez réessayer.",
      tentarNovamente: "Réessayer",
    },

    // Résultat (tunnel)
    resultado: {
      title: (nome: string) => `La page de ${nome} est prête !`,
      subtitle: "Découvrez le résultat de la page de coloriage personnalisée",
      baixar: "Télécharger l'image",
      aguardando: "Nous finalisons votre page...",
      aguardandoSub: "Presque prêt ! En attendant...",
      fallback:
        "Votre page est en cours de finalisation avec soin ✨ Nous vous l'enverrons sur WhatsApp dans quelques minutes.",
    },

    // Contact
    contato: {
      title: "Vous y êtes presque !",
      subtitle:
        "Laissez vos coordonnées pour recevoir la page de coloriage personnalisée",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "+33 6 12 34 56 78",
      emailLabel: "E-mail",
      emailPlaceholder: "votre@email.com",
      lgpd: "J'accepte de recevoir des communications de Colory",
      continuar: "Voir le résultat",
    },

    // Paywall
    paywall: {
      // Headlines par objectif (P4)
      headlines: {
        sem_tela:
          "Remplacez le temps d'écran par quelque chose qu'il va colorier et garder pour toujours",
        lembranca:
          "C'est le souvenir qui restera sur le frigo de mamie pendant des années.",
        criativo:
          "Imprimez, asseyez-vous avec lui et créez ensemble. Ce moment n'a pas de prix.",
        aprendizado:
          "Coordination, créativité et concentration — en coloriant son propre visage.",
      } as Record<string, string>,
      headlineDefault:
        "Débloquez la page de coloriage personnalisée de votre enfant maintenant.",
      subtitleBlur: "Votre page est prête ! Débloquez pour télécharger.",

      // Plans
      maisPopular: "Le plus populaire",
      planoAnualNome: "Plan Annuel",
      planoAnualPreco: "$19.90",
      planoAnualPeriodo: "/an",
      planoAnualDestaque: "Économisez 79%",
      planoAnualObs: "seulement $1.66/mois",
      planoMensalNome: "Plan Mensuel",
      planoMensalPreco: "$7.90",
      planoMensalPeriodo: "/mois",
      planoMensalObs: "résiliez quand vous voulez",
      ancora: "Sans le plan : $95/an",

      // Trust
      garantiaTitulo: "Garantie 7 jours",
      garantiaTexto:
        "Si vous n'aimez pas, nous vous remboursons 100%. Sans questions.",
      reviewNome: "Sophie M.",
      reviewTexto:
        "Mon fils a adoré ! Nous avons déjà imprimé plus de 20 pages. Il en demande une nouvelle chaque semaine.",
      reviewEstrelas: 5,

      // CTA
      ctaAnual: (nome: string) =>
        `Débloquer la page de ${nome} maintenant`,
      ctaMensal: "Commencer pour $7.90/mois",

      // Événements
      geracoesFree: "Vous avez utilisé votre génération gratuite",
    },

    // OTOs
    oto: {
      timerLabel: "L'offre expire dans",
      simQuero: "OUI, je le veux !",
      naoObrigado: "Non, merci",

      // OTO1 — Livre
      oto1Titulo: (nome: string) =>
        `Transformez les aventures de ${nome} en livre d'histoires !`,
      oto1Desc:
        "2 livres PDF personnalisés avec votre enfant comme protagoniste. Des histoires uniques qu'il demandera de relire chaque soir.",
      oto1De: "$19.90",
      oto1Por: "$13.90",
      oto1Emoji: "📖",

      // OTO1 Downsell
      oto1DownsellTitulo: "Et si on commençait avec 1 livre ?",
      oto1DownsellDesc:
        "1 livre PDF personnalisé avec votre enfant comme protagoniste. Une histoire unique rien que pour lui.",
      oto1DownsellPor: "$9.90",

      // OTO2 — Musique
      oto2Titulo: (nome: string) =>
        `Une chanson rien que pour ${nome} !`,
      oto2Desc:
        "Une chanson personnalisée avec le prénom et la personnalité de votre enfant. Parfaite pour la voiture, le coucher ou l'anniversaire.",
      oto2Por: "$7.90",
      oto2Emoji: "🎵",

      // OTO3 — Club
      oto3Titulo: (nome: string) =>
        `${nome} dans le Club d'Activités !`,
      oto3Desc:
        "Accès annuel au club avec des activités hebdomadaires personnalisées : coloriage, découpage, points à relier et bien plus encore.",
      oto3Por: "$19.90",
      oto3PorPeriodo: "paiement unique",
      oto3Emoji: "🎨",
    },

    // App — Créer
    app: {
      criarTitle: "Nouvelle Page de Coloriage",
      criarSubtitle: "Choisissez une photo et un style pour créer",
      selecioneFilho: "Pour qui est la page ?",
      adicionarFilho: "Ajouter un enfant",
      estiloTitle: "Style de la page",
      estilos: {
        classico: "Classique",
        cartoon: "Cartoon",
        detalhado: "Détaillé",
        simples: "Simple",
        mandala: "Mandala",
        anime: "Anime",
      } as Record<string, string>,
      estiloBloqueado: "Disponible dans le Club",
      enviarFoto: "Envoyer une photo",
      gerarPagina: "Générer la page de coloriage",
      trocarFoto: "Changer de photo",

      // Génération
      gerandoTitle: "Création de votre page...",

      // Résultat
      resultadoTitle: (nome: string) => `La page de ${nome} est prête !`,
      resultadoSubtitle: "Imprimez et amusez-vous à colorier !",
      baixar: "Télécharger l'image",
      compartilhar: "Partager",
      criarOutra: "Créer une autre page",
      ofertaEspecial: "Offre spéciale pour vous",
      desbloquear: "Débloquer",

      // Pages
      paginasTitle: "Mes Pages",
      paginasEmpty: "Vous n'avez pas encore créé de pages",
      paginasEmptyCta: "Créer ma première page",
      filtrarPor: "Filtrer par :",
      todos: "Tous",
      clubeCard: "Débloquez des styles exclusifs et des activités hebdomadaires !",
      clubeCta: "Découvrir le Club",

      // Paramètres
      configTitle: "Mon Compte",
      configEmail: "E-mail",
      configPlano: "Plan",
      configFilhos: "Enfants enregistrés",
      configAdicionarFilho: "Ajouter un enfant",
      configNome: "Prénom",
      configGenero: "Genre",
      configIdade: "Âge",
      configSalvar: "Enregistrer",
      configSair: "Se déconnecter",
      configSuporte: "Besoin d'aide ? Contactez-nous sur WhatsApp",
    },

    // Merci
    obrigado: {
      titulo: (nome: string) =>
        `C'est fait ! La page de ${nome} est débloquée !`,
      subtitulo: "Nous l'avons aussi envoyée sur votre WhatsApp et e-mail.",
      baixar: "Télécharger l'image",
      resumoTitulo: "Récapitulatif de votre achat",
      plano: "Plan",
      otos: "Extras",
      nomesProdutos: {
        livro: "📖 Livre Personnalisé",
        livro_downsell: "📖 Livre Personnalisé (1 ex.)",
        musica: "🎵 Chanson Personnalisée",
        clube: "🎨 Club d'Activités",
      } as Record<string, string>,
      acessoApp: "Accédez à l'application complète via le lien envoyé à votre e-mail.",
    },
  },

  it: {
    // Landing Page
    landing: {
      badge: "Più di 12.847 mamme hanno già creato",
      headline: "Trasforma le foto del tuo bambino in pagine da colorare personalizzate",
      headlineHighlight: "pagine da colorare personalizzate",
      subheadline: "In pochi secondi con pochi clic!",
      cta: "Crea Ora",
      trust: "Risultato in meno di 60 secondi.",
      fotoOriginal: "Foto originale",
      paginaColorir: "Pagina da colorare",
      antesDepois: "Prima e dopo",
    },

    // Quiz
    quiz: {
      // P1 — Genere
      generoSubtitle: "Iniziamo!",
      generoTitle: "Creiamo qualcosa di speciale. Il tuo bambino è un...",
      menino: "Bambino",
      menina: "Bambina",
      feedbackMenino: "Fantastico! Creeremo qualcosa di incredibile per lui!",
      feedbackMenina: "Fantastico! Creeremo qualcosa di incredibile per lei!",

      // P2 — Età
      idadeTitle: (genero: string) => `Quanti anni ha ${genero === "menina" ? "lei" : "lui"}?`,
      idade02: "0-2 anni",
      idade35: "3-5 anni",
      idade68: "6-8 anni",
      idade912: "9-12 anni",
      feedbackIdade02: "Che dolcezza! Creeremo qualcosa di davvero speciale!",
      feedbackIdade35: "Questa è la fase più creativa!",
      feedbackIdade68: "L'età perfetta per colorare!",
      feedbackIdade912: "Adorerà il risultato!",

      // P3 — Nome
      nomeTitle: (genero: string) => `Come si chiama ${genero === "menina" ? "lei" : "lui"}?`,
      nomePlaceholder: "Scrivi il nome...",
      nomeContinuar: "Continua",

      // Transizione
      transicaoTitle: (nome: string) => `Stiamo preparando qualcosa di speciale per ${nome}...`,

      // P4 — Tempo davanti allo schermo
      tempoTelaTitle: (nome: string) =>
        `Quanto tempo al giorno passa ${nome} davanti agli schermi?`,
      tempoTela1h: "Meno di 1 ora",
      tempoTela2h: "1-2 ore",
      tempoTela4h: "2-4 ore",
      tempoTela4hMais: "Più di 4 ore",
      feedbackTela1h: "Ottimo! Le attività offline aiutano a mantenere questa abitudine!",
      feedbackTela2h: "Normale, ma sostituire una parte con qualcosa di creativo fa la differenza!",
      feedbackTela4h: "Molte mamme vivono la stessa situazione. Abbiamo la soluzione perfetta!",
      feedbackTela4hMais: "Non sei sola. Cambiamo le cose insieme!",

      // P5 — Connessione
      conexaoTitle: (nome: string) =>
        `Senti che potresti avere più momenti di connessione con ${nome}?`,
      conexaoSim: "Sì, voglio più momenti insieme",
      conexaoCorrido: "Sì, la vita frenetica non aiuta",
      conexaoFalta: "A volte mi manca",
      feedbackConexaoSim: "Colorare insieme crea quei momenti magici!",
      feedbackConexaoCorrido: "Ti capiamo! In 5 minuti starete già colorando insieme.",
      feedbackConexaoFalta: "Ogni pagina è un'opportunità di connessione!",

      // P6 — Obiettivo
      objetivoTitle: (nome: string) =>
        `Cosa vorresti dare di più a ${nome}?`,
      objetivoCriativo: "Momenti creativi",
      objetivoSemTela: "Attività senza schermi",
      objetivoLembranca: "Un ricordo speciale",
      objetivoAprendizado: "Apprendimento divertente",
      feedbackCriativo: "Perfetto! Colorare stimola la creatività!",
      feedbackSemTela: "Ottima scelta! Un'attività lontano dagli schermi!",
      feedbackLembranca: "Che bello! Un ricordo da custodire per sempre!",
      feedbackAprendizado: "Colorare insegna in modo divertente!",
    },

    // Upload
    upload: {
      title: (nome: string) => `Ora invia una foto di ${nome}`,
      subtitle: "Scegli la foto migliore — preferibilmente con il viso ben visibile",
      dragDrop: "Trascina una foto qui",
      ou: "oppure",
      selectButton: "Seleziona foto",
      trocar: "Cambia foto",
      gerar: "Genera pagina da colorare",
      formatos: "JPG, PNG o WEBP — max 10MB",
      comprimindo: "Ottimizzazione immagine...",
    },

    // Elaborazione
    processando: {
      etapa1: (nome: string) => `Foto di ${nome} ricevuta`,
      etapa2: "Analisi dei dettagli del viso",
      etapa3: "Creazione dei tratti per colorare...",
      etapa4: "Finalizzazione della tua pagina...",
      fatos: [
        "Colorare aiuta lo sviluppo della motricità fine nei bambini.",
        "I bambini che colorano regolarmente mostrano una migliore concentrazione a scuola.",
        "L'attività del colorare riduce lo stress e l'ansia nei bambini.",
        "Colorare stimola la creatività e l'espressione artistica fin dalla tenera età.",
        "Le pagine da colorare personalizzate aumentano il coinvolgimento del bambino.",
      ],
      fatoLabel: "Lo sapevi?",
      timeout: "Sta impiegando un po' più del previsto. Quasi pronto!",
      erro: "Ops! Qualcosa è andato storto. Riprova.",
      tentarNovamente: "Riprova",
    },

    // Risultato (funnel)
    resultado: {
      title: (nome: string) => `La pagina di ${nome} è pronta!`,
      subtitle: "Guarda come è venuta la pagina da colorare personalizzata",
      baixar: "Scarica Immagine",
      aguardando: "Stiamo finalizzando la tua pagina...",
      aguardandoSub: "Ci siamo quasi! Nel frattempo...",
      fallback:
        "La tua pagina viene finalizzata con cura ✨ Te la invieremo su WhatsApp in pochi minuti.",
    },

    // Contatto
    contato: {
      title: "Ci siamo quasi!",
      subtitle:
        "Lascia i tuoi contatti per ricevere la pagina da colorare personalizzata",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "+39 333 123 4567",
      emailLabel: "E-mail",
      emailPlaceholder: "tua@email.com",
      lgpd: "Accetto di ricevere comunicazioni da Colory",
      continuar: "Vedi risultato",
    },

    // Paywall
    paywall: {
      // Headlines per obiettivo (P4)
      headlines: {
        sem_tela:
          "Sostituisci il tempo davanti allo schermo con qualcosa che colorerà e conserverà per sempre",
        lembranca:
          "Questo è il ricordo che resterà sul frigo della nonna per anni.",
        criativo:
          "Stampa, siediti con lui e create insieme. Questo momento non ha prezzo.",
        aprendizado:
          "Coordinazione, creatività e concentrazione — colorando il proprio viso.",
      } as Record<string, string>,
      headlineDefault:
        "Sblocca la pagina da colorare personalizzata del tuo bambino ora.",
      subtitleBlur: "La tua pagina è pronta! Sblocca per scaricare.",

      // Piani
      maisPopular: "Più popolare",
      planoAnualNome: "Piano Annuale",
      planoAnualPreco: "$19.90",
      planoAnualPeriodo: "/anno",
      planoAnualDestaque: "Risparmia il 79%",
      planoAnualObs: "solo $1.66/mese",
      planoMensalNome: "Piano Mensile",
      planoMensalPreco: "$7.90",
      planoMensalPeriodo: "/mese",
      planoMensalObs: "cancella quando vuoi",
      ancora: "Senza il piano: $95/anno",

      // Trust
      garantiaTitulo: "Garanzia 7 giorni",
      garantiaTexto:
        "Se non ti piace, ti rimborsiamo il 100%. Senza domande.",
      reviewNome: "Giulia R.",
      reviewTexto:
        "Mio figlio lo ha adorato! Abbiamo già stampato più di 20 pagine. Ogni settimana ne chiede una nuova.",
      reviewEstrelas: 5,

      // CTA
      ctaAnual: (nome: string) =>
        `Sblocca la pagina di ${nome} ora`,
      ctaMensal: "Inizia per $7.90/mese",

      // Eventi
      geracoesFree: "Hai usato la tua generazione gratuita",
    },

    // OTOs
    oto: {
      timerLabel: "L'offerta scade tra",
      simQuero: "SÌ, lo voglio!",
      naoObrigado: "No, grazie",

      // OTO1 — Libro
      oto1Titulo: (nome: string) =>
        `Trasforma le avventure di ${nome} in un libro di storie!`,
      oto1Desc:
        "2 libri PDF personalizzati con il tuo bambino come protagonista. Storie uniche che chiederà di rileggere ogni sera.",
      oto1De: "$19.90",
      oto1Por: "$13.90",
      oto1Emoji: "📖",

      // OTO1 Downsell
      oto1DownsellTitulo: "Che ne dici di iniziare con 1 libro?",
      oto1DownsellDesc:
        "1 libro PDF personalizzato con il tuo bambino come protagonista. Una storia unica tutta per lui.",
      oto1DownsellPor: "$9.90",

      // OTO2 — Musica
      oto2Titulo: (nome: string) =>
        `Una canzone solo per ${nome}!`,
      oto2Desc:
        "Una canzone personalizzata con il nome e la personalità del tuo bambino. Perfetta per l'auto, la nanna o la festa di compleanno.",
      oto2Por: "$7.90",
      oto2Emoji: "🎵",

      // OTO3 — Club
      oto3Titulo: (nome: string) =>
        `${nome} nel Club delle Attività!`,
      oto3Desc:
        "Accesso annuale al club con attività settimanali personalizzate: colorare, ritagliare, unire i puntini e molto altro.",
      oto3Por: "$19.90",
      oto3PorPeriodo: "pagamento unico",
      oto3Emoji: "🎨",
    },

    // App — Crea
    app: {
      criarTitle: "Nuova Pagina da Colorare",
      criarSubtitle: "Scegli una foto e uno stile per creare",
      selecioneFilho: "Per chi è la pagina?",
      adicionarFilho: "Aggiungi bambino",
      estiloTitle: "Stile della pagina",
      estilos: {
        classico: "Classico",
        cartoon: "Cartoon",
        detalhado: "Dettagliato",
        simples: "Semplice",
        mandala: "Mandala",
        anime: "Anime",
      } as Record<string, string>,
      estiloBloqueado: "Disponibile nel Club",
      enviarFoto: "Invia foto",
      gerarPagina: "Genera pagina da colorare",
      trocarFoto: "Cambia foto",

      // Generazione
      gerandoTitle: "Creazione della tua pagina...",

      // Risultato
      resultadoTitle: (nome: string) => `La pagina di ${nome} è pronta!`,
      resultadoSubtitle: "Stampa e divertiti a colorare!",
      baixar: "Scarica Immagine",
      compartilhar: "Condividi",
      criarOutra: "Crea un'altra pagina",
      ofertaEspecial: "Offerta speciale per te",
      desbloquear: "Sblocca",

      // Pagine
      paginasTitle: "Le Mie Pagine",
      paginasEmpty: "Non hai ancora creato nessuna pagina",
      paginasEmptyCta: "Crea la mia prima pagina",
      filtrarPor: "Filtra per:",
      todos: "Tutti",
      clubeCard: "Sblocca stili esclusivi e attività settimanali!",
      clubeCta: "Scopri il Club",

      // Impostazioni
      configTitle: "Il Mio Account",
      configEmail: "E-mail",
      configPlano: "Piano",
      configFilhos: "Bambini registrati",
      configAdicionarFilho: "Aggiungi bambino",
      configNome: "Nome",
      configGenero: "Genere",
      configIdade: "Età",
      configSalvar: "Salva",
      configSair: "Esci",
      configSuporte: "Hai bisogno di aiuto? Contattaci su WhatsApp",
    },

    // Grazie
    obrigado: {
      titulo: (nome: string) =>
        `Fatto! La pagina di ${nome} è sbloccata!`,
      subtitulo: "L'abbiamo inviata anche sul tuo WhatsApp e e-mail.",
      baixar: "Scarica Immagine",
      resumoTitulo: "Riepilogo del tuo acquisto",
      plano: "Piano",
      otos: "Extra",
      nomesProdutos: {
        livro: "📖 Libro Personalizzato",
        livro_downsell: "📖 Libro Personalizzato (1 copia)",
        musica: "🎵 Canzone Personalizzata",
        clube: "🎨 Club delle Attività",
      } as Record<string, string>,
      acessoApp: "Accedi all'app completa tramite il link inviato alla tua e-mail.",
    },
  },
} as const;

export type Locale = keyof typeof translations;

const LOCALE_KEY = "colory-locale";

let currentLocale: Locale = "pt-BR";

// Auto-init from localStorage on client
if (typeof window !== "undefined") {
  const saved = localStorage.getItem(LOCALE_KEY);
  if (saved && saved in translations) {
    currentLocale = saved as Locale;
  }
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCALE_KEY, locale);
  }
}

export function getLocale(): Locale {
  return currentLocale;
}

export function t() {
  return translations[currentLocale];
}

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: "pt-BR", label: "Português", flag: "\u{1F1E7}\u{1F1F7}" },
  { code: "en", label: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "es", label: "Español", flag: "\u{1F1EA}\u{1F1F8}" },
  { code: "fr", label: "Français", flag: "\u{1F1EB}\u{1F1F7}" },
  { code: "it", label: "Italiano", flag: "\u{1F1EE}\u{1F1F9}" },
];
