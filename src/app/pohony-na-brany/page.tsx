import type { Metadata } from "next";
import { PohonyContent } from "@/components/PohonyContent";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/pohony-na-brany";

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

export default function PohonyNaBranyPage() {
  const filteredBlocks = pageData.blocks.filter(
    (block) => !["Certifikat NICE", "Certifikat KEY"].includes(block.text)
  );

  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <PohonyContent
        blocks={filteredBlocks}
        guideImage={pageData.images[1]}
        certificates={pageData.images.slice(2, 4)}
      />
    </ServicePageLayout>
  );
}
