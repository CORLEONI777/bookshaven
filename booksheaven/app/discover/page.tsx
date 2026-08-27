import Link from "next/link";
import { queryBooks } from "@/lib/db";
import BookCard from "../ui/book-card";

export default async function Discover() {
  const books = await queryBooks(`SELECT slug,title,cover_url,description,rating,pages FROM books ORDER BY rating DESC, view_count DESC LIMIT 8`);
  return <div className="page-shell"><div className="container">
    <span className="eyebrow">Rule-based discovery</span><h1 className="page-title">What should you read?</h1><p className="muted" style={{maxWidth:650,lineHeight:1.7}}>Start with a few preferences. BooksHeaven compares shared genres, tags, authors, era, length and rating — simple rules, transparent matches.</p>
    <div className="panel" style={{marginTop:30}}><div className="form-grid"><div className="field"><label>Genre</label><select><option>Any genre</option><option>Fiction</option><option>Fantasy</option><option>Philosophy</option><option>History</option></select></div><div className="field"><label>Mood</label><select><option>Any mood</option><option>Thoughtful</option><option>Adventurous</option><option>Calm</option><option>Dark</option></select></div><div className="field"><label>Length</label><select><option>Any length</option><option>Under 200 pages</option><option>200–350 pages</option><option>350+ pages</option></select></div><div className="field"><label>Era</label><select><option>Any era</option><option>Classic</option><option>20th century</option><option>Contemporary</option></select></div></div><div style={{marginTop:18}}><button className="btn">Find my next book</button></div></div>
    <div style={{marginTop:70}}><div className="section-heading"><div><span className="eyebrow">Sample matches</span><h2>Books to start with</h2></div><Link className="text-link" href="/best/classic-books">Browse curated lists ↗</Link></div><div className="book-grid">{books.map((b:any)=><BookCard key={String(b.slug)} book={b}/>)}</div></div>
  </div></div>;
}
