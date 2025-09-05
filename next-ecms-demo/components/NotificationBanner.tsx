// components/NotificationBanner.tsx
"use client";

import Link from "next/link";

type CTA = { label?: string; url?: string; newTab?: boolean };
export type Banner = {
  isEnabled?: boolean;
  text?: string | any[]; // string HTML (WYSIWYG) or blocks
  backgroundColor?: string | null;
  cta?: CTA | null;
};

function renderBlocks(blocks: any[]): JSX.Element {
  return (
    <>
      {blocks?.map((node: any, i: number) => {
        if (node?.type === "paragraph") {
          const text = Array.isArray(node.children)
            ? node.children.map((c: any) => c?.text ?? "").join("")
            : "";
          return (
            <p key={i} style={{ margin: "0 0 6px" }}>
              {text}
            </p>
          );
        }
        return null;
      })}
    </>
  );
}

export default function NotificationBanner({ banner }: { banner?: Banner }) {
  if (!banner?.isEnabled) return null;

  const bg = banner.backgroundColor ?? "rgba(80,70,180,.92)";
  const isHtmlString = typeof banner.text === "string";
  const isBlocks = Array.isArray(banner.text);

  return (
    <div className="banner-wrap" role="status" aria-live="polite">
      <div className="banner-box" style={{ background: bg }}>
        <div style={{ lineHeight: 1.35 }}>
          {isHtmlString ? (
            <div dangerouslySetInnerHTML={{ __html: banner.text as string }} />
          ) : isBlocks ? (
            renderBlocks(banner.text as any[])
          ) : null}
        </div>

        {banner.cta?.url ? (
          <div style={{ marginTop: 10 }}>
            <Link
              href={banner.cta.url}
              target={banner.cta.newTab ? "_blank" : "_self"}
              className="btn"
              style={{ background: "rgba(255,255,255,.18)", color: "#fff" }}
            >
              {banner.cta.label ?? "Learn more"}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
