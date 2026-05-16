import type { Metadata } from "next";
import { ContactBand } from "@/components/ContactBand";
import { GalleryFilter } from "@/components/GalleryFilter";
import { PageIntro } from "@/components/Hero";
import { pageData } from "@/data/pages/galeria";

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

export default function GaleriaPage() {
  return (
    <>
      <PageIntro page={pageData} showMedia={false} />
      <GalleryFilter categories={pageData.galleryCategories} fallbackImages={pageData.images} />
      <ContactBand />
    </>
  );
}
