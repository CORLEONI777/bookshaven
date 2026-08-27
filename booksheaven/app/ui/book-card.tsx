import Link from "next/link";

type Book = { slug?: string; title?: string; cover_url?: string | null; description?: string | null; rating?: number | null; author_name?: string | null; pages?: number | null; };

export default function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const title = String(book.title || "Untitled");
  return <Link href={`/books/${book.slug}`} className={`book-card ${compact ? "compact" : ""}`}>
    <div className="book-cover-wrap">
      {book.cover_url ? <img src={String(book.cover_url)} alt={`${title} cover`} loading="lazy" /> : <div className="cover-fallback"><span>BooksHeaven</span><strong>{title}</strong></div>}
      {book.rating ? <span className="rating-badge">★ {book.rating}</span> : null}
    </div>
    <div className="book-card-copy">
      <h3>{title}</h3>
      {book.author_name ? <p className="book-author">{book.author_name}</p> : null}
      {!compact && <p className="book-excerpt">{book.description || "Discover the story, context and reasons readers keep coming back to this book."}</p>}
      {book.pages ? <span className="book-meta">{book.pages} pages</span> : null}
    </div>
  </Link>;
}
