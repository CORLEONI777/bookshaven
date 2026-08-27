import Link from "next/link";
import { notFound } from "next/navigation";
import { queryBooks } from "@/lib/db";
import AdminBookForm from "../../book-form";
export default async function AdminBookEdit({params}:{params:Promise<{id:string}>}){const {id}=await params;const rows=await queryBooks(`SELECT * FROM books WHERE id=? LIMIT 1`,Number(id));if(!rows[0])notFound();return <div className="container admin"><Link className="muted" href="/admin">← Back to dashboard</Link><div className="eyebrow" style={{marginTop:20}}>Book editor</div><h1>{String(rows[0].title)}</h1><AdminBookForm book={rows[0]}/></div>}
