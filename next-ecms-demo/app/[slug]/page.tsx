// app/[slug]/page.tsx
import {
  fetchArticleBySlug,
  fetchArticles,
  blocksWithEscapedHtmlToHtml,
} from "@/lib/api";
import { notFound } from "next/navigation";
import PhotoCarousel from "@/components/PhotoCarousel";

export async function generateStaticParams() {
  const list = await fetchArticles().catch(() => []);
  const items = Array.isArray(list) ? list : (list as any)?.data ?? [];
  return items
    .map((a: any) => a?.attributes?.Slug || a?.attributes?.slug)
    .filter(Boolean)
    .map((slug: string) => ({ slug }));
}

export const dynamic = "force-dynamic";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const article = await fetchArticleBySlug(slug).catch(() => null);
  if (!article) return notFound();

  const title = article?.Title ?? "Page";

  // Convert & CLEAN html for welcome/home case
  let html = article?.Body ? blocksWithEscapedHtmlToHtml(article.Body) : "";
  html = html.replace(
    /<ul>[\s\S]*?(Get Care Now|Learn More About Our Services|Join Our Team)[\s\S]*?<\/ul>/gi,
    ""
  );

  if (slug === "home") {
    const benefits = [
      { title: "Trusted Caregivers", desc: "Licensed, trained, and matched to your needs." },
      { title: "Flexible Scheduling", desc: "Hourly, overnight, or 24/7 live-in support." },
      { title: "Family Peace of Mind", desc: "Clear communication and dependable care." },
    ];
    const services = [
      { title: "Personal Care", desc: "Bathing, grooming, dressing, & hygiene support." },
      { title: "Companionship", desc: "Friendly conversation, activities, and outings." },
      { title: "Meal & Med Support", desc: "Meal prep and timely medication reminders." },
    ];

    return (
      <section className="space-y-8">
        {/* Welcome (cleaned) */}
        <article className="prose prose-zinc max-w-none">
          <h1 className="mb-3">{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        {/* Slideshow */}
        <div>
          <h2 className="mb-3 text-xl font-semibold">Care, at Home</h2>
          <PhotoCarousel />
        </div>

        {/* Benefits */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Why Families Choose Us</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-zinc-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">How We Help</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s, i) => (
              <div key={i} className="rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-zinc-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </section>
    );
  }

  // Other CMS pages
  return (
    <article className="prose prose-zinc mx-auto">
      <h1 className="mb-3">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
