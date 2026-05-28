import type { Metadata } from "next";
import type { FAQItem } from "@/components/FAQAccordion";
import { ZasklenieContent } from "@/components/ZasklenieContent";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { pageData } from "@/data/pages/sklenene-zabradlie-logie-pergoly";

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

const glassRailingFaq: FAQItem[] = [
  {
    question: "Vyrábate sklenené zábradlie na mieru?",
    answer:
      "Áno. Naše sklenené zábradlie sú vyrobené na mieru podľa Vašich predstáv. Realizovali sme už viac zábradlí po celom Slovensku."
  },
  {
    question: "Sú možné aj nejaké farebné prevedenia?",
    answer:
      "Sklo môže byť číre, ale aj s matnou fóliou. Je možné použiť rôzne farebne odlišné druhy skla. Sklenené zábradlie si môžete personalizovať vlastným farebným odtieňom a povrchovou úpravou kotviacich profilov. Pre ešte dokonalejší vzhľad vám vieme spraviť aj pieskovaný motív."
  },
  {
    question: "Kde pôsobíte?",
    answer:
      "Na celom Slovensku. V každom kraji máme svojho špecialistu, ktorý sa vám bude venovať. Využite náš kontaktný formulár v spodnej časti tejto stránky a požiadajte nás o cenovú ponuku alebo o bližšie informácie o možnostiach a prevedení skleneného zábradlia."
  },
  {
    question: "Aká je cena?",
    answer:
      "Je to veľmi individuálne. Cena záleží od veľkosti zábradlia, prevedenia a vašich rôznych iných požiadaviek. Radi Vám vypracujeme nezáväznú cenovú ponuku."
  },
  {
    question: "Koľko trvá celá realizácia?",
    answer:
      "Dodanie tovaru trvá zvyčajne od 4 do 8 týždňov od zaplatenia zálohy. Montáž následne trvá väčšinou od niekoľkých hodín až po niekoľko dní, v závislosti od množstva zábradlia."
  },
  {
    question: "Aká je záruka?",
    answer: "Záruka na naše zábradlia je 24 mesiacov."
  }
];

export default function SkleneneZabradliePage() {
  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <ZasklenieContent blocks={pageData.blocks} faqItems={glassRailingFaq} />
    </ServicePageLayout>
  );
}
