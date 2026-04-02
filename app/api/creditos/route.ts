import { NextResponse } from "next/server";
import { createServerSupabase, createAdminSupabase } from "@/lib/supabase-server";

const CREDITOS_CICLO = 15;
const CICLO_DIAS = 30;

export async function GET() {
  try {
    const authSupabase = await createServerSupabase();
    const { data: { user } } = await authSupabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

    const supabase = createAdminSupabase();
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("id, creditos_restantes, creditos_renovam_em, plano, status")
      .eq("email", user.email)
      .single();

    if (error || !usuario) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Auto-renovação: se o ciclo expirou, resetar créditos
    if (usuario.creditos_renovam_em) {
      const renovaEm = new Date(usuario.creditos_renovam_em);
      if (renovaEm < new Date()) {
        const novaRenovacao = new Date();
        novaRenovacao.setDate(novaRenovacao.getDate() + CICLO_DIAS);

        await supabase
          .from("usuarios")
          .update({
            creditos_restantes: CREDITOS_CICLO,
            creditos_renovam_em: novaRenovacao.toISOString(),
          })
          .eq("id", usuario.id);

        return NextResponse.json({
          creditos_restantes: CREDITOS_CICLO,
          creditos_renovam_em: novaRenovacao.toISOString(),
          plano: usuario.plano,
          renovado: true,
        });
      }
    }

    return NextResponse.json({
      creditos_restantes: usuario.creditos_restantes ?? CREDITOS_CICLO,
      creditos_renovam_em: usuario.creditos_renovam_em,
      plano: usuario.plano,
      renovado: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API /creditos error:", message);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
