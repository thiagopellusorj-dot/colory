import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

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

    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      return NextResponse.json(
        { error: "Configuração do servidor incompleta" },
        { status: 500 }
      );
    }

    // Extrair base64 puro (remover data:image/...;base64,)
    const base64Data = image_base64.includes(",")
      ? image_base64.split(",")[1]
      : image_base64;

    // Chamar fal.ai — modelo lineart
    const falResponse = await fetch(
      "https://fal.run/fal-ai/imageutils/lineart",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${falKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: `data:image/jpeg;base64,${base64Data}`,
        }),
      }
    );

    if (!falResponse.ok) {
      const errorText = await falResponse.text();
      console.error("fal.ai error:", falResponse.status, errorText);
      return NextResponse.json(
        { error: "Erro ao processar imagem" },
        { status: 502 }
      );
    }

    const falResult = await falResponse.json();
    const generatedImageUrl = falResult.image?.url;

    if (!generatedImageUrl) {
      return NextResponse.json(
        { error: "Imagem não foi gerada" },
        { status: 502 }
      );
    }

    // Baixar imagem gerada do fal.ai
    const imageResponse = await fetch(generatedImageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();

    // Salvar no Supabase Storage
    const supabase = await createServerSupabase();
    const fileName = `geradas/${Date.now()}-${Math.random().toString(36).slice(2)}.png`;

    const { error: uploadError } = await supabase.storage
      .from("imagens")
      .upload(fileName, imageBuffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      // Retorna a URL do fal.ai como fallback
      return NextResponse.json({ url: generatedImageUrl });
    }

    // Gerar URL pública
    const { data: publicUrl } = supabase.storage
      .from("imagens")
      .getPublicUrl(fileName);

    return NextResponse.json({
      url: publicUrl.publicUrl,
      url_fal: generatedImageUrl,
    });
  } catch (error) {
    console.error("API /gerar error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
