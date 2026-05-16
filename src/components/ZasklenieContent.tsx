import Image from "next/image";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import type { ContentBlock } from "@/lib/types";

type ZasklenieContentProps = {
  blocks: ContentBlock[];
  faqItems: FAQItem[];
};

const sectionImages: Record<string, { src: string; alt: string }> = {
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
  Pergola: {
    src: "/sklenene/pergola.jpg",
    alt: "Pergola"
  },
  "Systém zasklenia bolkónov a logií": {
    src: "/sklenene/systemzaskleniabalkonovalogii.jpg",
    alt: "Systém zasklenia balkónov a logií"
  }
};

const imageAfterBlockIndex: Record<number, string> = {
  8: "Sklenené zábradlie",
  10: "Zimné záhrady",
  12: "Posuvné zasklenie terás",
  18: "Pergola",
  22: "Systém zasklenia bolkónov a logií"
};

function SectionImage({ title }: { title: string }) {
  const image = sectionImages[title];

  if (!image) return null;

  return (
    <figure className="my-8 overflow-hidden rounded border border-line bg-neutral-100">
      <div className="relative aspect-[16/9]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 90vw"
          className="object-cover"
        />
      </div>
    </figure>
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
