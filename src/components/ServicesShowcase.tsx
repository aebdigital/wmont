"use client";

import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site";
import { pageData as vsetkyData } from "@/data/pages/vsetky-sluzby";
import type { ContentBlock } from "@/lib/types";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function ParallaxCardImage({ src, alt, slug }: { src: string; alt: string; slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Moves the photo vertical offset from -12% to 12% as it crosses the screen
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden bg-neutral-100"
    >
      <motion.div
        style={{ y, scale: 1.25 }}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 768px) 42vw, 90vw"
          className="object-cover"
          priority
        />
      </motion.div>
      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex h-9 items-center justify-center bg-ink px-4 text-sm font-extrabold text-white transition group-hover:bg-redline">
        Viac
      </span>
    </div>
  );
}

const SERVICE_HEADING: Record<string, string> = {
  "kovovyroba-ploty-brany": "Kovovýroba",
  "sklenene-zabradlie-logie-pergoly": "Pergoly, terasy, logie a sklenené terasy",
  "brany-a-pohony": "Brány a pohony",
  "dizajnove-plechy": "Dizajnové plechy",
  "montazne-sluzby": "Montážne služby",
  "3d-vizualizacie": "Interiérové štúdio 3D",
  "povrchova-uprava": "Povrchová úprava",
};

const SHOWCASE_ORDER: string[] = [
  "montovane-haly",
  "kovovyroba-ploty-brany",
  "prenajom-plosin",
  "brany-a-pohony",
  "garazove-brany-zavory",
  "sklenene-zabradlie-logie-pergoly",
  "montazne-sluzby",
  "povrchova-uprava",
  "dizajnove-plechy",
];

const INLINE_BLOCKS: Record<string, ContentBlock[]> = {
  "garazove-brany-zavory": [
    { type: "heading", level: 3, text: "Rolovacie garážové brány" },
    {
      type: "text",
      level: null,
      text: "Vyrobené z hliníkových profilov s polyuretánovou penou, ktoré dodávajú profilu izolačné a pevnostné vlastnosti. Tieto brány môžu byť dodané v rôznych farbách podľa vašich preferencií.",
    },
    { type: "heading", level: 3, text: "Sekčné garážové brány" },
    {
      type: "text",
      level: null,
      text: "Navrhnuté tak, aby spĺňali požiadavky a potreby užívateľov, otvárajú sa zvislo a zachádzajú pod strop, čo poskytuje maximum miesta. Sekčné brány sú dostupné v širokej škále farieb, takže si môžete vybrať tú, ktorá sa najlepšie hodí k vášmu domovu.",
    },
    { type: "heading", level: 3, text: "Krídlové garážové brány" },
    {
      type: "text",
      level: null,
      text: "Vyrobené z polyuretánových panelov s hliníkovým zárubňovým rámom a dvoma krídlami, ktoré môžu byť rozdelené podľa požiadaviek zákazníka. Farba rámu môže byť prírodný hliník alebo laminát podľa vzorkovníka laminácií, čo vám umožní vybrať si farbu, ktorá bude ladiť s exteriérom vášho domu.",
    },
  ],
  "prenajom-plosin": [
    { type: "heading", level: 3, text: "Genie Z-45 25J RT" },
    {
      type: "text",
      level: null,
      text: "Kĺbová terénna plošina s pracovnou výškou cez 16 m. „J“ rameno umožňuje dosiahnuť ponad prekážky.",
    },
    { type: "heading", level: 3, text: "Genie GS 2668 RT" },
    {
      type: "text",
      level: null,
      text: "Nožnicová terénna plošina s veľkou pracovnou platformou a pohonom 4×4 – ideálna pre exteriér a nerovný terén.",
    },
  ],
  "montovane-haly": [
    { type: "heading", level: 3, text: "Návrh na mieru" },
    {
      type: "text",
      level: null,
      text: "Rozmery, tvar aj vnútorné rozčlenenie pripravíme tak, aby presne sedeli vašej prevádzke a logistike materiálu.",
    },
    { type: "heading", level: 3, text: "Rýchla realizácia" },
    {
      type: "text",
      level: null,
      text: "Montáž oceľovej konštrukcie prebehne výrazne rýchlejšie než klasická murovaná stavba – produkcia môže nabehnúť skôr.",
    },
    { type: "heading", level: 3, text: "Pripravená na rozšírenie" },
    {
      type: "text",
      level: null,
      text: "Hala môže obsahovať podlažie, ďalšie okná, dvere či vetracie systémy – a ak časom potrebujete viac priestoru, dá sa prirodzene rozšíriť bez búrania.",
    },
  ],
};

// Includes 3D heading even though that service no longer appears in the showcase
// — keeping it as a terminator prevents its content bleeding into Dizajnové plechy.
const TERMINATING_HEADINGS = new Set<string>([
  ...Object.values(SERVICE_HEADING),
  "Mobilné pieskovanie",
]);

function getBlocksForSlug(slug: string): ContentBlock[] {
  if (INLINE_BLOCKS[slug]) return INLINE_BLOCKS[slug];

  const headingText = SERVICE_HEADING[slug];
  if (!headingText) return [];

  const blocks = vsetkyData.blocks;
  const start = blocks.findIndex(
    (b) => b.type === "heading" && b.text === headingText,
  );
  if (start === -1) return [];

  const end = blocks.findIndex(
    (b, i) => i > start && b.type === "heading" && TERMINATING_HEADINGS.has(b.text),
  );

  return blocks.slice(start + 1, end === -1 ? undefined : end);
}

export function ServicesShowcase() {
  return (
    <section id="sluzby" className="wm-container scroll-mt-28 reveal">
      <div className="mb-10 text-center md:mb-14">
        <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
          Naše služby
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight text-ink md:text-5xl">
          Všetky naše služby
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal-stagger="80">
        {SHOWCASE_ORDER.map((slug) => {
          const service = services.find((s) => s.slug === slug);
          if (!service) return null;
          const blocks = getBlocksForSlug(slug);

          return (
            <div key={slug} className="flex h-full">
              <Link
                href={service.path}
                className="group flex w-full flex-col border border-ink/0 p-3 transition-colors duration-500 ease-in-out hover:border-ink"
              >
                {service.image ? (
                  service.slug === "montovane-haly" ? (
                    <ParallaxCardImage
                      src={service.image.src}
                      alt={service.image.alt || service.title}
                      slug={service.slug}
                    />
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                      <Image
                        src={service.image.src}
                        alt={service.image.alt || service.title}
                        fill
                        sizes="(min-width: 1280px) 22vw, (min-width: 768px) 42vw, 90vw"
                        className={`transition duration-500 group-hover:scale-[1.06] ${
                          service.slug === "prenajom-plosin" ? "object-contain p-3" : "object-cover"
                        }`}
                      />
                      <span className="pointer-events-none absolute bottom-3 left-3 inline-flex h-9 items-center justify-center bg-ink px-4 text-sm font-extrabold text-white transition group-hover:bg-redline">
                        Viac
                      </span>
                    </div>
                  )
                ) : null}

                <h3 className="mt-6 text-balance text-2xl font-extrabold leading-tight text-ink">
                  {service.title}
                </h3>
                <div className="mt-3 h-[3px] w-12 rounded-full bg-redline" />

                <div className="mt-5 space-y-4">
                  {blocks.map((block, i) => {
                    if (block.type === "heading") {
                      return (
                        <h4
                          key={`${slug}-h-${i}`}
                          className="pt-2 text-base font-extrabold leading-tight text-ink first:pt-0"
                        >
                          {block.text}
                        </h4>
                      );
                    }
                    if (block.type === "text" || block.type === "list") {
                      return (
                        <p
                          key={`${slug}-p-${i}`}
                          className="text-sm font-medium leading-7 text-ink/72"
                        >
                          {block.text}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
