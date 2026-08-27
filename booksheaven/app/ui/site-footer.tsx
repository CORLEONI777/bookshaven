import Link from "next/link";
export default function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Link href="/" className="footer-logo">Books<span>Heaven</span></Link><p>Find books worth your time. Human curation, clean information and simple discovery.</p></div>
    <div><h4>Explore</h4><Link href="/discover">What should I read?</Link><Link href="/best/classic-books">Collections</Link><Link href="/free-books">Free books</Link></div>
    <div><h4>Library</h4><Link href="/free-audiobooks">Audiobooks</Link><Link href="/authors/paulo-coelho">Authors</Link><Link href="/admin">Admin</Link></div>
    <div><h4>About</h4><Link href="/">Our approach</Link><Link href="/">Privacy</Link><Link href="/">Terms</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} BooksHeaven</span><span>Curated by humans · No AI-generated editorial content</span></div></footer>;
}
