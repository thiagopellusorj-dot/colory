import { NextResponse } from "next/server";

export async function POST() {
  // Will be implemented in Phase 7 — Supabase Auth magic link
  return NextResponse.json(
    { error: "Not implemented yet" },
    { status: 501 }
  );
}
