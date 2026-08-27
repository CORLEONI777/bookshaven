"use client";
import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="logo" onClick={() => setOpen(false)} aria-label="BooksHeaven home">
        <span className="logo-mark">B</span><span>Books<span className="logo-accent">Heaven</span></span>
      </Link>
      <nav className={`main-nav ${open ? "is-open" : ""}`}>
        <Link href="/discover" onClick={() => setOpen(false)}>Discover</Link>
        <Link href="/best/classic-books" onClick={() => setOpen(false)}>Collections</Link>
        <Link href="/free-books" onClick={() => setOpen(false)}>Free books</Link>
        <Link href="/authors/paulo-coelho" onClick={() => setOpen(false)}>Authors</Link>
      </nav>
      <div className="header-actions">
        <Link className="header-library" href="/discover">My library</Link>
        <button className="menu-button" aria-label="Toggle navigation" onClick={() => setOpen(v => !v)}><span></span><span></span></button>
      </div>
    </div>
  </header>;
}
