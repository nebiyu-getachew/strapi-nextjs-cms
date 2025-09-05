// components/ImageCarousel.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { mediaURL } from "@/lib/strapi";

export type CarouselSlide = {
  /** Relative or absolute URL from Strapi (e.g. "/uploads/abc.jpg" or "http://127.0.0.1:1337/uploads/abc.jpg") */
  src: string;
  /** Optional alt text */
  alt?: string;
  /** Optional natural dimensions (if you have them); not required because we use fill */
  width?: number;
  height?: number;
};

export default function ImageCarousel({
  slides,
  intervalMs = 4500,
  height = 420,
  rounded = 12,
}: {
  slides: CarouselSlide[];
  /** Autoplay interval in ms */
  intervalMs?: number;
  /** Fixed height of the carousel (px) */
  height?: number;
  /** Border radius (px) */
  rounded?: number;
}) {
  // Clean & normalize slide inputs
  const cleanSlides = useMemo(
    () =>
      (slides ?? [])
        .filter(Boolean)
        .map((s) => ({
          src: mediaURL(s.src), // prefix relative Strapi URLs
          alt: s.alt ?? "",
        })),
    [slides]
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (cleanSlides.length <= 1) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % cleanSlides.length), intervalMs);
    return () => clearInterval(id);
  }, [cleanSlides.length, intervalMs]);

  // Helpful placeholder when there are no images yet
  if (!cleanSlides.length) {
    return (
      <div
        className="card"
        style={{
          height,
          borderRadius: rounded,
          display: "grid",
          placeItems: "center",
          background: "#e9eef5",
          color: "rgba(0,0,0,.6)",
        }}
      >
        <div>
          Add images to <b>Home.carousel</b> in Strapi
        </div>
      </div>
    );
  }

  const go = (delta: number) =>
    setIdx((i) => (i + delta + cleanSlides.length) % cleanSlides.length);

  return (
    <div
      className="card"
      style={{
        position: "relative",
        overflow: "hidden",
        height,
        borderRadius: rounded,
      }}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      {cleanSlides.map((s, i) => (
        <div
          key={i}
          aria-hidden={i !== idx}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity .6s ease",
          }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1100px"
            style={{ objectFit: "cover" }}
            priority={i === 0}
          />
        </div>
      ))}

      {/* Prev/Next buttons */}
      <div
        style={{
          position: "absolute",
          inset: "50% auto auto 12px",
          transform: "translateY(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 2,
        }}
      >
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="btn"
          style={{ padding: "8px 10px" }}
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="btn"
          style={{ padding: "8px 10px" }}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 10,
          display: "flex",
          gap: 6,
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        {cleanSlides.map((_, i) => (
          <div
            key={i}
            role="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIdx(i)}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: i === idx ? "white" : "rgba(255,255,255,.65)",
              cursor: "pointer",
              boxShadow: "0 0 0 1px rgba(0,0,0,.18) inset",
            }}
          />
        ))}
      </div>
    </div>
  );
}
