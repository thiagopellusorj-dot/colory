import { NextResponse } from "next/server";
import { createServerSupabase, createAdminSupabase } from "@/lib/supabase-server";

const CREDITOS_CICLO = 15;
const CICLO_DIAS = 30;

export async function GET() {
  try {
    const authSupabase = await createServerSupabase();
    const { data: { user } } = await authSupabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const supabase = createAdminSupabase();
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, creditos_restantes, creditos_renovam_em, plano, status, acesso_expira_em")
      .eq("email", user.email)
      .maybeSingle();

    if (error) {
      console.error("[Creditos] Query error:", error);
      return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    // Plano inativo (cancelado/reembolsado)
    if (usuario.status === "inativo") {
      return NextResponse.json({
        creditos_restantes: 0,
        plano: usuario.plano,
        status: "inativo",
        expirado: true,
      });
    }

    // Plano expirou
    if (usuario.acesso_expira_em && new Date(usuario.acesso_expira_em) < new Date()) {
      const { error: updateErr } = await supabase
        .from("usuarios")
        .update({ status: "inativo", creditos_restantes: 0 })
        .eq("id", usuario.id);

      if (updateErr) console.error("[Creditos] Deactivation error:", updateErr);

      return NextResponse.json({
        creditos_restantes: 0,
        plano: usuario.plano,
        status: "inativo",
        expirado: true,
      });
    }

    // Auto-renovação de créditos: se ciclo expirou, resetar
    if (usuario.creditos_renovam_em && new Date(usuario.creditos_renovam_em) < new Date()) {
      const novaRenovacao = new Date();
      novaRenovacao.setDate(novaRenovacao.getDate() + CICLO_DIAS);

      const { error: updateErr } = await supabase
        .from("usuarios")
        .update({
          creditos_restantes: CREDITOS_CICLO,
          creditos_renovam_em: novaRenovacao.toISOString(),
        })
        .eq("id", usuario.id);

      if (updateErr) {
        console.error("[Creditos] Refresh error:", updateErr);
      }

      return NextResponse.json({
        creditos_restantes: CREDITOS_CICLO,
        creditos_renovam_em: novaRenovacao.toISOString(),
        plano: usuario.plano,
        status: "ativo",
        expirado: false,
      });
    }

    return NextResponse.json({
      creditos_restantes: usuario.creditos_restantes ?? CREDITOS_CICLO,
      creditos_renovam_em: usuario.creditos_renovam_em,
      plano: usuario.plano,
      status: "ativo",
      expirado: false,
    });
  } catch (error) {
    console.error("[Creditos] Error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
