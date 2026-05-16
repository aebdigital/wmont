"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { MediaItem } from "@/lib/types";

type MediaGridProps = {
  images: MediaItem[];
  title: string;
  cols?: "default" | "dense" | "trio";
  contained?: boolean;
  fit?: "cover" | "contain";
  aspect?: "4/3" | "3/4" | "1/1";
  showHeader?: boolean;
  showCaptions?: boolean;
};

const COLS_CLASS: Record<NonNullable<MediaGridProps["cols"]>, string> = {
  default: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  dense: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
  trio: "grid-cols-2 md:grid-cols-3",
};

const COLS_SIZES: Record<NonNullable<MediaGridProps["cols"]>, string> = {
  default: "(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 90vw",
  dense: "(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw",
  trio: "(min-width: 768px) 30vw, 45vw",
};

export function MediaGrid({
  images,
  title,
  cols = "default",
  contained = true,
  fit = "cover",
  aspect = "4/3",
  showHeader = true,
  showCaptions = false,
}: MediaGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  const aspectClass =
    aspect === "3/4" ? "aspect-[3/4]" : aspect === "1/1" ? "aspect-square" : "aspect-[4/3]";
  const fitClass = fit === "contain" ? "object-contain p-2" : "object-cover";
  const cellBg = fit === "contain" ? "bg-white" : "bg-neutral-100";

  return (
    <section className={`${contained ? "wm-container " : ""}mt-16`}>
      {showHeader ? (
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
              Realizácie
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{title}</h2>
          </div>
          <p className="text-sm font-semibold text-muted">{images.length} fotografií</p>
        </div>
      ) : null}

      <div className={`grid gap-3 ${COLS_CLASS[cols]}`}>
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group relative ${aspectClass} overflow-hidden rounded border border-line ${cellBg}`}
            aria-label={`${title} fotografia ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt || `${title} ${index + 1}`}
              fill
              sizes={COLS_SIZES[cols]}
              className={`${fitClass} transition duration-500 group-hover:scale-[1.035]`}
            />
            {showCaptions && image.alt ? (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-3 text-left text-sm font-extrabold leading-tight text-white drop-shadow-md md:text-base">
                  {image.alt}
                </span>
              </>
            ) : null}
          </button>
        ))}
      </div>
      <Lightbox
        images={images}
        title={title}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
}
