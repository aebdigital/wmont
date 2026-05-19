import type { Metadata } from "next";
import Image from "next/image";
import { ContentBlocks } from "@/components/ContentBlocks";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/kovovyroba-ploty-brany";
import type { ContentBlock } from "@/lib/types";

const gateTypes = [
  {
    title: "Kované",
    image: "/assets/uploads/2023/02/302184008_601174525007384_2886941924458078791_n.jpg",
  },
  {
    title: "Lamelové",
    image: "/new-fb/brany/492136874_1344744160650413_4559370625786713825_n.jpg",
  },
  {
    title: "Sekčné brány",
    image: null,
  },
  {
    title: "Samonosné",
    image: "/assets/uploads/2023/02/116357407_777266703033677_3849942102631636542_n.jpg",
  },
  {
    title: "Koľajnicové",
    image: "/assets/uploads/2023/02/95542074_718405152253166_1562507405772718080_n.jpg",
  },
];

export const metadata: Metadata = {
  title: pageData.seoTitle || pageData.title,
  description: pageData.excerpt,
  alternates: { canonical: pageData.path },
  openGraph: {
    title: pageData.seoTitle || pageData.title,
    url: pageData.path,
    description: pageData.excerpt,
    images: pageData.images[0] ? [{ url: pageData.images[0].src }] : undefined
  }
};

function GateTypes() {
  return (
    <section className="mt-12 border-t border-line pt-10">
      <h2 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
        Typy brán
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
        {gateTypes.map((type) => (
          <div
            key={type.title}
            className="group relative aspect-square overflow-hidden rounded border border-line bg-ink"
          >
            {type.image ? (
              <Image
                src={type.image}
                alt={type.title}
                fill
                sizes="(min-width: 1024px) 14vw, (min-width: 640px) 42vw, 45vw"
                className="object-cover opacity-82 transition duration-500 group-hover:scale-[1.05] group-hover:opacity-100"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/26 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-balance text-lg font-extrabold leading-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] md:text-xl">
                {type.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function KovovyrobaPage() {
  const introBlocks = pageData.blocks.slice(0, 4) as ContentBlock[];
  const remainingBlocks = pageData.blocks.slice(4) as ContentBlock[];

  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <ContentBlocks blocks={introBlocks} title={pageData.title} mode="article" />
      <GateTypes />
      <ContentBlocks blocks={remainingBlocks} title={pageData.title} mode="article" />
    </ServicePageLayout>
  );
}
