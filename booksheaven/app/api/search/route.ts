import { NextRequest, NextResponse } from "next/server";
import { searchBooks } from "@/lib/db";
import { searchOpenLibrary } from "@/lib/openlibrary";
import { cacheLongTail } from "@/lib/cache-aside";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 2) return NextResponse.json({ results: [], error: "Query must be at least 2 characters." }, { status: 400 });
  const curated = await searchBooks(q);
  if (curated.length) return NextResponse.json({ source: "d1", results: curated });
  try {
    const longTail = await searchOpenLibrary(q);
    await cacheLongTail(longTail);
    return NextResponse.json({ source: "openlibrary", results: longTail });
  } catch {
    return NextResponse.json({ source: "openlibrary", results: [], error: "External book lookup failed." }, { status: 502 });
  }
}
