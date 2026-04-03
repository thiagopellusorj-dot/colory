import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

const CREDITOS_INICIAIS = 15;
const CREDITOS_EXTRA = 20;
const CICLO_DIAS = 30;

function identificarProduto(body: Record<string, unknown>): { tipo: "anual" | "mensal" | "creditos" | "oto1" | "oto3" | "desconhecido"; } {
  const product = body.product as Record<string, unknown> | undefined;
  const productCode = (product?.code as string || "").trim();
  const productName = (product?.name as string || "").toLowerCase();
  const plan = body.plan as Record<string, unknown> | undefined;
  const planName = (plan?.name as string || "").toLowerCase();

  // Combinar nome do produto + nome do plano pra match
  const combined = `${productName} ${planName}`;

  // Códigos exatos (fallback hardcoded)
  const codes = {
    anual: (process.env.PERFECTPAY_PRODUCT_ANUAL || "PPLQQP2CV").trim(),
    mensal: (process.env.PERFECTPAY_PRODUCT_MENSAL || "PPLQQP2D2").trim(),
    creditos: (process.env.PERFECTPAY_PRODUCT_CREDITOS || "PPLQQP2H7").trim(),
    oto1: (process.env.PERFECTPAY_PRODUCT_OTO1 || "PPLQQP2HA").trim(),
    oto3: (process.env.PERFECTPAY_PRODUCT_OTO3 || "PPLQQP2HF").trim(),
  };

  // Match por código exato primeiro
  if (productCode === codes.anual) return { tipo: "anual" };
  if (productCode === codes.mensal) return { tipo: "mensal" };
  if (productCode === codes.creditos) return { tipo: "creditos" };
  if (productCode === codes.oto1) return { tipo: "oto1" };
  if (productCode === codes.oto3) return { tipo: "oto3" };

  // Match por nome (fallback)
  if (combined.includes("anual")) return { tipo: "anual" };
  if (combined.includes("mensal")) return { tipo: "mensal" };
  // "Colory" sem "anual/mensal" — checar o plano
  if (productName.includes("colory") && planName.includes("anual")) return { tipo: "anual" };
  if (productName.includes("colory") && planName.includes("mensal")) return { tipo: "mensal" };
  if (productName.includes("colory")) return { tipo: "mensal" }; // default pra mensal se não especificar
  if (combined.includes("crédit") || combined.includes("credit")) return { tipo: "creditos" };
  if (combined.includes("livro") || combined.includes("book") || combined.includes("imagine")) return { tipo: "oto1" };
  if (combined.includes("clube") || combined.includes("atividade")) return { tipo: "oto3" };

  return { tipo: "desconhecido" };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validar token
    const webhookToken = (process.env.PERFECTPAY_WEBHOOK_TOKEN || "").trim();
    if (webhookToken && body.token !== webhookToken) {
      console.error("[Webhook] Token inválido recebido:", body.token?.slice(0, 10));
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // 2. Processar por status (docs Perfect Pay)
    // 0=none, 1=pending, 2=approved, 3=in_process, 4=in_mediation
    // 5=rejected, 6=cancelled, 7=refunded, 8=authorized, 9=chargeback
    // 10=completed, 11=checkout_error, 12=precheckout, 13=expired, 16=in_review
    const status = Number(body.sale_status_enum);
    const STATUS_APROVADO = [1, 2]; // 1=pending(boleto), 2=approved
    const STATUS_CANCELADO = [6, 7, 9]; // 6=cancelled, 7=refunded, 9=chargeback

    if (!STATUS_APROVADO.includes(status) && !STATUS_CANCELADO.includes(status)) {
      console.log(`[Webhook] Status ${status} ignorado`);
      return NextResponse.json({ ok: true, message: "Status ignorado" });
    }

    const email = (body.customer?.email as string || "").trim().toLowerCase();
    const saleCode = body.code;

    if (!email) {
      console.error("[Webhook] Sem email no payload");
      return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
    }

    // Log completo pra diagnóstico
    console.log(`[Webhook] Payload: sale=${saleCode} email=${email} product=${JSON.stringify(body.product)} plan=${JSON.stringify(body.plan)}`);

    const { tipo } = identificarProduto(body);
    console.log(`[Webhook] Produto identificado: ${tipo} | Status: ${status}`);

    const supabase = createAdminSupabase();

    // === CANCELAMENTO / REEMBOLSO ===
    if (STATUS_CANCELADO.includes(status)) {
      if (tipo === "anual" || tipo === "mensal") {
        const { error: err } = await supabase
          .from("usuarios")
          .update({
            status: "inativo",
            creditos_restantes: 0,
          })
          .eq("email", email);

        if (err) console.error("[Webhook] Cancelamento error:", err);
        else console.log(`[Webhook] Usuario desativado: ${email} (status ${status})`);
      }
      return NextResponse.json({ ok: true, message: "Cancelamento processado" });
    }

    // === APROVAÇÃO ===
    if (tipo === "anual" || tipo === "mensal") {
      // === PLANO ===
      const plano = tipo;
      const renovaEm = new Date();
      renovaEm.setDate(renovaEm.getDate() + CICLO_DIAS);

      const { data: existente } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email)
        .single();

      if (existente) {
        const { error: err } = await supabase
          .from("usuarios")
          .update({
            plano,
            status: "ativo",
            creditos_restantes: CREDITOS_INICIAIS,
            creditos_renovam_em: renovaEm.toISOString(),
            acesso_expira_em: plano === "anual"
              ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
              : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          })
          .eq("id", existente.id);

        if (err) console.error("[Webhook] Update error:", err);
        else console.log(`[Webhook] Usuario atualizado: ${email} → ${plano}`);
      } else {
        const { data: lead } = await supabase
          .from("leads")
          .select("id")
          .eq("email", email)
          .single();

        const { error: err } = await supabase.from("usuarios").insert({
          email,
          plano,
          status: "ativo",
          lead_id: lead?.id || null,
          creditos_restantes: CREDITOS_INICIAIS,
          creditos_renovam_em: renovaEm.toISOString(),
          acesso_expira_em: plano === "anual"
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            : null,
        });

        if (err) console.error("[Webhook] Insert error:", err);
        else console.log(`[Webhook] Usuario criado: ${email} → ${plano}`);
      }

      // Criar no Supabase Auth + enviar magic link por email
      try {
        // Criar user no Auth (ignora se já existe)
        await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        }).catch(() => {});

        // Enviar magic link via OTP (isso envia o email automaticamente)
        const { error: otpErr } = await supabase.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "https://colory-eight.vercel.app"}/auth/callback`,
          },
        });

        if (otpErr) console.error("[Webhook] Magic link error:", otpErr.message);
        else console.log(`[Webhook] Magic link enviado para ${email}`);
      } catch (authErr) {
        console.error("[Webhook] Auth error:", authErr);
      }

    } else if (tipo === "creditos") {
      // === CRÉDITOS EXTRA ===
      const { data: usuario } = await supabase
        .from("usuarios")
        .select("id, creditos_restantes")
        .eq("email", email)
        .single();

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
      // === OTO ===
      const produto = tipo === "oto1" ? "livro" : "clube";
      const valor = tipo === "oto1" ? 67 : 97;

      const { data: usuario } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email)
        .single();

      if (usuario) {
        const { error: err } = await supabase.from("compras").insert({
          usuario_id: usuario.id,
          produto,
          valor,
        });

        if (err) console.error("[Webhook] Compra error:", err);
        else console.log(`[Webhook] Compra registrada: ${produto} para ${email}`);
      } else {
        console.error(`[Webhook] Usuario não encontrado para OTO: ${email}`);
      }

    } else {
      console.log(`[Webhook] Produto desconhecido — payload: ${JSON.stringify(body.product)}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Webhook] Error:", message);
    return NextResponse.json({ error: "Erro interno", details: message }, { status: 500 });
  }
}
