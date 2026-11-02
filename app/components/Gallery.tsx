"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Labels = { prev: string; next: string; slide: string; of: string; gallery: string };

/**
 * A swipeable strip of project screens. Native scroll-snap does the moving (so touch and
 * trackpads work without JS); this component only adds arrows, dots and the counter.
 */
export function Gallery({
  srcs,
  width,
  height,
  name,
  labels,
  sizes,
  priority = false,
  large = false,
  aspect,
}: {
  srcs: string[];
  width: number;
  height: number;
  name: string;
  labels: Labels;
  sizes: string;
  priority?: boolean;
  large?: boolean;
  /** Force a frame ratio (e.g. "16 / 10") so mixed-size mockups line up; defaults to the image's own. */
  aspect?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = srcs.length;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const slides = Array.from(el.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(slides.indexOf(e.target));
      },
      { root: el, threshold: 0.6 },
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // scrollIntoView respects the writing direction, so the same code works in RTL.
  const go = (i: number) => {
    const slide = track.current?.children[(i + n) % n] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  return (
    <div
      className={`gallery${large ? " gallery-lg" : ""}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${labels.gallery} ${name}`}
      onKeyDown={(e) => {
        const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
        if (e.key === "ArrowRight") go(active + (rtl ? -1 : 1));
        if (e.key === "ArrowLeft") go(active + (rtl ? 1 : -1));
      }}
    >
      <div className="gallery-track" ref={track} tabIndex={0} style={{ aspectRatio: aspect ?? `${width} / ${height}` }}>
        {srcs.map((src, i) => (
          <div
            key={src}
            className="gallery-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${labels.slide} ${i + 1} ${labels.of} ${n}`}
          >
            <Image
              src={src}
              alt={`${name} — ${labels.slide} ${i + 1}`}
              width={width}
              height={height}
              sizes={sizes}
              priority={priority && i === 0}
              draggable={false}
            />
          </div>
        ))}
      </div>
      {n > 1 && (
        <div className="gallery-ui">
          <button type="button" className="gallery-btn gallery-prev" onClick={() => go(active - 1)} aria-label={labels.prev}>
            <span aria-hidden>‹</span>
          </button>
          <div className="gallery-dots">
            {srcs.map((src, i) => (
              <button
                key={src}
                type="button"
                className="gallery-dot"
                aria-label={`${labels.slide} ${i + 1}`}
                aria-current={i === active}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <span className="gallery-count" aria-live="polite" dir="ltr">
            {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <button type="button" className="gallery-btn gallery-next" onClick={() => go(active + 1)} aria-label={labels.next}>
            <span aria-hidden>›</span>
          </button>
        </div>
      )}
    </div>
  );
}
