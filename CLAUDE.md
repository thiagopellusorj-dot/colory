# CLAUDE.md — Colory

> Arquivo de contexto persistente. Leia isso no início de cada sessão antes de qualquer coisa.
> Última atualização: 31/03/2026

---

## 🎯 O QUE É O COLORY

App web (mobile-first) que transforma fotos de crianças em páginas de colorir personalizadas usando IA. Voltado para mães brasileiras com filhos de 0-12 anos. Monetizado via assinatura + upsells digitais.

**Tagline:** "Transforme a foto do [nome do filho] em uma página de colorir em segundos"

---

## 🏗️ STACK TÉCNICO

- **Framework:** Next.js 14 com App Router
- **Estilização:** Tailwind CSS
- **Banco de dados + Auth + Storage:** Supabase
- **Geração de imagem:** fal.ai (modelo: fal-ai/imageutils/lineart)
- **Pagamento:** Perfect Pay (webhook para liberar acesso)
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
│   │   ├── processando/page.tsx
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
│   ├── supabase.ts
│   ├── fal.ts
│   └── perfectpay.ts
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
/ (landing page)
  ↓
/quiz (4 perguntas: gênero → idade → nome → objetivo)
  ↓
/upload (foto + geração em background no fal.ai)
  ↓
/processando (animação enquanto IA processa)
  ↓
/contato (captura WhatsApp + email — ANTES de ver resultado)
  ↓
/assinar (paywall — pico de curiosidade)
  Perfect Pay checkout externo
  ↓ webhook confirma pagamento
/oto1 → /oto2 → /oto3
  ↓
/obrigado (email com link de acesso)
```

### APP PÓS-PAGAMENTO
```
/criar (home — upload + estilo)
  ↓
/processando
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
| Plano Semanal | R$29,90/mês (comunicado como R$14,90/sem) | Assinatura |
| Plano Anual | R$99,90/ano | Assinatura |
| Order Bump | +R$9,90 | One-time |
| OTO 1 — Livro Personalizado | R$67 (downsell R$47) | One-time |
| OTO 2 — Música Personalizada | R$37 | One-time |
| OTO 3 — Clube Anual | R$97 | One-time |
| Vídeo Personalizado | R$47 | WhatsApp D+3 |

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

### fal.ai
- Modelo: `fal-ai/imageutils/lineart`
- Auth: Header `Authorization: Key ${FAL_KEY}`
- Input: imagem em base64
- Output: PNG com traço de colorir
- Timeout: 60 segundos
- Comprime imagem para max 1200px / 2MB antes de enviar

### Perfect Pay
- Webhook POST para `/api/webhook`
- Validar assinatura do webhook antes de processar
- Ao confirmar pagamento: criar usuário no Supabase + enviar email
- Produtos cadastrados no Perfect Pay com IDs específicos

### Supabase
- Auth: email magic link (sem senha)
- Storage: bucket `imagens` para fotos geradas
- RLS habilitado em todas as tabelas

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

# fal.ai
FAL_KEY=

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

- [ ] Setup inicial do projeto
- [ ] Schema do Supabase criado
- [ ] Variáveis de ambiente configuradas

*(atualizar após cada sessão)*

---

## 🔄 EM PROGRESSO

*(preencher no início de cada sessão)*

---

## 🐛 ERROS CONHECIDOS E SOLUÇÕES

*(preencher conforme aparecerem)*

---

## 📝 DECISÕES TÉCNICAS

- **Zustand vs Context API:** Zustand escolhido pela persistência mais fácil com localStorage
- **Perfect Pay vs Stripe:** Perfect Pay escolhido por ter PIX nativo e ser mais comum no BR
- **fal.ai vs Replicate:** fal.ai escolhido pelo cold start mais rápido (<2s)
- **App Router vs Pages Router:** App Router — é o padrão do Next.js 14

---

## 🚀 COMO INICIAR UMA SESSÃO

1. Leia este arquivo completo
2. Verifique a seção "Em Progresso"
3. Verifique o TASKS.md para a próxima task
4. Confirme: "Li o CLAUDE.md. Vou trabalhar em [task]. Vou começar por [primeiro passo]."
5. Ao terminar: atualize as seções "O que já foi feito" e "Em progresso"
