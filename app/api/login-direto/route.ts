import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const supabase = createAdminSupabase();

    // 1. Verificar se email tem assinatura ativa
    const { data: usuario } = await supabase
      .from("usuarios")
      .select("id, status, acesso_expira_em")
      .eq("email", cleanEmail)
      .maybeSingle();

    if (!usuario) {
      return NextResponse.json({ error: "Este email não tem uma assinatura ativa." });
    }

    const isExpired = usuario.acesso_expira_em
      && new Date(usuario.acesso_expira_em) < new Date();

    if (usuario.status === "inativo" || isExpired) {
      return NextResponse.json({ error: "Sua assinatura expirou. Renove para continuar." });
    }

    // 2. Garantir que user existe no Auth
    const { data: authUser } = await supabase.auth.admin.listUsers();
    const existingUser = authUser?.users?.find(
      (u) => u.email?.toLowerCase() === cleanEmail
    );

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
    } else {
      // Criar user no Auth
      const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
        email: cleanEmail,
        email_confirm: true,
      });

      if (createErr || !newUser.user) {
        console.error("[Login Direto] Create user error:", createErr?.message);
        return NextResponse.json({ error: "Erro ao criar conta. Tente novamente." }, { status: 500 });
      }

      userId = newUser.user.id;
    }

    // 3. Gerar link de login (que contém o token pra criar sessão)
    const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: cleanEmail,
    });

    if (linkErr || !linkData) {
      console.error("[Login Direto] generateLink error:", linkErr?.message);
      return NextResponse.json({ error: "Erro ao gerar acesso. Tente novamente." }, { status: 500 });
    }

    // 4. Extrair token_hash e verificar diretamente pra criar sessão
    const url = new URL(linkData.properties.action_link);
    const tokenHash = url.searchParams.get("token") || url.hash?.split("token=")[1]?.split("&")[0];

    if (!tokenHash) {
      // Fallback: gerar sessão via admin
      console.log("[Login Direto] No token_hash, generating session directly");
    }

    // 5. Gerar sessão direto via admin (mais confiável)
    // Usar generateLink que retorna as properties necessárias
    const { data: sessionData, error: sessionErr } = await supabase.auth.admin.generateLink({
      type: "magiclink",
      email: cleanEmail,
      options: {
        data: { login_direto: true },
      },
    });

    if (sessionErr) {
      console.error("[Login Direto] Session error:", sessionErr.message);
      return NextResponse.json({ error: "Erro ao criar sessão." }, { status: 500 });
    }

    // O generateLink retorna um hashed_token que podemos usar
    // Mas pra criar sessão direto, precisamos usar o admin API
    // Vamos usar um approach diferente: signInWithPassword com senha temporária

    // Setar senha temporária pro user e fazer login
    const tempPassword = `colory_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    await supabase.auth.admin.updateUserById(userId, {
      password: tempPassword,
    });

    // Fazer login com a senha temporária
    const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: tempPassword,
    });

    if (signInErr || !signInData.session) {
      console.error("[Login Direto] signIn error:", signInErr?.message);
      return NextResponse.json({ error: "Erro ao entrar. Tente novamente." }, { status: 500 });
    }

    console.log(`[Login Direto] Sessão criada para ${cleanEmail}`);

    return NextResponse.json({
      session: {
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[Login Direto] Error:", message);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
