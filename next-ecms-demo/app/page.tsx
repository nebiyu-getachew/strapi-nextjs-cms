// app/page.tsx
import ImageCarousel from "@/components/ImageCarousel";
import { strapiFetch, mediaURL } from "@/lib/strapi";

/** Works with both Strapi v4 (data.attributes) and v5 (data) */
async function getHome() {
  const json = await strapiFetch<any>({
    path: "/api/home?populate=*",
    next: { tags: ["home"] },
  });
  // Support both shapes
  return (json?.data?.attributes ?? json?.data) as any;
}

export default async function HomePage() {
  const home = await getHome();

  // Strapi v5: home.carousel is an array of file objects
  // Strapi v4: home.carousel?.data is an array of { attributes: file }
  const rawImages: any[] = Array.isArray(home?.carousel)
    ? home.carousel
    : Array.isArray(home?.carousel?.data)
    ? home.carousel.data.map((d: any) => d?.attributes)
    : [];

  const slides =
    rawImages.map((img: any) => {
      const best =
        img?.formats?.large?.url ||
        img?.formats?.medium?.url ||
        img?.formats?.small?.url ||
        img?.url;
      return {
        src: mediaURL(best),
        alt: img?.alternativeText ?? "",
      };
    }) ?? [];

  return (
    <div className="container">
      <h1>Welcome to SERENITY AT HOME</h1>
      <p>
        Welcome to <strong>SERENITY AT HOME</strong> where your loved one’s comfort, safety, and
        dignity come first. We provide personalized home care services designed to meet the unique
        needs of each client, right from the comfort of their home. Let us help bring peace of mind
        to your family.
      </p>

      <div style={{ margin: "20px 0 8px" }}>
        <ImageCarousel slides={slides} height={420} />
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
        <a className="btn" href="/contact">Get Care Now</a>
        <a className="btn" href="/services" style={{ background: "var(--color-secondary)" }}>
          Learn More About Our Services
        </a>
        <a className="btn" href="/careers">Join Our Team</a>
      </div>

      <div style={{ height: 28 }} />
      <h2>Why Families Choose Us</h2>
      <div className="card" style={{ padding: 16, display: "grid", gap: 12, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        <div><h3>Trusted Caregivers</h3><p>Licensed, trained, and matched to your needs.</p></div>
        <div><h3>Flexible Scheduling</h3><p>Hourly, overnight, or 24/7 live-in support.</p></div>
        <div><h3>Family Peace of Mind</h3><p>Clear communication and dependable care.</p></div>
      </div>

      <div style={{ height: 28 }} />
      <h2>How We Help</h2>
      <div className="card" style={{ padding: 16, display: "grid", gap: 12, gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        <div><h3>Personal Care</h3><p>Bathing, grooming, dressing, &amp; hygiene support.</p></div>
        <div><h3>Companionship</h3><p>Friendly conversation, activities, and outings.</p></div>
        <div><h3>Meal &amp; Med Support</h3><p>Meal prep and timely medication reminders.</p></div>
      </div>
    </div>
  );
}
