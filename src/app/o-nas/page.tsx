import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { PageIntro } from "@/components/Hero";
import { pageData } from "@/data/pages/o-nas";

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

export default function ONasPage() {
  return (
    <>
      <PageIntro page={pageData} showMedia={false} />
      <section className="wm-container mt-12">
        <ContentBlocks blocks={pageData.blocks} title={pageData.title} mode="article" />
      </section>
    </>
  );
}
