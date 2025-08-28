"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // if you don’t have cn, just remove it

const IMAGES = [
  { src: "/images/caregiver-1.jpg", alt: "Caregiver with client smiling" },
  { src: "/images/caregiver-2.jpg", alt: "Meal preparation at home" },
  { src: "/images/caregiver-3.jpg", alt: "Medication reminders support" },
  { src: "/images/caregiver-4.jpg", alt: "Care at home companionship" },
  { src: "/images/caregiver-5.jpg", alt: "Caregiver helping senior" },
];

type Props = {
  auto?: boolean;
  intervalMs?: number;
  className?: string;
};

export default function CaregiverCarousel({ auto = true, intervalMs = 4500, className }: Props) {
  const [i, setI] = useState(0);

  // Auto-advance
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setI((n) => (n + 1) % IMAGES.length), intervalMs);
    return () => clearInterval(id);
  }, [auto, intervalMs]);

  const prev = () => setI((n) => (n - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setI((n) => (n + 1) % IMAGES.length);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden rounded-2xl border bg-white", className)}>
      {/* slides */}
      <div
        className="relative h-[320px] sm:h-[380px] md:h-[460px] w-full transition-transform duration-700"
        style={{ transform: `translateX(-${i * 100}%)`, display: "grid", gridAutoFlow: "column", gridAutoColumns: "100%" }}
      >
        {IMAGES.map((img, idx) => (
          <div key={idx} className="relative h-full w-full">
            <Image src={img.src} alt={img.alt} fill className="object-cover" priority={idx === 0} />
          </div>
        ))}
      </div>

      {/* controls */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/80 px-3 py-1 text-sm shadow hover:bg-white"
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border bg-white/80 px-3 py-1 text-sm shadow hover:bg-white"
        aria-label="Next image"
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
            className={cn(
              "h-2 w-2 rounded-full border border-white/70",
              idx === i ? "bg-white" : "bg-black/30"
            )}
          />
        ))}
      </div>
    </div>
  );
}
