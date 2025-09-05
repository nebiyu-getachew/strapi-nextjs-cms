// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { strapiFetch } from "@/lib/strapi";
import HeaderUI from "@/components/Header";
import FooterUI from "@/components/Footer";

export const metadata: Metadata = {
  title: "Serenity at Home",
  description: "Home care you can trust",
};

async function getGlobal() {
  const json = await strapiFetch<any>({
    path: "/api/global?populate=*",
    next: { tags: ["global"] },
  });
  // Strapi can return {data:{id,attributes}} or just {data:{...}}
  return (json?.data?.attributes ?? json?.data) as any;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const global = await getGlobal();

  const theme = global?.theme ?? {};
  const navbar = global?.navbar ?? {};

  const styleVars: React.CSSProperties = {
    ["--color-primary" as any]: navbar.backgroundColor ?? "#075391",
    ["--color-secondary" as any]: theme.secondaryColor ?? "#E61D5F",
    ["--color-surface" as any]: theme.surface ?? "#f6f7f9",
    ["--color-onsurface" as any]: theme.onSurface ?? "#111111",
    ["--header-h" as any]: "66px",
    ["--footer-h" as any]: "84px",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={styleVars}
        className="bg-surface text-onsurface"
        suppressHydrationWarning
      >
        <HeaderUI navbar={global?.navbar} />
        <main className="page-shell">{children}</main>
        <FooterUI footer={global?.footer} banner={global?.notificationBanner} />
      </body>
    </html>
  );
}
