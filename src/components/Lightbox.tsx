"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { MediaItem } from "@/lib/types";

type LightboxProps = {
  images: MediaItem[];
  title: string;
  activeIndex: number | null;
  onClose: () => void;
};

export function Lightbox({ images, title, activeIndex, onClose }: LightboxProps) {
  const [displayIndex, setDisplayIndex] = useState(activeIndex ?? 0);
  const [phase, setPhase] = useState<"idle" | "changing">("idle");
  const open = activeIndex !== null && images.length > 0;

  const go = useCallback(
    (direction: 1 | -1) => {
      setPhase("changing");
      window.setTimeout(() => {
        setDisplayIndex((current) => (current + direction + images.length) % images.length);
        setPhase("idle");
      }, 140);
    },
    [images.length]
  );

  useEffect(() => {
    if (activeIndex !== null) {
      setDisplayIndex(activeIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, go]);

  if (!open) return null;

  const image = images[displayIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-[lightboxFade_200ms_ease-out] items-center justify-center bg-black/88 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} lightbox`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded bg-white text-ink transition hover:bg-redline hover:text-white"
        aria-label="Zatvoriť galériu"
        title="Zatvoriť"
        onClick={onClose}
      >
        <X aria-hidden="true" size={21} />
      </button>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-white text-ink transition hover:bg-redline hover:text-white"
            aria-label="Predchádzajúca fotografia"
            title="Predchádzajúca fotografia"
            onClick={() => go(-1)}
          >
            <ChevronLeft aria-hidden="true" size={25} />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded bg-white text-ink transition hover:bg-redline hover:text-white"
            aria-label="Ďalšia fotografia"
            title="Ďalšia fotografia"
            onClick={() => go(1)}
          >
            <ChevronRight aria-hidden="true" size={25} />
          </button>
        </>
      ) : null}

      <div className="grid w-[90vw] max-w-6xl gap-4">
        <div
          className={`relative h-[76vh] overflow-hidden rounded transition duration-200 ${
            phase === "changing" ? "scale-[0.985] opacity-50" : "scale-100 opacity-100"
          }`}
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt || `${title} ${displayIndex + 1}`}
            fill
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center justify-between gap-4 text-sm font-bold text-white">
          <p className="truncate">{image.alt || title}</p>
          <p className="shrink-0 text-white/64">
            {displayIndex + 1} / {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
