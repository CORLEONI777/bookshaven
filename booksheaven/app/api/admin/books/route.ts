import { NextRequest, NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare";

export async function POST(request: NextRequest) {
  const env = getEnv();
  if (!env?.DB) return NextResponse.json({ error: "D1 is not configured." }, { status: 503 });
  const body = await request.json() as Record<string, unknown>;
  const id = Number(body.id);
  const title = String(body.title || "").trim();
  const description = String(body.description || "").trim();
  const why = String(body.why_this_book || "").trim();
  const source = body.source === "curated" ? "curated" : "cached";
  if (!id || !title) return NextResponse.json({ error: "id and title are required" }, { status: 400 });
  await env.DB.prepare(`UPDATE books SET title=?,description=?,why_this_book=?,source=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`).bind(title, description, why, source, id).run();
  return NextResponse.json({ ok: true });
}
