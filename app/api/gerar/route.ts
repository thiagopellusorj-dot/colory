import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST() {
  // Will be implemented in Phase 3 — fal.ai integration
  return NextResponse.json(
    { error: "Not implemented yet" },
    { status: 501 }
  );
}
