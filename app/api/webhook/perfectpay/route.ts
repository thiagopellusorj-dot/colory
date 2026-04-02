import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

const CREDITOS_INICIAIS = 15;
const CREDITOS_EXTRA = 20;
const CICLO_DIAS = 30;

export async function POST(request: NextRequest) {
  const PRODUCT_CODES = {
    anual: process.env.PERFECTPAY_PRODUCT_ANUAL || "PPLQQP2CV",
    mensal: process.env.PERFECTPAY_PRODUCT_MENSAL || "PPLQQP2D2",
    creditos: process.env.PERFECTPAY_PRODUCT_CREDITOS || "PPLQQP2H7",
    oto1: process.env.PERFECTPAY_PRODUCT_OTO1 || "PPLQQP2HA",
    oto3: process.env.PERFECTPAY_PRODUCT_OTO3 || "PPLQQP2HF",
  };

  try {
    const body = await request.json();

    // 1. Validar token
    const webhookToken = process.env.PERFECTPAY_WEBHOOK_TOKEN;
    if (webhookToken && body.token !== webhookToken) {
      console.error("Webhook token inválido");
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // 2. Só processar vendas aprovadas (sale_status_enum = 1)
    if (body.sale_status_enum !== 1) {
      return NextResponse.json({ ok: true, message: "Status ignorado" });
    }

    const email = body.customer?.email;
    const productCode = body.product?.code;
    const saleCode = body.code;

    if (!email || !productCode) {
      console.error("Webhook sem email ou product code:", { email, productCode });
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    const supabase = createAdminSupabase();

    console.log(`[Webhook] Venda aprovada: productCode="${productCode}" email="${email}" sale="${saleCode}"`);
    console.log(`[Webhook] PRODUCT_CODES:`, JSON.stringify(PRODUCT_CODES));
    console.log(`[Webhook] Match anual: ${productCode === PRODUCT_CODES.anual}, mensal: ${productCode === PRODUCT_CODES.mensal}`);

    // 3. Identificar produto e processar
    if (productCode === PRODUCT_CODES.anual || productCode === PRODUCT_CODES.mensal) {
      // === PLANO: criar usuario + créditos + magic link ===
      const plano = productCode === PRODUCT_CODES.anual ? "anual" : "mensal";
      const renovaEm = new Date();
      renovaEm.setDate(renovaEm.getDate() + CICLO_DIAS);

      // Verificar se usuario já existe
      const { data: existente } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email)
        .single();

      if (existente) {
        // Atualizar plano e créditos
        const { error: updateErr } = await supabase
          .from("usuarios")
          .update({
            plano,
            status: "ativo",
            creditos_restantes: CREDITOS_INICIAIS,
            creditos_renovam_em: renovaEm.toISOString(),
          })
          .eq("id", existente.id);

        if (updateErr) console.error("[Webhook] Update error:", updateErr);
        else console.log(`[Webhook] Usuario atualizado: ${email} → plano ${plano}`);
      } else {
        // Criar lead_id se existir lead com esse email
        const { data: lead } = await supabase
          .from("leads")
          .select("id")
          .eq("email", email)
          .single();

        // Criar usuario
        const { error: insertErr } = await supabase.from("usuarios").insert({
          email,
          plano,
          status: "ativo",
          lead_id: lead?.id || null,
          creditos_restantes: CREDITOS_INICIAIS,
          creditos_renovam_em: renovaEm.toISOString(),
          acesso_expira_em: productCode === PRODUCT_CODES.anual
            ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
            : null,
        });

        if (insertErr) console.error("[Webhook] Insert error:", insertErr);
        else console.log(`[Webhook] Usuario criado: ${email} → plano ${plano}`);
      }

      // Criar usuario no Supabase Auth (se não existe) e enviar magic link
      try {
        // Tentar criar usuario no Auth
        const { error: signUpError } = await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        });

        if (signUpError && !signUpError.message.includes("already been registered")) {
          console.error("[Webhook] Auth createUser error:", signUpError.message);
        }

        // Gerar magic link
        const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
          type: "magiclink",
          email,
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/criar`,
          },
        });

        if (linkError) {
          console.error("[Webhook] Magic link error:", linkError.message);
        } else {
          console.log(`[Webhook] Magic link gerado para ${email}`);
          // TODO: enviar email com o link via serviço de email
          // Por enquanto o Supabase Auth envia automaticamente
        }
      } catch (authErr) {
        console.error("[Webhook] Auth error:", authErr);
      }

    } else if (productCode === PRODUCT_CODES.creditos) {
      // === CRÉDITOS EXTRA: somar +20 ===
      const { data: usuario } = await supabase
        .from("usuarios")
        .select("id, creditos_restantes")
        .eq("email", email)
        .single();

      if (usuario) {
        await supabase
          .from("usuarios")
          .update({
            creditos_restantes: (usuario.creditos_restantes || 0) + CREDITOS_EXTRA,
          })
          .eq("id", usuario.id);

        console.log(`[Webhook] +${CREDITOS_EXTRA} créditos para ${email}`);
      } else {
        console.error(`[Webhook] Usuario não encontrado para créditos: ${email}`);
      }

    } else if (productCode === PRODUCT_CODES.oto1 || productCode === PRODUCT_CODES.oto3) {
      // === OTO: registrar compra ===
      const produto = productCode === PRODUCT_CODES.oto1 ? "livro" : "clube";
      const valor = productCode === PRODUCT_CODES.oto1 ? 67 : 97;

      const { data: usuario } = await supabase
        .from("usuarios")
        .select("id")
        .eq("email", email)
        .single();

      if (usuario) {
        await supabase.from("compras").insert({
          usuario_id: usuario.id,
          produto,
          valor,
        });

        console.log(`[Webhook] Compra registrada: ${produto} para ${email}`);
      } else {
        console.error(`[Webhook] Usuario não encontrado para OTO: ${email}`);
      }

    } else {
      console.log(`[Webhook] Produto desconhecido: ${productCode}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Webhook] Error:", message);
    return NextResponse.json(
      { error: "Erro interno", details: message },
      { status: 500 }
    );
  }
}
