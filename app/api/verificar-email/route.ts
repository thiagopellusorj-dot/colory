import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ exists: false, active: false });
    }

    const supabase = createAdminSupabase();
    const { data, error } = await supabase
      .from("usuarios")
      .select("id, status, acesso_expira_em")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      console.error("[Verificar Email] Query error:", error.message);
      return NextResponse.json({ exists: false, active: false }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ exists: false, active: false });
    }

    // Checar expiração
    const isExpired = data.acesso_expira_em
      && new Date(data.acesso_expira_em) < new Date();

    const isActive = data.status === "ativo" && !isExpired;

    return NextResponse.json({ exists: true, active: isActive });
  } catch (err) {
    console.error("[Verificar Email] Error:", err);
    return NextResponse.json({ exists: false, active: false }, { status: 500 });
  }
}
