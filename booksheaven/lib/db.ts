import { getEnv } from "./cloudflare";
import type { Book, SearchResult } from "./types";

export async function queryBooks(sql: string, ...params: unknown[]) {
  const env = getEnv();
  if (!env?.DB) return [];
  const result = await env.DB.prepare(sql).bind(...params).all();
  return result.results as Record<string, unknown>[];
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  try {
    const rows = await queryBooks(
      `SELECT b.*, GROUP_CONCAT(DISTINCT a.slug || '::' || a.name) AS author_data,
              GROUP_CONCAT(DISTINCT g.slug || '::' || g.name) AS genre_data
       FROM books b
       LEFT JOIN book_authors ba ON ba.book_id=b.id
       LEFT JOIN authors a ON a.id=ba.author_id
       LEFT JOIN book_genres bg ON bg.book_id=b.id
       LEFT JOIN genres g ON g.id=bg.genre_id
       WHERE b.slug=? GROUP BY b.id LIMIT 1`,
      slug
    );
    if (!rows[0]) return null;
    return hydrateBook(rows[0]);
  } catch {
    return null;
  }
}

export async function searchBooks(q: string): Promise<SearchResult[]> {
  try {
    const rows = await queryBooks(
      `SELECT b.*, GROUP_CONCAT(DISTINCT a.name) AS authors
       FROM books b LEFT JOIN book_authors ba ON ba.book_id=b.id
       LEFT JOIN authors a ON a.id=ba.author_id
       WHERE b.title LIKE ? OR b.description LIKE ? OR a.name LIKE ?
       GROUP BY b.id ORDER BY b.source='curated' DESC, b.view_count DESC LIMIT 20`,
      `%${q}%`, `%${q}%`, `%${q}%`
    );
    return rows.map((r) => ({
      title: String(r.title), slug: String(r.slug), cover_url: r.cover_url as string | null,
      description: r.description as string | null, source: r.source as "curated" | "cached",
      authors: String(r.authors || "").split(",").filter(Boolean)
    }));
  } catch {
    return [];
  }
}

export async function incrementView(bookId: number) {
  const env = getEnv();
  if (!env?.DB) return;
  await env.DB.prepare("UPDATE books SET view_count=view_count+1, updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(bookId).run();
}

export async function getAdminBooks() {
  return queryBooks(`SELECT id,title,slug,source,public_domain,view_count,updated_at FROM books ORDER BY view_count DESC, updated_at DESC LIMIT 200`);
}

export async function getCuratedLists() {
  return queryBooks(`SELECT id,title,slug,intro_text,published_at FROM curated_lists ORDER BY published_at DESC`);
}

function hydrateBook(row: Record<string, unknown>): Book {
  const parse = (value: unknown) => String(value || "").split(",").filter(Boolean).map((x) => {
    const [slug, name] = x.split("::");
    return { slug, name: name || slug };
  });
  return {
    ...(row as Book),
    public_domain: Number(row.public_domain || 0),
    view_count: Number(row.view_count || 0),
    authors: parse(row.author_data),
    genres: parse(row.genre_data)
  };
}
