// app/home/page.tsx
import ImageCarousel from "@/components/ImageCarousel";

export default function HomePage() {
  return (
    <div className="container space-y-12">
      {/* Hero intro */}
      <section className="section">
        <h1 className="display">Welcome to SERENITY AT HOME</h1>
        <p className="lead">
          Welcome to <strong>SERENITY AT HOME</strong> where your loved one’s comfort, safety, and dignity
          come first. We provide personalized home care services designed to meet the unique needs of each
          client, right from the comfort of their home. Let us help bring peace of mind to your family.
        </p>

        <div className="card card-elevated">
          <ImageCarousel />
        </div>

        {/* CTA bar */}
        <div className="cta-bar">
          <a className="btn btn-primary" href="/contact">Get Care Now</a>
          <a className="btn btn-secondary" href="/services">Learn More About Our Services</a>
          <a className="btn btn-ghost" href="/careers">Join Our Team</a>
        </div>
      </section>

      {/* Why Families Choose Us */}
      <section className="section">
        <h2 className="section-title">Why Families Choose Us</h2>

        <div className="feature-grid">
          <article className="card card-hover">
            <h3 className="card-title">Trusted Caregivers</h3>
            <p className="card-body">
              Licensed, trained, and matched to your needs.
            </p>
          </article>

          <article className="card card-hover">
            <h3 className="card-title">Flexible Scheduling</h3>
            <p className="card-body">
              Hourly, overnight, or 24/7 live-in support.
            </p>
          </article>

          <article className="card card-hover">
            <h3 className="card-title">Family Peace of Mind</h3>
            <p className="card-body">
              Clear communication and dependable care.
            </p>
          </article>
        </div>
      </section>

      {/* How We Help */}
      <section className="section">
        <h2 className="section-title">How We Help</h2>

        <div className="feature-grid">
          <article className="card card-hover">
            <h3 className="card-title">Personal Care</h3>
            <p className="card-body">
              Bathing, grooming, dressing, &amp; hygiene support.
            </p>
          </article>

          <article className="card card-hover">
            <h3 className="card-title">Companionship</h3>
            <p className="card-body">
              Friendly conversation, activities, and outings.
            </p>
          </article>

          <article className="card card-hover">
            <h3 className="card-title">Meal &amp; Med Support</h3>
            <p className="card-body">
              Meal prep and timely medication reminders.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
