# Erros e Aprendizados — Colory

> Consulte este arquivo antes de implementar qualquer mudança. Evite repetir os mesmos erros.
> Atualizado automaticamente a cada sessão.

---

## Supabase

### `.single()` causa crash silencioso
- **Erro:** `.single()` dá erro quando retorna 0 rows, e o catch engole o erro
- **Fix:** Sempre usar `.maybeSingle()` em queries que podem retornar 0 ou 1 row
- **Onde:** Todas as queries de busca por email/id em API routes

### `generateLink()` NÃO envia email
- **Erro:** `supabase.auth.admin.generateLink({ type: "magiclink" })` gera a URL mas não envia email
- **Fix:** Usar `supabase.auth.admin.inviteUserByEmail()` que envia de verdade. Manter `generateLink` como fallback
- **Onde:** Webhook ao criar usuario

### `verifyOtp()` pode retornar sem session
- **Erro:** `verifyOtp()` retorna `error: null` mas `data.session` pode ser null
- **Fix:** Sempre checar `data.session` antes de redirecionar, não apenas `!error`
- **Onde:** `/auth/callback`

### PKCE flow não funciona cross-device nem server-side
- **Erro:** Magic links gerados pelo servidor (webhook) ou abertos em outro device falham porque o `code_verifier` só existe no browser que iniciou o fluxo
- **Fix:** Usar `flowType: "implicit"` no Supabase client. Isso usa `token_hash` no link em vez de `code`, que funciona em qualquer device
- **Fix 2:** NÃO enviar magic link pelo webhook (server-side). Só criar o user no Auth. Login via tela /login
- **Onde:** `lib/supabase.ts` + webhook + `/auth/callback`

### inviteUserByEmail falha se user já existe
- **Erro:** `inviteUserByEmail` retorna erro se o email já está registrado no Auth
- **Fix:** Usar `createUser` com `email_confirm: true` que é idempotente
- **Onde:** Webhook

### RLS bloqueia service_role em alguns cenários
- **Erro:** Policies com `FOR ALL USING (true)` podem não cobrir todos os roles
- **Fix:** Testar insert/select com service_role key após habilitar RLS
- **Onde:** Qualquer tabela com RLS habilitado

### CHECK constraints bloqueiam inserts
- **Erro:** Tabela `usuarios` tinha constraint `plano IN ('semanal', 'anual')` mas tentamos inserir 'mensal'
- **Fix:** Sempre verificar constraints existentes antes de inserir novos valores. ALTER TABLE pra atualizar
- **Onde:** Tabela usuarios

---

## Perfect Pay Webhook

### Status codes são diferentes do esperado
- **Erro:** Assumimos que 1=aprovado, mas na doc oficial 1=pending (boleto), 2=approved
- **Fix:** Sempre consultar documentação oficial. STATUS_APROVADO = [2] apenas
- **Referência:** https://help.perfectpay.com.br/article/597-integracao-via-webhook-com-a-perfect-pay

### Product codes podem não bater
- **Erro:** Env vars com `\n` no final causam mismatch (`"PPLQQP2D2\n" !== "PPLQQP2D2"`)
- **Fix:** Sempre usar `.trim()` ao ler env vars. Usar `printf` em vez de `echo` no Vercel CLI
- **Onde:** PRODUCT_CODES no webhook

### Webhook precisa de idempotência
- **Erro:** Perfect Pay retries webhooks. Sem idempotência, processa a mesma venda 2x
- **Fix:** Tabela `webhook_log` com `sale_code UNIQUE`. Checar antes de processar
- **Onde:** Início do handler do webhook

### Product identification precisa de fallback por nome
- **Erro:** O `product.code` enviado pelo Perfect Pay pode ser diferente do esperado
- **Fix:** Match por código exato + fallback por nome do produto/plano
- **Onde:** Função `identificarProduto()`

---

## Vercel / Next.js

### Env vars com newline quebram comparações
- **Erro:** `echo "value" | vercel env add` adiciona `\n` no final
- **Fix:** Usar `printf "value"` ou `.trim()` no código
- **Onde:** Todas as env vars setadas via CLI

### Body size limit de 4.5MB em API routes
- **Erro:** Fotos de celular em base64 podem exceder 4.5MB
- **Fix:** Comprimir mais agressivamente no client (1024px, 1.5MB, quality 0.7)
- **Onde:** `lib/compress.ts` + `/api/gerar`

### Cold start lento (~2-3s)
- **Erro:** Primeira visita após inatividade demora por cold start serverless
- **Fix:** UptimeRobot pingando a cada 5min mantém quente
- **Onde:** Configuração externa

### Module-level env vars podem ser undefined
- **Erro:** `const X = process.env.Y` fora da função pode ser undefined em serverless
- **Fix:** Mover pra dentro da função handler
- **Onde:** Webhook PRODUCT_CODES

---

## Auth / Login

### Magic link loop
- **Erro:** Callback verificava OTP mas não checava se session foi criada → middleware redirecionava pra /login → loop
- **Fix:** Checar `data.session` no callback. Redirect com `?error=xxx` quando falha
- **Onde:** `/auth/callback`

### Email de compra ≠ email de login
- **Erro:** Usuario compra com email X, tenta logar com Google usando email Y → não encontra plano
- **Fix:** Tela de login diz "Use o mesmo email da compra". Verificar email na tabela antes de enviar magic link
- **Onde:** `/login` + `/api/verificar-email`

---

## Billing / Créditos

### Plano mensal sem data de expiração
- **Erro:** Insert de novo usuario mensal tinha `acesso_expira_em: null` → nunca expirava
- **Fix:** Sempre setar expiração: 30 dias pra mensal, 365 pra anual
- **Onde:** Webhook, tanto no insert quanto no update

### Race condition no decrement de créditos
- **Erro:** 2 requests simultâneos lêem mesmo valor → ambos decrementam pra mesmo número
- **Fix:** Usar RPC/função Postgres pra decrement atômico (`creditos_restantes - 1 WHERE > 0`)
- **Onde:** `/api/gerar`

### Renovação reseta créditos prematuramente
- **Erro:** Se renova no dia 29, perde créditos restantes do ciclo atual
- **Fix:** Só resetar créditos se ciclo expirou. Se não expirou, manter créditos atuais
- **Onde:** Webhook, lógica de update de usuario existente

---

## UI / UX

### CTA precisa estar visível sem scroll (above the fold)
- **Erro:** Imagens grandes na landing page empurravam o botão pra baixo
- **Fix:** Imagens menores (aspect 4/3), slider abaixo do CTA
- **Onde:** Landing page

### suppressHydrationWarning pra extensões de browser
- **Erro:** Extensões (Grammarly etc) injetam atributos no DOM → hydration error
- **Fix:** `suppressHydrationWarning` no `<html>` e `<body>`
- **Onde:** `app/layout.tsx`

### sessionStorage não existe no server
- **Erro:** `typeof window !== "undefined" ? sessionStorage.get(...)` durante render causa hydration mismatch
- **Fix:** Sempre ler sessionStorage dentro de `useEffect`, nunca no render
- **Onde:** Páginas do app que usam sessionStorage

---

*Última atualização: 03/04/2026*
