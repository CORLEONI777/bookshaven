import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug, incrementView } from "@/lib/db";
import { similarBooks } from "@/lib/recommendations";

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();
  await incrementView(book.id);
  const similar = await similarBooks(book);
  return <div className="container book-layout">
    <aside><div className="book-cover">{book.cover_url ? <img src={book.cover_url} alt={`Cover of ${book.title}`} /> : <div className="cover-placeholder">{book.title}</div>}</div></aside>
    <article className="book">
      <div className="eyebrow">{book.source === "curated" ? "Human curated" : "Cached metadata"}</div>
      <h1>{book.title}</h1>
      <p className="muted">{book.authors?.map((a) => <Link key={a.slug} href={`/authors/${a.slug}`}>{a.name}</Link>).reduce((prev, cur) => <>{prev}, {cur}</>)}</p>
      <div className="meta">{book.rating ? <span className="pill">★ {book.rating}</span> : null}{book.pages ? <span className="pill">{book.pages} pages</span> : null}{book.genres?.map(g => <Link className="pill" href={`/books/genre/${g.slug}`} key={g.slug}>{g.name}</Link>)}</div>
      <div className="actions">
        {book.public_domain ? <Link className="btn" href={`/read/${book.slug}`}>Read legally</Link> : null}
        <Link className="btn secondary" href={`/free-audiobooks?book=${book.slug}`}>Find audiobook</Link>
        {book.links?.find(l=>l.type==='amazon_ebook')?.url ? <a className="btn secondary" href={book.links.find(l=>l.type==='amazon_ebook')!.url}>Buy on Amazon</a> : <span className="btn secondary" aria-disabled="true">Amazon link not added</span>}
      </div>
      <section className="panel"><h2>Description</h2><p className="prose">{book.editorial_description || book.description || "No description has been added yet."}</p>{book.source === "curated" && book.why_this_book ? <><h2>Why this book</h2><p className="prose">{book.why_this_book}</p></> : null}</section>
      <section className="section"><h2>Key information</h2><div className="two-col"><div className="panel"><p><strong>Language:</strong> {book.language || "—"}</p><p><strong>Publication:</strong> {book.publication_date || "—"}</p><p><strong>Publisher:</strong> {book.publisher || "—"}</p></div><div className="panel"><p><strong>ISBN:</strong> {book.isbn || "—"}</p><p><strong>Source:</strong> {book.source}</p><p><strong>Public-domain flag:</strong> {book.public_domain ? "Yes" : "No"}</p></div></div></section>
      {similar.length ? <section className="section"><h2>Similar books</h2><div className="grid">{similar.map(s => <Link className="card" key={s.slug} href={`/books/${s.slug}`}><div className="card-body"><h3>{s.title}</h3><p>Similar genre and reader profile.</p></div></Link>)}</div></section> : null}
    </article>
  </div>;
}
