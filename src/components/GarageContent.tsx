"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Lightbox } from "@/components/Lightbox";
import type { ContentBlock, MediaItem } from "@/lib/types";

type GarageContentProps = {
  blocks: ContentBlock[];
  images: MediaItem[];
};

const imageGroups: Record<number, { title: string; start: number; end: number }> = {
  14: { title: "Krídlová garážová brána", start: 0, end: 2 },
  16: { title: "Rolovacia garážová brána", start: 2, end: 4 },
  18: { title: "Sekčná garážová brána", start: 4, end: 6 }
};

function InlineImageGrid({
  group,
  images,
  offset,
  onOpen
}: {
  group: { title: string; start: number; end: number };
  images: MediaItem[];
  offset: number;
  onOpen: (index: number) => void;
}) {
  const groupImages = images.slice(group.start, group.end);

  if (!groupImages.length) return null;

  return (
    <div className="my-8 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
      {groupImages.map((image, index) => (
        <button
          key={image.src}
          type="button"
          onClick={() => onOpen(offset + index)}
          className="group relative aspect-[4/3] overflow-hidden rounded border border-line bg-neutral-100"
          aria-label={`${group.title} fotografia ${index + 1}`}
        >
          <Image
            src={image.src}
            alt={image.alt || `${group.title} ${index + 1}`}
            fill
            sizes="(min-width: 1280px) 28vw, (min-width: 768px) 44vw, 90vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        </button>
      ))}
    </div>
  );
}

export function GarageContent({ blocks, images }: GarageContentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const garageImages: MediaItem[] = [
    {
      type: "image",
      src: "/kridlova1.png",
      alt: "Krídlová garážová brána"
    },
    ...images
  ];
  const rendered: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (!listItems.length) return;
    rendered.push(
      <ul key={key} className="my-6 grid gap-3">
        {listItems.map((item) => (
          <li
            key={item}
            className="border-l-2 border-redline pl-4 text-sm font-medium leading-7 text-ink/78"
          >
            {item}
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  blocks.forEach((block, index) => {
    if (block.type === "list") {
      listItems.push(block.text);
      return;
    }

    flushList(`list-${index}`);

    if (block.type === "heading") {
      rendered.push(
        <h2
          key={`${block.text}-${index}`}
          className="mt-10 text-balance text-2xl font-extrabold leading-tight text-ink first:mt-0 md:text-3xl"
        >
          {block.text}
        </h2>
      );
      return;
    }

    rendered.push(
      <div key={`${block.text}-${index}`} className="contents">
        <p className="text-pretty text-sm font-medium leading-7 text-ink/72 md:text-base md:leading-8">
          {block.text}
        </p>
        {imageGroups[index] ? (
          <InlineImageGrid
            group={imageGroups[index]}
            images={garageImages}
            offset={imageGroups[index].start}
            onOpen={setActiveIndex}
          />
        ) : null}
      </div>
    );
  });

  flushList("list-final");

  return (
    <section className="border-t border-line pt-10">
      <div className="grid gap-5">{rendered}</div>
      <Lightbox
        images={garageImages}
        title="Garážové brány a závory"
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
      />
    </section>
  );
}
