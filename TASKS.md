# TASKS.md — Colory
## Checklist Get Shit Done

> Atualizar após cada sessão. Uma sessão = uma fase.
> Data de início: 31/03/2026

---

## COMO USAR

1. Abra o Claude Code na pasta do projeto
2. Cole: "Leia o CLAUDE.md e o TASKS.md. Me diga o que está em progresso e vamos continuar."
3. Trabalhe na fase atual até todas as tasks estarem ✅
4. Atualize este arquivo antes de fechar a sessão

---

## STATUS GERAL

```
Fase 1 — Setup          [ ] Em andamento
Fase 2 — Quiz + Funil   [ ] Não iniciado
Fase 3 — Upload + IA    [ ] Não iniciado
Fase 4 — Paywall        [ ] Não iniciado
Fase 5 — OTOs           [ ] Não iniciado
Fase 6 — App            [ ] Não iniciado
Fase 7 — Admin + Webhook[ ] Não iniciado
Fase 8 — Deploy         [ ] Não iniciado
```

---

## FASE 1 — SETUP DO PROJETO

**Objetivo:** Projeto Next.js rodando localmente com Supabase conectado.

**Prompt de início para o Claude Code:**
```
Leia o CLAUDE.md. Vamos iniciar o projeto Colory do zero.
Crie um projeto Next.js 14 com App Router, Tailwind CSS e TypeScript.
Configure a estrutura de pastas exatamente como descrita no CLAUDE.md.
Configure o Supabase com as variáveis de ambiente do .env.local.
Crie o schema do banco conforme o CLAUDE.md.
No final rode `npm run dev` e confirme que está funcionando.
```

**Tasks:**
- [ ] `npx create-next-app@14 colory --typescript --tailwind --app`
- [ ] Criar estrutura de pastas conforme CLAUDE.md
- [ ] Instalar dependências: `@supabase/supabase-js zustand`
- [ ] Configurar `.env.local` com todas as variáveis
- [ ] Criar `lib/supabase.ts`
- [ ] Criar `store/funilStore.ts` com Zustand
- [ ] Executar SQL do schema no Supabase
- [ ] Testar conexão com Supabase
- [ ] `npm run dev` rodando sem erros
- [ ] Push inicial para GitHub

---

## FASE 2 — QUIZ + LANDING PAGE

**Objetivo:** Funil de quiz completo funcionando com estado persistido.

**Prompt de início:**
```
Leia o CLAUDE.md e o PRD.md seção 3.1 e 3.2.
Temos a pasta "Telas Geradas Figma" com referência visual.
Implemente a Landing Page e o Quiz completo (4 telas).
Use as telas do Figma como referência visual exata.
O estado do quiz deve ser salvo no Zustand E no localStorage.
Identidade visual: roxo suave (#9333EA), mobile-first, Inter font.
```

**Tasks:**
- [ ] Landing page (/) com headline, subheadline e CTA
- [ ] Rota /quiz criada
- [ ] Tela P1 — Gênero (👦/👧, clique avança)
- [ ] Tela P2 — Idade (4 opções com ícone, feedback animado)
- [ ] Tela P3 — Nome (campo texto, feedback personalizado)
- [ ] Tela P4 — Objetivo (4 opções, salva para personalizar paywall)
- [ ] Indicador de progresso (4 pontos)
- [ ] Animação de transição entre telas
- [ ] Estado salvo no Zustand + localStorage
- [ ] Redirect para /upload ao terminar quiz
- [ ] Testar fluxo completo no mobile (Chrome DevTools)

---

## FASE 3 — UPLOAD + GERAÇÃO IA

**Objetivo:** Foto enviada, processada pelo fal.ai, resultado salvo no Supabase Storage.

**Prompt de início:**
```
Leia o CLAUDE.md seção integrações fal.ai.
Implemente as telas /upload e /processando.
A foto deve ser comprimida para max 1200px / 2MB antes do envio.
A chamada para fal.ai deve acontecer na API route /api/gerar com maxDuration = 60.
A tela /processando mostra animação enquanto aguarda o resultado.
Ao concluir, salva a URL da imagem gerada no Zustand e redireciona para /contato.
```

**Tasks:**
- [ ] Tela /upload com drag & drop + botão selecionar
- [ ] Compressão de imagem no cliente (max 1200px, 2MB)
- [ ] Preview da foto selecionada
- [ ] API route `/api/gerar` com maxDuration = 60
- [ ] Integração com fal.ai (modelo lineart)
- [ ] Tela /processando com animação de 4 etapas
- [ ] Fato curioso rotativo no card inferior
- [ ] Tratamento de timeout (>60s → mensagem amigável)
- [ ] Imagem gerada salva no Supabase Storage
- [ ] URL da imagem gerada salva no Zustand
- [ ] Redirect automático para /contato quando concluir
- [ ] Testar com foto real de rosto

---

## FASE 4 — CAPTURA + PAYWALL

**Objetivo:** Email e WhatsApp capturados, paywall exibindo preview borrado, redirect para Perfect Pay.

**Prompt de início:**
```
Leia o CLAUDE.md e PRD.md seções 3.5 e 3.6.
Implemente /contato e /assinar.
Em /contato: captura WhatsApp + email, salva no Supabase tabela leads.
Em /assinar: mostra preview borrado da imagem gerada.
O headline do paywall deve mudar baseado na resposta da P4 do quiz (4 variações).
O botão de compra redireciona para o link do Perfect Pay (configurável via variável de ambiente).
```

**Tasks:**
- [ ] Tela /contato com campos WhatsApp (máscara BR) + email
- [ ] Checkbox LGPD obrigatório
- [ ] Salvar lead no Supabase antes de avançar
- [ ] Tela /assinar com preview borrado da imagem
- [ ] Headline personalizado por objetivo (4 variações)
- [ ] Planos: Anual destacado + Semanal
- [ ] Âncora de preço ("Sem o plano: R$514/ano")
- [ ] Order bump checkbox (+R$9,90)
- [ ] Garantia 30 dias
- [ ] Review 5 estrelas
- [ ] Botão → link Perfect Pay (via env var)
- [ ] Guard: sem estado do quiz → redirect para /

---

## FASE 5 — OTOs + OBRIGADO

**Objetivo:** Sequência de OTOs funcionando com timer e redirect correto.

**Prompt de início:**
```
Implemente as telas /oto1, /oto2, /oto3 e /obrigado.
Cada OTO tem timer de 10 minutos que persiste entre as telas (não reinicia).
Botão SIM → link Perfect Pay do produto específico.
Botão NÃO → próximo OTO.
/obrigado mostra resumo da compra e botão de download da imagem.
```

**Tasks:**
- [ ] Tela /oto1 (Livro R$67 + downsell R$47)
- [ ] Tela /oto2 (Música R$37)
- [ ] Tela /oto3 (Clube R$97)
- [ ] Timer de 10 minutos persistindo entre OTOs
- [ ] Botão SIM → Perfect Pay do produto
- [ ] Botão NÃO → próximo OTO
- [ ] Tela /obrigado com download da imagem
- [ ] Email automático via Supabase Auth (magic link)
- [ ] Testar fluxo completo OTO1 → OTO2 → OTO3 → Obrigado

---

## FASE 6 — APP PÓS-PAGAMENTO

**Objetivo:** App completo acessível após login com magic link.

**Prompt de início:**
```
Leia o PRD.md seção 4.
Implemente as telas do app: /criar, /processando, /resultado, /paginas, /configuracoes.
Use as telas do Figma como referência visual (pasta Telas Geradas Figma).
Features bloqueadas mostram card com 🔒 e link para Perfect Pay do produto.
Bottom navigation entre as 3 telas principais.
Guard: usuário sem sessão Supabase ativa → redirect para landing page.
```

**Tasks:**
- [ ] Guard de autenticação (middleware Next.js)
- [ ] Tela /criar (upload + seleção de estilo + botão gerar)
- [ ] Estilos bloqueados com 🔒 e blur
- [ ] Bottom navigation (Criar / Minhas Páginas / Configurações)
- [ ] Tela /processando (reutilizar componente da fase 3)
- [ ] Tela /resultado (download + compartilhar + OTOs bloqueados)
- [ ] Watermark discreta nas imagens compartilhadas
- [ ] Timer "Oferta especial" nos cards de OTO
- [ ] Tela /paginas (grid de criações + empty state)
- [ ] Filtro por filho em /paginas
- [ ] Card bloqueado Clube no final de /paginas
- [ ] FAB "+" em /paginas
- [ ] Tela /configuracoes (sem botão cancelar visível)
- [ ] Gerenciar filhos em /configuracoes
- [ ] Testar fluxo completo no mobile

---

## FASE 7 — WEBHOOK + AUTOMAÇÕES

**Objetivo:** Perfect Pay liberando acesso automaticamente pós-pagamento.

**Prompt de início:**
```
Implemente a API route /api/webhook para receber confirmações do Perfect Pay.
Ao confirmar pagamento:
1. Validar assinatura do webhook
2. Criar usuário na tabela usuarios do Supabase
3. Enviar magic link por email via Supabase Auth
4. Registrar compras de OTOs na tabela compras
Testar com webhook de teste do Perfect Pay.
```

**Tasks:**
- [ ] API route `/api/webhook` criada
- [ ] Validação de assinatura do Perfect Pay
- [ ] Criação de usuário no Supabase pós-pagamento
- [ ] Envio de magic link por email
- [ ] Registro de OTOs comprados
- [ ] Teste com Perfect Pay sandbox
- [ ] Log de erros do webhook no Supabase

---

## FASE 8 — DEPLOY + TESTES FINAIS

**Objetivo:** App em produção na Vercel, testado no iPhone real.

**Prompt de início:**
```
Prepare o projeto para deploy na Vercel.
Configure as variáveis de ambiente na Vercel.
Faça o deploy e teste o fluxo completo:
1. Landing → Quiz → Upload → Processando → Contato → Paywall
2. Webhook Perfect Pay → Email → Login → App
3. Testar no iPhone real (não simulador)
```

**Tasks:**
- [ ] `vercel.json` configurado com maxDuration
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] Deploy executado sem erros
- [ ] Domínio customizado configurado (se tiver)
- [ ] Testar upload no iPhone real
- [ ] Testar PIX completo no Perfect Pay
- [ ] Testar webhook recebendo confirmação
- [ ] Testar magic link chegando no email
- [ ] Testar app completo pós-login no mobile
- [ ] Verificar Posthog ou analytics básico
- [ ] LAUNCH 🚀

---

## NOTAS DE SESSÃO

*(Use esse espaço para anotar o que aconteceu em cada sessão)*

### 31/03/2026
- Projeto planejado, CLAUDE.md + PRD.md + TASKS.md criados
- Telas geradas no Figma AI salvas em /Telas Geradas Figma
- Próximo passo: Fase 1 — Setup do projeto
