import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/kovovyroba-ploty-brany";

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

export default function KovovyrobaPage() {
  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <ContentBlocks blocks={pageData.blocks} title={pageData.title} mode="article" />
    </ServicePageLayout>
  );
}
