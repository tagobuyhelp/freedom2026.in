// app/api/health/route.ts
// Phase 0 health check — verifies Next.js server mode is working.
// Can be removed after Phase 1 is complete.
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    mode: "server",
    message: "Freedom2026 API is running in Next.js server mode.",
    timestamp: new Date().toISOString(),
    node: process.version,
  });
}
