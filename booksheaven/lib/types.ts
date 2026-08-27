export type Book = {
  id: number;
  slug: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  editorial_description?: string | null;
  why_this_book?: string | null;
  isbn?: string | null;
  language?: string | null;
  pages?: number | null;
  publication_date?: string | null;
  publisher?: string | null;
  cover_url?: string | null;
  rating?: number | null;
  rating_count?: number | null;
  public_domain: number;
  source: "curated" | "cached";
  view_count: number;
  authors?: { slug: string; name: string }[];
  genres?: { slug: string; name: string }[];
  links?: { provider: string; type: string; url: string; affiliate: number }[];
};

export type SearchResult = Pick<Book, "title" | "slug" | "cover_url" | "description" | "source"> & {
  authors: string[];
};
