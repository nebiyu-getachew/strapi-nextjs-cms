import { fetchArticleBySlug, blocksWithEscapedHtmlToHtml } from "@/lib/api";
export const dynamic = "force-dynamic"; // or "auto", your call

export default async function AboutPage() {
  const article = await fetchArticleBySlug("about");
  const title = article?.Title ?? "About Us";
  const html = article?.Body ? blocksWithEscapedHtmlToHtml(article.Body) : "";

  return (
    <article className="prose prose-zinc max-w-3xl">
      <h1>{title}</h1>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <p>We’re updating this page — check back soon.</p>
      )}
    </article>
  );
}
