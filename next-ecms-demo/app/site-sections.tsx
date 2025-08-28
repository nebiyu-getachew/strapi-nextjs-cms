// app/site-sections.tsx
import Image from "next/image";

/* ---------------- Hero ---------------- */
export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-1.jpg"
          alt="Caring at home"
          fill
          priority
          className="object-cover"
        />
        {/* Softer, see-through brand tint (no solid white blanket) */}
        <div className="absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_12%_18%,_rgba(14,122,96,.12),_transparent_45%),_radial-gradient(circle_at_88%_24%,_rgba(136,120,174,.14),_transparent_50%),_linear-gradient(to_bottom,rgba(255,255,255,.35),rgba(255,255,255,.35))]" />
      </div>

      <div className="px-6 sm:px-10 py-10 sm:py-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[--color-ink]">
          Compassionate Care. Peace of Mind.
        </h1>
        <p className="mt-3 max-w-2xl text-[--color-ink-2]">
          Personalized in-home support tailored to your family’s needs.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="/contact" className="btn-primary">Get Care Now</a>
          <a href="/services" className="btn-ghost">Our Services</a>
          <a href="/join-our-team" className="btn-accent">Join Our Team</a>
        </div>
      </div>
    </section>
  );
}

/* --------------- Benefits --------------- */
export function BenefitsStrip() {
  const items = [
    { title: "Trusted Caregivers", text: "Licensed, trained, and matched to your needs." },
    { title: "Flexible Scheduling", text: "Hourly, overnight, or 24/7 live-in support." },
    { title: "Family Peace of Mind", text: "Clear communication and dependable care." },
  ];
  return (
    <section className="grid gap-4 sm:grid-cols-3">
      {items.map((b) => (
        <div key={b.title} className="panel">
          <h3 className="font-semibold">{b.title}</h3>
          <p className="mt-1 text-[--color-ink-2] text-sm">{b.text}</p>
        </div>
      ))}
    </section>
  );
}

/* --------------- Service cards --------------- */
export function ServicesCards() {
  const services = [
    { title: "Personal Care", text: "Bathing, grooming, dressing, & hygiene support." },
    { title: "Companionship", text: "Friendly conversation, activities, and outings." },
    { title: "Meal & Med Support", text: "Meal prep and timely medication reminders." },
  ];
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">How We Help</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="panel">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-1 text-[--color-ink-2] text-sm">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------- Photo gallery --------------- */
export function PhotoGallery() {
  const imgs = [
    "/images/caregiver-1.jpg",
    "/images/caregiver-2.jpg",
    "/images/caregiver-3.jpg",
    "/images/caregiver-4.jpg",
    "/images/caregiver-5.jpg",
    "/images/caregiver-6.jpg",
  ];
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Care, at Home</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {imgs.map((src, i) => (
          <div
            key={i}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-xl border bg-white"
          >
            <Image
              src={src}
              alt="Care at home"
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------- CTA --------------- */
export function JoinOurTeamCTA() {
  return (
    <section className="panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <h3 className="font-semibold">We’re Hiring Compassionate Caregivers</h3>
        <p className="text-[--color-ink-2] text-sm">
          Licensed HCA or looking to make a difference? Join our caring team.
        </p>
      </div>
      <a href="/contact" className="btn-accent">Apply / Ask About Openings</a>
    </section>
  );
}
