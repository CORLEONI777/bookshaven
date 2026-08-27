import Link from "next/link";
export default function SectionHeading({ eyebrow, title, text, href, label }: { eyebrow?: string; title: string; text?: string; href?: string; label?: string }) {
  return <div className="section-heading"><div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{text ? <p>{text}</p> : null}</div>{href ? <Link className="text-link" href={href}>{label || "View all"} <span>↗</span></Link> : null}</div>;
}
