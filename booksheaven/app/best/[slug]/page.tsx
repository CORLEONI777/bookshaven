import Link from "next/link";
import { notFound } from "next/navigation";
import { queryBooks } from "@/lib/db";

export default async function CuratedList({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lists = await queryBooks(`SELECT id,title,intro_text FROM curated_lists WHERE slug=? LIMIT 1`, slug);
  if (!lists[0]) notFound();
  const items = await queryBooks(`SELECT b.slug,b.title,b.cover_url,b.description,cli.commentary,cli.position FROM curated_list_items cli JOIN books b ON b.id=cli.book_id WHERE cli.list_id=? ORDER BY cli.position`, Number(lists[0].id));
  return <div className="container section"><div className="eyebrow">Curated collection</div><h1>{String(lists[0].title)}</h1><p className="prose">{String(lists[0].intro_text || "")}</p><div className="list">{items.map((item) => <Link href={`/books/${item.slug}`} className="list-item" key={String(item.slug)}><div><strong>{String(item.position)}. {String(item.title)}</strong><div className="muted">{String(item.commentary || item.description || "")}</div></div><span>→</span></Link>)}</div></div>;
}
