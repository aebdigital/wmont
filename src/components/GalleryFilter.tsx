"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { MediaItem } from "@/lib/types";

type GalleryCategory = {
  label: string;
  images: MediaItem[];
};

type GalleryFilterProps = {
  categories: GalleryCategory[];
  fallbackImages: MediaItem[];
};

export function GalleryFilter({ categories, fallbackImages }: GalleryFilterProps) {
  const initialCategory = categories[0]?.label ?? "Referencie";
  const [active, setActive] = useState(initialCategory);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const allImages = useMemo(() => {
    if (!categories.length) return fallbackImages;

    const seen = new Set<string>();
    return categories.flatMap((category) =>
      category.images.filter((image) => {
        if (seen.has(image.src)) return false;
        seen.add(image.src);
        return true;
      })
    );
  }, [categories, fallbackImages]);

  const activeImages = categories.find((category) => category.label === active)?.images ?? allImages;

  return (
    <section className="wm-container mt-10 reveal">
      <div className="flex flex-wrap gap-2 border-y border-line py-4">
        {categories.map((category) => (
          <button
            key={category.label}
            type="button"
            onClick={() => {
              setActive(category.label);
              setActiveIndex(null);
            }}
            className={`h-11 rounded px-4 text-sm font-extrabold transition ${
              active === category.label
                ? "bg-redline text-white"
                : "border border-line text-ink hover:border-ink"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-ink md:text-4xl">{active}</h2>
        </div>
        <p className="text-sm font-semibold text-muted">{activeImages.length} fotografií</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" data-reveal-stagger="40">
        {activeImages.map((image, index) => (
          <button
            key={`${active}-${image.src}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded border border-line bg-neutral-100"
            aria-label={`${active} fotografia ${index + 1}`}
          >
            <Image
              src={image.src}
              alt={image.alt || `${active} ${index + 1}`}
              fill
              sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw"
              className="object-cover transition duration-500 group-hover:scale-[1.035]"
              loading={index < 4 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>
      <Lightbox
        images={activeImages}
        title={active}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
}
