import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { PageIntro } from "@/components/Hero";
import { pageData } from "@/data/pages/o-nas";

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

export default function ONasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Domov",
        "item": "https://www.wmont.sk/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageData.title,
        "item": `https://www.wmont.sk${pageData.path}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageIntro page={pageData} showMedia={false} />
      <section className="wm-container mt-12">
        <ContentBlocks blocks={pageData.blocks} title={pageData.title} mode="article" />
      </section>
    </>
  );
}
