import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { taskId, code, data } = body;

    console.log("Kie.ai webhook received:", { taskId, code });

    if (!taskId) {
      return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
    }

    const supabase = await createServerSupabase();

    if (code === 200 && data?.callbackType === "task_completed") {
      // Buscar detalhes do resultado — Kie.ai envia a URL da imagem no data
      const outputUrl = data.output?.image_url || data.output?.url || data.image_url || data.url;

      if (outputUrl) {
        // Baixar imagem e salvar no Supabase Storage
        let finalUrl = outputUrl;

        try {
          const imageResponse = await fetch(outputUrl);
          const imageBuffer = await imageResponse.arrayBuffer();
          const fileName = `geradas/${taskId}.png`;

          const { error: uploadError } = await supabase.storage
            .from("imagens")
            .upload(fileName, imageBuffer, {
              contentType: "image/png",
              upsert: true,
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from("imagens")
              .getPublicUrl(fileName);
            finalUrl = publicUrlData.publicUrl;
          }
        } catch (e) {
          console.error("Failed to save to storage, using original URL:", e);
        }

        // Atualizar job no Supabase
        await supabase
          .from("jobs")
          .update({
            status: "completed",
            url_gerada: finalUrl,
            completado_em: new Date().toISOString(),
          })
          .eq("task_id", taskId);
      } else {
        // Callback sem URL — marcar como completed sem imagem
        // Pode ser que o formato do payload seja diferente, logar pra debug
        console.warn("Kie.ai callback sem URL de imagem:", JSON.stringify(body));

        await supabase
          .from("jobs")
          .update({
            status: "completed",
            completado_em: new Date().toISOString(),
          })
          .eq("task_id", taskId);
      }
    } else {
      // Erro ou status inesperado
      await supabase
        .from("jobs")
        .update({ status: "failed" })
        .eq("task_id", taskId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook /kie error:", error);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
