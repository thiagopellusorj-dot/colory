# PRD — Colory
## Product Requirements Document

> Versão 1.0 — 31/03/2026
> Mercado: Brasil (MVP) → Espanha + Itália (fase 2)

---

## 1. VISÃO DO PRODUTO

Colory é um web app mobile-first que transforma fotos de crianças em páginas de colorir personalizadas usando IA. Voltado para mães brasileiras de crianças de 0-12 anos que buscam atividades criativas, sem tela e memoráveis para os filhos.

**Problema que resolve:** Mãe quer uma atividade personalizada e significativa pro filho — não uma página genérica de colorir da internet. Quer ver o rosto do próprio filho virar arte.

**Diferencial vs Colorify:** Foco exclusivo em crianças + funil de upsells digitais complementares (livro de história, música, clube de atividades) + identidade visual mágica e acolhedora.

---

## 2. PÚBLICO-ALVO

**Persona principal:** Camila, 32 anos, São Paulo, filho de 5 anos
- Compra produtos digitais para filhos sem hesitar se perceber valor
- Ativa no Instagram e WhatsApp
- Sensível a produtos personalizados com o nome/foto do filho
- Decisão de compra emocional, não racional

**Faixa etária dos filhos:** 0-12 anos (sweet spot: 3-8 anos)

---

## 3. FUNIL DE AQUISIÇÃO

### 3.1 Landing Page (/)
- Headline principal: "Transforme a foto do seu filho em uma página de colorir personalizada — em segundos"
- Subheadline: "Mais de 12.847 mães já criaram memórias únicas com seus filhos"
- CTA: "Criar agora — é grátis"
- Sem menu, sem distração, uma ação só

### 3.2 Quiz (/quiz)
4 telas sequenciais com animação suave entre elas:

**Tela 1 — Gênero**
- Pergunta: "Vamos criar algo especial. Seu filho é..."
- Opções: 👦 Menino / 👧 Menina
- Clique já avança (sem botão confirmar)

**Tela 2 — Idade**
- Pergunta dinâmica: "Quantos anos tem ele/ela?"
- Opções: 🍼 0-2 / 🎨 3-5 / 📚 6-8 / ⭐ 9-12
- Feedback após clique: "Essa é a fase mais criativa!"

**Tela 3 — Nome**
- Campo de texto: "Qual o nome dele/dela?"
- A partir daqui TUDO usa o nome digitado
- Feedback: "Que nome lindo! Preparando algo especial para o [João]..."

**Tela 4 — Objetivo**
- Pergunta: "O que você mais quer proporcionar para o [João]?"
- Opções: 🎨 Momentos criativos / 📵 Atividade sem tela / 🎁 Uma lembrança especial / 🏫 Aprendizado divertido
- Resposta define variação do headline no paywall

Indicador de progresso: 4 pontos (● ○ ○ ○)

### 3.3 Upload (/upload)
- Headline: "Agora envie uma foto do [João]"
- Área drag & drop + botão selecionar
- Preview da foto após seleção
- Ao confirmar: inicia chamada fal.ai em background
- Avança imediatamente para /processando

### 3.4 Processando (/processando)
- Foto do filho em destaque com badge do estilo
- 4 etapas animadas sequencialmente:
  - ✓ Foto do [João] recebida
  - ✓ Analisando detalhes do rosto
  - ⟳ Criando os traços para colorir...
  - ⟳ Finalizando sua página...
- Card inferior com fato curioso sobre colorir
- Quando fal.ai terminar → redireciona automaticamente

### 3.5 Captura (/contato)
- Headline: "A página do [João] está quase pronta!"
- Campos: WhatsApp (com máscara BR) + Email
- Botão: "Ver o resultado do [João] agora"
- Checkbox LGPD obrigatório
- Salva no Supabase antes de avançar

### 3.6 Paywall (/assinar)
- Mostra preview BORRADO da imagem gerada
- Headline personalizado por objetivo (4 variações):
  - "sem tela": "Troque 1 hora de celular por algo que ele vai colorir e guardar pra sempre."
  - "lembrança": "Essa é a memória que vai ficar na geladeira da vovó por anos."
  - "criativo": "Imprima, sente com ele e criem juntos. Esse momento não tem preço."
  - "aprendizado": "Coordenação, criatividade e foco — colorindo o próprio rosto."
- Planos:
  - Anual R$99,90/ano ← destacado como "Mais popular"
  - Semanal R$14,90/semana (comunicado como R$29,90/mês)
- Âncora: "Sem o plano: R$514/ano"
- Order bump: +R$9,90 Pack de Datas Comemorativas
- Garantia 30 dias
- Review 5 estrelas
- Botão: "Desbloquear a página do [João] agora"
- Redireciona para checkout do Perfect Pay

### 3.7 OTO 1 — Livro Personalizado (/oto1)
- Timer 10 minutos no topo
- Produto: 2 livros PDF de história com filho como protagonista
- Preço: ~~R$97~~ R$67
- Downsell: 1 livro por R$47
- Link direto para checkout Perfect Pay do produto

### 3.8 OTO 2 — Música Personalizada (/oto2)
- Mesma estrutura
- Produto: Música com nome e características do filho
- Preço: R$37

### 3.9 OTO 3 — Clube de Atividades (/oto3)
- Produto: Acesso anual ao clube de atividades semanais
- Preço: R$97/ano
- Comunicado como pagamento único

### 3.10 Obrigado (/obrigado)
- "Pronto, [nome da mãe]! A página do [João] está liberada."
- Botão download da imagem
- "Enviamos também no seu WhatsApp e email"
- Resumo do que foi comprado

---

## 4. APP PÓS-PAGAMENTO

### 4.1 Acesso
- Usuário recebe email com link mágico de acesso (Supabase Auth)
- Sem senha — só email magic link
- Sessão persiste por 30 dias

### 4.2 Tela CRIAR (/criar)
**Card de upload:**
- Área dashed com ícone de lápis roxo
- Texto: "Transforme a foto do [João] em uma página de colorir"
- Botão roxo: "Adicionar Foto +"

**Seleção de Estilo:**
- Título "Selecionar Estilo" com "Ver tudo >"
- Pills: ✦ Simples (selecionado) / ✦ Detalhado / ✦ Artístico
- Cards horizontais com preview visual de cada estilo
- Estilos bloqueados com 🔒 e efeito blur (OTOs)
- Botão gerar fixo no bottom

**Bottom Navigation:**
- ✦ Criar (ativo)
- 🎨 Minhas Páginas
- ⚙️ Configurações

### 4.3 Tela PROCESSANDO
- Foto enviada em destaque
- Percentual grande animado
- Barra de progresso roxa
- Texto: "Gerando a página do [João]..."
- Card inferior com fato curioso rotativo
- Bottom nav desabilitado durante geração

### 4.4 Tela RESULTADO (/resultado)
- Imagem gerada em alta resolução
- Botões: ⬇ Baixar / ↗ Compartilhar WhatsApp
- Watermark discreta "Criado no Colory" na imagem compartilhada
- Cards de features:
  - ✅ "Gerar de novo" — disponível
  - 🔒 "📖 Livro de História do [João] • R$67" → link Perfect Pay
  - 🔒 "🎵 Música Personalizada • R$37" → link Perfect Pay
- Timer "Oferta especial por mais 14:32" nos cards bloqueados

### 4.5 Tela MINHAS PÁGINAS (/paginas)
- Filtro: Todas / [nome filho 1] / [nome filho 2] / + Adicionar
- Grid 2 colunas de criações anteriores
- Cada card: thumbnail + nome filho + estilo + data + ícone download
- Empty state com CTA para primeira geração
- Card bloqueado do Clube de Atividades no final da lista
- FAB roxo "+" para nova geração

### 4.6 Tela CONFIGURAÇÕES (/configuracoes)
- Card do usuário: avatar + nome + email + badge plano ativo
- Seção "Meus Filhos": lista editável + botão adicionar
- Seção "Suporte": Fale conosco / Avaliar / Termos
- Versão do app em texto pequeno e cinza claro
- SEM botão de cancelamento visível
- Para cancelar: direcionado para WhatsApp de suporte

---

## 5. INTEGRAÇÕES

### Perfect Pay (Pagamentos)
- Webhook recebe confirmação de pagamento
- Cria usuário no Supabase automaticamente
- Envia email com link de acesso via Supabase Auth
- Produtos cadastrados: Semanal, Anual, OTO1, OTO2, OTO3

### fal.ai (Geração de Imagem)
- Modelo: fal-ai/imageutils/lineart
- Compressão: max 1200px / 2MB antes do envio
- Timeout: 60 segundos
- Fallback: "Sua página está sendo finalizada — enviamos no seu email"

### Supabase
- Auth: magic link por email
- Database: todas as tabelas do schema
- Storage: bucket público para imagens geradas
- RLS: usuário só acessa seus próprios dados

---

## 6. REGRAS DE NEGÓCIO

1. Usuário sem pagamento confirmado não acessa /criar
2. Imagem gerada expira do storage após 7 dias se não baixada
3. Plano semanal: limite de 30 gerações/dia (anti-abuso)
4. Plano anual: sem limite de gerações
5. OTOs disponíveis apenas na janela de 10 minutos pós-compra
6. WhatsApp capturado vai para sequência automática D+3 com oferta do Vídeo R$47

---

## 7. MÉTRICAS DE SUCESSO (MVP)

| Métrica | Meta 30 dias |
|---|---|
| Taxa de conclusão do quiz | >70% |
| Taxa de upload após quiz | >60% |
| Taxa de captura (email+WhatsApp) | >80% |
| Taxa de conversão no paywall | >4% |
| Take rate OTO 1 | >15% |
| Take rate OTO 2 | >12% |
| AOV D0 | >R$105 |
| Churn semanal | <40% |

---

## 8. FORA DO ESCOPO (MVP)

- App nativo iOS/Android
- Multiple languages (só PT-BR no MVP)
- Sistema de afiliados
- Blog/SEO
- Notificações push
- Pagamento com boleto
- Geração de vídeo
- Impressão física
