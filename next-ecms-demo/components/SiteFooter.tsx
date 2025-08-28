// components/SiteFooter.tsx
export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t bg-gradient-to-r from-rose-600 to-sky-700 text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm opacity-95">
        <p>© {new Date().getFullYear()} SERENITY AT HOME · All rights reserved.</p>
      </div>
    </footer>
  );
}
