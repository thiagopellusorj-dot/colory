import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "save_lead") {
      const supabase = await createServerSupabase();

      const { data, error } = await supabase
        .from("leads")
        .insert({
          nome_filho: body.nome_filho,
          genero: body.genero,
          idade: body.idade,
          objetivo: body.objetivo,
          whatsapp: body.whatsapp,
          email: body.email,
        })
        .select("id")
        .single();

      if (error) {
        console.error("Lead save error:", error);
        return NextResponse.json(
          { error: "Erro ao salvar dados" },
          { status: 500 }
        );
      }

      return NextResponse.json({ lead_id: data.id });
    }

    return NextResponse.json(
      { error: "Action não reconhecida" },
      { status: 400 }
    );
  } catch (error) {
    console.error("API /auth error:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
