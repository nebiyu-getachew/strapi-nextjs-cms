"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [
  { src: "/images/caregiver-1.jpg", alt: "Caregiver with client smiling" },
  { src: "/images/caregiver-2.jpg", alt: "Meal preparation at home" },
  { src: "/images/caregiver-3.jpg", alt: "Medication reminders support" },
  { src: "/images/caregiver-4.jpg", alt: "Companionship at home" },
  { src: "/images/caregiver-5.jpg", alt: "Helping senior at home" },
];

export default function PhotoCarousel({ intervalMs = 4500 }: { intervalMs?: number }) {
  const [i, setI] = useState(0);
  const prev = () => setI((n) => (n - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setI((n) => (n + 1) % IMAGES.length);

  useEffect(() => {
    const id = setInterval(next, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border bg-white">
      {/* track */}
      <div
        className="relative h-[320px] sm:h-[380px] md:h-[460px] transition-transform duration-700"
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "100%",
          transform: `translateX(-${i * 100}%)`,
        }}
      >
        {IMAGES.map((img, idx) => (
          <div key={idx} className="relative w-full h-full">
            <Image fill priority={idx === 0} src={img.src} alt={img.alt} className="object-cover" />
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/80 px-3 py-1 text-sm shadow hover:bg-white"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/80 px-3 py-1 text-sm shadow hover:bg-white"
        aria-label="Next"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 w-2 rounded-full border border-white/70 ${idx === i ? "bg-white" : "bg-black/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
