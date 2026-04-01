import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const taskId = request.nextUrl.searchParams.get("task_id");

  if (!taskId) {
    return NextResponse.json(
      { error: "task_id obrigatório" },
      { status: 400 }
    );
  }

  try {
    const supabase = await createServerSupabase();

    const { data: job, error } = await supabase
      .from("jobs")
      .select("status, url_gerada")
      .eq("task_id", taskId)
      .single();

    if (error || !job) {
      return NextResponse.json(
        { status: "not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: job.status,
      url: job.url_gerada || null,
    });
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
