"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type Slide = { src: string; title: string; href: string };

const INTERVAL = 5000;

/**
 * Striedanie fotiek v hero sekcii.
 *
 * Fotky sa nenačítavajú všetky naraz — v DOM je vždy len aktuálna a nasledujúca.
 * Inak by úvodná obrazovka ťahala ~1,5 MB a pokazila by sa rýchlosť načítania.
 */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState<number[]>([0]);

  /* pripravíme si dopredu len nasledujúcu fotku */
  useEffect(() => {
    const next = (index + 1) % slides.length;
    setMounted((prev) => (prev.includes(next) ? prev : [...prev, next]));
  }, [index, slides.length]);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((v) => (v + 1) % slides.length), INTERVAL);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  const active = slides[index];

  return (
    <div
      className="hero-photo"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, i) =>
        mounted.includes(i) ? (
          <Link
            key={slide.src}
            href={slide.href}
            className={`hero-slide${i === index ? " is-active" : ""}`}
            tabIndex={i === index ? 0 : -1}
            aria-hidden={i !== index}
          >
            <img
              src={slide.src}
              alt={slide.title}
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </Link>
        ) : null,
      )}

      <div className="hero-caption">
        <span className="hero-caption-label">Naša práca</span>
        <strong key={active.title}>{active.title}</strong>
      </div>

      <div className="hero-dots" role="tablist" aria-label="Prepnúť fotku">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            role="tab"
            aria-current={i === index}
            aria-label={slide.title}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
