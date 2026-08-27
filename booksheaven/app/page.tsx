import Link from "next/link";
import { searchBooks, queryBooks } from "@/lib/db";
import BookCard from "./ui/book-card";
import SectionHeading from "./ui/section-heading";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const results = q ? await searchBooks(q) : [];
  const popular = await queryBooks(`SELECT slug,title,cover_url,description,rating,pages FROM books ORDER BY view_count DESC, rating DESC LIMIT 8`);
  const lists = await queryBooks(`SELECT slug,title,intro_text FROM curated_lists WHERE published_at IS NOT NULL ORDER BY published_at DESC LIMIT 4`);

  return <>
    <section className="hero-home"><div className="hero-glow glow-one"></div><div className="hero-glow glow-two"></div><div className="container hero-inner">
      <div className="hero-copy"><span className="eyebrow hero-eyebrow">Find · Choose · Read · Track · Buy</span><h1>Find a book <em>worth your time.</em></h1><p>BooksHeaven helps you move from “what should I read?” to the right book — with human curation, useful information and no noisy recommendations.</p>
        <form className="hero-search" action="/" method="get"><div className="search-icon">⌕</div><input name="q" defaultValue={q || ""} placeholder="Search by title, author or topic…"/><button type="submit">Search</button></form>
        <div className="hero-tags"><span>Try:</span><Link href="/?q=philosophy">Philosophy</Link><Link href="/?q=fantasy">Fantasy</Link><Link href="/?q=short books">Short books</Link><Link href="/?q=classics">Classics</Link></div>
      </div>
      <div className="hero-art" aria-hidden="true"><div className="hero-book back"><span>DISCOVER</span></div><div className="hero-book middle"><span>READ<br/>MORE</span></div><div className="hero-book front"><small>BOOKSHEAVEN</small><strong>Books<br/>worth<br/>your time.</strong><i>✦</i></div><div className="spark spark-a">✦</div><div className="spark spark-b">✦</div></div>
    </div></section>

    {q ? <section className="section container"><SectionHeading eyebrow="Search" title={`Results for “${q}”`} text={`${results.length} curated matches found.`}/>{results.length ? <div className="book-grid">{results.map((b: any) => <BookCard key={String(b.slug)} book={b}/>)}</div> : <div className="empty-state"><div className="empty-icon">⌕</div><h3>No curated match yet</h3><p>Try a broader title, author or topic. The long-tail search endpoint can fetch additional metadata from external book sources.</p></div>}</section> : null}

    <section className="section container"><SectionHeading eyebrow="Start here" title="What should I read?" text="Not an algorithm pretending to know you. Just a few good ways to narrow the world of books down." href="/discover" label="Open discovery"/>
      <div className="discovery-grid"><Link href="/discover" className="discovery-card large"><div className="discovery-number">01</div><div><span className="discovery-icon">✦</span><h3>Tell us what you’re in the mood for</h3><p>Choose genre, mood, length, era and more. Get straightforward matches with explanations.</p></div><span className="arrow">↗</span></Link><Link href="/best/classic-books" className="discovery-card"><div className="discovery-number">02</div><div><span className="discovery-icon">◒</span><h3>Explore a curated list</h3><p>Human-written collections for questions like “where do I start?”</p></div><span className="arrow">↗</span></Link><Link href="/free-books" className="discovery-card"><div className="discovery-number">03</div><div><span className="discovery-icon">□</span><h3>Read something free</h3><p>Find public-domain classics and legal reading options.</p></div><span className="arrow">↗</span></Link></div>
    </section>

    <section className="section section-soft"><div className="container"><SectionHeading eyebrow="The editorial shelf" title="Curated collections" text="The strongest part of BooksHeaven: useful lists with a reason behind every pick." href="/best/classic-books" label="See all collections"/><div className="collection-grid">{lists.map((l: any, i: number) => <Link href={`/best/${l.slug}`} className="collection-card" key={String(l.slug)}><div className={`collection-art art-${(i%4)+1}`}><span>{String(l.title).split(" ").slice(0,2).join(" ")}</span><b>{String(i+1).padStart(2,"0")}</b></div><div className="collection-copy"><h3>{String(l.title)}</h3><p>{String(l.intro_text || "A hand-picked reading list.")}</p><span>Explore collection →</span></div></Link>)}</div></div></section>

    <section className="section container"><SectionHeading eyebrow="Popular now" title="Books readers are opening" text="A simple signal from the BooksHeaven catalog — no black-box ranking." href="/discover" label="Discover more"/><div className="book-grid">{popular.map((b: any) => <BookCard key={String(b.slug)} book={b}/>)}</div></section>

    <section className="manifesto"><div className="container manifesto-inner"><div><span className="eyebrow">Why BooksHeaven?</span><h2>A calmer way to discover books.</h2></div><div className="manifesto-points"><p><strong>Human curation.</strong> Editorial recommendations are written by people, not generated by a model.</p><p><strong>Useful information.</strong> Metadata is clean, focused and designed to help you decide.</p><p><strong>Open-ended discovery.</strong> The curated shelf stays opinionated while long-tail search keeps the catalog broad.</p></div></div></section>
  </>;
}
