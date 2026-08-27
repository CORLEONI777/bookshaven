import { getEnv } from "./cloudflare";
import { slugify } from "./openlibrary";
import type { SearchResult } from "./types";

export async function cacheLongTail(results: SearchResult[]) {
  const env = getEnv();
  if (!env?.DB) return;
  for (const item of results.slice(0, 12)) {
    await env.DB.prepare(`INSERT OR IGNORE INTO books(slug,title,description,cover_url,source,last_fetched_at) VALUES(?,?,?,?,'cached',CURRENT_TIMESTAMP)`)
      .bind(slugify(item.slug), item.title, item.description || null, item.cover_url || null).run();
  }
}
