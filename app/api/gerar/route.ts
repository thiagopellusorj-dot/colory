import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase, createServerSupabase } from "@/lib/supabase-server";
import { generateColoringPage } from "@/lib/gemini";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { image_base64, estilo, filho_id, source } = await request.json();

    if (!image_base64) {
      return NextResponse.json(
        { error: "Imagem não fornecida" },
        { status: 400 }
      );
    }

    // 0. Verificar créditos (se autenticado)
    let usuarioId: string | null = null;
    if (source === "app") {
      try {
        const authSupabase = await createServerSupabase();
        const { data: { user } } = await authSupabase.auth.getUser();
        if (user?.email) {
          const supabaseAdmin = createAdminSupabase();
          const { data: userData } = await supabaseAdmin
            .from("usuarios")
            .select("id, creditos_restantes")
            .eq("email", user.email)
            .single();

          if (userData) {
            usuarioId = userData.id;
            if (userData.creditos_restantes !== null && userData.creditos_restantes <= 0) {
              return NextResponse.json(
                { error: "sem_creditos" },
                { status: 403 }
              );
            }
          }
        }
      } catch {
        // No auth — skip credit check (test mode)
      }
    }

    // 1. Gerar página de colorir via Gemini (com estilo)
    const result = await generateColoringPage(image_base64, "image/jpeg", estilo || "simple");

    // 2. Salvar imagens no Supabase Storage
    const supabase = createAdminSupabase();
    const timestamp = Date.now();
    const rand = Math.random().toString(36).slice(2);

    // 2a. Salvar foto original
    let urlOriginal: string | null = null;
    try {
      const originalBase64 = image_base64.includes(",") ? image_base64.split(",")[1] : image_base64;
      const originalBuffer = Buffer.from(originalBase64, "base64");
      const originalFileName = `originais/${timestamp}-${rand}.jpg`;

      const { error: origErr } = await supabase.storage
        .from("imagens")
        .upload(originalFileName, originalBuffer, {
          contentType: "image/jpeg",
          upsert: false,
        });

      if (!origErr) {
        const { data: origUrl } = supabase.storage
          .from("imagens")
          .getPublicUrl(originalFileName);
        urlOriginal = origUrl.publicUrl;
      }
    } catch {
      // Non-critical — continue without original URL
    }

    // 2b. Salvar imagem gerada
    const buffer = Buffer.from(result.base64, "base64");
    const ext = result.mimeType === "image/png" ? "png" : "jpg";
    const fileName = `geradas/${timestamp}-${rand}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("imagens")
      .upload(fileName, buffer, {
        contentType: result.mimeType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json({
        url: `data:${result.mimeType};base64,${result.base64}`,
      });
    }

    // 3. Gerar URL pública
    const { data: publicUrl } = supabase.storage
      .from("imagens")
      .getPublicUrl(fileName);

    const url = publicUrl.publicUrl;

    // 4. Salvar registro + decrementar créditos (se veio do app)
    if (source === "app") {
      try {
        await supabase.from("imagens").insert({
          usuario_id: usuarioId,
          filho_id: filho_id || null,
          url_original: urlOriginal,
          url_gerada: url,
          estilo: estilo || null,
        });

        // Decrementar créditos
        if (usuarioId) {
          const { data: usr } = await supabase
            .from("usuarios")
            .select("creditos_restantes")
            .eq("id", usuarioId)
            .single();

          if (usr && (usr.creditos_restantes ?? 0) > 0) {
            await supabase
              .from("usuarios")
              .update({ creditos_restantes: usr.creditos_restantes - 1 })
              .eq("id", usuarioId);
          }
        }
      } catch (dbErr) {
        console.error("DB insert error:", dbErr);
      }
    }

    return NextResponse.json({ url, url_original: urlOriginal });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API /gerar error:", message);
    return NextResponse.json(
      { error: "Erro ao processar imagem", details: message },
      { status: 500 }
    );
  }
}
