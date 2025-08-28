"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/home", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <a href="/home" className="flex items-center gap-3">
          <Image src="/serenity-logo.svg" alt="Serenity at Home" width={32} height={32} priority />
          <span className="font-semibold tracking-wide">SERENITY AT HOME</span>
        </a>

        <nav className="flex gap-6 text-sm text-[--color-ink-2]">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={clsx(
                  "relative hover:text-[--color-brand-600] transition",
                  active && "text-[--color-ink]"
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-[--color-brand-600] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
