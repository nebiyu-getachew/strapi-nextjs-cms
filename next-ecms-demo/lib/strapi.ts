// lib/strapi.ts
export const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_URL ||
  "http://127.0.0.1:1337";

const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

type FetchOpts = {
  path: string;
  next?: { revalidate?: number; tags?: string[] };
  cache?: RequestCache;
};

export async function strapiFetch<T>({
  path,
  next,
  cache,
}: FetchOpts): Promise<T> {
  const url = `${STRAPI_URL}${path}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(url, {
    headers,
    next: next ?? { tags: ["global"] },
    cache,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Strapi fetch failed ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

/** Prefix relative Strapi media URLs with STRAPI_URL */
export function mediaURL(url?: string | null) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}
