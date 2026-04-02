# CLAUDE.md — Colory

> Arquivo de contexto persistente. Leia isso no início de cada sessão antes de qualquer coisa.
> Última atualização: 01/04/2026

---

## 🎯 O QUE É O COLORY

App web (mobile-first) que transforma fotos de crianças em páginas de colorir personalizadas usando IA. Voltado para mães brasileiras com filhos de 0-12 anos. Monetizado via assinatura + upsells digitais.

**Tagline:** "Transforme a foto do [nome do filho] em uma página de colorir em segundos"

---

## 🏗️ STACK TÉCNICO

- **Framework:** Next.js 16 com App Router
- **Estilização:** Tailwind CSS v4
- **Banco de dados + Auth + Storage:** Supabase (SSR com @supabase/ssr)
- **Geração de imagem (funil):** Gemini 3.1 Flash (image-to-image, ~5-15s, $0.07/geração)
- **Geração de imagem (app interno):** Kie.ai Nano Banana 2 (reservado para futuro, maior qualidade)
- **Pagamento:** Perfect Pay (webhook para liberar acesso)
- **Analytics:** Posthog (posthog-js)
- **Deploy:** Vercel
- **OS de desenvolvimento:** Windows (C:\Users\Pichau\Desktop\Programas em Desenvolvimento\Colory)
- **IDE:** Antigravity + Claude Code

---

## 📁 ARQUITETURA DE PASTAS

```
colory/
├── app/
│   ├── (funil)/              # Rotas do funil de aquisição
│   │   ├── page.tsx          # Landing page
│   │   ├── quiz/page.tsx     # Quiz 4 perguntas
│   │   ├── upload/page.tsx   # Upload da foto
│   │   ├── processando/page.tsx
│   │   ├── contato/page.tsx  # Captura email + WhatsApp
│   │   ├── assinar/page.tsx  # Paywall
│   │   ├── oto1/page.tsx     # OTO Livro R$67
│   │   ├── oto2/page.tsx     # OTO Música R$37
│   │   ├── oto3/page.tsx     # OTO Clube R$97
│   │   └── obrigado/page.tsx
│   ├── (app)/                # Rotas do app pós-pagamento
│   │   ├── criar/page.tsx    # Home do app
│   │   ├── gerando/page.tsx  # Processando (renomeado para evitar conflito com funil)
│   │   ├── resultado/page.tsx
│   │   ├── paginas/page.tsx  # Galeria de criações
│   │   └── configuracoes/page.tsx
│   ├── api/
│   │   ├── gerar/route.ts    # Chama fal.ai
│   │   ├── webhook/route.ts  # Recebe Perfect Pay webhook
│   │   └── auth/route.ts
│   └── layout.tsx
├── components/
│   ├── ui/                   # Componentes base
│   ├── funil/                # Componentes do funil
│   └── app/                  # Componentes do app
├── lib/
│   ├── supabase.ts           # Client browser (@supabase/ssr)
│   ├── supabase-server.ts    # Client server (Server Components + API routes)
│   ├── fal.ts
│   └── perfectpay.ts
├── middleware.ts              # Supabase session refresh
├── store/
│   └── funilStore.ts         # Zustand — estado global do funil
├── Telas Geradas Figma/      # Referência visual
├── CLAUDE.md
├── PRD.md
├── TASKS.md
└── .env.local
```

---

## 🗄️ SCHEMA DO BANCO (Supabase)

```sql
-- Leads capturados no funil
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_filho TEXT NOT NULL,
  genero TEXT CHECK (genero IN ('menino', 'menina')),
  idade TEXT,
  objetivo TEXT,
  whatsapp TEXT,
  email TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Usuários com acesso pago
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  email TEXT UNIQUE NOT NULL,
  plano TEXT CHECK (plano IN ('semanal', 'anual')),
  status TEXT DEFAULT 'ativo',
  acesso_expira_em TIMESTAMPTZ,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Filhos cadastrados
CREATE TABLE filhos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  nome TEXT NOT NULL,
  genero TEXT,
  idade TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Imagens geradas
CREATE TABLE imagens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  filho_id UUID REFERENCES filhos(id),
  url_original TEXT,
  url_gerada TEXT,
  estilo TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs de geração de imagem (Kie.ai)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  url_original TEXT,
  url_gerada TEXT,
  nome_filho TEXT,
  criado_em TIMESTAMPTZ DEFAULT NOW(),
  completado_em TIMESTAMPTZ
);

-- OTOs comprados
CREATE TABLE compras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID REFERENCES usuarios(id),
  produto TEXT CHECK (produto IN ('livro', 'musica', 'clube')),
  valor DECIMAL,
  criado_em TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🌊 FLUXO COMPLETO

### FUNIL DE AQUISIÇÃO
```
/ (landing page — colagem antes/depois, CTA "Criar agora — é grátis")
  ↓
/quiz
  P1: Gênero (👦/👧 — clique avança direto)
  P2: Idade (🍼 0-2 / 🎨 3-5 / 📚 6-8 / ⭐ 9-12 — clique avança direto)
  P3: Nome (campo texto + botão continuar)
  → Tela transição: "Preparando algo especial para o [nome]..." (2s, barra loading roxa)
  P4: Objetivo (4 opções — clique avança direto)
  ↓
/upload (foto enviada → dispara Kie.ai em background)
  ↓
/processando (animação 12-15s enquanto geração roda em background)
  ↓
/contato (captura WhatsApp + email — geração continua em background)
  ↓
/resultado (mostra imagem pronta + botão "Baixar" fake)
  → Se imagem não pronta: loading com fatos curiosos
  → Clicou em "Baixar" → vai para /assinar
  ↓
/assinar (paywall)
  → Headline muda baseado na P4 (4 variações)
  → Anual R$99,90 destacado / Semanal R$14,90
  → Sem order bump (captura depois via WhatsApp)
  → Perfect Pay checkout externo
  ↓ webhook confirma pagamento
/oto1 → /oto3 (OTO2 pulado por enquanto)
  ↓
/obrigado (email com magic link de acesso)
```

### APP PÓS-PAGAMENTO
```
/criar (home — upload + estilo)
  ↓
/gerando (processando — renomeado para evitar conflito de rota)
  ↓
/resultado (download + compartilhar + OTOs bloqueados)
  ↓
/paginas (galeria de criações)
/configuracoes (conta + filhos)
```

---

## 💰 PRODUTOS E PREÇOS

| Produto | Preço | Tipo |
|---|---|---|
| Plano Semanal | R$14,90/sem (comunicado como R$29,90/mês) | Assinatura |
| Plano Anual | R$99,90/ano (destacado como "Mais popular") | Assinatura |
| OTO 1 — Livro Personalizado | R$67 (downsell R$47) | One-time |
| OTO 2 — Música Personalizada | R$37 | One-time |
| OTO 3 — Clube Anual | R$97 | One-time |
| Vídeo Personalizado | R$47 | WhatsApp D+3 |

**Sem order bump no paywall** — captura depois via WhatsApp.
**Sem trial grátis** — preço direto com garantia 30 dias.

---

## 🎨 IDENTIDADE VISUAL

- **Cor primária:** Roxo suave (#9333EA / purple-600 Tailwind)
- **Cor secundária:** Lavanda (#F5F3FF / purple-50)
- **Fundo:** Branco com gradiente roxo sutil no topo
- **Fonte:** Inter
- **Border radius:** rounded-2xl para cards, rounded-full para botões
- **Estilo:** Mobile-first, mágico, acolhedor, focado em criança
- **NÃO usar:** gradientes pesados, sombras excessivas, cores quentes

---

## 🔗 INTEGRAÇÕES EXTERNAS

### Kie.ai (Geração de Imagem)
- Modelo: `nano-banana-2` (image-to-image)
- Endpoint: `POST https://api.kie.ai/api/v1/jobs/createTask`
- Auth: Header `Authorization: Bearer ${KIE_API_KEY}`
- Custo: $0.020 por imagem
- Tempo médio: ~105 segundos
- Comprime imagem para max 1200px / 2MB antes de enviar
- Prompt padrão: "Transform this photo into a clean black and white coloring book page for children. White background, black outlines only. Preserve the child's face clearly."

**Estratégia de geração (webhook):**
1. `/api/gerar` dispara job na Kie.ai com `callBackUrl` → retorna `taskId`
2. `taskId` salvo na tabela `jobs` do Supabase (status: 'pending')
3. Kie.ai envia POST para `/api/webhook/kie` quando terminar
4. Webhook atualiza job no Supabase (status: 'completed', url da imagem)
5. Frontend faz polling leve no Supabase (a cada 3s) para saber quando ficou pronto

**Fluxo do usuário (geração em background):**
- Upload foto → /processando (animação 12-15s) → /contato (WhatsApp + email)
- → /resultado (mostra imagem pronta + botão "Baixar" fake) → /assinar (paywall)
- Geração roda em background durante processando + contato (~105s)
- Se não estiver pronta ao chegar em /resultado, mostra loading com fatos curiosos

**Fallback se timeout (>120s):**
"Sua página está sendo finalizada com carinho ✨ Enviaremos no seu WhatsApp em alguns minutos."

**Webhook verification:**
- Headers: `X-Webhook-Timestamp`, `X-Webhook-Signature`
- HMAC-SHA256: `taskId + "." + timestamp` com `webhookHmacKey`

### Perfect Pay
- Webhook POST para `/api/webhook`
- Validar assinatura do webhook antes de processar
- Ao confirmar pagamento: criar usuário no Supabase + enviar email
- Produtos cadastrados no Perfect Pay com IDs específicos

### Supabase
- Auth: email magic link (sem senha)
- Sessão do usuário dura 30 dias após login
- Storage: bucket `imagens` para fotos geradas
- RLS habilitado em todas as tabelas
- SSR: usa @supabase/ssr com middleware para refresh de sessão

### Posthog (Analytics)
- Instalar `posthog-js`
- Eventos do funil:
  - `landing_page_viewed`
  - `quiz_started`
  - `quiz_step_completed` (com step e resposta)
  - `upload_started`
  - `upload_completed`
  - `contato_submitted`
  - `paywall_viewed`
  - `paywall_plan_selected` (com plano escolhido)
  - `purchase_initiated`

---

## 📱 ESTADO GLOBAL (Zustand)

```typescript
interface FunilState {
  genero: 'menino' | 'menina' | null
  nome_filho: string
  idade: string
  objetivo: string
  url_foto_original: string
  url_foto_gerada: string
  lead_id: string
  whatsapp: string
  email: string
  otos_aceitos: string[]
}
```

Estado salvo também no `localStorage` para sobreviver a reloads.

---

## ⚙️ VARIÁVEIS DE AMBIENTE

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Kie.ai
KIE_API_KEY=

# Perfect Pay
PERFECTPAY_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📏 REGRAS DE CÓDIGO

1. TypeScript strict em todos os arquivos
2. Componentes em inglês (ex: `UploadCard.tsx`)
3. Textos/copy em português nos arquivos de componente
4. Usar `async/await`, nunca `.then().catch()`
5. Sempre tratar erro com mensagem amigável em português
6. Loading state em todos os botões de ação
7. Imagem comprimida antes de qualquer upload (max 1200px, 2MB)
8. Nunca hardcodar chaves de API — sempre usar variáveis de ambiente
9. `maxDuration = 60` em todas as API routes que chamam fal.ai
10. Zustand para estado global, não Context API

---

## ✅ O QUE JÁ FOI FEITO

- [x] Setup inicial do projeto (Next.js 16 + Tailwind v4 + TypeScript)
- [x] Estrutura de pastas completa (funil + app + API routes)
- [x] Schema do Supabase criado (5 tabelas)
- [x] Supabase SSR configurado (client + server + middleware)
- [x] Zustand store com persist (localStorage)
- [x] Variáveis de ambiente configuradas
- [x] Git init + push para GitHub
- [x] Fase 2 — Quiz + Landing Page
- [x] Fase 3 — Upload + IA (Gemini 3.1 Flash)
- [x] Fase 4 — Paywall (headline personalizada + blur preview)
- [x] Fase 5 — OTOs (OTO1 com BookPreview + garantia + FAQ, OTO3, Obrigado)
- [x] Deploy Vercel (https://colory-eight.vercel.app)
- [x] Fase 6 — App pós-pagamento (criar, gerando, resultado, paginas, configuracoes, bottom nav)
- [x] Fase 7 — Webhook Perfect Pay + Sistema de Créditos + Auth (login + Google)
- [ ] Fase 8 — Domínio custom + ajustes finais

*(atualizado: 02/04/2026)*

---

## 🔄 EM PROGRESSO

Próximo: Fase 8 — Deploy final + testes

---

## 📋 PRÓXIMOS PASSOS

### Pra lançar (esta semana)
1. **Domínio custom** — registrar (colory.app ou colory.com.br) e apontar pra Vercel
2. **Teste de compra real** — fazer compra teste no Perfect Pay e verificar fluxo completo: webhook → usuario criado → magic link → login → app
3. **Meta Pixel** — instalar quando for rodar tráfego pago

### Pra melhorar conversão
4. **Imagem OG personalizada** — criar imagem 1200x630 pra preview em WhatsApp/Instagram
5. **WhatsApp follow-up D+3** — automação oferecendo vídeo personalizado (R$47)
6. **Testar os 4 estilos** — gerar com cada estilo e validar qualidade

### Pra escalar
7. **Testar RLS** — verificar que usuario não vê dados de outro
8. **Monitoramento Posthog** — alertas se conversão cair
9. **Backup Supabase** — habilitar backups automáticos

### Técnico
10. **Reativar guards do funil** — guards da /obrigado e outras páginas estão comentados
11. **Testes E2E** — Playwright pro fluxo completo
12. **Cache de imagens** — otimizar carregamento

---

## 🔗 WEBHOOK PERFECT PAY — STATUS

**URL configurada:** `https://colory-eight.vercel.app/api/webhook/perfectpay`
**Token:** configurado no .env.local e Vercel
**Produtos:** Colory + Imagine Book + Clube de Atividades selecionados
**Eventos:** Todos os eventos ativados
**Status:** Configurado mas NUNCA TESTADO com compra real

### O que o webhook faz (por produto):
| Produto | Código | Ação |
|---|---|---|
| Plano Anual | PPLQQP2CV | Cria usuario + 15 créditos + magic link por email |
| Plano Mensal | PPLQQP2D2 | Cria usuario + 15 créditos + magic link por email |
| Crédito Extra | PPLQQP2H7 | Soma +20 créditos no usuario existente |
| OTO1 Livro | PPLQQP2HA | Registra compra na tabela `compras` |
| OTO3 Clube | PPLQQP2HF | Registra compra na tabela `compras` |

### Fluxo esperado:
```
Perfect Pay envia POST → /api/webhook/perfectpay
  → Valida token (ed70f63b...)
  → Checa sale_status_enum === 1 (aprovado)
  → Identifica produto pelo product.code
  → Executa ação correspondente
  → Retorna 200
```

### ⚠️ PENDENTE DE VALIDAÇÃO:
- Nunca recebeu um webhook real do Perfect Pay
- Magic link pode não estar sendo enviado corretamente (depende de config do Supabase Auth)
- Precisa de uma compra teste pra validar todo o fluxo

---

## 🐛 ERROS CONHECIDOS E SOLUÇÕES

- **Conflito de rota /processando:** `(funil)/processando` e `(app)/processando` resolviam para mesmo path. Solução: renomear app para `/gerando`.

---

## 📝 DECISÕES TÉCNICAS

- **Zustand vs Context API:** Zustand escolhido pela persistência mais fácil com localStorage
- **Perfect Pay vs Stripe:** Perfect Pay escolhido por ter PIX nativo e ser mais comum no BR
- **Kie.ai vs fal.ai:** Kie.ai (Nano Banana 2) escolhido pela qualidade superior em image-to-image. fal.ai lineart dava 404. Custo $0.02/img, ~105s geração via webhook.
- **App Router vs Pages Router:** App Router — é o padrão do Next.js 16
- **@supabase/ssr vs @supabase/supabase-js puro:** SSR escolhido para melhor integração com Server Components e middleware
- **Gemini 3.1 Flash vs Kie.ai:** Gemini escolhido para funil (rápido, ~5-15s, $0.07/geração). Kie.ai reservado para app interno (maior qualidade, ~105s)
- **OTO2 pulado:** Fluxo atual é OTO1 → OTO3. OTO2 (música) existe mas não está no fluxo
- **OtoLayout reutilizável:** Componente com 10 blocos de direct response, props opcionais garantiaSection e faqItems
- **BookPreview:** Imagens reais extraídas de PDFs de livros de exemplo (10 JPGs em public/images/books/)

---

## 📝 DECISÕES DO FUNIL

### Landing Page
- Colagem de fotos de crianças (antes/depois colorindo) na parte superior
- Sem menu de navegação — uma ação só
- CTA roxo "Criar agora — é grátis" → vai direto para /quiz
- NÃO pular a landing page — ela qualifica o tráfego antes do quiz

### Quiz
- Barra de progresso no topo crescendo a cada tela (sem número)
- Animação slide da direita ao avançar
- SEM botão de voltar — funil é de uma via
- Feedback visual 1 segundo após cada clique antes de avançar
- Micro-validação após cada resposta (texto editável via admin futuramente)
- Tela de transição entre P3 e P4: "Preparando algo especial para o [nome]..." (2s, barra loading roxa)

### Paywall
- Curiosity gap: imagem borrada + desbloqueio
- Headline muda baseado na resposta da P4 (4 variações)
- Anual R$99,90 destacado como "Mais popular" com borda roxa
- Semanal R$14,90/sem com menos destaque
- Âncora: "Sem o plano: R$514/ano"
- Garantia 30 dias com ícone cadeado
- Review 5 estrelas fictício
- Sem order bump (captura depois via WhatsApp)
- Sem trial grátis — preço direto com garantia

### Autenticação
- Magic link para acesso ao app (não senha)
- Sessão do usuário dura 30 dias após login

### Tracking (Posthog)
- Disparar eventos em cada etapa do funil
- Ver lista completa na seção Integrações > Posthog

---

## 🚀 COMO INICIAR UMA SESSÃO

1. Leia este arquivo completo
2. Verifique a seção "Em Progresso"
3. Verifique o TASKS.md para a próxima task
4. Confirme: "Li o CLAUDE.md. Vou trabalhar em [task]. Vou começar por [primeiro passo]."
5. Ao terminar: atualize as seções "O que já foi feito" e "Em progresso"
