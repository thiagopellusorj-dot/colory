import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

const CREDITOS_INICIAIS = 15;
const CREDITOS_EXTRA = 20;
const CICLO_DIAS = 30;

// Perfect Pay status codes (from docs)
// 0=none, 1=pending, 2=approved, 3=in_process, 4=in_mediation
// 5=rejected, 6=cancelled, 7=refunded, 8=authorized, 9=chargeback
// 10=completed, 11=checkout_error, 12=precheckout, 13=expired, 16=in_review
const STATUS_APROVADO = [2]; // Só pagamento confirmado (NÃO inclui 1=pending/boleto)
const STATUS_CANCELADO = [6, 7, 9]; // cancelled, refunded, chargeback

function identificarProduto(body: Record<string, unknown>): "anual" | "mensal" | "creditos" | "oto1" | "oto3" | "desconhecido" {
  const product = body.product as Record<string, unknown> | undefined;
  const productCode = (product?.code as string || "").trim();
  const productName = (product?.name as string || "").toLowerCase();
  const plan = body.plan as Record<string, unknown> | undefined;
  const planName = (plan?.name as string || "").toLowerCase();
  const combined = `${productName} ${planName}`;

  const codes = {
    anual: (process.env.PERFECTPAY_PRODUCT_ANUAL || "PPLQQP2CV").trim(),
    mensal: (process.env.PERFECTPAY_PRODUCT_MENSAL || "PPLQQP2D2").trim(),
    creditos: (process.env.PERFECTPAY_PRODUCT_CREDITOS || "PPLQQP2H7").trim(),
    oto1: (process.env.PERFECTPAY_PRODUCT_OTO1 || "PPLQQP2HA").trim(),
    oto3: (process.env.PERFECTPAY_PRODUCT_OTO3 || "PPLQQP2HF").trim(),
  };

  // Match exato por código
  if (productCode === codes.anual) return "anual";
  if (productCode === codes.mensal) return "mensal";
  if (productCode === codes.creditos) return "creditos";
  if (productCode === codes.oto1) return "oto1";
  if (productCode === codes.oto3) return "oto3";

  // Fallback por nome
  if (combined.includes("anual")) return "anual";
  if (combined.includes("mensal")) return "mensal";
  if (productName.includes("colory") && planName.includes("anual")) return "anual";
  if (productName.includes("colory") && planName.includes("mensal")) return "mensal";
  if (productName.includes("colory")) return "mensal";
  if (combined.includes("crédit") || combined.includes("credit")) return "creditos";
  if (combined.includes("livro") || combined.includes("book") || combined.includes("imagine")) return "oto1";
  if (combined.includes("clube") || combined.includes("atividade")) return "oto3";

  return "desconhecido";
}

function calcularExpiracao(plano: "anual" | "mensal"): string {
  const dias = plano === "anual" ? 365 : 30;
  return new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminSupabase();

    // 1. Validar token
    const webhookToken = (process.env.PERFECTPAY_WEBHOOK_TOKEN || "").trim();
    if (webhookToken && body.token !== webhookToken) {
      console.error("[Webhook] Token inválido");
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // 2. Processar por status
    const status = Number(body.sale_status_enum);
    const email = (body.customer?.email as string || "").trim().toLowerCase();
    const saleCode = (body.code as string || "").trim();
    const tipo = identificarProduto(body);

    console.log(`[Webhook] sale=${saleCode} status=${status} email=${email} tipo=${tipo} product=${JSON.stringify(body.product)} plan=${JSON.stringify(body.plan)}`);

    if (!email) {
      console.error("[Webhook] Sem email");
      return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
    }

    // 3. Idempotência — checar se já processou este sale_code
    if (saleCode) {
      const { data: jaProcessado } = await supabase
        .from("webhook_log")
        .select("id")
        .eq("sale_code", saleCode)
        .maybeSingle();

      if (jaProcessado) {
        console.log(`[Webhook] sale_code ${saleCode} já processado — ignorando`);
        return NextResponse.json({ ok: true, message: "Já processado" });
      }
    }

    // 4. Ignorar status irrelevantes
    if (!STATUS_APROVADO.includes(status) && !STATUS_CANCELADO.includes(status)) {
      console.log(`[Webhook] Status ${status} ignorado`);
      // Logar mesmo assim
      if (saleCode) {
        await supabase.from("webhook_log").insert({ sale_code: saleCode, email, tipo, status });
      }
      return NextResponse.json({ ok: true, message: "Status ignorado" });
    }

    // === CANCELAMENTO / REEMBOLSO / CHARGEBACK ===
    if (STATUS_CANCELADO.includes(status)) {
      if (tipo === "anual" || tipo === "mensal") {
        const { error: err } = await supabase
          .from("usuarios")
          .update({ status: "inativo", creditos_restantes: 0 })
          .eq("email", email);

        if (err) console.error("[Webhook] Cancelamento error:", err);
        else console.log(`[Webhook] Usuario desativado: ${email} (status ${status})`);
      }

      // Logar
      if (saleCode) {
        await supabase.from("webhook_log").insert({ sale_code: saleCode, email, tipo, status });
      }
      return NextResponse.json({ ok: true, message: "Cancelamento processado" });
    }

    // === APROVAÇÃO (status 2) ===

    if (tipo === "anual" || tipo === "mensal") {
      const plano = tipo;
      const renovaEm = new Date();
      renovaEm.setDate(renovaEm.getDate() + CICLO_DIAS);

      // Buscar usuario existente
      const { data: existente, error: selectErr } = await supabase
        .from("usuarios")
        .select("id, plano, acesso_expira_em, creditos_restantes, creditos_renovam_em")
        .eq("email", email)
        .maybeSingle();

      if (selectErr) {
        console.error("[Webhook] Query error:", selectErr);
        return NextResponse.json({ error: "DB error" }, { status: 500 });
      }

      if (existente) {
        // Renovação ou upgrade
        const isUpgrade = existente.plano !== plano;
        const cicloExpirou = existente.creditos_renovam_em
          && new Date(existente.creditos_renovam_em) <= new Date();

        // Se renovação e ciclo NÃO expirou, manter créditos atuais
        // Se ciclo expirou ou upgrade, resetar pra 15
        const novosCreditos = (!isUpgrade && !cicloExpirou)
          ? (existente.creditos_restantes ?? CREDITOS_INICIAIS)
          : CREDITOS_INICIAIS;

        const { error: err } = await supabase
          .from("usuarios")
          .update({
            plano,
            status: "ativo",
            creditos_restantes: novosCreditos,
            creditos_renovam_em: renovaEm.toISOString(),
            acesso_expira_em: calcularExpiracao(plano),
          })
          .eq("id", existente.id);

        if (err) console.error("[Webhook] Update error:", err);
        else console.log(`[Webhook] Usuario atualizado: ${email} → ${plano} (upgrade=${isUpgrade}, creditos=${novosCreditos})`);
      } else {
        // Novo usuario
        const { data: lead } = await supabase
          .from("leads")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        const { error: err } = await supabase.from("usuarios").insert({
          email,
          plano,
          status: "ativo",
          lead_id: lead?.id || null,
          creditos_restantes: CREDITOS_INICIAIS,
          creditos_renovam_em: renovaEm.toISOString(),
          acesso_expira_em: calcularExpiracao(plano),
        });

        if (err) console.error("[Webhook] Insert error:", err);
        else console.log(`[Webhook] Usuario criado: ${email} → ${plano}`);
      }

      // Criar no Supabase Auth + enviar magic link
      try {
        // Criar user (ignora se existe)
        await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        }).catch(() => {});

        // Enviar magic link via inviteUserByEmail (envia email de verdade)
        const { error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "https://colory-eight.vercel.app"}/auth/callback`,
        });

        if (inviteErr) {
          // Fallback: generateLink (pode não enviar email mas gera o token)
          console.log("[Webhook] inviteUserByEmail falhou, tentando generateLink:", inviteErr.message);
          const { error: linkErr } = await supabase.auth.admin.generateLink({
            type: "magiclink",
            email,
            options: {
              redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "https://colory-eight.vercel.app"}/auth/callback`,
            },
          });
          if (linkErr) console.error("[Webhook] generateLink also failed:", linkErr.message);
          else console.log(`[Webhook] Magic link gerado (não garante envio) para ${email}`);
        } else {
          console.log(`[Webhook] Invite email enviado para ${email}`);
        }
      } catch (authErr) {
        console.error("[Webhook] Auth error:", authErr);
      }

    } else if (tipo === "creditos") {
      const { data: usuario } = await supabase
        .from("usuarios")
        .select("id, creditos_restantes")
        .eq("email", email)
        .maybeSingle();

      if (usuario) {
        const { error: err } = await supabase
          .from("usuarios")
          .update({ creditos_restantes: (usuario.creditos_restantes || 0) + CREDITOS_EXTRA })
          .eq("id", usuario.id);

        if (err) console.error("[Webhook] Creditos error:", err);
        else console.log(`[Webhook] +${CREDITOS_EXTRA} créditos para ${email}`);
      } else {
        console.error(`[Webhook] Usuario não encontrado para créditos: ${email}`);
      }

    } else if (tipo === "oto1" || tipo === "oto3") {
      const produto = tipo === "oto1" ? "livro" : "clube";
      const valor = tipo === "oto1" ? 67 : 97;

      const { data: usuario } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (usuario) {
        const { error: err } = await supabase.from("compras").insert({
          usuario_id: usuario.id,
          produto,
          valor,
        });
        if (err) console.error("[Webhook] Compra error:", err);
        else console.log(`[Webhook] Compra: ${produto} para ${email}`);
      } else {
        console.error(`[Webhook] Usuario não encontrado para OTO: ${email}`);
      }

    } else {
      console.log(`[Webhook] Produto desconhecido: ${JSON.stringify(body.product)}`);
    }

    // 5. Logar webhook processado
    if (saleCode) {
      await supabase.from("webhook_log").insert({ sale_code: saleCode, email, tipo, status });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Webhook] Error:", message);
    return NextResponse.json({ error: "Erro interno", details: message }, { status: 500 });
  }
}
