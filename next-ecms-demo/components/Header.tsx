// components/Header.tsx
"use client";

import { mediaURL } from "@/lib/strapi";

/** Local types so this file is copy-paste ready */
type NavLink = { label?: string; url?: string; newTab?: boolean };
type Media = { url?: string | null } | null;
type Navbar = {
  backgroundColor?: string | null;
  textColor?: string | null;
  siteName?: string | null;
  logo?: Media;
  links?: NavLink[];
};

const FALLBACK_LINKS: NavLink[] = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
  { label: "Services", url: "/services" },
  { label: "Contact", url: "/contact" },
];

export default function HeaderUI({ navbar }: { navbar?: Navbar }) {
  const bg = navbar?.backgroundColor ?? "#075391";
  const fg = navbar?.textColor ?? "#ffffff";
  const links = (navbar?.links?.length ? navbar.links : FALLBACK_LINKS) as NavLink[];
  const siteName = navbar?.siteName ?? "SERENITY AT HOME";
  const logoUrl = navbar?.logo?.url ? mediaURL(navbar.logo.url) : null;

  return (
    <header
      className="site-header"
      style={{ background: bg, color: fg }}
      role="banner"
    >
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", height: "100%" }}
      >
        {/* Brand left */}
        <a href="/" className="brand" style={{ color: fg, textDecoration: "none" }}>
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} style={{ height: 34, width: "auto" }} />
          ) : (
            siteName
          )}
        </a>

        {/* Nav right */}
        <nav
          className="nav"
          aria-label="Primary"
          style={{ marginLeft: "auto", display: "flex", gap: 22, alignItems: "center" }}
        >
          {links.map((l, i) =>
            l?.url ? (
              <a
                key={`${l.url}-${i}`}
                href={l.url}
                target={l.newTab ? "_blank" : "_self"}
                style={{
                  color: fg,
                  textDecoration: "none",
                  fontWeight: 600,
                  opacity: 0.95,
                }}
              >
                {l.label ?? l.url}
              </a>
            ) : null
          )}
        </nav>
      </div>
    </header>
  );
}
