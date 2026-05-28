import type { Metadata } from "next";
import { PohonyContent } from "@/components/PohonyContent";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { GateTypesGrid } from "@/components/GateTypesGrid";
import { ContentBlocks } from "@/components/ContentBlocks";
import { pageData } from "@/data/pages/brany-a-pohony";
import type { ContentBlock } from "@/lib/types";

export const metadata: Metadata = {
  title: {
    absolute: pageData.seoTitle || pageData.title
  },
  description: pageData.excerpt,
  alternates: { canonical: pageData.path },
  openGraph: {
    title: pageData.seoTitle || pageData.title,
    url: pageData.path,
    description: pageData.excerpt,
    images: pageData.images[0] ? [{ url: pageData.images[0].src }] : undefined
  }
};

const gateTypes = [
  {
    title: "Kované",
    image: "/news/kovana.jpg",
  },
  {
    title: "Lamelové",
    image: "/new-fb/brany/492136874_1344744160650413_4559370625786713825_n.jpg",
  },
  {
    title: "Samonosné",
    image: "/new-fb/brany/539594869_1453754829749345_4790149423075740480_n.jpg",
  },
  {
    title: "Koľajnicové",
    image: "/news/kolajnicova.jpg",
  },
  {
    title: "Integrovaná",
    image: "/news/integrovana.jpg",
  },
  {
    title: "Dvojkrídlová",
    image: "/news/dvojkridlova.jpg",
  },
  {
    title: "Atypická",
    image: "/news/s-vyplnou.jpg",
  },
  {
    title: "Vertical",
    image: "/assets/uploads/2024/10/414860455_961769362281230_1245315960085934811_n.jpg",
  },
];

export default function BranyAPohonyPage() {
  // First 3 blocks are: "Oplotenie, brány a ploty" heading + 2 text blocks
  const gateBlocks = pageData.blocks.slice(0, 3) as ContentBlock[];
  const remainingBlocks = pageData.blocks.slice(3) as ContentBlock[];

  const filteredBlocks = remainingBlocks.filter(
    (block) => !["Certifikat NICE", "Certifikat KEY"].includes(block.text)
  );

  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      {/* Render the Gates intro text */}
      <ContentBlocks blocks={gateBlocks} title="Brány" mode="article" />
      
      {/* Render the Gate Types Grid */}
      <GateTypesGrid gateTypes={gateTypes} />
      
      {/* Render the Pohony content (existing items) */}
      <PohonyContent
        blocks={filteredBlocks}
        guideImage={pageData.images[1]}
        certificates={pageData.images.slice(2, 4)}
      />
    </ServicePageLayout>
  );
}
