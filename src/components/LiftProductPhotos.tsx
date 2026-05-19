"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { MediaItem } from "@/lib/types";

type LiftProductPhotosProps = {
  photos: { src: string; alt: string }[];
  productName: string;
};

export function LiftProductPhotos({ photos, productName }: LiftProductPhotosProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lightboxImages: MediaItem[] = photos.map((photo) => ({
    type: "image",
    ...photo,
  }));

  return (
    <>
      <div
        className={`mt-6 grid gap-4 ${
          photos.length > 1 ? "md:grid-cols-2" : "max-w-2xl"
        }`}
      >
        {photos.map((photo, photoIndex) => {
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(photoIndex)}
              className="group relative aspect-[4/3] overflow-hidden rounded border border-line bg-neutral-100"
              aria-label={`Otvoriť fotografiu ${productName} ${photoIndex + 1}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt || productName}
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-contain p-2 transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
          );
        })}
      </div>

      <Lightbox
        images={lightboxImages}
        title={productName}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </>
  );
}
