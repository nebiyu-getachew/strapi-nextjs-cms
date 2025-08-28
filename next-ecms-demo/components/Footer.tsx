export default function Footer() {
  return (
    <footer className="border-t mt-16 bg-white/80">
      <div className="mx-auto max-w-5xl px-4 py-10 grid gap-8 sm:grid-cols-2 items-center">
        <div>
          <h2 className="text-base font-semibold text-[--color-ink]">
            We’re Hiring Compassionate Caregivers
          </h2>
          <p className="mt-1 text-sm text-[--color-ink-2]">
            Licensed HCA or looking to make a difference? Join our caring team.
          </p>
          <a href="/join-our-team" className="mt-3 btn-primary">Join Our Team</a>
        </div>
        <div className="sm:text-right text-sm text-[--color-ink-2]">
          © {new Date().getFullYear()} SERENITY AT HOME · All rights reserved.
        </div>
      </div>
    </footer>
  );
}
