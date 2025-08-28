// app/contact/page.tsx
import { fetchArticleBySlug, blocksWithEscapedHtmlToHtml } from "@/lib/api";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const article = await fetchArticleBySlug("contact").catch(() => null);
  const title = article?.Title ?? "Contact Us";
  const html = article?.Body ? blocksWithEscapedHtmlToHtml(article.Body) : "";

  return (
    <section className="grid gap-6">
      <article className="prose prose-zinc max-w-none">
        <h1>{title}</h1>
        {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
      </article>

      {/* Form panel */}
      <div className="rounded-2xl border bg-white p-6">
        <ContactForm />
      </div>

      {/* small spacer so the footer doesn’t crowd the form */}
      <div className="h-4" />
    </section>
  );
}
