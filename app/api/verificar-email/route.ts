import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ exists: false });
    }

    const supabase = createAdminSupabase();
    const { data } = await supabase
      .from("usuarios")
      .select("id, status")
      .eq("email", email.trim().toLowerCase())
      .single();

    return NextResponse.json({
      exists: !!data,
      active: data?.status === "ativo",
    });
  } catch {
    return NextResponse.json({ exists: false, active: false });
  }
}
