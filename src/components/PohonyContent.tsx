import Image from "next/image";
import type { ReactNode } from "react";
import type { ContentBlock, MediaItem } from "@/lib/types";

type PohonyContentProps = {
  blocks: ContentBlock[];
  guideImage?: MediaItem;
  certificates: MediaItem[];
};

function FramedImage({
  image,
  title,
  variant = "photo"
}: {
  image: MediaItem;
  title: string;
  variant?: "photo" | "contain";
}) {
  return (
    <figure className="my-8 overflow-hidden rounded border border-line bg-white p-4">
      <div
        className={`relative ${
          variant === "contain" ? "aspect-square max-w-xl" : "aspect-[16/9] w-full"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt || title}
          fill
          sizes={variant === "contain" ? "(min-width: 1024px) 520px, 90vw" : "90vw"}
          className={variant === "contain" ? "object-contain" : "object-cover"}
        />
      </div>
    </figure>
  );
}

export function PohonyContent({ blocks, guideImage, certificates }: PohonyContentProps) {
  const poradimeImage: MediaItem = {
    type: "image",
    src: "/pohony/poradime.jpg",
    alt: "Poradenstvo pri výbere pohonu brány"
  };
  const rendered: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (!listItems.length) return;
    rendered.push(
      <ul key={key} className="mb-6 mt-1 grid gap-3">
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

    if (index === 13) {
      rendered.push(
        <FramedImage
          key="pohony-guide-image"
          image={poradimeImage}
          title="Poradenstvo pri výbere pohonu brány"
        />
      );
    }

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

    if (["Posuvné brány", "Krídlové brány"].includes(block.text)) {
      rendered.push(
        <h3
          key={`${block.text}-${index}`}
          className="mt-4 text-lg font-extrabold leading-tight text-ink md:text-xl"
        >
          {block.text}
        </h3>
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

  const brandPhotos = [
    { name: "CAME", src: "/pohony/CAME.jpg" },
    { name: "KEY", src: "/pohony/KEY.webp" },
    { name: "NICE", src: "/pohony/NICE.webp" },
    { name: "SOMMER", src: "/pohony/sommer.jpg" },
  ];

  return (
    <>
      <section className="border-t border-line pt-10">
        <div className="grid gap-5">
          {rendered}
          <div key="pohony-brands-grid" className="my-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {brandPhotos.map((photo) => (
              <div
                key={photo.name}
                className="group relative aspect-square overflow-hidden rounded border border-line bg-ink text-left"
              >
                <Image
                  src={photo.src}
                  alt={photo.name}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 45vw"
                  className="object-cover opacity-82 transition duration-500 group-hover:scale-[1.05] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/26 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-balance text-lg font-extrabold leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] md:text-xl">
                    {photo.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {certificates.length ? (
        <section className="mt-16 border-t border-line pt-10">
          <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
            Certifikáty
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-ink md:text-4xl">Certifikáty pohonov</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {certificates.map((certificate, index) => (
              <figure
                key={certificate.src}
                className="rounded border border-line bg-white p-4 shadow-sm"
              >
                <div className="relative mx-auto aspect-[4/3] max-h-[260px]">
                  <Image
                    src={certificate.src}
                    alt={certificate.alt || `Certifikát ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 26vw, 90vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-sm font-extrabold text-ink">
                  {index === 0 ? "Certifikat NICE" : "Certifikat KEY"}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
