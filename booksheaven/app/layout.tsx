import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "./ui/site-header";
import SiteFooter from "./ui/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://booksheaven.com"),
  title: { default: "BooksHeaven — Find books worth your time", template: "%s | BooksHeaven" },
  description: "Human-curated book discovery, trusted information, legal reading links and simple recommendations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SiteHeader/><main>{children}</main><SiteFooter/></body></html>;
}
