import type { Metadata } from "next";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/dizajnove-plechy";

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

export default function DizajnovePlechyPage() {
  return (
    <ServicePageLayout
      page={pageData}
      mediaFit="contain"
      mediaAspect="3/4"
      mediaCols="trio"
      mediaShowHeader={false}
    />
  );
}
