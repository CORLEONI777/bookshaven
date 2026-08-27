import Link from "next/link";
export default function NotFound(){return <div className="container section"><div className="empty"><h1>Book not found</h1><p>We couldn't find that page in the curated catalog.</p><Link className="btn" href="/">Back home</Link></div></div>}
