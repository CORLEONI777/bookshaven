import { queryBooks } from "./db";
import type { Book } from "./types";

export async function similarBooks(book: Book, limit = 6): Promise<Book[]> {
  if (!book.genres?.length) return [];
  const slugs = book.genres.map((g) => g.slug);
  const placeholders = slugs.map(() => "?").join(",");
  try {
    const rows = await queryBooks(
      `SELECT DISTINCT b.* FROM books b
       JOIN book_genres bg ON bg.book_id=b.id
       JOIN genres g ON g.id=bg.genre_id
       WHERE g.slug IN (${placeholders}) AND b.slug != ?
       ORDER BY b.source='curated' DESC, b.rating DESC, b.view_count DESC LIMIT ?`,
      ...slugs, book.slug, limit
    );
    return rows as unknown as Book[];
  } catch { return []; }
}

export function matchReason(candidate: Book, source: Book) {
  const shared = (candidate.genres || []).filter((g) => (source.genres || []).some((x) => x.slug === g.slug));
  const reasons = shared.length ? [`same ${shared[0].name.toLowerCase()} genre`] : [];
  if (source.pages && candidate.pages && Math.abs(source.pages - candidate.pages) < 100) reasons.push("similar length");
  return reasons.length ? reasons.join(" + ") : "similar reader profile";
}
