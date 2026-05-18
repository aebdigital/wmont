import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { MediaItem } from "@/lib/types";

export function MarqueeGallery({ images, title }: { images: MediaItem[]; title: string }) {
  // Split images into two rows
  const midpoint = Math.ceil(images.length / 2);
  const row1 = images.slice(0, midpoint);
  const row2 = images.slice(midpoint);

  // Duplicate for seamless loop
  const duplicatedRow1 = [...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2];

  return (
    <section className="mt-16 overflow-hidden md:mt-24 reveal">
      <div className="wm-container mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-normal text-redline">Galéria</p>
          <h2 className="mt-2 text-balance text-3xl font-extrabold leading-tight text-ink md:text-5xl">
            {title}
          </h2>
        </div>
        <Link
          href="/referencie"
          className="inline-flex h-12 items-center justify-center gap-2 rounded border border-line px-5 text-sm font-extrabold text-ink transition hover:bg-neutral-50"
        >
          Všetky referencie
          <ArrowUpRight aria-hidden="true" size={18} />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1 - Moves Left */}
        <div className="flex w-fit animate-marquee gap-4 pr-4 hover:[animation-play-state:paused]">
          {duplicatedRow1.map((media, idx) => (
            <div
              key={`r1-${idx}`}
              className="relative aspect-video w-[280px] shrink-0 overflow-hidden rounded bg-neutral-100 sm:w-[320px] md:w-[400px]"
            >
              <Image
                src={media.src}
                alt={media.alt || "Realizácia W-Mont"}
                fill
                sizes="(min-width: 768px) 400px, 280px"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Moves Right */}
        <div className="flex w-fit animate-marquee-reverse gap-4 pr-4 hover:[animation-play-state:paused]">
          {duplicatedRow2.map((media, idx) => (
            <div
              key={`r2-${idx}`}
              className="relative aspect-video w-[280px] shrink-0 overflow-hidden rounded bg-neutral-100 sm:w-[320px] md:w-[400px]"
            >
              <Image
                src={media.src}
                alt={media.alt || "Realizácia W-Mont"}
                fill
                sizes="(min-width: 768px) 400px, 280px"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
