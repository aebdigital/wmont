import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";
import { ContactBand } from "@/components/ContactBand";
import { HomeHero } from "@/components/Hero";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { pageData } from "@/data/pages/domov";
import { pageData as galeriaData } from "@/data/pages/galeria";

export const metadata: Metadata = {
  title: {
    absolute: pageData.seoTitle
  },
  description: pageData.excerpt,
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  return (
    <>
      <HomeHero page={pageData} />
      <div
        className="relative z-10 pt-16 pb-24 -mb-24 shadow-2xl"
        style={{
          backgroundImage: 'linear-gradient(rgba(244,245,245,0.76),rgba(244,245,245,0.76)), url("/steelbg.jpg")',
          backgroundSize: '100% auto',
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'top center',
          backgroundAttachment: 'fixed',
        }}
      >
        <ServicesShowcase />
        <AboutSection />
        {galeriaData.images.length > 0 ? (
          <MarqueeGallery images={galeriaData.images.slice(0, 24)} title="Vybrané realizácie" />
        ) : null}
        <ContactBand />
      </div>
    </>
  );
}
