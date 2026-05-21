import Image from "next/image";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import type { ContentBlock } from "@/lib/types";

type ZasklenieContentProps = {
  blocks: ContentBlock[];
  faqItems: FAQItem[];
};

type ImageDef = { src: string; alt: string; caption?: string };

const sectionImages: Record<string, ImageDef | ImageDef[]> = {
  "Sklenené zábradlie": {
    src: "/sklenene/sklenene-zabradlie.jpg",
    alt: "Sklenené zábradlie"
  },
  "Zimné záhrady": {
    src: "/sklenene/zimnezahrady.png",
    alt: "Zimné záhrady"
  },
  "Posuvné zasklenie terás": {
    src: "/sklenene/posuvnezasklenie.jpg",
    alt: "Posuvné zasklenie terás"
  },
  Pergola: [
    {
      src: "/sklenene/pergola.jpg",
      alt: "Pergola"
    },
    {
      src: "/news/pergola.jpg",
      alt: "Pergola",
      caption: "Prístrešky s rozmerom 9x7m vďaka premosteniu"
    }
  ],
  "Systém zasklenia bolkónov a logií": {
    src: "/sklenene/systemzaskleniabalkonovalogii.jpg",
    alt: "Systém zasklenia balkónov a logií"
  }
};

const imageAfterBlockIndex: Record<number, string> = {
  4: "Pergola",
  9: "Posuvné zasklenie terás",
  11: "Zimné záhrady",
  15: "Systém zasklenia bolkónov a logií",
  22: "Sklenené zábradlie"
};

function SectionImage({ title }: { title: string }) {
  const data = sectionImages[title];

  if (!data) return null;

  const images = Array.isArray(data) ? data : [data];

  return (
    <div className={`my-8 grid gap-4 ${images.length > 1 ? "md:grid-cols-2" : ""}`}>
      {images.map((img, i) => (
        <figure key={i} className="relative overflow-hidden rounded border border-line bg-neutral-100">
          <div className="relative aspect-[16/9]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes={images.length > 1 ? "(min-width: 768px) 50vw, 90vw" : "(min-width: 1024px) 58vw, 90vw"}
              className="object-cover"
            />
          </div>
          {img.caption && (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 text-sm font-bold leading-tight text-white drop-shadow-md md:text-base">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

export function ZasklenieContent({ blocks, faqItems }: ZasklenieContentProps) {
  return (
    <section className="border-t border-line pt-10">
      <div className="grid gap-5">
        {blocks.map((block, index) => {
          const imageTitle = imageAfterBlockIndex[index];

          if (block.type === "heading") {
            return (
              <h2
                key={`${block.text}-${index}`}
                className="mt-10 text-balance text-2xl font-extrabold leading-tight text-ink first:mt-0 md:text-3xl"
              >
                {block.text}
              </h2>
            );
          }

          return (
            <div key={`${block.text}-${index}`} className="contents">
              <p className="text-pretty text-sm font-medium leading-7 text-ink/72 md:text-base md:leading-8">
                {block.text}
              </p>
              {imageTitle ? <SectionImage title={imageTitle} /> : null}
              {imageTitle === "Sklenené zábradlie" ? <FAQAccordion items={faqItems} /> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
