import type { Metadata } from "next";
import { ContactBand } from "@/components/ContactBand";
import { GalleryFilter } from "@/components/GalleryFilter";
import { PageIntro } from "@/components/Hero";
import { pageData } from "@/data/pages/galeria";

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

export default function GaleriaPage() {
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
      <GalleryFilter categories={pageData.galleryCategories} fallbackImages={pageData.images} />
      <ContactBand />
    </>
  );
}
