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
      arrasteComparar: "Arraste para comparar",
      seuFilho: "seu filho",
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
      transicaoTitle: (nome: string, genero?: string) => `Preparando algo especial para ${genero === "menina" ? "a" : "o"} ${nome}...`,

      // P4 — Tempo de tela
      tempoTelaTitle: (nome: string, genero?: string) =>
        `Quanto tempo por dia ${genero === "menina" ? "a" : "o"} ${nome} passa em frente às telas?`,
      tempoTela1h: "Menos de 1 hora",
      tempoTela2h: "1 a 2 horas",
      tempoTela4h: "2 a 4 horas",
      tempoTela4hMais: "Mais de 4 horas",
      feedbackTela1h: "Ótimo! Atividades offline ajudam a manter assim!",
      feedbackTela2h: "Normal, mas trocar parte por algo criativo faz diferença!",
      feedbackTela4h: "Muitas mães passam por isso. Temos a solução perfeita!",
      feedbackTela4hMais: "Você não está sozinha. Vamos mudar isso juntas!",

      // P5 — Conexão
      conexaoTitle: (nome: string, genero?: string) =>
        `Você sente que poderia ter mais momentos de conexão com ${genero === "menina" ? "a" : "o"} ${nome}?`,
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
      title: (nome: string, genero?: string) => `Agora envie uma foto ${genero === "menina" ? "da" : "do"} ${nome}`,
      subtitle: "Escolha a melhor foto — de preferência com o rosto bem visível",
      dragDrop: "Arraste uma foto aqui",
      ou: "ou",
      selectButton: "Selecionar foto",
      trocar: "Trocar foto",
      gerar: "Gerar página de colorir",
      formatos: "JPG, PNG ou WEBP — máx. 10MB",
      comprimindo: "Otimizando imagem...",
      estiloTitulo: "Escolha o estilo",
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
      lgpdTermos: "Concordo com os",
      lgpdTermosLink: "Termos de Uso",
      lgpdE: "e",
      lgpdPrivacidadeLink: "Política de Privacidade",
      lgpdAviso: "Aceite os termos para continuar",
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
      headlineDefault: (genero?: string) =>
        `Desbloqueie a página de colorir personalizada ${genero === "menina" ? "da sua filha" : "do seu filho"} agora.`,
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
      ctaAnual: (nome: string, genero?: string) =>
        `Desbloquear a página ${genero === "menina" ? "da" : "do"} ${nome} agora`,
      ctaMensal: "Começar por R$39,90/mês",

      // Eventos
      geracoesFree: "Você usou sua geração gratuita",

      // Social proof
      socialProofCount: "2.847",
      socialProofText: "mães já assinaram",

      // Trust badges
      trustPagamento: "Pagamento seguro",
      trustGarantia: "Garantia 7 dias",
      trustAcesso: "Acesso imediato",

      // Benefits
      beneficiosTitulo: "Ambos os planos incluem:",
      beneficio1: "Até 15 páginas de colorir por mês",
      beneficio2: (nome: string, genero?: string) => `Personalizadas com o rosto ${genero === "menina" ? "da" : "do"} ${nome}`,
      beneficio3: "Vários estilos artísticos para escolher",
      beneficio4: "PDF em alta resolução — imprima quantas vezes quiser",
      beneficio5: "Receba pelo e-mail ou direto no celular",
      beneficio6: (nome: string, genero?: string) => `Novas páginas toda semana — ${genero === "menina" ? "ela" : "ele"} nunca enjoa`,

      // Urgency
      urgenciaTitulo: "Oferta especial de lançamento",
      urgenciaTexto: "Esse preço é exclusivo para quem acabou de criar a primeira página. Ao sair, o valor volta ao normal.",

      // Testimonials
      depoimentosTitulo: "O que outras mães dizem:",
      depoimentos: [
        { nome: "Camila S.", cidade: "São Paulo", texto: "Meu filho amou! Já imprimimos mais de 20 páginas. Ele pede toda semana pra fazer uma nova." },
        { nome: "Renata M.", cidade: "Belo Horizonte", texto: "Melhor investimento que fiz. Ele larga o celular na hora que vê a página de colorir dele. Vale cada centavo." },
        { nome: "Juliana P.", cidade: "Curitiba", texto: "A professora pediu pra fazer pra turma inteira depois que viu a do meu filho. Incrível!" },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ
      faqTitulo: "Dúvidas frequentes",
      faqs: [
        { p: "Como funciona?", r: "Você envia a foto do seu filho, escolhe o estilo e a IA gera uma página de colorir personalizada em segundos. Receba por e-mail ou direto no celular!" },
        { p: "Quantas páginas posso criar?", r: "Até 15 páginas únicas de colorir por mês. Suficiente pra ele ter uma nova quase todo dia! Mas você pode imprimir cada página gerada quantas vezes quiser." },
        { p: "Posso cancelar quando quiser?", r: "Sim! Cancele a qualquer momento sem burocracia. E nos primeiros 7 dias, devolvemos 100% do valor." },
        { p: "Como recebo as páginas?", r: "Você recebe o PDF por e-mail ou acessa direto pelo celular. Imprima em casa ou na gráfica — sem limite de cópias." },
      ] as { p: string; r: string }[],

      // Social proof v2
      socialProofV2Count: "+47.000 páginas",
      socialProofV2Text: "criadas por mães brasileiras",

      // Hero unlock
      heroTitulo: (artigoDe: string, nome: string) => `A página ${artigoDe} ${nome} está pronta!`,
      heroDesbloquear: "Desbloqueie para baixar e imprimir",

      // CTA micro-commitment
      ctaTestar: (artigo: string, nome: string) => `Teste por 7 dias. Se ${artigo} ${nome} não amar, devolvemos cada centavo.`,
      ctaCancelar: "Cancele quando quiser. Sem multa, sem burocracia.",

      // Emotional hooks
      hookTelaAlto: (artigo: string, nome: string, pronome: string) => `Você disse que ${artigo} ${nome} passa várias horas por dia em telas. Imagina ${pronome} largando o tablet por conta própria pra colorir o próprio rosto? Isso acontece toda semana com o Colory.`,
      hookTelaMedio: (artigoDe: string, nome: string) => `Você quer reduzir o tempo de tela ${artigoDe} ${nome}. Com o Colory, mães contam que os filhos pedem pra imprimir em vez de assistir vídeo.`,
      hookTelaBaixo: (artigoDe: string, nome: string) => `Você já cuida bem do tempo de tela ${artigoDe} ${nome}. O Colory é a atividade perfeita pra preencher esses momentos com criatividade.`,
      hookConexao: (artigo: string, nome: string, pronome2: string) => `E o melhor: é um momento de vocês ${pronome2} juntos. Sem tela, sem pressa. Só você e ${artigo} ${nome} colorindo.`,

      // Future pacing
      futurePacing: (artigo: string, nome: string, pronome2: string) => `Imagina a cena: você imprime a página, coloca na mesa com os lápis de cor. ${artigo.charAt(0).toUpperCase() + artigo.slice(1)} ${nome} vê o próprio rosto no desenho e abre aquele sorriso. Vocês ${pronome2} sentam juntos e por 30 minutos não existe celular, não existe pressa. Só você e ${artigo} ${nome}, colorindo.`,
      momentosSemPreco: "Momentos assim não têm preço ✨",

      // Testimonials v2 title
      depoimentosV2Titulo: "O que as mães estão dizendo",
      verificado: "Verificado",
      depoimentosV2: [
        { nome: "Camila R.", cidade: "São Paulo", texto: "Meu filho de 4 anos coloriu por 40 minutos sem parar. QUARENTA MINUTOS. Sem tela nenhuma. Nunca vi ele tão concentrado." },
        { nome: "Fernanda L.", cidade: "Rio de Janeiro", texto: "Fiz direto pelo celular em 2 minutos. O PDF veio por email e imprimi na impressora de casa. Mais fácil que pedir comida no iFood." },
        { nome: "Amanda C.", cidade: "Recife", texto: "Comprava livro de colorir todo mês. R$30 cada e ele enjoava rápido porque não era personalizado. Com o Colory ele não enjoa porque é o rosto DELE." },
        { nome: "Patrícia S.", cidade: "Belo Horizonte", texto: "A vovó chorou quando viu o neto como personagem da página. Virou presente de aniversário. Vale cada centavo." },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ title (replacing hardcoded)
      faqTituloV2: "Perguntas frequentes",

      // Exit-intent popup
      exitIntentTitulo: "Espera! Temos um presente pra você",
      exitIntentSubtitulo: "Use o cupom abaixo e ganhe 10% de desconto no plano anual",
      exitIntentCupom: "GIFT10",
      exitIntentCopiar: "Copiar cupom",
      exitIntentCopiado: "Copiado!",
      exitIntentCta: "Aproveitar desconto",
      exitIntentFechar: "Não, obrigado",
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

      // OtoLayout framework text
      continueLendo: "↓ Continue lendo ↓",
      oQueVoceRecebe: "O que você vai receber:",
      valorTotalLabel: "Valor total:",
      precoNormal: "Preço normal",
      hojeApenas: "Hoje, apenas:",
      scarcityTitle: "Esta oferta só existe nesta página",
      scarcityText: "Ao sair, você não terá acesso a esse preço novamente.",

      // OTO1 content
      oto1PassoLabel: "Passo 1 de 2 — Não feche esta página",
      oto1AlertaTexto: "Sua compra NÃO está finalizada ainda...",
      oto1ValidacaoTexto: "Sua assinatura do Colory foi confirmada!",
      oto1FomoTexto: (nome: string) => `Você acabou de dar um passo incrível pro ${nome}. Mas precisamos ser honestos: sair desta página agora pode fazer você perder a oportunidade de transformar a experiência dele em algo muito maior.`,
      oto1CuriosidadeTexto: (nome: string) => `E se o ${nome} pudesse ser o HERÓI da própria história? Imagine ele abrindo um livro e vendo o próprio rosto em cada página.`,
      oto1ReframeTitulo: "Mais que um livro. Uma memória que ele vai guardar pra sempre.",
      oto1ReframeTexto: "Livros personalizados não são só entretenimento. São ferramentas que desenvolvem o amor pela leitura, fortalecem a identidade e criam momentos de conexão entre mãe e filho que não tem preço.",
      oto1Beneficios: (nome: string) => [
        `${nome} como protagonista — nome e rosto em cada página`,
        "Estimula o amor pela leitura desde cedo",
        "Momento de conexão: leia junto toda noite",
        "Imprima quantas vezes quiser — é seu pra sempre",
        "Presente perfeito para avós, tios e padrinhos",
      ] as string[],
      oto1Depoimentos: [
        { nome: "Camila R.", texto: "Comprei achando que era bobeira. Meu filho de 4 anos decorou a história inteira. Ele conta pra todo mundo que 'tem um livro dele'. Já fiz 3 cópias pra dar de presente.", cidade: "São Paulo" },
        { nome: "Patrícia S.", texto: "A vovó chorou quando viu o neto como personagem. Virou o presente de Natal mais especial que já demos. Vale cada centavo.", cidade: "Rio de Janeiro" },
        { nome: "Amanda K.", texto: "Toda noite minha filha pede: 'mãe, lê o MEU livro'. Ela se sente tão especial. Melhor investimento que já fiz em conteúdo pra ela.", cidade: "Florianópolis" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1Modulos: (nome: string) => [
        { emoji: "📖", titulo: "2 Livros PDF Personalizados", descricao: `Histórias únicas com ${nome} como protagonista`, valorIndividual: "R$67" },
        { emoji: "🎨", titulo: "Ilustrações com IA", descricao: "Rosto do seu filho em cada página da história", valorIndividual: "R$40" },
        { emoji: "🖨️", titulo: "Alta Resolução para Impressão", descricao: "PDF pronto pra imprimir em casa ou gráfica", valorIndividual: "R$20" },
        { emoji: "🎁", titulo: "Bônus: Capa Personalizada", descricao: `Nome do ${nome} na capa como autor e herói`, valorIndividual: "R$15" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1ValorTotal: "R$142",
      oto1PrecoOriginal: "R$97",
      oto1PrecoFinal: "R$67",
      oto1Temas: ["Dinossauros", "Princesas", "Aventura", "Unicórnios", "Espaço", "Piratas", "Animais", "Super-Heróis"] as string[],
      oto1TemasLabel: "Temas disponíveis",
      oto1Faqs: [
        { pergunta: "Como personalizo o livro?", resposta: "Após confirmar o pagamento, você envia uma foto do seu filho e escolhe o tema. Nossa IA cria as ilustrações com o rosto dele em cada página. Simples assim." },
        { pergunta: "Quanto tempo leva para receber?", resposta: "Em até 24 horas após o pagamento, você recebe o PDF personalizado no seu e-mail, pronto para imprimir." },
        { pergunta: "Posso imprimir quantas vezes quiser?", resposta: "Sim! O arquivo PDF é seu para sempre. Imprima em casa, na gráfica, ou leia no tablet — sem limite de cópias." },
      ] as { pergunta: string; resposta: string }[],

      // OTO1 Downsell content
      oto1DownPassoLabel: "Última chance — oferta reduzida",
      oto1DownAlertaTexto: "Espera! Temos algo especial pra você...",
      oto1DownValidacaoTexto: "Entendemos que o valor pode pesar.",
      oto1DownFomoTexto: (nome: string) => `E se você pudesse dar ao ${nome} pelo menos 1 livro personalizado — com ele como protagonista — por menos da metade?`,
      oto1DownCuriosidadeTexto: (nome: string) => `Imagine o ${nome} abrindo um livro e vendo ELE MESMO como herói da história.`,
      oto1DownReframeTitulo: "1 livro. 1 história. 100% dele.",
      oto1DownReframeTexto: "Um livro PDF personalizado com seu filho como protagonista. Pronto pra imprimir ou ler no tablet.",
      oto1DownBeneficios: [
        "História única gerada por IA com o nome e rosto do seu filho",
        "Ilustrações personalizadas em cada página",
        "PDF em alta resolução — imprima quantas vezes quiser",
        "Seu filho como herói da própria história",
      ] as string[],
      oto1DownDepoimentos: [
        { nome: "Juliana M.", texto: "Meu filho não para de pedir pra ler 'o livro dele'. Toda noite é o mesmo: 'mãe, lê o MEU livro!'", cidade: "Belo Horizonte" },
        { nome: "Fernanda L.", texto: "Dei de presente de aniversário. Ele chorou de emoção quando viu o nome dele na capa.", cidade: "Curitiba" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1DownModulos: (nome: string) => [
        { emoji: "📖", titulo: "1 Livro PDF Personalizado", descricao: `História com ${nome} como protagonista`, valorIndividual: "R$67" },
        { emoji: "🎨", titulo: "Ilustrações Personalizadas", descricao: "Rosto do seu filho em cada página", valorIndividual: "R$30" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1DownValorTotal: "R$97",
      oto1DownPrecoOriginal: "R$67",
      oto1DownPrecoFinal: "R$47",

      // OTO3 content
      oto3PassoLabel: "Última oferta — Não aparecerá novamente",
      oto3AlertaTexto: "Depois desta página, o preço volta ao normal.",
      oto3ValidacaoTexto: "Quase lá! Só mais uma coisa...",
      oto3FomoTexto: (nome: string) => `Você já tem as páginas de colorir. Talvez já tenha o livro e a música. Mas e se o ${nome} pudesse receber atividades novas TODA SEMANA? Sem você precisar pensar, buscar ou criar nada?`,
      oto3CuriosidadeTexto: (nome: string) => `Um clube inteiro de atividades personalizadas. Colorir, recortar, ligar os pontos, caça-palavras — tudo com o ${nome} como tema.`,
      oto3ReframeTitulo: "1 ano inteiro de atividades. Sem tela. Sem repetir.",
      oto3ReframeTexto: (nome: string) => `São 52 semanas de conteúdo novo pra manter o ${nome} entretido, aprendendo e longe das telas. Você recebe toda semana no email, imprime e pronto. Zero esforço pra você, máxima diversão pra ele.`,
      oto3Beneficios: (nome: string) => [
        "Atividades novas toda semana — nunca repete",
        `Personalizadas com o nome do ${nome}`,
        "Colorir, recortar, ligar pontos, caça-palavras e mais",
        "Receba por email — é só imprimir",
        "Longe das telas: atividade real, com papel e lápis",
        "Ideal pra viagens, restaurantes e fins de semana",
      ] as string[],
      oto3Depoimentos: [
        { nome: "Mariana C.", texto: "Toda sexta meu filho já pergunta: 'mãe, chegou minha atividade?'. Virou a tradição do fim de semana. Ele adora e eu tenho 1 hora de paz.", cidade: "Campinas" },
        { nome: "Carolina B.", texto: "Cancelei 2 apps de tablet depois que assinei o clube. Meu filho prefere as atividades impressas. E eu prefiro ele longe da tela.", cidade: "Salvador" },
        { nome: "Thais R.", texto: "Levo nas viagens de carro. É a única coisa que mantém ele quieto por 1 hora sem iPad. Já valeu o investimento do ano inteiro.", cidade: "Goiânia" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3Modulos: [
        { emoji: "📋", titulo: "52 Pacotes de Atividades Semanais", descricao: "1 ano completo de conteúdo", valorIndividual: "R$156" },
        { emoji: "🎨", titulo: "Páginas de Colorir Temáticas", descricao: "Datas comemorativas, estações, temas infantis", valorIndividual: "R$40" },
        { emoji: "✂️", titulo: "Recorte, Cole e Monte", descricao: "Atividades de coordenação motora", valorIndividual: "R$30" },
        { emoji: "🔤", titulo: "Caça-Palavras e Ligar Pontos", descricao: "Aprendizado disfarçado de diversão", valorIndividual: "R$25" },
        { emoji: "📧", titulo: "Entrega Semanal por Email", descricao: "Receba, imprima e pronto", valorIndividual: "R$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3ValorTotal: "R$251",
      oto3PrecoOriginal: "R$197",
      oto3PrecoFinal: "R$97",
      oto3PeriodoPagamento: "pagamento único — acesso por 1 ano",

      // OTO3 Downsell content
      oto3DownPassoLabel: "Última chance — oferta reduzida",
      oto3DownAlertaTexto: "Espera! E se fosse pela metade do tempo e do preço?",
      oto3DownValidacaoTexto: "Entendemos. O anual pode parecer muito.",
      oto3DownFomoTexto: (nome: string) => `E se você pudesse testar o Clube por 6 meses — com tudo incluso — por menos da metade? Se o ${nome} adorar (e ele vai), você renova depois.`,
      oto3DownCuriosidadeTexto: (nome: string) => `26 semanas de atividades personalizadas. Toda semana algo novo pra imprimir e brincar com o ${nome}.`,
      oto3DownReframeTitulo: "6 meses de atividades. Sem compromisso de 1 ano.",
      oto3DownReframeTexto: (nome: string) => `Teste o Clube por meio período. São 26 semanas de conteúdo novo — colorir, recortar, ligar os pontos — tudo personalizado com o nome do ${nome}. Se ele amar, você decide se renova.`,
      oto3DownBeneficios: (nome: string) => [
        "26 semanas de atividades novas — nunca repete",
        `Personalizadas com o nome do ${nome}`,
        "Colorir, recortar, ligar pontos, caça-palavras e mais",
        "Receba por email — é só imprimir",
        "Sem compromisso longo — teste por 6 meses",
        "Metade do preço do plano anual",
      ] as string[],
      oto3DownDepoimentos: [
        { nome: "Mariana C.", texto: "Toda sexta meu filho já pergunta: 'mãe, chegou minha atividade?'. Virou a tradição do fim de semana.", cidade: "Campinas" },
        { nome: "Thais R.", texto: "Levo nas viagens de carro. É a única coisa que mantém ele quieto por 1 hora sem iPad.", cidade: "Goiânia" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3DownModulos: [
        { emoji: "📋", titulo: "26 Pacotes de Atividades Semanais", descricao: "6 meses de conteúdo personalizado", valorIndividual: "R$78" },
        { emoji: "🎨", titulo: "Páginas de Colorir Temáticas", descricao: "Datas comemorativas e temas infantis", valorIndividual: "R$20" },
        { emoji: "✂️", titulo: "Recorte, Cole e Monte", descricao: "Atividades de coordenação motora", valorIndividual: "R$15" },
        { emoji: "📧", titulo: "Entrega Semanal por Email", descricao: "Receba, imprima e pronto", valorIndividual: "R$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3DownValorTotal: "R$113",
      oto3DownPrecoOriginal: "R$97",
      oto3DownPrecoFinal: "R$47",
      oto3DownPeriodoPagamento: "pagamento único — acesso por 6 meses",

      // Alert fallback
      alertaPagamento: "Link de pagamento será configurado em breve.",
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

      // Configurações extras
      configHeader: "Configurações",
      configCreditos: "Meus Créditos",
      configCreditosDe: "de 15",
      configCreditosRenova: (dias: number) => `Renova em ${dias} dias`,
      configComprarCreditos: "Comprar 20 créditos extras — R$19,90",
      configMeusFilhos: "Meus Filhos",
      configNovoFilho: "Novo filho",
      configNomePlaceholder: "Nome do filho",
      configCancelar: "Cancelar",
      configSalvando: "Salvando...",
      configSemPlano: "Sem plano",
      configAtivo: "Ativo",
      configPlanoLabel: "Plano",
      configIdiomaLabel: "Idioma / Language",
      configSuporteItems: ["Fale Conosco", "Avaliar o app", "Termos e Privacidade"] as string[],
      configLogout: "Sair da conta",
      configFooter: "Para cancelar entre em contato com o suporte",

      // Login
      loginTitulo: "Acesse sua conta",
      loginSubtitulo: "Digite o email usado na compra",
      loginGoogle: "Entrar com Google",
      loginOu: "ou",
      loginEmailLabel: "Email de compra",
      loginEmailPlaceholder: "email@usado-na-compra.com",
      loginEntrar: "Entrar",
      loginEntrando: "Entrando...",
      loginSemConta: "Ainda não tem conta?",
      loginAssinar: "Assine o Colory",
      loginErroSemAssinatura: "Este email não tem uma assinatura ativa.",
      loginErroExpirada: "Sua assinatura expirou. Renove para continuar.",
      loginErroSessao: "Erro ao criar sessão. Tente novamente.",
      loginErroGeral: "Erro ao entrar. Tente novamente.",
      loginErroGoogle: "Erro ao conectar com Google. Tente novamente.",
      loginRenovar: "Renovar assinatura",
      configSelectIdade: "Selecionar...",
      configIdadeOptions: ["0-2 anos", "3-5 anos", "6-8 anos", "9-12 anos"] as string[],

      // Criar page extras
      criarTransformar: (nome: string) => `Transforme a foto do ${nome} em uma página de colorir`,
      criarAdicionarFoto: "Adicionar Foto +",
      criarOtimizando: "Otimizando...",
      criarTrocarFoto: "Trocar foto",
      criarSelecionarEstilo: "Selecionar Estilo",
      criarRestantes: "restantes",
      criarPreparando: "Preparando...",
      criarGerarPagina: "Gerar Página",
      criarPlanoExpirou: "Seu plano expirou",
      criarRenovarDesc: "Renove para continuar criando páginas de colorir",
      criarRenovar: "Renovar plano",
      criarSemCreditos: "Suas gerações deste mês acabaram",
      criarSemCreditosDesc: "Compre créditos extras para continuar criando",
      criarComprarCreditos: "Comprar 20 créditos — R$19,90",
      criarEstilos: [
        { id: "simple", name: "Simples", desc: "Linhas limpas, poucos detalhes" },
        { id: "detailed", name: "Detalhado", desc: "Com cenário e mais detalhes" },
        { id: "minimalist", name: "Minimalista", desc: "Traços mínimos, artístico" },
        { id: "ink", name: "Arte com tinta", desc: "Traços fortes estilo nanquim" },
      ] as { id: string; name: string; desc: string }[],

      // Páginas page extras
      paginasHeader: "Minhas Páginas",
      paginasTodas: "Todas",
      paginasAdicionar: "+ Adicionar",
      paginasVazia: "Você ainda não criou nenhuma página",
      paginasVaziaCta: "Criar minha primeira página",
      paginasLivroHistoria: "Livro de História",
      paginasLivroDesc: "Seu filho como herói da história",
      paginasLivroAcessar: "Personalize seu livro agora!",
      paginasClubeAtividades: "Clube de Atividades",
      paginasClubeDesc: "52 semanas de atividades para imprimir",
      paginasClubeAcessar: "Acesso liberado! Verifique seu email",
      paginasDesbloquear: "Desbloquear",
      paginasAcessar: "Acessar",

      // BottomNav
      navCriar: "Criar",
      navPaginas: "Minhas Páginas",

      // Gerando page
      gerandoTexto: (nome: string) => `Gerando a página do ${nome}...`,
      gerandoFatos: [
        "Sabia que colorir reduz o estresse em até 35%?",
        "Colorir ajuda no desenvolvimento da coordenação motora fina.",
        "Crianças que colorem regularmente têm melhor concentração.",
        "A atividade de colorir estimula a criatividade desde cedo.",
        "Páginas de colorir personalizadas aumentam o engajamento.",
      ] as string[],
      gerandoVaiAdorar: (nome: string) => `O ${nome} vai adorar!`,
      gerandoEstilos: {
        simple: "Livro para colorir",
        detailed: "Arte linear",
        family: "Linhas grossas",
        kids: "Infantil",
      } as Record<string, string>,

      // Resultado page
      resultadoHeader: (nome: string) => `Resultado do ${nome}`,
      resultadoFotoOriginal: "Foto original",
      resultadoPaginaColorir: "Página de colorir",
      resultadoSegurarComparar: "Segurar para comparar",
      resultadoBaixar: "Baixar",
      resultadoImprimir: "Imprimir",
      resultadoCompartilhar: "Compartilhar",
      resultadoCriarMais: "Criar mais",
      resultadoGerarNovo: "Gerar de novo",
      resultadoGerarNovoDesc: "Tente um estilo diferente",
      resultadoLivroHistoria: (nome: string) => `Livro de História do ${nome}`,
      resultadoLivroDesc: (nome: string) => `O ${nome} como herói da história`,
      resultadoLivroAcessar: "Personalize seu livro agora",
      resultadoClubeAtividades: "Clube de Atividades",
      resultadoClubeDesc: "52 semanas de atividades",
      resultadoClubeAcessar: "Acesso liberado! Verifique seu email",
      resultadoDesbloquear: "Desbloquear",
      resultadoAcessar: "Acessar",
      resultadoShareTitle: (nome: string) => `Página de colorir do ${nome}`,
      resultadoShareText: "Olha que legal! Criei uma página de colorir personalizada no Colory!",
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
      imprimir: "Imprimir",
      emailTitulo: "O que vai chegar no seu email",
      emailItems: [
        "Sua página de colorir personalizada",
        "Link de acesso ao app completo",
        "Instruções para imprimir em alta qualidade",
      ] as string[],
      proximosPassosTitulo: "Próximos passos",
      proximosPasso1: "Abra o email que enviamos",
      proximosPasso2: "Clique no link de acesso",
      proximosPasso3: "Comece a criar páginas de colorir",
      instalarAppTitulo: "Instale o app no celular",
      instalarIphone: "iPhone: Toque em Compartilhar → Adicionar à Tela de Início",
      instalarAndroid: "Android: Toque em ⋮ → Instalar aplicativo",
    },

    // Componentes
    componentes: {
      // GarantiaBadge
      garantia30Titulo: "Garantia de 30 dias",
      garantia30Texto: "Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas.",

      // ComoFunciona
      comoFuncionaTitulo: "Como funciona?",
      comoFuncionaPasso1: "Envie a foto",
      comoFuncionaPasso2: "Personalize sua história",
      comoFuncionaPasso3: "Receba o livro personalizado",

      // BookPreview
      bookPreviewTitulo: (nome: string) => `Veja como pode ficar o livro do ${nome}:`,
      bookPreviewExemplo: (i: number) => `Exemplo ${i}`,
      bookPreviewCapa: "Capa",
      bookPreviewPagina: (n: number) => `Página ${n}`,
      bookPreviewDescricao: (nome: string) => `O livro do ${nome} vai ser assim — com o nome dele na história, ilustrações personalizadas e pronto pra imprimir.`,

      // TransformacaoVisual
      transformacaoFoto: "Foto do seu filho",
      transformacaoLivro: "Livro personalizado",
      transformacaoDescricao: "A IA usa a foto para criar ilustrações com o rosto dele em cada página",

      // FaqAccordion
      faqTitulo: "Perguntas frequentes",
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
      arrasteComparar: "Drag to compare",
      seuFilho: "your child",
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
      estiloTitulo: "Choose the style",
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
      lgpdTermos: "I agree to the",
      lgpdTermosLink: "Terms of Use",
      lgpdE: "and",
      lgpdPrivacidadeLink: "Privacy Policy",
      lgpdAviso: "Please accept the terms to continue",
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

      // Social proof
      socialProofCount: "2,847",
      socialProofText: "moms have already subscribed",

      // Trust badges
      trustPagamento: "Secure payment",
      trustGarantia: "7-day guarantee",
      trustAcesso: "Instant access",

      // Benefits
      beneficiosTitulo: "Both plans include:",
      beneficio1: "Up to 15 coloring pages per month",
      beneficio2: (nome: string) => `Personalized with ${nome}'s face`,
      beneficio3: "Multiple artistic styles to choose from",
      beneficio4: "High-resolution PDF — print as many times as you want",
      beneficio5: "Receive by email or straight to your phone",
      beneficio6: (nome: string) => `New pages every week — ${nome} never gets bored`,

      // Urgency
      urgenciaTitulo: "Special launch offer",
      urgenciaTexto: "This price is exclusive for those who just created their first page. Once you leave, the price goes back to normal.",

      // Testimonials
      depoimentosTitulo: "What other moms are saying:",
      depoimentos: [
        { nome: "Sarah T.", cidade: "New York", texto: "My son loved it! We've already printed over 20 pages. He asks every week to make a new one." },
        { nome: "Emily R.", cidade: "London", texto: "Best investment I've made. He puts down the tablet the second he sees his coloring page. Worth every penny." },
        { nome: "Jessica M.", cidade: "Chicago", texto: "His teacher asked me to make one for the whole class after seeing his. Incredible!" },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ
      faqTitulo: "Frequently asked questions",
      faqs: [
        { p: "How does it work?", r: "You upload your child's photo, choose a style, and the AI generates a personalized coloring page in seconds. Receive it by email or straight to your phone!" },
        { p: "How many pages can I create?", r: "Up to 15 coloring pages per month. Enough for a new one almost every day!" },
        { p: "Can I cancel anytime?", r: "Yes! Cancel at any time, no hassle. And within the first 7 days, we'll refund 100% of your payment." },
        { p: "How do I receive the pages?", r: "You receive the PDF by email or access it directly on your phone. Print at home or at a print shop — unlimited copies." },
      ] as { p: string; r: string }[],

      // Social proof v2
      socialProofV2Count: "+47,000 pages",
      socialProofV2Text: "created by moms worldwide",

      // Hero unlock
      heroTitulo: (artigoDe: string, nome: string) => `${nome}'s coloring page is ready!`,
      heroDesbloquear: "Unlock to download and print",

      // CTA micro-commitment
      ctaTestar: (artigo: string, nome: string) => `Try for 7 days. If ${nome} doesn't love it, we'll refund every penny.`,
      ctaCancelar: "Cancel anytime. No fees, no hassle.",

      // Emotional hooks
      hookTelaAlto: (artigo: string, nome: string, pronome: string) => `You said ${nome} spends several hours a day on screens. Imagine them putting down the tablet on their own to color their own face? That happens every week with Colory.`,
      hookTelaMedio: (artigoDe: string, nome: string) => `You want to reduce ${nome}'s screen time. With Colory, moms say their kids ask to print instead of watching videos.`,
      hookTelaBaixo: (artigoDe: string, nome: string) => `You already manage ${nome}'s screen time well. Colory is the perfect activity to fill those moments with creativity.`,
      hookConexao: (artigo: string, nome: string, pronome2: string) => `And the best part: it's a moment for you two together. No screens, no rush. Just you and ${nome} coloring.`,

      // Future pacing
      futurePacing: (artigo: string, nome: string, pronome2: string) => `Picture this: you print the page, place it on the table with colored pencils. ${nome} sees their own face in the drawing and breaks into that big smile. You sit together and for 30 minutes there's no phone, no rush. Just you and ${nome}, coloring.`,
      momentosSemPreco: "Moments like these are priceless ✨",

      // Testimonials v2 title
      depoimentosV2Titulo: "What moms are saying",
      verificado: "Verified",
      depoimentosV2: [
        { nome: "Sarah T.", cidade: "New York", texto: "My 4-year-old colored for 40 minutes straight. FORTY MINUTES. No screen at all. I've never seen him so focused." },
        { nome: "Emily R.", cidade: "London", texto: "I did it right from my phone in 2 minutes. The PDF came by email and I printed it at home. Easier than ordering food delivery." },
        { nome: "Jessica M.", cidade: "Chicago", texto: "I used to buy a coloring book every month. $6 each and he'd get bored fast because it wasn't personalized. With Colory he never gets bored because it's HIS face." },
        { nome: "Rachel K.", cidade: "Toronto", texto: "Grandma cried when she saw her grandson as a coloring page character. It became a birthday gift. Worth every penny." },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ title (replacing hardcoded)
      faqTituloV2: "Frequently asked questions",

      // Exit-intent popup
      exitIntentTitulo: "Wait! We have a gift for you",
      exitIntentSubtitulo: "Use the coupon below and get 10% off the annual plan",
      exitIntentCupom: "GIFT10",
      exitIntentCopiar: "Copy coupon",
      exitIntentCopiado: "Copied!",
      exitIntentCta: "Get my discount",
      exitIntentFechar: "No, thanks",
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

      // OtoLayout framework text
      continueLendo: "↓ Keep reading ↓",
      oQueVoceRecebe: "What you'll receive:",
      valorTotalLabel: "Total value:",
      precoNormal: "Regular price",
      hojeApenas: "Today only:",
      scarcityTitle: "This offer only exists on this page",
      scarcityText: "Once you leave, you won't have access to this price again.",

      // OTO1 content
      oto1PassoLabel: "Step 1 of 2 — Don't close this page",
      oto1AlertaTexto: "Your purchase is NOT finalized yet...",
      oto1ValidacaoTexto: "Your Colory subscription has been confirmed!",
      oto1FomoTexto: (nome: string) => `You just took an incredible step for ${nome}. But let's be honest: leaving this page now could mean missing the chance to turn their experience into something much bigger.`,
      oto1CuriosidadeTexto: (nome: string) => `What if ${nome} could be the HERO of their own story? Imagine them opening a book and seeing their own face on every page.`,
      oto1ReframeTitulo: "More than a book. A memory they'll treasure forever.",
      oto1ReframeTexto: "Personalized books aren't just entertainment. They're tools that nurture a love for reading, strengthen identity, and create priceless bonding moments between parent and child.",
      oto1Beneficios: (nome: string) => [
        `${nome} as the main character — name and face on every page`,
        "Nurtures a love for reading from an early age",
        "Bonding moment: read together every night",
        "Print as many times as you want — it's yours forever",
        "Perfect gift for grandparents, aunts, uncles, and godparents",
      ] as string[],
      oto1Depoimentos: [
        { nome: "Sarah R.", texto: "I bought it thinking it was just a novelty. My 4-year-old memorized the entire story. He tells everyone he 'has his own book'. I've already made 3 copies as gifts.", cidade: "New York" },
        { nome: "Patricia T.", texto: "Grandma cried when she saw her grandson as the character. It became the most special Christmas gift we've ever given. Worth every penny.", cidade: "Los Angeles" },
        { nome: "Amanda K.", texto: "Every night my daughter asks: 'Mom, read MY book'. She feels so special. Best investment I've ever made in content for her.", cidade: "Chicago" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1Modulos: (nome: string) => [
        { emoji: "📖", titulo: "2 Personalized PDF Books", descricao: `Unique stories with ${nome} as the main character`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "AI-Generated Illustrations", descricao: "Your child's face on every page of the story", valorIndividual: "$8.00" },
        { emoji: "🖨️", titulo: "High Resolution for Printing", descricao: "PDF ready to print at home or at a print shop", valorIndividual: "$4.00" },
        { emoji: "🎁", titulo: "Bonus: Personalized Cover", descricao: `${nome}'s name on the cover as author and hero`, valorIndividual: "$3.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1ValorTotal: "$28.90",
      oto1PrecoOriginal: "$19.90",
      oto1PrecoFinal: "$13.90",
      oto1Temas: ["Dinosaurs", "Princesses", "Adventure", "Unicorns", "Space", "Pirates", "Animals", "Superheroes"] as string[],
      oto1TemasLabel: "Available themes",
      oto1Faqs: [
        { pergunta: "How do I personalize the book?", resposta: "After confirming payment, you upload a photo of your child and choose a theme. Our AI creates illustrations with their face on every page. Simple as that." },
        { pergunta: "How long until I receive it?", resposta: "Within 24 hours of payment, you'll receive the personalized PDF in your email, ready to print." },
        { pergunta: "Can I print it as many times as I want?", resposta: "Yes! The PDF file is yours forever. Print at home, at a print shop, or read on a tablet — no copy limit." },
      ] as { pergunta: string; resposta: string }[],

      // OTO1 Downsell content
      oto1DownPassoLabel: "Last chance — reduced offer",
      oto1DownAlertaTexto: "Wait! We have something special for you...",
      oto1DownValidacaoTexto: "We understand the price may feel like a lot.",
      oto1DownFomoTexto: (nome: string) => `What if you could give ${nome} at least 1 personalized book — with them as the main character — for less than half the price?`,
      oto1DownCuriosidadeTexto: (nome: string) => `Imagine ${nome} opening a book and seeing THEMSELVES as the hero of the story.`,
      oto1DownReframeTitulo: "1 book. 1 story. 100% theirs.",
      oto1DownReframeTexto: "A personalized PDF book with your child as the main character. Ready to print or read on a tablet.",
      oto1DownBeneficios: [
        "A unique AI-generated story with your child's name and face",
        "Personalized illustrations on every page",
        "High-resolution PDF — print as many times as you want",
        "Your child as the hero of their own story",
      ] as string[],
      oto1DownDepoimentos: [
        { nome: "Julie M.", texto: "My son won't stop asking to read 'his book'. Every night it's the same: 'Mom, read MY book!'", cidade: "Boston" },
        { nome: "Fiona L.", texto: "I gave it as a birthday gift. He cried with joy when he saw his name on the cover.", cidade: "San Francisco" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1DownModulos: (nome: string) => [
        { emoji: "📖", titulo: "1 Personalized PDF Book", descricao: `Story with ${nome} as the main character`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Personalized Illustrations", descricao: "Your child's face on every page", valorIndividual: "$6.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1DownValorTotal: "$19.90",
      oto1DownPrecoOriginal: "$13.90",
      oto1DownPrecoFinal: "$9.90",

      // OTO3 content
      oto3PassoLabel: "Final offer — Won't appear again",
      oto3AlertaTexto: "After this page, the price goes back to normal.",
      oto3ValidacaoTexto: "Almost there! Just one more thing...",
      oto3FomoTexto: (nome: string) => `You already have the coloring pages. Maybe you already have the book and the song. But what if ${nome} could receive brand new activities EVERY WEEK? Without you having to think, search, or create anything?`,
      oto3CuriosidadeTexto: (nome: string) => `A whole club of personalized activities. Coloring, cutting, connect-the-dots, word searches — all featuring ${nome}.`,
      oto3ReframeTitulo: "A full year of activities. No screens. No repeats.",
      oto3ReframeTexto: (nome: string) => `That's 52 weeks of fresh content to keep ${nome} entertained, learning, and away from screens. You receive it weekly by email, print it, and you're done. Zero effort for you, maximum fun for them.`,
      oto3Beneficios: (nome: string) => [
        "Brand new activities every week — never repeats",
        `Personalized with ${nome}'s name`,
        "Coloring, cutting, connect-the-dots, word searches and more",
        "Delivered by email — just print and go",
        "Away from screens: real activities with paper and crayons",
        "Perfect for trips, restaurants, and weekends",
      ] as string[],
      oto3Depoimentos: [
        { nome: "Marina C.", texto: "Every Friday my son asks: 'Mom, did my activity arrive?' It's become our weekend tradition. He loves it and I get 1 hour of peace.", cidade: "Denver" },
        { nome: "Caroline B.", texto: "I cancelled 2 tablet apps after joining the club. My son prefers the printed activities. And I prefer him off the screen.", cidade: "Atlanta" },
        { nome: "Tanya R.", texto: "I bring them on car trips. It's the only thing that keeps him quiet for 1 hour without an iPad. Already worth the whole year's investment.", cidade: "Seattle" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3Modulos: [
        { emoji: "📋", titulo: "52 Weekly Activity Packs", descricao: "A full year of content", valorIndividual: "$31.00" },
        { emoji: "🎨", titulo: "Themed Coloring Pages", descricao: "Holidays, seasons, kids' themes", valorIndividual: "$8.00" },
        { emoji: "✂️", titulo: "Cut, Paste & Build", descricao: "Fine motor skill activities", valorIndividual: "$6.00" },
        { emoji: "🔤", titulo: "Word Searches & Connect-the-Dots", descricao: "Learning disguised as fun", valorIndividual: "$5.00" },
        { emoji: "📧", titulo: "Weekly Email Delivery", descricao: "Receive, print, and go", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3ValorTotal: "$50.00",
      oto3PrecoOriginal: "$39.90",
      oto3PrecoFinal: "$19.90",
      oto3PeriodoPagamento: "one-time payment — 1 year access",

      // OTO3 Downsell content
      oto3DownPassoLabel: "Last chance — reduced offer",
      oto3DownAlertaTexto: "Wait! What if it were half the time and half the price?",
      oto3DownValidacaoTexto: "We understand. The annual plan can feel like a lot.",
      oto3DownFomoTexto: (nome: string) => `What if you could try the Club for 6 months — with everything included — for less than half? If ${nome} loves it (and they will), you can renew later.`,
      oto3DownCuriosidadeTexto: (nome: string) => `26 weeks of personalized activities. Every week something new to print and play with ${nome}.`,
      oto3DownReframeTitulo: "6 months of activities. No 1-year commitment.",
      oto3DownReframeTexto: (nome: string) => `Try the Club for half the period. That's 26 weeks of fresh content — coloring, cutting, connect-the-dots — all personalized with ${nome}'s name. If they love it, you decide whether to renew.`,
      oto3DownBeneficios: (nome: string) => [
        "26 weeks of brand new activities — never repeats",
        `Personalized with ${nome}'s name`,
        "Coloring, cutting, connect-the-dots, word searches and more",
        "Delivered by email — just print and go",
        "No long commitment — try for 6 months",
        "Half the price of the annual plan",
      ] as string[],
      oto3DownDepoimentos: [
        { nome: "Marina C.", texto: "Every Friday my son asks: 'Mom, did my activity arrive?' It's become our weekend tradition.", cidade: "Denver" },
        { nome: "Tanya R.", texto: "I bring them on car trips. It's the only thing that keeps him quiet for 1 hour without an iPad.", cidade: "Seattle" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3DownModulos: [
        { emoji: "📋", titulo: "26 Weekly Activity Packs", descricao: "6 months of personalized content", valorIndividual: "$15.50" },
        { emoji: "🎨", titulo: "Themed Coloring Pages", descricao: "Holidays and kids' themes", valorIndividual: "$4.00" },
        { emoji: "✂️", titulo: "Cut, Paste & Build", descricao: "Fine motor skill activities", valorIndividual: "$3.00" },
        { emoji: "📧", titulo: "Weekly Email Delivery", descricao: "Receive, print, and go", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3DownValorTotal: "$22.50",
      oto3DownPrecoOriginal: "$19.90",
      oto3DownPrecoFinal: "$9.90",
      oto3DownPeriodoPagamento: "one-time payment — 6 months access",

      // Alert fallback
      alertaPagamento: "Payment link will be configured soon.",
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

      // Settings extras
      configHeader: "Settings",
      configCreditos: "My Credits",
      configCreditosDe: "of 15",
      configCreditosRenova: (dias: number) => `Renews in ${dias} days`,
      configComprarCreditos: "Buy 20 extra credits — $3.90",
      configMeusFilhos: "My Children",
      configNovoFilho: "New child",
      configNomePlaceholder: "Child's name",
      configCancelar: "Cancel",
      configSalvando: "Saving...",
      configSemPlano: "No plan",
      configAtivo: "Active",
      configPlanoLabel: "Plan",
      configIdiomaLabel: "Idioma / Language",
      configSuporteItems: ["Contact Us", "Rate the app", "Terms & Privacy"] as string[],
      configLogout: "Sign out",
      configFooter: "To cancel, please contact support",

      // Login
      loginTitulo: "Access your account",
      loginSubtitulo: "Enter the email used for purchase",
      loginGoogle: "Sign in with Google",
      loginOu: "or",
      loginEmailLabel: "Purchase email",
      loginEmailPlaceholder: "email@used-for-purchase.com",
      loginEntrar: "Sign in",
      loginEntrando: "Signing in...",
      loginSemConta: "Don't have an account?",
      loginAssinar: "Subscribe to Colory",
      loginErroSemAssinatura: "This email doesn't have an active subscription.",
      loginErroExpirada: "Your subscription has expired. Renew to continue.",
      loginErroSessao: "Error creating session. Please try again.",
      loginErroGeral: "Error signing in. Please try again.",
      loginErroGoogle: "Error connecting with Google. Please try again.",
      loginRenovar: "Renew subscription",
      configSelectIdade: "Select...",
      configIdadeOptions: ["0-2 years", "3-5 years", "6-8 years", "9-12 years"] as string[],

      // Create page extras
      criarTransformar: (nome: string) => `Turn a photo of ${nome} into a coloring page`,
      criarAdicionarFoto: "Add Photo +",
      criarOtimizando: "Optimizing...",
      criarTrocarFoto: "Change photo",
      criarSelecionarEstilo: "Select Style",
      criarRestantes: "remaining",
      criarPreparando: "Preparing...",
      criarGerarPagina: "Generate Page",
      criarPlanoExpirou: "Your plan has expired",
      criarRenovarDesc: "Renew to keep creating coloring pages",
      criarRenovar: "Renew plan",
      criarSemCreditos: "Your monthly generations are used up",
      criarSemCreditosDesc: "Buy extra credits to keep creating",
      criarComprarCreditos: "Buy 20 credits — $3.90",
      criarEstilos: [
        { id: "simple", name: "Simple", desc: "Clean lines, few details" },
        { id: "detailed", name: "Detailed", desc: "With scenery and more details" },
        { id: "minimalist", name: "Minimalist", desc: "Minimal strokes, artistic" },
        { id: "ink", name: "Ink Art", desc: "Bold strokes, ink style" },
      ] as { id: string; name: string; desc: string }[],

      // Pages extras
      paginasHeader: "My Pages",
      paginasTodas: "All",
      paginasAdicionar: "+ Add",
      paginasVazia: "You haven't created any pages yet",
      paginasVaziaCta: "Create my first page",
      paginasLivroHistoria: "Storybook",
      paginasLivroDesc: "Your child as the hero of the story",
      paginasLivroAcessar: "Personalize your book now!",
      paginasClubeAtividades: "Activity Club",
      paginasClubeDesc: "52 weeks of printable activities",
      paginasClubeAcessar: "Access granted! Check your email",
      paginasDesbloquear: "Unlock",
      paginasAcessar: "Access",

      // BottomNav
      navCriar: "Create",
      navPaginas: "My Pages",

      // Gerando page
      gerandoTexto: (nome: string) => `Creating ${nome}'s page...`,
      gerandoFatos: [
        "Did you know coloring reduces stress by up to 35%?",
        "Coloring helps develop fine motor coordination.",
        "Children who color regularly have better concentration.",
        "Coloring stimulates creativity from an early age.",
        "Personalized coloring pages boost engagement.",
      ] as string[],
      gerandoVaiAdorar: (nome: string) => `${nome} is going to love it!`,
      gerandoEstilos: {
        simple: "Coloring book",
        detailed: "Line art",
        family: "Thick lines",
        kids: "Kids",
      } as Record<string, string>,

      // Resultado page
      resultadoHeader: (nome: string) => `${nome}'s Result`,
      resultadoFotoOriginal: "Original photo",
      resultadoPaginaColorir: "Coloring page",
      resultadoSegurarComparar: "Hold to compare",
      resultadoBaixar: "Download",
      resultadoImprimir: "Print",
      resultadoCompartilhar: "Share",
      resultadoCriarMais: "Create more",
      resultadoGerarNovo: "Generate again",
      resultadoGerarNovoDesc: "Try a different style",
      resultadoLivroHistoria: (nome: string) => `${nome}'s Storybook`,
      resultadoLivroDesc: (nome: string) => `${nome} as the hero of the story`,
      resultadoLivroAcessar: "Personalize your book now",
      resultadoClubeAtividades: "Activity Club",
      resultadoClubeDesc: "52 weeks of activities",
      resultadoClubeAcessar: "Access granted! Check your email",
      resultadoDesbloquear: "Unlock",
      resultadoAcessar: "Access",
      resultadoShareTitle: (nome: string) => `${nome}'s coloring page`,
      resultadoShareText: "Check this out! I created a personalized coloring page on Colory!",
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
      imprimir: "Print",
      emailTitulo: "What you'll receive in your email",
      emailItems: [
        "Your personalized coloring page",
        "Access link to the full app",
        "Instructions for high-quality printing",
      ] as string[],
      proximosPassosTitulo: "Next steps",
      proximosPasso1: "Open the email we sent you",
      proximosPasso2: "Click the access link",
      proximosPasso3: "Start creating coloring pages",
      instalarAppTitulo: "Install the app on your phone",
      instalarIphone: "iPhone: Tap Share → Add to Home Screen",
      instalarAndroid: "Android: Tap ⋮ → Install app",
    },

    // Components
    componentes: {
      // GarantiaBadge
      garantia30Titulo: "30-day guarantee",
      garantia30Texto: "If you don't love it, we'll refund 100% of your money. No questions asked.",

      // ComoFunciona
      comoFuncionaTitulo: "How does it work?",
      comoFuncionaPasso1: "Upload the photo",
      comoFuncionaPasso2: "Personalize your story",
      comoFuncionaPasso3: "Receive the personalized book",

      // BookPreview
      bookPreviewTitulo: (nome: string) => `See how ${nome}'s book could look:`,
      bookPreviewExemplo: (i: number) => `Example ${i}`,
      bookPreviewCapa: "Cover",
      bookPreviewPagina: (n: number) => `Page ${n}`,
      bookPreviewDescricao: (nome: string) => `${nome}'s book will look just like this — with their name in the story, personalized illustrations, and ready to print.`,

      // TransformacaoVisual
      transformacaoFoto: "Your child's photo",
      transformacaoLivro: "Personalized book",
      transformacaoDescricao: "The AI uses the photo to create illustrations with their face on every page",

      // FaqAccordion
      faqTitulo: "Frequently asked questions",
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
      arrasteComparar: "Arrastra para comparar",
      seuFilho: "tu hijo",
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
      estiloTitulo: "Elige el estilo",
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
      lgpdTermos: "Acepto los",
      lgpdTermosLink: "Términos de Uso",
      lgpdE: "y",
      lgpdPrivacidadeLink: "Política de Privacidad",
      lgpdAviso: "Acepta los términos para continuar",
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

      // Social proof
      socialProofCount: "2.847",
      socialProofText: "mamás ya se suscribieron",

      // Trust badges
      trustPagamento: "Pago seguro",
      trustGarantia: "Garantía 7 días",
      trustAcesso: "Acceso inmediato",

      // Benefits
      beneficiosTitulo: "Ambos planes incluyen:",
      beneficio1: "Hasta 15 páginas para colorear al mes",
      beneficio2: (nome: string) => `Personalizadas con el rostro de ${nome}`,
      beneficio3: "Varios estilos artísticos para elegir",
      beneficio4: "PDF en alta resolución — imprímelo cuantas veces quieras",
      beneficio5: "Recíbelo por correo o directo en el celular",
      beneficio6: (nome: string) => `Nuevas páginas cada semana — ${nome} nunca se aburre`,

      // Urgency
      urgenciaTitulo: "Oferta especial de lanzamiento",
      urgenciaTexto: "Este precio es exclusivo para quienes acaban de crear su primera página. Al salir, el precio vuelve a la normalidad.",

      // Testimonials
      depoimentosTitulo: "Lo que dicen otras mamás:",
      depoimentos: [
        { nome: "María C.", cidade: "Madrid", texto: "¡A mi hijo le encantó! Ya imprimimos más de 20 páginas. Cada semana pide hacer una nueva." },
        { nome: "Laura G.", cidade: "Buenos Aires", texto: "La mejor inversión que hice. Suelta el celular en cuanto ve su página para colorear. Vale cada centavo." },
        { nome: "Ana P.", cidade: "México", texto: "¡La maestra pidió hacer una para toda la clase después de ver la de mi hijo. Increíble!" },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ
      faqTitulo: "Preguntas frecuentes",
      faqs: [
        { p: "¿Cómo funciona?", r: "Envías la foto de tu hijo, eliges el estilo y la IA genera una página para colorear personalizada en segundos. ¡Recíbela por correo o directo en el celular!" },
        { p: "¿Cuántas páginas puedo crear?", r: "Hasta 15 páginas para colorear al mes. ¡Suficiente para tener una nueva casi cada día!" },
        { p: "¿Puedo cancelar cuando quiera?", r: "¡Sí! Cancela en cualquier momento sin complicaciones. Y en los primeros 7 días, te devolvemos el 100% del valor." },
        { p: "¿Cómo recibo las páginas?", r: "Recibes el PDF por correo o lo accedes directo desde el celular. Imprímelo en casa o en una imprenta — sin límite de copias." },
      ] as { p: string; r: string }[],

      // Social proof v2
      socialProofV2Count: "+47.000 páginas",
      socialProofV2Text: "creadas por mamás de todo el mundo",

      // Hero unlock
      heroTitulo: (artigoDe: string, nome: string) => `¡La página para colorear de ${nome} está lista!`,
      heroDesbloquear: "Desbloquea para descargar e imprimir",

      // CTA micro-commitment
      ctaTestar: (artigo: string, nome: string) => `Prueba 7 días. Si ${nome} no lo ama, te devolvemos cada centavo.`,
      ctaCancelar: "Cancela cuando quieras. Sin multa, sin complicaciones.",

      // Emotional hooks
      hookTelaAlto: (artigo: string, nome: string, pronome: string) => `Dijiste que ${nome} pasa varias horas al día frente a las pantallas. ¿Imaginas que deje la tablet por su cuenta para colorear su propio rostro? Eso pasa cada semana con Colory.`,
      hookTelaMedio: (artigoDe: string, nome: string) => `Quieres reducir el tiempo de pantalla de ${nome}. Con Colory, las mamás cuentan que sus hijos piden imprimir en vez de ver videos.`,
      hookTelaBaixo: (artigoDe: string, nome: string) => `Ya cuidas bien el tiempo de pantalla de ${nome}. Colory es la actividad perfecta para llenar esos momentos con creatividad.`,
      hookConexao: (artigo: string, nome: string, pronome2: string) => `Y lo mejor: es un momento de ustedes juntos. Sin pantalla, sin prisa. Solo tú y ${nome} coloreando.`,

      // Future pacing
      futurePacing: (artigo: string, nome: string, pronome2: string) => `Imagina la escena: imprimes la página, la pones en la mesa con los lápices de colores. ${nome} ve su propio rostro en el dibujo y esboza esa gran sonrisa. Se sientan juntos y por 30 minutos no existe celular, no existe prisa. Solo tú y ${nome}, coloreando.`,
      momentosSemPreco: "Momentos así no tienen precio ✨",

      // Testimonials v2 title
      depoimentosV2Titulo: "Lo que dicen las mamás",
      verificado: "Verificado",
      depoimentosV2: [
        { nome: "María C.", cidade: "Madrid", texto: "Mi hijo de 4 años coloreó durante 40 minutos sin parar. CUARENTA MINUTOS. Sin pantalla. Nunca lo vi tan concentrado." },
        { nome: "Laura G.", cidade: "Buenos Aires", texto: "Lo hice directo desde el celular en 2 minutos. El PDF llegó por correo y lo imprimí en casa. Más fácil que pedir comida a domicilio." },
        { nome: "Ana P.", cidade: "México", texto: "Compraba un libro de colorear cada mes. $6 cada uno y se aburría rápido porque no era personalizado. Con Colory no se aburre porque es SU rostro." },
        { nome: "Carmen R.", cidade: "Barcelona", texto: "La abuela lloró cuando vio a su nieto como personaje de la página. Se convirtió en regalo de cumpleaños. Vale cada centavo." },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ title (replacing hardcoded)
      faqTituloV2: "Preguntas frecuentes",

      // Exit-intent popup
      exitIntentTitulo: "¡Espera! Tenemos un regalo para ti",
      exitIntentSubtitulo: "Usa el cupón y obtén 10% de descuento en el plan anual",
      exitIntentCupom: "GIFT10",
      exitIntentCopiar: "Copiar cupón",
      exitIntentCopiado: "¡Copiado!",
      exitIntentCta: "Aprovechar descuento",
      exitIntentFechar: "No, gracias",
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

      // OtoLayout framework text
      continueLendo: "↓ Sigue leyendo ↓",
      oQueVoceRecebe: "Lo que vas a recibir:",
      valorTotalLabel: "Valor total:",
      precoNormal: "Precio normal",
      hojeApenas: "Hoy, solo:",
      scarcityTitle: "Esta oferta solo existe en esta página",
      scarcityText: "Al salir, no tendrás acceso a este precio de nuevo.",

      // OTO1 content
      oto1PassoLabel: "Paso 1 de 2 — No cierres esta página",
      oto1AlertaTexto: "Tu compra NO está finalizada aún...",
      oto1ValidacaoTexto: "¡Tu suscripción a Colory ha sido confirmada!",
      oto1FomoTexto: (nome: string) => `Acabas de dar un paso increíble por ${nome}. Pero seamos honestos: salir de esta página ahora podría hacerte perder la oportunidad de transformar su experiencia en algo mucho más grande.`,
      oto1CuriosidadeTexto: (nome: string) => `¿Y si ${nome} pudiera ser el HÉROE de su propia historia? Imagina que abre un libro y ve su propio rostro en cada página.`,
      oto1ReframeTitulo: "Más que un libro. Un recuerdo que guardará para siempre.",
      oto1ReframeTexto: "Los libros personalizados no son solo entretenimiento. Son herramientas que fomentan el amor por la lectura, fortalecen la identidad y crean momentos de conexión entre madre e hijo que no tienen precio.",
      oto1Beneficios: (nome: string) => [
        `${nome} como protagonista — nombre y rostro en cada página`,
        "Estimula el amor por la lectura desde pequeño",
        "Momento de conexión: lean juntos cada noche",
        "Imprímelo cuantas veces quieras — es tuyo para siempre",
        "Regalo perfecto para abuelos, tíos y padrinos",
      ] as string[],
      oto1Depoimentos: [
        { nome: "Camila R.", texto: "Lo compré pensando que era una tontería. Mi hijo de 4 años se aprendió la historia entera. Les cuenta a todos que 'tiene un libro suyo'. Ya hice 3 copias para regalar.", cidade: "Madrid" },
        { nome: "Patricia S.", texto: "La abuela lloró cuando vio a su nieto como personaje. Se convirtió en el regalo de Navidad más especial que hemos dado. Vale cada centavo.", cidade: "Buenos Aires" },
        { nome: "Amanda K.", texto: "Cada noche mi hija pide: 'mami, lee MI libro'. Se siente tan especial. La mejor inversión que he hecho en contenido para ella.", cidade: "México" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1Modulos: (nome: string) => [
        { emoji: "📖", titulo: "2 Libros PDF Personalizados", descricao: `Historias únicas con ${nome} como protagonista`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Ilustraciones con IA", descricao: "El rostro de tu hijo en cada página de la historia", valorIndividual: "$8.00" },
        { emoji: "🖨️", titulo: "Alta Resolución para Imprimir", descricao: "PDF listo para imprimir en casa o imprenta", valorIndividual: "$4.00" },
        { emoji: "🎁", titulo: "Bono: Portada Personalizada", descricao: `Nombre de ${nome} en la portada como autor y héroe`, valorIndividual: "$3.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1ValorTotal: "$28.90",
      oto1PrecoOriginal: "$19.90",
      oto1PrecoFinal: "$13.90",
      oto1Temas: ["Dinosaurios", "Princesas", "Aventura", "Unicornios", "Espacio", "Piratas", "Animales", "Superhéroes"] as string[],
      oto1TemasLabel: "Temas disponibles",
      oto1Faqs: [
        { pergunta: "¿Cómo personalizo el libro?", resposta: "Después de confirmar el pago, envías una foto de tu hijo y eliges el tema. Nuestra IA crea las ilustraciones con su rostro en cada página. Así de simple." },
        { pergunta: "¿Cuánto tarda en llegar?", resposta: "En un máximo de 24 horas después del pago, recibes el PDF personalizado en tu correo, listo para imprimir." },
        { pergunta: "¿Puedo imprimirlo cuantas veces quiera?", resposta: "¡Sí! El archivo PDF es tuyo para siempre. Imprímelo en casa, en la imprenta o léelo en la tablet — sin límite de copias." },
      ] as { pergunta: string; resposta: string }[],

      // OTO1 Downsell content
      oto1DownPassoLabel: "Última oportunidad — oferta reducida",
      oto1DownAlertaTexto: "¡Espera! Tenemos algo especial para ti...",
      oto1DownValidacaoTexto: "Entendemos que el precio puede ser mucho.",
      oto1DownFomoTexto: (nome: string) => `¿Y si pudieras darle a ${nome} al menos 1 libro personalizado — con él como protagonista — por menos de la mitad?`,
      oto1DownCuriosidadeTexto: (nome: string) => `Imagina a ${nome} abriendo un libro y viéndose A SÍ MISMO como el héroe de la historia.`,
      oto1DownReframeTitulo: "1 libro. 1 historia. 100% suyo.",
      oto1DownReframeTexto: "Un libro PDF personalizado con tu hijo como protagonista. Listo para imprimir o leer en la tablet.",
      oto1DownBeneficios: [
        "Historia única generada por IA con el nombre y rostro de tu hijo",
        "Ilustraciones personalizadas en cada página",
        "PDF en alta resolución — imprímelo cuantas veces quieras",
        "Tu hijo como héroe de su propia historia",
      ] as string[],
      oto1DownDepoimentos: [
        { nome: "Juliana M.", texto: "Mi hijo no para de pedir que le lea 'su libro'. Cada noche es lo mismo: '¡mami, lee MI libro!'", cidade: "Barcelona" },
        { nome: "Fernanda L.", texto: "Se lo di de regalo de cumpleaños. Lloró de emoción cuando vio su nombre en la portada.", cidade: "Lima" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1DownModulos: (nome: string) => [
        { emoji: "📖", titulo: "1 Libro PDF Personalizado", descricao: `Historia con ${nome} como protagonista`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Ilustraciones Personalizadas", descricao: "El rostro de tu hijo en cada página", valorIndividual: "$6.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1DownValorTotal: "$19.90",
      oto1DownPrecoOriginal: "$13.90",
      oto1DownPrecoFinal: "$9.90",

      // OTO3 content
      oto3PassoLabel: "Última oferta — No aparecerá de nuevo",
      oto3AlertaTexto: "Después de esta página, el precio vuelve a la normalidad.",
      oto3ValidacaoTexto: "¡Casi listo! Solo una cosa más...",
      oto3FomoTexto: (nome: string) => `Ya tienes las páginas para colorear. Quizá ya tienes el libro y la canción. Pero ¿y si ${nome} pudiera recibir actividades nuevas CADA SEMANA? Sin que tú tengas que pensar, buscar ni crear nada.`,
      oto3CuriosidadeTexto: (nome: string) => `Un club entero de actividades personalizadas. Colorear, recortar, unir los puntos, sopa de letras — todo con ${nome} como tema.`,
      oto3ReframeTitulo: "1 año entero de actividades. Sin pantallas. Sin repetir.",
      oto3ReframeTexto: (nome: string) => `Son 52 semanas de contenido nuevo para mantener a ${nome} entretenido, aprendiendo y lejos de las pantallas. Lo recibes cada semana por correo, lo imprimes y listo. Cero esfuerzo para ti, máxima diversión para él.`,
      oto3Beneficios: (nome: string) => [
        "Actividades nuevas cada semana — nunca se repiten",
        `Personalizadas con el nombre de ${nome}`,
        "Colorear, recortar, unir puntos, sopa de letras y más",
        "Recíbelo por correo — solo imprime",
        "Lejos de las pantallas: actividad real, con papel y lápices",
        "Ideal para viajes, restaurantes y fines de semana",
      ] as string[],
      oto3Depoimentos: [
        { nome: "Marina C.", texto: "Cada viernes mi hijo pregunta: '¿mami, llegó mi actividad?'. Se volvió la tradición del fin de semana. Le encanta y yo tengo 1 hora de paz.", cidade: "Valencia" },
        { nome: "Carolina B.", texto: "Cancelé 2 apps de tablet después de unirme al club. Mi hijo prefiere las actividades impresas. Y yo lo prefiero lejos de la pantalla.", cidade: "Bogotá" },
        { nome: "Teresa R.", texto: "Las llevo en los viajes en coche. Es lo único que lo mantiene tranquilo 1 hora sin iPad. Ya valió la inversión del año entero.", cidade: "Santiago" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3Modulos: [
        { emoji: "📋", titulo: "52 Paquetes de Actividades Semanales", descricao: "1 año completo de contenido", valorIndividual: "$31.00" },
        { emoji: "🎨", titulo: "Páginas para Colorear Temáticas", descricao: "Fechas especiales, estaciones, temas infantiles", valorIndividual: "$8.00" },
        { emoji: "✂️", titulo: "Recorta, Pega y Arma", descricao: "Actividades de motricidad fina", valorIndividual: "$6.00" },
        { emoji: "🔤", titulo: "Sopa de Letras y Unir Puntos", descricao: "Aprendizaje disfrazado de diversión", valorIndividual: "$5.00" },
        { emoji: "📧", titulo: "Entrega Semanal por Correo", descricao: "Recibe, imprime y listo", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3ValorTotal: "$50.00",
      oto3PrecoOriginal: "$39.90",
      oto3PrecoFinal: "$19.90",
      oto3PeriodoPagamento: "pago único — acceso por 1 año",

      // OTO3 Downsell content
      oto3DownPassoLabel: "Última oportunidad — oferta reducida",
      oto3DownAlertaTexto: "¡Espera! ¿Y si fuera por la mitad del tiempo y del precio?",
      oto3DownValidacaoTexto: "Entendemos. El plan anual puede parecer mucho.",
      oto3DownFomoTexto: (nome: string) => `¿Y si pudieras probar el Club por 6 meses — con todo incluido — por menos de la mitad? Si a ${nome} le encanta (y le encantará), renuevas después.`,
      oto3DownCuriosidadeTexto: (nome: string) => `26 semanas de actividades personalizadas. Cada semana algo nuevo para imprimir y jugar con ${nome}.`,
      oto3DownReframeTitulo: "6 meses de actividades. Sin compromiso de 1 año.",
      oto3DownReframeTexto: (nome: string) => `Prueba el Club por medio periodo. Son 26 semanas de contenido nuevo — colorear, recortar, unir los puntos — todo personalizado con el nombre de ${nome}. Si le encanta, tú decides si renuevas.`,
      oto3DownBeneficios: (nome: string) => [
        "26 semanas de actividades nuevas — nunca se repiten",
        `Personalizadas con el nombre de ${nome}`,
        "Colorear, recortar, unir puntos, sopa de letras y más",
        "Recíbelo por correo — solo imprime",
        "Sin compromiso largo — prueba por 6 meses",
        "Mitad de precio del plan anual",
      ] as string[],
      oto3DownDepoimentos: [
        { nome: "Marina C.", texto: "Cada viernes mi hijo pregunta: '¿mami, llegó mi actividad?'. Se volvió la tradición del fin de semana.", cidade: "Valencia" },
        { nome: "Teresa R.", texto: "Las llevo en los viajes en coche. Es lo único que lo mantiene tranquilo 1 hora sin iPad.", cidade: "Santiago" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3DownModulos: [
        { emoji: "📋", titulo: "26 Paquetes de Actividades Semanales", descricao: "6 meses de contenido personalizado", valorIndividual: "$15.50" },
        { emoji: "🎨", titulo: "Páginas para Colorear Temáticas", descricao: "Fechas especiales y temas infantiles", valorIndividual: "$4.00" },
        { emoji: "✂️", titulo: "Recorta, Pega y Arma", descricao: "Actividades de motricidad fina", valorIndividual: "$3.00" },
        { emoji: "📧", titulo: "Entrega Semanal por Correo", descricao: "Recibe, imprime y listo", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3DownValorTotal: "$22.50",
      oto3DownPrecoOriginal: "$19.90",
      oto3DownPrecoFinal: "$9.90",
      oto3DownPeriodoPagamento: "pago único — acceso por 6 meses",

      // Alert fallback
      alertaPagamento: "El enlace de pago se configurará pronto.",
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

      // Configuración extras
      configHeader: "Configuración",
      configCreditos: "Mis Créditos",
      configCreditosDe: "de 15",
      configCreditosRenova: (dias: number) => `Se renueva en ${dias} días`,
      configComprarCreditos: "Comprar 20 créditos extras — $3.90",
      configMeusFilhos: "Mis Hijos",
      configNovoFilho: "Nuevo hijo",
      configNomePlaceholder: "Nombre del hijo",
      configCancelar: "Cancelar",
      configSalvando: "Guardando...",
      configSemPlano: "Sin plan",
      configAtivo: "Activo",
      configPlanoLabel: "Plan",
      configIdiomaLabel: "Idioma / Language",
      configSuporteItems: ["Contáctanos", "Calificar la app", "Términos y Privacidad"] as string[],
      configLogout: "Cerrar sesión",
      configFooter: "Para cancelar, contacta con soporte",

      // Login
      loginTitulo: "Accede a tu cuenta",
      loginSubtitulo: "Ingresa el email usado en la compra",
      loginGoogle: "Entrar con Google",
      loginOu: "o",
      loginEmailLabel: "Email de compra",
      loginEmailPlaceholder: "email@usado-en-la-compra.com",
      loginEntrar: "Entrar",
      loginEntrando: "Entrando...",
      loginSemConta: "¿Aún no tienes cuenta?",
      loginAssinar: "Suscríbete a Colory",
      loginErroSemAssinatura: "Este email no tiene una suscripción activa.",
      loginErroExpirada: "Tu suscripción ha expirado. Renueva para continuar.",
      loginErroSessao: "Error al crear sesión. Inténtalo de nuevo.",
      loginErroGeral: "Error al entrar. Inténtalo de nuevo.",
      loginErroGoogle: "Error al conectar con Google. Inténtalo de nuevo.",
      loginRenovar: "Renovar suscripción",
      configSelectIdade: "Seleccionar...",
      configIdadeOptions: ["0-2 años", "3-5 años", "6-8 años", "9-12 años"] as string[],

      // Crear page extras
      criarTransformar: (nome: string) => `Transforma la foto de ${nome} en una página para colorear`,
      criarAdicionarFoto: "Agregar Foto +",
      criarOtimizando: "Optimizando...",
      criarTrocarFoto: "Cambiar foto",
      criarSelecionarEstilo: "Seleccionar Estilo",
      criarRestantes: "restantes",
      criarPreparando: "Preparando...",
      criarGerarPagina: "Generar Página",
      criarPlanoExpirou: "Tu plan ha expirado",
      criarRenovarDesc: "Renueva para seguir creando páginas para colorear",
      criarRenovar: "Renovar plan",
      criarSemCreditos: "Tus generaciones de este mes se agotaron",
      criarSemCreditosDesc: "Compra créditos extras para seguir creando",
      criarComprarCreditos: "Comprar 20 créditos — $3.90",
      criarEstilos: [
        { id: "simple", name: "Simple", desc: "Líneas limpias, pocos detalles" },
        { id: "detailed", name: "Detallado", desc: "Con escenario y más detalles" },
        { id: "minimalist", name: "Minimalista", desc: "Trazos mínimos, artístico" },
        { id: "ink", name: "Arte con tinta", desc: "Trazos fuertes estilo tinta" },
      ] as { id: string; name: string; desc: string }[],

      // Páginas extras
      paginasHeader: "Mis Páginas",
      paginasTodas: "Todas",
      paginasAdicionar: "+ Agregar",
      paginasVazia: "Aún no has creado ninguna página",
      paginasVaziaCta: "Crear mi primera página",
      paginasLivroHistoria: "Libro de Historia",
      paginasLivroDesc: "Tu hijo como héroe de la historia",
      paginasLivroAcessar: "¡Personaliza tu libro ahora!",
      paginasClubeAtividades: "Club de Actividades",
      paginasClubeDesc: "52 semanas de actividades para imprimir",
      paginasClubeAcessar: "¡Acceso liberado! Revisa tu correo",
      paginasDesbloquear: "Desbloquear",
      paginasAcessar: "Acceder",

      // BottomNav
      navCriar: "Crear",
      navPaginas: "Mis Páginas",

      // Gerando page
      gerandoTexto: (nome: string) => `Creando la página de ${nome}...`,
      gerandoFatos: [
        "¿Sabías que colorear reduce el estrés hasta un 35%?",
        "Colorear ayuda a desarrollar la coordinación motora fina.",
        "Los niños que colorean regularmente tienen mejor concentración.",
        "La actividad de colorear estimula la creatividad desde temprano.",
        "Las páginas de colorear personalizadas aumentan la participación.",
      ] as string[],
      gerandoVaiAdorar: (nome: string) => `¡A ${nome} le va a encantar!`,
      gerandoEstilos: {
        simple: "Libro para colorear",
        detailed: "Arte lineal",
        family: "Líneas gruesas",
        kids: "Infantil",
      } as Record<string, string>,

      // Resultado page
      resultadoHeader: (nome: string) => `Resultado de ${nome}`,
      resultadoFotoOriginal: "Foto original",
      resultadoPaginaColorir: "Página para colorear",
      resultadoSegurarComparar: "Mantener para comparar",
      resultadoBaixar: "Descargar",
      resultadoImprimir: "Imprimir",
      resultadoCompartilhar: "Compartir",
      resultadoCriarMais: "Crear más",
      resultadoGerarNovo: "Generar de nuevo",
      resultadoGerarNovoDesc: "Prueba un estilo diferente",
      resultadoLivroHistoria: (nome: string) => `Libro de Historia de ${nome}`,
      resultadoLivroDesc: (nome: string) => `${nome} como héroe de la historia`,
      resultadoLivroAcessar: "Personaliza tu libro ahora",
      resultadoClubeAtividades: "Club de Actividades",
      resultadoClubeDesc: "52 semanas de actividades",
      resultadoClubeAcessar: "¡Acceso liberado! Revisa tu correo",
      resultadoDesbloquear: "Desbloquear",
      resultadoAcessar: "Acceder",
      resultadoShareTitle: (nome: string) => `Página para colorear de ${nome}`,
      resultadoShareText: "¡Mira qué genial! ¡Creé una página para colorear personalizada en Colory!",
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
      imprimir: "Imprimir",
      emailTitulo: "Lo que recibirás en tu correo",
      emailItems: [
        "Tu página para colorear personalizada",
        "Enlace de acceso a la app completa",
        "Instrucciones para imprimir en alta calidad",
      ] as string[],
      proximosPassosTitulo: "Próximos pasos",
      proximosPasso1: "Abre el correo que te enviamos",
      proximosPasso2: "Haz clic en el enlace de acceso",
      proximosPasso3: "Empieza a crear páginas para colorear",
      instalarAppTitulo: "Instala la app en tu celular",
      instalarIphone: "iPhone: Toca Compartir → Añadir a pantalla de inicio",
      instalarAndroid: "Android: Toca ⋮ → Instalar aplicación",
    },

    // Componentes
    componentes: {
      // GarantiaBadge
      garantia30Titulo: "Garantía de 30 días",
      garantia30Texto: "Si no te gusta, te devolvemos el 100% de tu dinero. Sin preguntas.",

      // ComoFunciona
      comoFuncionaTitulo: "¿Cómo funciona?",
      comoFuncionaPasso1: "Envía la foto",
      comoFuncionaPasso2: "Personaliza tu historia",
      comoFuncionaPasso3: "Recibe el libro personalizado",

      // BookPreview
      bookPreviewTitulo: (nome: string) => `Mira cómo podría quedar el libro de ${nome}:`,
      bookPreviewExemplo: (i: number) => `Ejemplo ${i}`,
      bookPreviewCapa: "Portada",
      bookPreviewPagina: (n: number) => `Página ${n}`,
      bookPreviewDescricao: (nome: string) => `El libro de ${nome} será así — con su nombre en la historia, ilustraciones personalizadas y listo para imprimir.`,

      // TransformacaoVisual
      transformacaoFoto: "Foto de tu hijo",
      transformacaoLivro: "Libro personalizado",
      transformacaoDescricao: "La IA usa la foto para crear ilustraciones con su rostro en cada página",

      // FaqAccordion
      faqTitulo: "Preguntas frecuentes",
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
      arrasteComparar: "Glissez pour comparer",
      seuFilho: "votre enfant",
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
      estiloTitulo: "Choisissez le style",
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
      lgpdTermos: "J'accepte les",
      lgpdTermosLink: "Conditions d'utilisation",
      lgpdE: "et",
      lgpdPrivacidadeLink: "Politique de confidentialité",
      lgpdAviso: "Veuillez accepter les conditions pour continuer",
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

      // Social proof
      socialProofCount: "2 847",
      socialProofText: "mamans se sont déjà abonnées",

      // Trust badges
      trustPagamento: "Paiement sécurisé",
      trustGarantia: "Garantie 7 jours",
      trustAcesso: "Accès immédiat",

      // Benefits
      beneficiosTitulo: "Les deux plans incluent :",
      beneficio1: "Jusqu'à 15 pages de coloriage par mois",
      beneficio2: (nome: string) => `Personnalisées avec le visage de ${nome}`,
      beneficio3: "Plusieurs styles artistiques au choix",
      beneficio4: "PDF haute résolution — imprimez autant de fois que vous voulez",
      beneficio5: "Recevez par e-mail ou directement sur votre téléphone",
      beneficio6: (nome: string) => `Nouvelles pages chaque semaine — ${nome} ne s'ennuie jamais`,

      // Urgency
      urgenciaTitulo: "Offre spéciale de lancement",
      urgenciaTexto: "Ce prix est exclusif pour ceux qui viennent de créer leur première page. En quittant, le prix revient à la normale.",

      // Testimonials
      depoimentosTitulo: "Ce que disent les autres mamans :",
      depoimentos: [
        { nome: "Sophie M.", cidade: "Paris", texto: "Mon fils a adoré ! Nous avons déjà imprimé plus de 20 pages. Il en demande une nouvelle chaque semaine." },
        { nome: "Claire B.", cidade: "Lyon", texto: "Le meilleur investissement que j'ai fait. Il lâche la tablette dès qu'il voit sa page de coloriage. Ça vaut chaque centime." },
        { nome: "Marie L.", cidade: "Marseille", texto: "La maîtresse a demandé à en faire pour toute la classe après avoir vu celle de mon fils. Incroyable !" },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ
      faqTitulo: "Questions fréquentes",
      faqs: [
        { p: "Comment ça marche ?", r: "Vous envoyez la photo de votre enfant, choisissez un style et l'IA génère une page de coloriage personnalisée en quelques secondes. Recevez-la par e-mail ou directement sur votre téléphone !" },
        { p: "Combien de pages puis-je créer ?", r: "Jusqu'à 15 pages de coloriage par mois. Suffisant pour en avoir une nouvelle presque chaque jour !" },
        { p: "Puis-je annuler quand je veux ?", r: "Oui ! Annulez à tout moment sans tracas. Et dans les 7 premiers jours, nous remboursons 100% du montant." },
        { p: "Comment je reçois les pages ?", r: "Vous recevez le PDF par e-mail ou y accédez directement depuis votre téléphone. Imprimez à la maison ou chez l'imprimeur — copies illimitées." },
      ] as { p: string; r: string }[],

      // Social proof v2
      socialProofV2Count: "+47 000 pages",
      socialProofV2Text: "créées par des mamans du monde entier",

      // Hero unlock
      heroTitulo: (artigoDe: string, nome: string) => `La page de coloriage de ${nome} est prête !`,
      heroDesbloquear: "Débloquez pour télécharger et imprimer",

      // CTA micro-commitment
      ctaTestar: (artigo: string, nome: string) => `Essayez pendant 7 jours. Si ${nome} n'adore pas, nous remboursons chaque centime.`,
      ctaCancelar: "Annulez quand vous voulez. Sans frais, sans tracas.",

      // Emotional hooks
      hookTelaAlto: (artigo: string, nome: string, pronome: string) => `Vous avez dit que ${nome} passe plusieurs heures par jour devant les écrans. Imaginez-le poser la tablette de lui-même pour colorier son propre visage ? Ça arrive chaque semaine avec Colory.`,
      hookTelaMedio: (artigoDe: string, nome: string) => `Vous voulez réduire le temps d'écran de ${nome}. Avec Colory, les mamans racontent que leurs enfants demandent à imprimer au lieu de regarder des vidéos.`,
      hookTelaBaixo: (artigoDe: string, nome: string) => `Vous gérez déjà bien le temps d'écran de ${nome}. Colory est l'activité parfaite pour remplir ces moments de créativité.`,
      hookConexao: (artigo: string, nome: string, pronome2: string) => `Et le meilleur : c'est un moment rien que pour vous deux. Sans écran, sans pression. Juste vous et ${nome} en train de colorier.`,

      // Future pacing
      futurePacing: (artigo: string, nome: string, pronome2: string) => `Imaginez la scène : vous imprimez la page, vous la posez sur la table avec les crayons de couleur. ${nome} voit son propre visage sur le dessin et affiche ce grand sourire. Vous vous asseyez ensemble et pendant 30 minutes, pas de téléphone, pas de pression. Juste vous et ${nome}, en train de colorier.`,
      momentosSemPreco: "Ces moments n'ont pas de prix ✨",

      // Testimonials v2 title
      depoimentosV2Titulo: "Ce que disent les mamans",
      verificado: "Vérifié",
      depoimentosV2: [
        { nome: "Sophie M.", cidade: "Paris", texto: "Mon fils de 4 ans a colorié pendant 40 minutes sans s'arrêter. QUARANTE MINUTES. Aucun écran. Je ne l'avais jamais vu aussi concentré." },
        { nome: "Claire B.", cidade: "Lyon", texto: "Je l'ai fait directement depuis mon téléphone en 2 minutes. Le PDF est arrivé par e-mail et j'ai imprimé à la maison. Plus facile que de commander à manger." },
        { nome: "Marie L.", cidade: "Marseille", texto: "J'achetais un livre de coloriage chaque mois. 6€ chacun et il s'en lassait vite car ce n'était pas personnalisé. Avec Colory il ne s'ennuie jamais car c'est SON visage." },
        { nome: "Isabelle D.", cidade: "Toulouse", texto: "Mamie a pleuré en voyant son petit-fils en personnage de coloriage. C'est devenu un cadeau d'anniversaire. Ça vaut chaque centime." },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ title (replacing hardcoded)
      faqTituloV2: "Questions fréquentes",

      // Exit-intent popup
      exitIntentTitulo: "Attendez ! Nous avons un cadeau pour vous",
      exitIntentSubtitulo: "Utilisez le coupon ci-dessous et obtenez 10% de réduction sur le plan annuel",
      exitIntentCupom: "GIFT10",
      exitIntentCopiar: "Copier le coupon",
      exitIntentCopiado: "Copié !",
      exitIntentCta: "Profiter de la réduction",
      exitIntentFechar: "Non, merci",
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

      // OtoLayout framework text
      continueLendo: "↓ Continuez à lire ↓",
      oQueVoceRecebe: "Ce que vous allez recevoir :",
      valorTotalLabel: "Valeur totale :",
      precoNormal: "Prix normal",
      hojeApenas: "Aujourd'hui seulement :",
      scarcityTitle: "Cette offre n'existe que sur cette page",
      scarcityText: "En quittant, vous n'aurez plus accès à ce prix.",

      // OTO1 content
      oto1PassoLabel: "Étape 1 sur 2 — Ne fermez pas cette page",
      oto1AlertaTexto: "Votre achat N'EST PAS encore finalisé...",
      oto1ValidacaoTexto: "Votre abonnement Colory a été confirmé !",
      oto1FomoTexto: (nome: string) => `Vous venez de faire un pas incroyable pour ${nome}. Mais soyons honnêtes : quitter cette page maintenant pourrait vous faire manquer l'opportunité de transformer son expérience en quelque chose de bien plus grand.`,
      oto1CuriosidadeTexto: (nome: string) => `Et si ${nome} pouvait être le HÉROS de sa propre histoire ? Imaginez-le ouvrant un livre et voyant son propre visage sur chaque page.`,
      oto1ReframeTitulo: "Plus qu'un livre. Un souvenir qu'il gardera pour toujours.",
      oto1ReframeTexto: "Les livres personnalisés ne sont pas qu'un divertissement. Ce sont des outils qui développent l'amour de la lecture, renforcent l'identité et créent des moments de complicité entre parent et enfant qui n'ont pas de prix.",
      oto1Beneficios: (nome: string) => [
        `${nome} comme protagoniste — prénom et visage sur chaque page`,
        "Développe l'amour de la lecture dès le plus jeune âge",
        "Moment de complicité : lisez ensemble chaque soir",
        "Imprimez autant de fois que vous voulez — c'est à vous pour toujours",
        "Cadeau parfait pour les grands-parents, oncles, tantes et parrains",
      ] as string[],
      oto1Depoimentos: [
        { nome: "Camille R.", texto: "Je l'ai acheté en pensant que c'était gadget. Mon fils de 4 ans a mémorisé toute l'histoire. Il raconte à tout le monde qu'il 'a son propre livre'. J'ai déjà fait 3 copies pour offrir.", cidade: "Paris" },
        { nome: "Patricia S.", texto: "Mamie a pleuré quand elle a vu son petit-fils comme personnage. C'est devenu le cadeau de Noël le plus spécial qu'on ait jamais offert. Ça vaut chaque centime.", cidade: "Lyon" },
        { nome: "Amélie K.", texto: "Chaque soir ma fille demande : 'maman, lis MON livre'. Elle se sent tellement spéciale. Le meilleur investissement que j'ai fait pour elle.", cidade: "Marseille" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1Modulos: (nome: string) => [
        { emoji: "📖", titulo: "2 Livres PDF Personnalisés", descricao: `Histoires uniques avec ${nome} comme protagoniste`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Illustrations par IA", descricao: "Le visage de votre enfant sur chaque page de l'histoire", valorIndividual: "$8.00" },
        { emoji: "🖨️", titulo: "Haute Résolution pour Impression", descricao: "PDF prêt à imprimer à la maison ou chez l'imprimeur", valorIndividual: "$4.00" },
        { emoji: "🎁", titulo: "Bonus : Couverture Personnalisée", descricao: `Le prénom de ${nome} en couverture comme auteur et héros`, valorIndividual: "$3.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1ValorTotal: "$28.90",
      oto1PrecoOriginal: "$19.90",
      oto1PrecoFinal: "$13.90",
      oto1Temas: ["Dinosaures", "Princesses", "Aventure", "Licornes", "Espace", "Pirates", "Animaux", "Super-héros"] as string[],
      oto1TemasLabel: "Thèmes disponibles",
      oto1Faqs: [
        { pergunta: "Comment je personnalise le livre ?", resposta: "Après avoir confirmé le paiement, vous envoyez une photo de votre enfant et choisissez le thème. Notre IA crée les illustrations avec son visage sur chaque page. C'est aussi simple que ça." },
        { pergunta: "Combien de temps pour le recevoir ?", resposta: "Dans les 24 heures suivant le paiement, vous recevez le PDF personnalisé par e-mail, prêt à imprimer." },
        { pergunta: "Puis-je l'imprimer autant de fois que je veux ?", resposta: "Oui ! Le fichier PDF est à vous pour toujours. Imprimez à la maison, chez l'imprimeur ou lisez sur tablette — sans limite de copies." },
      ] as { pergunta: string; resposta: string }[],

      // OTO1 Downsell content
      oto1DownPassoLabel: "Dernière chance — offre réduite",
      oto1DownAlertaTexto: "Attendez ! Nous avons quelque chose de spécial pour vous...",
      oto1DownValidacaoTexto: "Nous comprenons que le prix peut peser.",
      oto1DownFomoTexto: (nome: string) => `Et si vous pouviez offrir à ${nome} au moins 1 livre personnalisé — avec lui comme protagoniste — pour moins de la moitié ?`,
      oto1DownCuriosidadeTexto: (nome: string) => `Imaginez ${nome} ouvrant un livre et se voyant LUI-MÊME comme le héros de l'histoire.`,
      oto1DownReframeTitulo: "1 livre. 1 histoire. 100% à lui.",
      oto1DownReframeTexto: "Un livre PDF personnalisé avec votre enfant comme protagoniste. Prêt à imprimer ou à lire sur tablette.",
      oto1DownBeneficios: [
        "Histoire unique générée par IA avec le prénom et le visage de votre enfant",
        "Illustrations personnalisées sur chaque page",
        "PDF en haute résolution — imprimez autant de fois que vous voulez",
        "Votre enfant comme héros de sa propre histoire",
      ] as string[],
      oto1DownDepoimentos: [
        { nome: "Julie M.", texto: "Mon fils n'arrête pas de demander 'son livre'. Chaque soir c'est pareil : 'maman, lis MON livre !'", cidade: "Bordeaux" },
        { nome: "Florence L.", texto: "Je l'ai offert pour son anniversaire. Il a pleuré de joie en voyant son prénom sur la couverture.", cidade: "Toulouse" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1DownModulos: (nome: string) => [
        { emoji: "📖", titulo: "1 Livre PDF Personnalisé", descricao: `Histoire avec ${nome} comme protagoniste`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Illustrations Personnalisées", descricao: "Le visage de votre enfant sur chaque page", valorIndividual: "$6.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1DownValorTotal: "$19.90",
      oto1DownPrecoOriginal: "$13.90",
      oto1DownPrecoFinal: "$9.90",

      // OTO3 content
      oto3PassoLabel: "Dernière offre — Ne réapparaîtra pas",
      oto3AlertaTexto: "Après cette page, le prix revient à la normale.",
      oto3ValidacaoTexto: "Presque fini ! Juste une dernière chose...",
      oto3FomoTexto: (nome: string) => `Vous avez déjà les pages de coloriage. Peut-être le livre et la chanson aussi. Mais et si ${nome} pouvait recevoir de nouvelles activités CHAQUE SEMAINE ? Sans que vous ayez à chercher, penser ou créer quoi que ce soit ?`,
      oto3CuriosidadeTexto: (nome: string) => `Un club entier d'activités personnalisées. Coloriage, découpage, points à relier, mots mêlés — tout avec ${nome} comme thème.`,
      oto3ReframeTitulo: "Une année entière d'activités. Sans écran. Sans répétition.",
      oto3ReframeTexto: (nome: string) => `Ce sont 52 semaines de contenu frais pour garder ${nome} occupé, apprenant et loin des écrans. Vous recevez chaque semaine par e-mail, vous imprimez et c'est prêt. Zéro effort pour vous, un maximum de plaisir pour lui.`,
      oto3Beneficios: (nome: string) => [
        "Nouvelles activités chaque semaine — jamais de répétition",
        `Personnalisées avec le prénom de ${nome}`,
        "Coloriage, découpage, points à relier, mots mêlés et plus",
        "Livré par e-mail — il suffit d'imprimer",
        "Loin des écrans : activité réelle, avec papier et crayons",
        "Idéal pour les voyages, restaurants et week-ends",
      ] as string[],
      oto3Depoimentos: [
        { nome: "Marine C.", texto: "Chaque vendredi mon fils demande : 'maman, mon activité est arrivée ?' C'est devenu notre tradition du week-end. Il adore et j'ai 1 heure de tranquillité.", cidade: "Nantes" },
        { nome: "Caroline B.", texto: "J'ai annulé 2 applis de tablette après avoir rejoint le club. Mon fils préfère les activités imprimées. Et moi je le préfère loin de l'écran.", cidade: "Nice" },
        { nome: "Thérèse R.", texto: "Je les emmène en voyage en voiture. C'est la seule chose qui le garde calme pendant 1 heure sans iPad. Ça vaut déjà l'investissement de toute l'année.", cidade: "Strasbourg" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3Modulos: [
        { emoji: "📋", titulo: "52 Packs d'Activités Hebdomadaires", descricao: "1 année complète de contenu", valorIndividual: "$31.00" },
        { emoji: "🎨", titulo: "Pages de Coloriage Thématiques", descricao: "Fêtes, saisons, thèmes enfantins", valorIndividual: "$8.00" },
        { emoji: "✂️", titulo: "Découpe, Colle et Construis", descricao: "Activités de motricité fine", valorIndividual: "$6.00" },
        { emoji: "🔤", titulo: "Mots Mêlés et Points à Relier", descricao: "Apprentissage déguisé en amusement", valorIndividual: "$5.00" },
        { emoji: "📧", titulo: "Livraison Hebdomadaire par E-mail", descricao: "Recevez, imprimez et c'est prêt", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3ValorTotal: "$50.00",
      oto3PrecoOriginal: "$39.90",
      oto3PrecoFinal: "$19.90",
      oto3PeriodoPagamento: "paiement unique — accès 1 an",

      // OTO3 Downsell content
      oto3DownPassoLabel: "Dernière chance — offre réduite",
      oto3DownAlertaTexto: "Attendez ! Et si c'était la moitié du temps et du prix ?",
      oto3DownValidacaoTexto: "Nous comprenons. L'annuel peut sembler beaucoup.",
      oto3DownFomoTexto: (nome: string) => `Et si vous pouviez tester le Club pendant 6 mois — tout inclus — pour moins de la moitié ? Si ${nome} adore (et il va adorer), vous renouvelez après.`,
      oto3DownCuriosidadeTexto: (nome: string) => `26 semaines d'activités personnalisées. Chaque semaine quelque chose de nouveau à imprimer et jouer avec ${nome}.`,
      oto3DownReframeTitulo: "6 mois d'activités. Sans engagement d'1 an.",
      oto3DownReframeTexto: (nome: string) => `Testez le Club pour une demi-période. Ce sont 26 semaines de contenu frais — coloriage, découpage, points à relier — tout personnalisé avec le prénom de ${nome}. S'il adore, vous décidez de renouveler.`,
      oto3DownBeneficios: (nome: string) => [
        "26 semaines d'activités nouvelles — jamais de répétition",
        `Personnalisées avec le prénom de ${nome}`,
        "Coloriage, découpage, points à relier, mots mêlés et plus",
        "Livré par e-mail — il suffit d'imprimer",
        "Sans engagement long — testez pendant 6 mois",
        "Moitié prix du plan annuel",
      ] as string[],
      oto3DownDepoimentos: [
        { nome: "Marine C.", texto: "Chaque vendredi mon fils demande : 'maman, mon activité est arrivée ?' C'est devenu notre tradition du week-end.", cidade: "Nantes" },
        { nome: "Thérèse R.", texto: "Je les emmène en voyage en voiture. C'est la seule chose qui le garde calme pendant 1 heure sans iPad.", cidade: "Strasbourg" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3DownModulos: [
        { emoji: "📋", titulo: "26 Packs d'Activités Hebdomadaires", descricao: "6 mois de contenu personnalisé", valorIndividual: "$15.50" },
        { emoji: "🎨", titulo: "Pages de Coloriage Thématiques", descricao: "Fêtes et thèmes enfantins", valorIndividual: "$4.00" },
        { emoji: "✂️", titulo: "Découpe, Colle et Construis", descricao: "Activités de motricité fine", valorIndividual: "$3.00" },
        { emoji: "📧", titulo: "Livraison Hebdomadaire par E-mail", descricao: "Recevez, imprimez et c'est prêt", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3DownValorTotal: "$22.50",
      oto3DownPrecoOriginal: "$19.90",
      oto3DownPrecoFinal: "$9.90",
      oto3DownPeriodoPagamento: "paiement unique — accès 6 mois",

      // Alert fallback
      alertaPagamento: "Le lien de paiement sera configuré prochainement.",
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

      // Paramètres extras
      configHeader: "Paramètres",
      configCreditos: "Mes Crédits",
      configCreditosDe: "sur 15",
      configCreditosRenova: (dias: number) => `Se renouvelle dans ${dias} jours`,
      configComprarCreditos: "Acheter 20 crédits supplémentaires — $3.90",
      configMeusFilhos: "Mes Enfants",
      configNovoFilho: "Nouvel enfant",
      configNomePlaceholder: "Nom de l'enfant",
      configCancelar: "Annuler",
      configSalvando: "Enregistrement...",
      configSemPlano: "Aucun plan",
      configAtivo: "Actif",
      configPlanoLabel: "Plan",
      configIdiomaLabel: "Idioma / Language",
      configSuporteItems: ["Nous contacter", "Évaluer l'app", "Conditions et Confidentialité"] as string[],
      configLogout: "Se déconnecter",
      configFooter: "Pour annuler, contactez le support",

      // Login
      loginTitulo: "Accédez à votre compte",
      loginSubtitulo: "Entrez l'email utilisé lors de l'achat",
      loginGoogle: "Se connecter avec Google",
      loginOu: "ou",
      loginEmailLabel: "Email d'achat",
      loginEmailPlaceholder: "email@utilise-pour-achat.com",
      loginEntrar: "Se connecter",
      loginEntrando: "Connexion...",
      loginSemConta: "Pas encore de compte ?",
      loginAssinar: "Abonnez-vous à Colory",
      loginErroSemAssinatura: "Cet email n'a pas d'abonnement actif.",
      loginErroExpirada: "Votre abonnement a expiré. Renouvelez pour continuer.",
      loginErroSessao: "Erreur de création de session. Réessayez.",
      loginErroGeral: "Erreur de connexion. Réessayez.",
      loginErroGoogle: "Erreur de connexion avec Google. Réessayez.",
      loginRenovar: "Renouveler l'abonnement",
      configSelectIdade: "Sélectionner...",
      configIdadeOptions: ["0-2 ans", "3-5 ans", "6-8 ans", "9-12 ans"] as string[],

      // Créer page extras
      criarTransformar: (nome: string) => `Transformez la photo de ${nome} en page de coloriage`,
      criarAdicionarFoto: "Ajouter Photo +",
      criarOtimizando: "Optimisation...",
      criarTrocarFoto: "Changer la photo",
      criarSelecionarEstilo: "Sélectionner un Style",
      criarRestantes: "restants",
      criarPreparando: "Préparation...",
      criarGerarPagina: "Générer la Page",
      criarPlanoExpirou: "Votre plan a expiré",
      criarRenovarDesc: "Renouvelez pour continuer à créer des pages de coloriage",
      criarRenovar: "Renouveler le plan",
      criarSemCreditos: "Vos générations du mois sont épuisées",
      criarSemCreditosDesc: "Achetez des crédits supplémentaires pour continuer",
      criarComprarCreditos: "Acheter 20 crédits — $3.90",
      criarEstilos: [
        { id: "simple", name: "Simple", desc: "Lignes nettes, peu de détails" },
        { id: "detailed", name: "Détaillé", desc: "Avec décor et plus de détails" },
        { id: "minimalist", name: "Minimaliste", desc: "Traits minimaux, artistique" },
        { id: "ink", name: "Art à l'encre", desc: "Traits forts style encre de Chine" },
      ] as { id: string; name: string; desc: string }[],

      // Pages extras
      paginasHeader: "Mes Pages",
      paginasTodas: "Toutes",
      paginasAdicionar: "+ Ajouter",
      paginasVazia: "Vous n'avez encore créé aucune page",
      paginasVaziaCta: "Créer ma première page",
      paginasLivroHistoria: "Livre d'Histoire",
      paginasLivroDesc: "Votre enfant comme héros de l'histoire",
      paginasLivroAcessar: "Personnalisez votre livre maintenant !",
      paginasClubeAtividades: "Club d'Activités",
      paginasClubeDesc: "52 semaines d'activités à imprimer",
      paginasClubeAcessar: "Accès accordé ! Vérifiez votre e-mail",
      paginasDesbloquear: "Débloquer",
      paginasAcessar: "Accéder",

      // BottomNav
      navCriar: "Créer",
      navPaginas: "Mes Pages",

      // Gerando page
      gerandoTexto: (nome: string) => `Création de la page de ${nome}...`,
      gerandoFatos: [
        "Saviez-vous que le coloriage réduit le stress jusqu'à 35 % ?",
        "Le coloriage aide au développement de la motricité fine.",
        "Les enfants qui colorient régulièrement ont une meilleure concentration.",
        "L'activité de coloriage stimule la créativité dès le plus jeune âge.",
        "Les pages de coloriage personnalisées augmentent l'engagement.",
      ] as string[],
      gerandoVaiAdorar: (nome: string) => `${nome} va adorer !`,
      gerandoEstilos: {
        simple: "Livre de coloriage",
        detailed: "Art linéaire",
        family: "Lignes épaisses",
        kids: "Enfants",
      } as Record<string, string>,

      // Resultado page
      resultadoHeader: (nome: string) => `Résultat de ${nome}`,
      resultadoFotoOriginal: "Photo originale",
      resultadoPaginaColorir: "Page de coloriage",
      resultadoSegurarComparar: "Maintenir pour comparer",
      resultadoBaixar: "Télécharger",
      resultadoImprimir: "Imprimer",
      resultadoCompartilhar: "Partager",
      resultadoCriarMais: "Créer plus",
      resultadoGerarNovo: "Générer à nouveau",
      resultadoGerarNovoDesc: "Essayez un style différent",
      resultadoLivroHistoria: (nome: string) => `Livre d'Histoire de ${nome}`,
      resultadoLivroDesc: (nome: string) => `${nome} comme héros de l'histoire`,
      resultadoLivroAcessar: "Personnalisez votre livre maintenant",
      resultadoClubeAtividades: "Club d'Activités",
      resultadoClubeDesc: "52 semaines d'activités",
      resultadoClubeAcessar: "Accès accordé ! Vérifiez votre e-mail",
      resultadoDesbloquear: "Débloquer",
      resultadoAcessar: "Accéder",
      resultadoShareTitle: (nome: string) => `Page de coloriage de ${nome}`,
      resultadoShareText: "Regardez ça ! J'ai créé une page de coloriage personnalisée sur Colory !",
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
      imprimir: "Imprimer",
      emailTitulo: "Ce que vous recevrez par e-mail",
      emailItems: [
        "Votre page de coloriage personnalisée",
        "Lien d'accès à l'application complète",
        "Instructions pour une impression haute qualité",
      ] as string[],
      proximosPassosTitulo: "Prochaines étapes",
      proximosPasso1: "Ouvrez l'e-mail que nous vous avons envoyé",
      proximosPasso2: "Cliquez sur le lien d'accès",
      proximosPasso3: "Commencez à créer des pages de coloriage",
      instalarAppTitulo: "Installez l'appli sur votre téléphone",
      instalarIphone: "iPhone : Appuyez sur Partager → Ajouter à l'écran d'accueil",
      instalarAndroid: "Android : Appuyez sur ⋮ → Installer l'application",
    },

    // Composants
    componentes: {
      // GarantiaBadge
      garantia30Titulo: "Garantie 30 jours",
      garantia30Texto: "Si vous n'aimez pas, nous vous remboursons 100%. Sans questions.",

      // ComoFunciona
      comoFuncionaTitulo: "Comment ça marche ?",
      comoFuncionaPasso1: "Envoyez la photo",
      comoFuncionaPasso2: "Personnalisez votre histoire",
      comoFuncionaPasso3: "Recevez le livre personnalisé",

      // BookPreview
      bookPreviewTitulo: (nome: string) => `Découvrez à quoi pourrait ressembler le livre de ${nome} :`,
      bookPreviewExemplo: (i: number) => `Exemple ${i}`,
      bookPreviewCapa: "Couverture",
      bookPreviewPagina: (n: number) => `Page ${n}`,
      bookPreviewDescricao: (nome: string) => `Le livre de ${nome} ressemblera à ça — avec son prénom dans l'histoire, des illustrations personnalisées et prêt à imprimer.`,

      // TransformacaoVisual
      transformacaoFoto: "Photo de votre enfant",
      transformacaoLivro: "Livre personnalisé",
      transformacaoDescricao: "L'IA utilise la photo pour créer des illustrations avec son visage sur chaque page",

      // FaqAccordion
      faqTitulo: "Questions fréquentes",
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
      arrasteComparar: "Trascina per confrontare",
      seuFilho: "tuo figlio",
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
      estiloTitulo: "Scegli lo stile",
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
      lgpdTermos: "Accetto i",
      lgpdTermosLink: "Termini di utilizzo",
      lgpdE: "e",
      lgpdPrivacidadeLink: "Informativa sulla privacy",
      lgpdAviso: "Accetta i termini per continuare",
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

      // Social proof
      socialProofCount: "2.847",
      socialProofText: "mamme si sono già abbonate",

      // Trust badges
      trustPagamento: "Pagamento sicuro",
      trustGarantia: "Garanzia 7 giorni",
      trustAcesso: "Accesso immediato",

      // Benefits
      beneficiosTitulo: "Entrambi i piani includono:",
      beneficio1: "Fino a 15 pagine da colorare al mese",
      beneficio2: (nome: string) => `Personalizzate con il viso di ${nome}`,
      beneficio3: "Diversi stili artistici tra cui scegliere",
      beneficio4: "PDF ad alta risoluzione — stampa quante volte vuoi",
      beneficio5: "Ricevi via e-mail o direttamente sul cellulare",
      beneficio6: (nome: string) => `Nuove pagine ogni settimana — ${nome} non si annoia mai`,

      // Urgency
      urgenciaTitulo: "Offerta speciale di lancio",
      urgenciaTexto: "Questo prezzo è esclusivo per chi ha appena creato la prima pagina. Uscendo, il prezzo torna alla normalità.",

      // Testimonials
      depoimentosTitulo: "Cosa dicono le altre mamme:",
      depoimentos: [
        { nome: "Giulia R.", cidade: "Roma", texto: "Mio figlio lo ha adorato! Abbiamo già stampato più di 20 pagine. Ogni settimana ne chiede una nuova." },
        { nome: "Francesca M.", cidade: "Milano", texto: "Il miglior investimento che abbia fatto. Molla il tablet appena vede la sua pagina da colorare. Vale ogni centesimo." },
        { nome: "Sara B.", cidade: "Napoli", texto: "La maestra ha chiesto di farne una per tutta la classe dopo aver visto quella di mio figlio. Incredibile!" },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ
      faqTitulo: "Domande frequenti",
      faqs: [
        { p: "Come funziona?", r: "Invii la foto del tuo bambino, scegli lo stile e l'IA genera una pagina da colorare personalizzata in pochi secondi. Ricevila via e-mail o direttamente sul cellulare!" },
        { p: "Quante pagine posso creare?", r: "Fino a 15 pagine da colorare al mese. Abbastanza per averne una nuova quasi ogni giorno!" },
        { p: "Posso cancellare quando voglio?", r: "Sì! Cancella in qualsiasi momento senza complicazioni. E nei primi 7 giorni, rimborsiamo il 100% dell'importo." },
        { p: "Come ricevo le pagine?", r: "Ricevi il PDF via e-mail o lo accedi direttamente dal cellulare. Stampa a casa o in tipografia — copie illimitate." },
      ] as { p: string; r: string }[],

      // Social proof v2
      socialProofV2Count: "+47.000 pagine",
      socialProofV2Text: "create da mamme di tutto il mondo",

      // Hero unlock
      heroTitulo: (artigoDe: string, nome: string) => `La pagina da colorare di ${nome} è pronta!`,
      heroDesbloquear: "Sblocca per scaricare e stampare",

      // CTA micro-commitment
      ctaTestar: (artigo: string, nome: string) => `Prova per 7 giorni. Se ${nome} non lo adora, rimborsiamo ogni centesimo.`,
      ctaCancelar: "Cancella quando vuoi. Senza penali, senza complicazioni.",

      // Emotional hooks
      hookTelaAlto: (artigo: string, nome: string, pronome: string) => `Hai detto che ${nome} passa diverse ore al giorno davanti agli schermi. Immagina che posi il tablet da solo per colorare il proprio volto? Succede ogni settimana con Colory.`,
      hookTelaMedio: (artigoDe: string, nome: string) => `Vuoi ridurre il tempo sullo schermo di ${nome}. Con Colory, le mamme raccontano che i figli chiedono di stampare invece di guardare video.`,
      hookTelaBaixo: (artigoDe: string, nome: string) => `Gestisci già bene il tempo sullo schermo di ${nome}. Colory è l'attività perfetta per riempire quei momenti con creatività.`,
      hookConexao: (artigo: string, nome: string, pronome2: string) => `E la cosa migliore: è un momento tutto per voi due. Senza schermi, senza fretta. Solo tu e ${nome} a colorare.`,

      // Future pacing
      futurePacing: (artigo: string, nome: string, pronome2: string) => `Immagina la scena: stampi la pagina, la metti sul tavolo con le matite colorate. ${nome} vede il proprio volto nel disegno e fa quel gran sorriso. Vi sedete insieme e per 30 minuti non esiste telefono, non esiste fretta. Solo tu e ${nome}, a colorare.`,
      momentosSemPreco: "Momenti così non hanno prezzo ✨",

      // Testimonials v2 title
      depoimentosV2Titulo: "Cosa dicono le mamme",
      verificado: "Verificato",
      depoimentosV2: [
        { nome: "Giulia R.", cidade: "Roma", texto: "Mio figlio di 4 anni ha colorato per 40 minuti senza fermarsi. QUARANTA MINUTI. Senza nessuno schermo. Non l'avevo mai visto così concentrato." },
        { nome: "Francesca M.", cidade: "Milano", texto: "L'ho fatto direttamente dal cellulare in 2 minuti. Il PDF è arrivato via email e l'ho stampato a casa. Più facile che ordinare cibo a domicilio." },
        { nome: "Sara B.", cidade: "Napoli", texto: "Compravo un libro da colorare ogni mese. 6€ ciascuno e si annoiava in fretta perché non era personalizzato. Con Colory non si annoia mai perché è il SUO volto." },
        { nome: "Valentina P.", cidade: "Torino", texto: "La nonna ha pianto quando ha visto il nipotino come personaggio della pagina. È diventato un regalo di compleanno. Vale ogni centesimo." },
      ] as { nome: string; cidade: string; texto: string }[],

      // FAQ title (replacing hardcoded)
      faqTituloV2: "Domande frequenti",

      // Exit-intent popup
      exitIntentTitulo: "Aspetta! Abbiamo un regalo per te",
      exitIntentSubtitulo: "Usa il coupon qui sotto e ottieni il 10% di sconto sul piano annuale",
      exitIntentCupom: "GIFT10",
      exitIntentCopiar: "Copia coupon",
      exitIntentCopiado: "Copiato!",
      exitIntentCta: "Approfitta dello sconto",
      exitIntentFechar: "No, grazie",
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

      // OtoLayout framework text
      continueLendo: "↓ Continua a leggere ↓",
      oQueVoceRecebe: "Cosa riceverai:",
      valorTotalLabel: "Valore totale:",
      precoNormal: "Prezzo normale",
      hojeApenas: "Solo oggi:",
      scarcityTitle: "Questa offerta esiste solo su questa pagina",
      scarcityText: "Uscendo, non avrai più accesso a questo prezzo.",

      // OTO1 content
      oto1PassoLabel: "Passo 1 di 2 — Non chiudere questa pagina",
      oto1AlertaTexto: "Il tuo acquisto NON è ancora finalizzato...",
      oto1ValidacaoTexto: "Il tuo abbonamento Colory è stato confermato!",
      oto1FomoTexto: (nome: string) => `Hai appena fatto un passo incredibile per ${nome}. Ma siamo onesti: lasciare questa pagina ora potrebbe farti perdere l'opportunità di trasformare la sua esperienza in qualcosa di molto più grande.`,
      oto1CuriosidadeTexto: (nome: string) => `E se ${nome} potesse essere l'EROE della propria storia? Immagina che apra un libro e veda il suo volto su ogni pagina.`,
      oto1ReframeTitulo: "Più di un libro. Un ricordo che custodirà per sempre.",
      oto1ReframeTexto: "I libri personalizzati non sono solo intrattenimento. Sono strumenti che sviluppano l'amore per la lettura, rafforzano l'identità e creano momenti di connessione tra genitore e figlio che non hanno prezzo.",
      oto1Beneficios: (nome: string) => [
        `${nome} come protagonista — nome e volto su ogni pagina`,
        "Stimola l'amore per la lettura fin da piccolo",
        "Momento di connessione: leggete insieme ogni sera",
        "Stampa quante volte vuoi — è tuo per sempre",
        "Regalo perfetto per nonni, zii e padrini",
      ] as string[],
      oto1Depoimentos: [
        { nome: "Camilla R.", texto: "L'ho comprato pensando fosse una sciocchezza. Mio figlio di 4 anni ha imparato a memoria tutta la storia. Racconta a tutti che 'ha un libro suo'. Ho già fatto 3 copie da regalare.", cidade: "Roma" },
        { nome: "Patrizia S.", texto: "La nonna ha pianto quando ha visto il nipotino come personaggio. È diventato il regalo di Natale più speciale che abbiamo mai fatto. Vale ogni centesimo.", cidade: "Milano" },
        { nome: "Amanda K.", texto: "Ogni sera mia figlia chiede: 'mamma, leggi il MIO libro'. Si sente così speciale. Il miglior investimento che abbia mai fatto per lei.", cidade: "Firenze" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1Modulos: (nome: string) => [
        { emoji: "📖", titulo: "2 Libri PDF Personalizzati", descricao: `Storie uniche con ${nome} come protagonista`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Illustrazioni con IA", descricao: "Il volto del tuo bambino su ogni pagina della storia", valorIndividual: "$8.00" },
        { emoji: "🖨️", titulo: "Alta Risoluzione per la Stampa", descricao: "PDF pronto da stampare a casa o in tipografia", valorIndividual: "$4.00" },
        { emoji: "🎁", titulo: "Bonus: Copertina Personalizzata", descricao: `Il nome di ${nome} in copertina come autore ed eroe`, valorIndividual: "$3.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1ValorTotal: "$28.90",
      oto1PrecoOriginal: "$19.90",
      oto1PrecoFinal: "$13.90",
      oto1Temas: ["Dinosauri", "Principesse", "Avventura", "Unicorni", "Spazio", "Pirati", "Animali", "Supereroi"] as string[],
      oto1TemasLabel: "Temi disponibili",
      oto1Faqs: [
        { pergunta: "Come personalizzo il libro?", resposta: "Dopo aver confermato il pagamento, invii una foto del tuo bambino e scegli il tema. La nostra IA crea le illustrazioni con il suo volto su ogni pagina. Semplice così." },
        { pergunta: "Quanto tempo ci vuole per riceverlo?", resposta: "Entro 24 ore dal pagamento, ricevi il PDF personalizzato via e-mail, pronto per la stampa." },
        { pergunta: "Posso stamparlo quante volte voglio?", resposta: "Sì! Il file PDF è tuo per sempre. Stampa a casa, in tipografia o leggi sul tablet — senza limiti di copie." },
      ] as { pergunta: string; resposta: string }[],

      // OTO1 Downsell content
      oto1DownPassoLabel: "Ultima occasione — offerta ridotta",
      oto1DownAlertaTexto: "Aspetta! Abbiamo qualcosa di speciale per te...",
      oto1DownValidacaoTexto: "Capiamo che il prezzo possa sembrare alto.",
      oto1DownFomoTexto: (nome: string) => `E se potessi regalare a ${nome} almeno 1 libro personalizzato — con lui come protagonista — a meno della metà?`,
      oto1DownCuriosidadeTexto: (nome: string) => `Immagina ${nome} che apre un libro e si vede LUI STESSO come l'eroe della storia.`,
      oto1DownReframeTitulo: "1 libro. 1 storia. 100% suo.",
      oto1DownReframeTexto: "Un libro PDF personalizzato con il tuo bambino come protagonista. Pronto da stampare o leggere sul tablet.",
      oto1DownBeneficios: [
        "Storia unica generata dall'IA con il nome e il volto del tuo bambino",
        "Illustrazioni personalizzate su ogni pagina",
        "PDF in alta risoluzione — stampa quante volte vuoi",
        "Il tuo bambino come eroe della propria storia",
      ] as string[],
      oto1DownDepoimentos: [
        { nome: "Giuliana M.", texto: "Mio figlio non smette di chiedere di leggere 'il suo libro'. Ogni sera è uguale: 'mamma, leggi il MIO libro!'", cidade: "Napoli" },
        { nome: "Fernanda L.", texto: "L'ho regalato per il compleanno. Ha pianto di gioia quando ha visto il suo nome sulla copertina.", cidade: "Torino" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto1DownModulos: (nome: string) => [
        { emoji: "📖", titulo: "1 Libro PDF Personalizzato", descricao: `Storia con ${nome} come protagonista`, valorIndividual: "$13.90" },
        { emoji: "🎨", titulo: "Illustrazioni Personalizzate", descricao: "Il volto del tuo bambino su ogni pagina", valorIndividual: "$6.00" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto1DownValorTotal: "$19.90",
      oto1DownPrecoOriginal: "$13.90",
      oto1DownPrecoFinal: "$9.90",

      // OTO3 content
      oto3PassoLabel: "Ultima offerta — Non riapparirà",
      oto3AlertaTexto: "Dopo questa pagina, il prezzo torna alla normalità.",
      oto3ValidacaoTexto: "Ci siamo quasi! Solo un'ultima cosa...",
      oto3FomoTexto: (nome: string) => `Hai già le pagine da colorare. Forse hai già il libro e la canzone. Ma e se ${nome} potesse ricevere attività nuove OGNI SETTIMANA? Senza che tu debba pensare, cercare o creare nulla?`,
      oto3CuriosidadeTexto: (nome: string) => `Un club intero di attività personalizzate. Colorare, ritagliare, unire i puntini, parole crociate — tutto con ${nome} come tema.`,
      oto3ReframeTitulo: "Un anno intero di attività. Senza schermi. Senza ripetizioni.",
      oto3ReframeTexto: (nome: string) => `Sono 52 settimane di contenuti freschi per tenere ${nome} impegnato, imparando e lontano dagli schermi. Ricevi ogni settimana via e-mail, stampi e sei pronto. Zero sforzo per te, massimo divertimento per lui.`,
      oto3Beneficios: (nome: string) => [
        "Attività nuove ogni settimana — mai ripetitive",
        `Personalizzate con il nome di ${nome}`,
        "Colorare, ritagliare, unire i puntini, parole crociate e altro",
        "Consegnate via e-mail — basta stampare",
        "Lontano dagli schermi: attività reali, con carta e matite",
        "Ideale per viaggi, ristoranti e fine settimana",
      ] as string[],
      oto3Depoimentos: [
        { nome: "Marina C.", texto: "Ogni venerdì mio figlio chiede: 'mamma, è arrivata la mia attività?'. È diventata la nostra tradizione del fine settimana. Lui adora e io ho 1 ora di pace.", cidade: "Bologna" },
        { nome: "Carolina B.", texto: "Ho cancellato 2 app del tablet dopo aver aderito al club. Mio figlio preferisce le attività stampate. E io lo preferisco lontano dallo schermo.", cidade: "Palermo" },
        { nome: "Teresa R.", texto: "Le porto nei viaggi in macchina. È l'unica cosa che lo tiene tranquillo per 1 ora senza iPad. Ha già ripagato l'investimento di tutto l'anno.", cidade: "Genova" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3Modulos: [
        { emoji: "📋", titulo: "52 Pacchetti di Attività Settimanali", descricao: "1 anno completo di contenuti", valorIndividual: "$31.00" },
        { emoji: "🎨", titulo: "Pagine da Colorare Tematiche", descricao: "Festività, stagioni, temi per bambini", valorIndividual: "$8.00" },
        { emoji: "✂️", titulo: "Ritaglia, Incolla e Costruisci", descricao: "Attività di motricità fine", valorIndividual: "$6.00" },
        { emoji: "🔤", titulo: "Parole Crociate e Unisci i Puntini", descricao: "Apprendimento travestito da divertimento", valorIndividual: "$5.00" },
        { emoji: "📧", titulo: "Consegna Settimanale via E-mail", descricao: "Ricevi, stampa e via", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3ValorTotal: "$50.00",
      oto3PrecoOriginal: "$39.90",
      oto3PrecoFinal: "$19.90",
      oto3PeriodoPagamento: "pagamento unico — accesso per 1 anno",

      // OTO3 Downsell content
      oto3DownPassoLabel: "Ultima occasione — offerta ridotta",
      oto3DownAlertaTexto: "Aspetta! E se fosse la metà del tempo e del prezzo?",
      oto3DownValidacaoTexto: "Capiamo. L'annuale può sembrare tanto.",
      oto3DownFomoTexto: (nome: string) => `E se potessi provare il Club per 6 mesi — tutto incluso — a meno della metà? Se ${nome} lo adora (e lo adorerà), rinnovi dopo.`,
      oto3DownCuriosidadeTexto: (nome: string) => `26 settimane di attività personalizzate. Ogni settimana qualcosa di nuovo da stampare e giocare con ${nome}.`,
      oto3DownReframeTitulo: "6 mesi di attività. Senza impegno di 1 anno.",
      oto3DownReframeTexto: (nome: string) => `Prova il Club per metà periodo. Sono 26 settimane di contenuti freschi — colorare, ritagliare, unire i puntini — tutto personalizzato con il nome di ${nome}. Se lo ama, decidi tu se rinnovare.`,
      oto3DownBeneficios: (nome: string) => [
        "26 settimane di attività nuove — mai ripetitive",
        `Personalizzate con il nome di ${nome}`,
        "Colorare, ritagliare, unire i puntini, parole crociate e altro",
        "Consegnate via e-mail — basta stampare",
        "Senza impegno lungo — prova per 6 mesi",
        "Metà del prezzo del piano annuale",
      ] as string[],
      oto3DownDepoimentos: [
        { nome: "Marina C.", texto: "Ogni venerdì mio figlio chiede: 'mamma, è arrivata la mia attività?'. È diventata la nostra tradizione del fine settimana.", cidade: "Bologna" },
        { nome: "Teresa R.", texto: "Le porto nei viaggi in macchina. È l'unica cosa che lo tiene tranquillo per 1 ora senza iPad.", cidade: "Genova" },
      ] as { nome: string; texto: string; cidade: string }[],
      oto3DownModulos: [
        { emoji: "📋", titulo: "26 Pacchetti di Attività Settimanali", descricao: "6 mesi di contenuti personalizzati", valorIndividual: "$15.50" },
        { emoji: "🎨", titulo: "Pagine da Colorare Tematiche", descricao: "Festività e temi per bambini", valorIndividual: "$4.00" },
        { emoji: "✂️", titulo: "Ritaglia, Incolla e Costruisci", descricao: "Attività di motricità fine", valorIndividual: "$3.00" },
        { emoji: "📧", titulo: "Consegna Settimanale via E-mail", descricao: "Ricevi, stampa e via", valorIndividual: "$0" },
      ] as { emoji: string; titulo: string; descricao: string; valorIndividual: string }[],
      oto3DownValorTotal: "$22.50",
      oto3DownPrecoOriginal: "$19.90",
      oto3DownPrecoFinal: "$9.90",
      oto3DownPeriodoPagamento: "pagamento unico — accesso per 6 mesi",

      // Alert fallback
      alertaPagamento: "Il link di pagamento sarà configurato a breve.",
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

      // Impostazioni extras
      configHeader: "Impostazioni",
      configCreditos: "I Miei Crediti",
      configCreditosDe: "di 15",
      configCreditosRenova: (dias: number) => `Si rinnova tra ${dias} giorni`,
      configComprarCreditos: "Acquista 20 crediti extra — $3.90",
      configMeusFilhos: "I Miei Figli",
      configNovoFilho: "Nuovo figlio",
      configNomePlaceholder: "Nome del figlio",
      configCancelar: "Annulla",
      configSalvando: "Salvataggio...",
      configSemPlano: "Nessun piano",
      configAtivo: "Attivo",
      configPlanoLabel: "Piano",
      configIdiomaLabel: "Idioma / Language",
      configSuporteItems: ["Contattaci", "Valuta l'app", "Termini e Privacy"] as string[],
      configLogout: "Esci",
      configFooter: "Per annullare, contatta il supporto",

      // Login
      loginTitulo: "Accedi al tuo account",
      loginSubtitulo: "Inserisci l'email usato per l'acquisto",
      loginGoogle: "Accedi con Google",
      loginOu: "o",
      loginEmailLabel: "Email di acquisto",
      loginEmailPlaceholder: "email@usato-per-acquisto.com",
      loginEntrar: "Accedi",
      loginEntrando: "Accesso in corso...",
      loginSemConta: "Non hai ancora un account?",
      loginAssinar: "Abbonati a Colory",
      loginErroSemAssinatura: "Questa email non ha un abbonamento attivo.",
      loginErroExpirada: "Il tuo abbonamento è scaduto. Rinnova per continuare.",
      loginErroSessao: "Errore nella creazione della sessione. Riprova.",
      loginErroGeral: "Errore di accesso. Riprova.",
      loginErroGoogle: "Errore di connessione con Google. Riprova.",
      loginRenovar: "Rinnova abbonamento",
      configSelectIdade: "Seleziona...",
      configIdadeOptions: ["0-2 anni", "3-5 anni", "6-8 anni", "9-12 anni"] as string[],

      // Crea page extras
      criarTransformar: (nome: string) => `Trasforma la foto di ${nome} in una pagina da colorare`,
      criarAdicionarFoto: "Aggiungi Foto +",
      criarOtimizando: "Ottimizzazione...",
      criarTrocarFoto: "Cambia foto",
      criarSelecionarEstilo: "Seleziona Stile",
      criarRestantes: "rimanenti",
      criarPreparando: "Preparazione...",
      criarGerarPagina: "Genera Pagina",
      criarPlanoExpirou: "Il tuo piano è scaduto",
      criarRenovarDesc: "Rinnova per continuare a creare pagine da colorare",
      criarRenovar: "Rinnova piano",
      criarSemCreditos: "Le tue generazioni di questo mese sono esaurite",
      criarSemCreditosDesc: "Acquista crediti extra per continuare a creare",
      criarComprarCreditos: "Acquista 20 crediti — $3.90",
      criarEstilos: [
        { id: "simple", name: "Semplice", desc: "Linee pulite, pochi dettagli" },
        { id: "detailed", name: "Dettagliato", desc: "Con scenario e più dettagli" },
        { id: "minimalist", name: "Minimalista", desc: "Tratti minimi, artistico" },
        { id: "ink", name: "Arte a inchiostro", desc: "Tratti forti stile inchiostro" },
      ] as { id: string; name: string; desc: string }[],

      // Pagine extras
      paginasHeader: "Le Mie Pagine",
      paginasTodas: "Tutte",
      paginasAdicionar: "+ Aggiungi",
      paginasVazia: "Non hai ancora creato nessuna pagina",
      paginasVaziaCta: "Crea la mia prima pagina",
      paginasLivroHistoria: "Libro di Storie",
      paginasLivroDesc: "Il tuo bambino come eroe della storia",
      paginasLivroAcessar: "Personalizza il tuo libro ora!",
      paginasClubeAtividades: "Club di Attività",
      paginasClubeDesc: "52 settimane di attività da stampare",
      paginasClubeAcessar: "Accesso concesso! Controlla la tua email",
      paginasDesbloquear: "Sblocca",
      paginasAcessar: "Accedi",

      // BottomNav
      navCriar: "Crea",
      navPaginas: "Le Mie Pagine",

      // Gerando page
      gerandoTexto: (nome: string) => `Creazione della pagina di ${nome}...`,
      gerandoFatos: [
        "Sapevi che colorare riduce lo stress fino al 35%?",
        "Colorare aiuta nello sviluppo della motricità fine.",
        "I bambini che colorano regolarmente hanno una migliore concentrazione.",
        "L'attività di colorare stimola la creatività fin dalla tenera età.",
        "Le pagine da colorare personalizzate aumentano il coinvolgimento.",
      ] as string[],
      gerandoVaiAdorar: (nome: string) => `${nome} lo adorerà!`,
      gerandoEstilos: {
        simple: "Libro da colorare",
        detailed: "Arte lineare",
        family: "Linee spesse",
        kids: "Bambini",
      } as Record<string, string>,

      // Resultado page
      resultadoHeader: (nome: string) => `Risultato di ${nome}`,
      resultadoFotoOriginal: "Foto originale",
      resultadoPaginaColorir: "Pagina da colorare",
      resultadoSegurarComparar: "Tieni premuto per confrontare",
      resultadoBaixar: "Scarica",
      resultadoImprimir: "Stampa",
      resultadoCompartilhar: "Condividi",
      resultadoCriarMais: "Crea di più",
      resultadoGerarNovo: "Genera di nuovo",
      resultadoGerarNovoDesc: "Prova uno stile diverso",
      resultadoLivroHistoria: (nome: string) => `Libro di Storie di ${nome}`,
      resultadoLivroDesc: (nome: string) => `${nome} come eroe della storia`,
      resultadoLivroAcessar: "Personalizza il tuo libro ora",
      resultadoClubeAtividades: "Club di Attività",
      resultadoClubeDesc: "52 settimane di attività",
      resultadoClubeAcessar: "Accesso concesso! Controlla la tua email",
      resultadoDesbloquear: "Sblocca",
      resultadoAcessar: "Accedi",
      resultadoShareTitle: (nome: string) => `Pagina da colorare di ${nome}`,
      resultadoShareText: "Guarda che bello! Ho creato una pagina da colorare personalizzata su Colory!",
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
      imprimir: "Stampa",
      emailTitulo: "Cosa riceverai via e-mail",
      emailItems: [
        "La tua pagina da colorare personalizzata",
        "Link di accesso all'app completa",
        "Istruzioni per stampare in alta qualità",
      ] as string[],
      proximosPassosTitulo: "Prossimi passi",
      proximosPasso1: "Apri l'e-mail che ti abbiamo inviato",
      proximosPasso2: "Clicca sul link di accesso",
      proximosPasso3: "Inizia a creare pagine da colorare",
      instalarAppTitulo: "Installa l'app sul cellulare",
      instalarIphone: "iPhone: Tocca Condividi → Aggiungi a schermata Home",
      instalarAndroid: "Android: Tocca ⋮ → Installa app",
    },

    // Componenti
    componentes: {
      // GarantiaBadge
      garantia30Titulo: "Garanzia 30 giorni",
      garantia30Texto: "Se non ti piace, ti rimborsiamo il 100%. Senza domande.",

      // ComoFunciona
      comoFuncionaTitulo: "Come funziona?",
      comoFuncionaPasso1: "Invia la foto",
      comoFuncionaPasso2: "Personalizza la tua storia",
      comoFuncionaPasso3: "Ricevi il libro personalizzato",

      // BookPreview
      bookPreviewTitulo: (nome: string) => `Guarda come potrebbe essere il libro di ${nome}:`,
      bookPreviewExemplo: (i: number) => `Esempio ${i}`,
      bookPreviewCapa: "Copertina",
      bookPreviewPagina: (n: number) => `Pagina ${n}`,
      bookPreviewDescricao: (nome: string) => `Il libro di ${nome} sarà così — con il suo nome nella storia, illustrazioni personalizzate e pronto da stampare.`,

      // TransformacaoVisual
      transformacaoFoto: "Foto del tuo bambino",
      transformacaoLivro: "Libro personalizzato",
      transformacaoDescricao: "L'IA usa la foto per creare illustrazioni con il suo volto su ogni pagina",

      // FaqAccordion
      faqTitulo: "Domande frequenti",
    },
  },
} as const;

export type Locale = keyof typeof translations;

const LOCALE_KEY = "colory-locale";

let currentLocale: Locale = "pt-BR";

// Auto-init from ?lang= param (any page) or localStorage
if (typeof window !== "undefined") {
  const urlLang = new URLSearchParams(window.location.search).get("lang");
  if (urlLang && urlLang in translations) {
    currentLocale = urlLang as Locale;
    localStorage.setItem(LOCALE_KEY, urlLang);
  } else {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (saved && saved in translations) {
      currentLocale = saved as Locale;
    }
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
