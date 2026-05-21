"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { MediaItem } from "@/lib/types";

type GateType = {
  title: string;
  image: string | null;
};

export function GateTypesGrid({ gateTypes }: { gateTypes: GateType[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Build lightbox images array (only items that have an image)
  const lightboxImages: MediaItem[] = gateTypes
    .filter((g) => g.image !== null)
    .map((g) => ({ type: "image" as const, src: g.image!, alt: g.title }));

  // Map from gateTypes index → lightboxImages index
  function toLightboxIndex(gateIndex: number): number | null {
    const item = gateTypes[gateIndex];
    if (!item.image) return null;
    return lightboxImages.findIndex((img) => img.src === item.image);
  }

  return (
    <>
      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
          Typy brán
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {gateTypes.map((type, i) => (
            <button
              key={type.title}
              type="button"
              onClick={() => {
                const idx = toLightboxIndex(i);
                if (idx !== null) setActiveIndex(idx);
              }}
              className="group relative aspect-square overflow-hidden rounded border border-line bg-ink text-left cursor-pointer"
            >
              {type.image ? (
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 45vw"
                  className="object-cover opacity-82 transition duration-500 group-hover:scale-[1.05] group-hover:opacity-100"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/26 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-balance text-lg font-extrabold leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] md:text-xl">
                  {type.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        title="Typy brán"
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
