import { fetchArticleBySlug, blocksWithEscapedHtmlToHtml } from "@/lib/api";
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const article = await fetchArticleBySlug("services");
  const title = article?.Title ?? "Our Services";
  const html = article?.Body ? blocksWithEscapedHtmlToHtml(article.Body) : "";

  return (
    <article className="prose prose-zinc max-w-3xl">
      <h1>{title}</h1>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <ul className="list-disc pl-6">
          <li>Personal Care Assistance</li>
          <li>Companionship</li>
          <li>Meal Preparation</li>
          <li>Medication Reminders</li>
          <li>Light Housekeeping</li>
          <li>Dementia & Alzheimer’s Care</li>
          <li>Respite Care for Families</li>
        </ul>
      )}
    </article>
  );
}
