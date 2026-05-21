import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { GateTypesGrid } from "@/components/GateTypesGrid";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/kovovyroba-ploty-brany";
import type { ContentBlock } from "@/lib/types";

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

export default function KovovyrobaPage() {
  const introBlocks = pageData.blocks.slice(0, 4) as ContentBlock[];
  const remainingBlocks = pageData.blocks.slice(4) as ContentBlock[];

  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <ContentBlocks blocks={introBlocks} title={pageData.title} mode="article" />
      <GateTypesGrid gateTypes={gateTypes} />
      <ContentBlocks blocks={remainingBlocks} title={pageData.title} mode="article" />
    </ServicePageLayout>
  );
}
