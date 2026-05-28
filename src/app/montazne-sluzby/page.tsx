import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/montazne-sluzby";

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

export default function MontazneSluzbyPage() {
  return <ServicePageLayout page={pageData} showMediaGrid={false} />;
}
