// app/layout.tsx
import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* make the whole app a flex column so the footer sticks to the bottom */}
      <body
        className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col"
        suppressHydrationWarning
        data-gramm="false"      // optional: tells Grammarly not to inject
      >
        {/* HEADER: deep blue */}
        <header className="sticky top-0 z-40 border-b bg-sky-900 text-white/90">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold tracking-wide">
              SERENITY AT HOME
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/home" className="hover:underline">Home</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/services" className="hover:underline">Services</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
          </div>
        </header>

        {/* MAIN grows to fill, pushing footer down */}
        <main className="mx-auto max-w-6xl w-full px-4 py-8 flex-1">
          {children}
        </main>

        {/* FOOTER: gradient, with hiring bar on the right */}
        <footer className="border-t bg-gradient-to-r from-rose-600 to-sky-700 text-white">
          <div className="mx-auto max-w-6xl w-full px-4 py-5 flex items-start justify-between gap-6">
            <p className="text-sm opacity-95">
              © {new Date().getFullYear()} SERENITY AT HOME · All rights reserved.
            </p>
            <div className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm shadow-sm max-w-md">
              <div className="font-semibold">We’re Hiring Compassionate Caregivers</div>
              <div className="opacity-90">
                Licensed HCA or looking to make a difference? Join our caring team.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
