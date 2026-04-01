import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { createKieTask } from "@/lib/kie";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { image_base64, nome_filho } = await request.json();

    if (!image_base64) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabase();

    // 1. Upload da imagem original para Supabase Storage
    const base64Data = image_base64.includes(",")
      ? image_base64.split(",")[1]
      : image_base64;

    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `originais/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

    const { error: uploadError } = await supabase.storage
      .from("imagens")
      .upload(fileName, buffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: "Erro ao salvar imagem" },
        { status: 500 }
      );
    }

    // 2. Gerar URL pública da imagem original
    const { data: publicUrlData } = supabase.storage
      .from("imagens")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;

    // 3. Montar callback URL
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const callbackUrl = `${appUrl}/api/webhook/kie`;

    // 4. Disparar job na Kie.ai
    const kieResponse = await createKieTask(imageUrl, callbackUrl);

    if (kieResponse.code !== 200 || !kieResponse.data?.task_id) {
      console.error("Kie.ai error:", kieResponse);
      return NextResponse.json(
        { error: "Erro ao iniciar geração" },
        { status: 502 }
      );
    }

    const taskId = kieResponse.data.task_id;

    // 5. Salvar job no Supabase
    const { error: dbError } = await supabase.from("jobs").insert({
      task_id: taskId,
      status: "pending",
      url_original: imageUrl,
      nome_filho: nome_filho || "",
    });

    if (dbError) {
      console.error("DB error:", dbError);
    }

    return NextResponse.json({
      task_id: taskId,
      status: "pending",
    });
  } catch (error) {
    console.error("API /gerar error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
