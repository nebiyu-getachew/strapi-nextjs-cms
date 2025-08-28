import { fetchArticleBySlug, blocksWithEscapedHtmlToHtml } from "@/lib/api";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
  const article = await fetchArticleBySlug("contact");
  const title = article?.Title ?? "Contact Us";
  const html = article ? blocksWithEscapedHtmlToHtml(article.Body) : "";

  return (
    <section className="grid gap-6">
      <article className="prose prose-zinc max-w-none">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      {/* Form panel */}
      <div className="panel p-6">
        <ContactForm />
      </div>
    </section>
  );
}
