// components/Footer.tsx
"use client";

/** Local types so this file is copy-paste ready */
type LinkItem = { label?: string; url?: string; newTab?: boolean };
type Column = { title?: string; links?: LinkItem[] };

type FooterType = {
  bgColorUpperSection?: string | null;
  bgColorLowerSection?: string | null;
  gradientStart?: string | null;
  gradientEnd?: string | null;
  columns?: Column[];
  /** WYSIWYG HTML string OR blocks array */
  lowerContent?: string | any[];
};

type CTA = { label?: string; url?: string; newTab?: boolean };
type Banner = {
  isEnabled?: boolean;
  text?: string | any[];           // HTML string or blocks array
  backgroundColor?: string | null; // color of the right card
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
            <p key={i} style={{ margin: 0 }}>
              {text}
            </p>
          );
        }
        return null;
      })}
    </>
  );
}

export default function FooterUI({
  footer,
  banner,
}: {
  footer?: FooterType;
  banner?: Banner;
}) {
  const cols = footer?.columns ?? [];

  // Lower bar background
  const lowerBg =
    (footer?.gradientStart && footer?.gradientEnd
      ? `linear-gradient(90deg, ${footer.gradientStart}, ${footer.gradientEnd})`
      : null) ||
    footer?.bgColorLowerSection ||
    "#0b3a64";

  const bannerBg = banner?.backgroundColor ?? "rgba(80,70,180,.92)";

  return (
    <footer className="site-footer" role="contentinfo">
      {/* Optional upper columns */}
      <div
        className="footer-upper"
        style={{ background: footer?.bgColorUpperSection ?? "transparent" }}
      >
        {cols.length ? (
          <div className="container">
            <div className="footer-columns">
              {cols.map((col, i) => (
                <div key={i}>
                  {col.title ? <h4 style={{ margin: "10px 0" }}>{col.title}</h4> : null}
                  <div style={{ display: "grid", gap: 6 }}>
                    {col.links?.map((l, j) =>
                      l?.url ? (
                        <a
                          key={j}
                          href={l.url}
                          target={l.newTab ? "_blank" : "_self"}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {l.label ?? l.url}
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* LOWER full-width bar */}
      <div style={{ background: lowerBg, color: "#fff", width: "100%" }}>
        <div
          className="container"
          style={{
            minHeight: "var(--footer-h,84px)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* left: copyright */}
          <div style={{ flex: "1 1 auto" }}>
            {Array.isArray(footer?.lowerContent) ? (
              renderBlocks(footer?.lowerContent as any[])
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    (footer?.lowerContent as string) ??
                    "© Your Company",
                }}
              />
            )}
          </div>

          {/* right: hiring card */}
          {banner?.isEnabled ? (
            <div
              style={{
                flex: "0 0 auto",
                maxWidth: 560,
                color: "#fff",
                background: bannerBg,
                borderRadius: 12,
                padding: "14px 16px",
                boxShadow: "0 6px 18px rgba(0,0,0,.18)",
              }}
            >
              <div style={{ lineHeight: 1.35 }}>
                {typeof banner.text === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: banner.text }} />
                ) : Array.isArray(banner.text) ? (
                  renderBlocks(banner.text)
                ) : null}
              </div>

              {banner.cta?.url ? (
                <div style={{ marginTop: 8, textAlign: "right" }}>
                  <a
                    href={banner.cta.url}
                    target={banner.cta.newTab ? "_blank" : "_self"}
                    style={{
                      background: "rgba(255,255,255,.18)",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "6px 12px",
                      borderRadius: 6,
                      fontWeight: 600,
                      display: "inline-block",
                    }}
                  >
                    {banner.cta.label ?? "Learn more"}
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
