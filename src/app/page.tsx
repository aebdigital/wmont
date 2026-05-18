import { AboutSection } from "@/components/AboutSection";
import { ContactBand } from "@/components/ContactBand";
import { HomeHero } from "@/components/Hero";
import { MarqueeGallery } from "@/components/MarqueeGallery";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { pageData } from "@/data/pages/domov";
import { pageData as galeriaData } from "@/data/pages/galeria";

export default function HomePage() {
  return (
    <>
      <HomeHero page={pageData} />
      <ServicesShowcase />
      <AboutSection />
      {galeriaData.images.length > 0 ? (
        <MarqueeGallery images={galeriaData.images.slice(0, 24)} title="Vybrané realizácie" />
      ) : null}
      <ContactBand />
    </>
  );
}
