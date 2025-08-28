// lib/api.ts (Strapi v5 shape — NO "attributes" wrapper)
const base =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "http://127.0.0.1:1337";

export type BlockNode = {
  type: string;
  children?: Array<{ type?: string; text?: string }>;
};

export type Article = {
  id: number;
  documentId: string;
  Title: string | null;
  Slug: string;
  Body?: BlockNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

type StrapiList<T> = { data: T[] };

async function safeFetch(url: string, init?: RequestInit) {
  try {
    const res = await fetch(url, init); // ← no "cache: 'no-store'"
    return res;
  } catch (e: any) {
    throw new Error(`Unable to reach Strapi at ${url}. Is Strapi running? (${e?.message})`);
  }
}

export async function fetchArticles(): Promise<Article[]> {
  const res = await safeFetch(`${base}/api/articles?sort=Slug:asc`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} on /api/articles`);
  const json: StrapiList<Article> = await res.json();
  return json.data; // v5: fields are at top level already
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const params = new URLSearchParams({ "filters[Slug][$eq]": slug });
  const res = await safeFetch(`${base}/api/articles?${params}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} on /api/articles?${params}`);
  const json: StrapiList<Article> = await res.json();
  return json.data?.[0] ?? null;
}

/** Your current Blocks contain escaped HTML strings; convert to renderable HTML */
export function blocksWithEscapedHtmlToHtml(blocks: Article["Body"] | undefined) {
  const raw = (blocks ?? [])
    .flatMap((b) => (b.children ?? []).map((c) => c.text ?? ""))
    .join("\n");
  return raw.replace(/\\u003C/g, "<").replace(/\\u003E/g, ">").replace(/&amp;/g, "&");
}
