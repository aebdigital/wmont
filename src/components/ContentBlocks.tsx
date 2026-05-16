import Image from "next/image";
import type { ReactNode } from "react";
import type { ContentBlock } from "@/lib/types";

type ContentBlocksProps = {
  blocks: ContentBlock[];
  title: string;
  contained?: boolean;
  mode?: "section" | "article";
  sectionTitle?: string;
};

export function ContentBlocks({
  blocks,
  title,
  contained = true,
  mode = "section",
  sectionTitle = "Informácie"
}: ContentBlocksProps) {
  if (!blocks.length) return null;

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
      const prevBlock = index > 0 ? blocks[index - 1] : null;
      const HeadingTag = (block.level === 3 ? "h3" : block.level === 4 ? "h4" : "h2") as any;
      let headingClass = "text-balance font-extrabold leading-tight text-ink first:mt-0 ";
      
      if (prevBlock?.type !== "image_right") {
        headingClass += "mt-10 clear-both ";
      } else {
        headingClass += "mt-2 ";
      }

      if (block.level === 3) {
        headingClass += "text-xl md:text-2xl";
      } else if (block.level === 4) {
        headingClass += "text-lg md:text-xl";
      } else {
        headingClass += "text-2xl md:text-3xl";
      }

      rendered.push(
        <HeadingTag
          key={`${block.text}-${index}`}
          className={headingClass}
        >
          {block.text}
        </HeadingTag>
      );
      return;
    }

    if (block.type === "image_right") {
      rendered.push(
        <div key={`clear-${index}`} className={`clear-both ${index > 0 ? "pt-10" : ""}`} />
      );
      rendered.push(
        <figure
          key={`img-${index}`}
          className="float-right ml-6 mb-6 mt-2 w-full max-w-[280px] overflow-hidden rounded border border-line bg-neutral-100 lg:max-w-[360px]"
        >
          <div className="relative aspect-square">
            <Image
              src={block.src || ""}
              alt={block.alt || block.text || ""}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 360px, 280px"
            />
          </div>
        </figure>
      );
      return;
    }

    rendered.push(
      <p
        key={`${block.text}-${index}`}
        className="text-pretty text-sm font-medium leading-7 text-ink/72 md:text-base md:leading-8"
      >
        {block.text}
      </p>
    );
  });

  flushList("list-final");

  if (mode === "article") {
    return (
      <section className="border-t border-line pt-10">
        <div className="space-y-5 flow-root">{rendered}</div>
      </section>
    );
  }

  const sectionClass = `${
    contained ? "wm-container " : ""
  }mt-16 grid gap-10 border-t border-line pt-12 lg:grid-cols-[0.32fr_0.68fr]`;

  return (
    <section className={sectionClass}>
      <div>
        <p className="text-sm font-extrabold uppercase tracking-normal text-redline">{title}</p>
        <h2 className="mt-3 max-w-sm text-3xl font-extrabold leading-tight text-ink md:text-4xl">
          {sectionTitle}
        </h2>
      </div>
      <div className="space-y-5 flow-root">{rendered}</div>
    </section>
  );
}
