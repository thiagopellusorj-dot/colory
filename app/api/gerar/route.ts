import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";
import { generateColoringPage } from "@/lib/gemini";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { image_base64 } = await request.json();

    if (!image_base64) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      );
    }

    // 1. Gerar página de colorir via Gemini
    const result = await generateColoringPage(image_base64);

    // 2. Salvar imagem gerada no Supabase Storage
    const supabase = createAdminSupabase();
    const buffer = Buffer.from(result.base64, "base64");
    const ext = result.mimeType === "image/png" ? "png" : "jpg";
    const fileName = `geradas/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("imagens")
      .upload(fileName, buffer, {
        contentType: result.mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      // Fallback: retorna base64 direto
      return NextResponse.json({
        url: `data:${result.mimeType};base64,${result.base64}`,
      });
    }

    // 3. Gerar URL pública
    const { data: publicUrl } = supabase.storage
      .from("imagens")
      .getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl.publicUrl });
  } catch (error) {
    console.error("API /gerar error:", error);
    return NextResponse.json(
      { error: "Erro ao processar imagem" },
      { status: 500 }
    );
  }
}
