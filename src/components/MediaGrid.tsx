"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { MediaItem } from "@/lib/types";

type MediaGridProps = {
  images: MediaItem[];
  title: string;
  dense?: boolean;
  contained?: boolean;
};

export function MediaGrid({ images, title, dense = false, contained = true }: MediaGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <section className={`${contained ? "wm-container " : ""}mt-16`}>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
            Realizácie
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">{title}</h2>
        </div>
        <p className="text-sm font-semibold text-muted">{images.length} fotografií</p>
      </div>

      <div
        className={`grid gap-3 ${
          dense
            ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded border border-line bg-neutral-100"
            aria-label={`${title} fotografia ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt || `${title} ${index + 1}`}
              fill
              sizes={
                dense
                  ? "(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
                  : "(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 90vw"
              }
              className="object-cover transition duration-500 group-hover:scale-[1.035]"
            />
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
