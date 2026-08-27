import type { SearchResult } from "./types";

const headers = { "User-Agent": process.env.OPEN_LIBRARY_USER_AGENT || "BooksHeaven/0.1" };

export async function searchOpenLibrary(query: string): Promise<SearchResult[]> {
  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "12");
  const res = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!res.ok) return [];
  const data = await res.json() as { docs?: any[] };
  return (data.docs || []).map((doc) => ({
    title: doc.title || "Untitled",
    slug: slugify(`${doc.title || "book"}-${(doc.author_name?.[0] || "unknown")}`),
    cover_url: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : null,
    description: null,
    source: "cached" as const,
    authors: doc.author_name || []
  }));
}

export async function getOpenLibraryBook(slug: string) {
  const results = await searchOpenLibrary(slug.replaceAll("-", " "));
  return results[0] || null;
}

export function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);
}
