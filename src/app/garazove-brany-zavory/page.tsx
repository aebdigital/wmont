import type { Metadata } from "next";
import { GarageContent } from "@/components/GarageContent";
import { PdfViewer } from "@/components/PdfViewer";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/garazove-brany-zavory";

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

export default function GarazoveBranyPage() {
  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <PdfViewer
        src="/ZMENsENy-KATALOG-2022-compressed.pdf"
        title="Katalóg garážových brán"
      />
      <GarageContent blocks={pageData.blocks} images={pageData.images.slice(1)} />
    </ServicePageLayout>
  );
}
