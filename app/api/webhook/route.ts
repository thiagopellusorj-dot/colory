import { NextResponse } from "next/server";

export async function POST() {
  // Will be implemented in Phase 7 — Perfect Pay webhook
  return NextResponse.json(
    { error: "Not implemented yet" },
    { status: 501 }
  );
}
