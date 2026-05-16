import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/site";
import { pageData as vsetkyData } from "@/data/pages/vsetky-sluzby";
import type { ContentBlock } from "@/lib/types";

const SERVICE_HEADING: Record<string, string> = {
  "kovovyroba-ploty-brany": "Kovovýroba",
  "sklenene-zabradlie-logie-pergoly": "Sklenené zábradlie, logie a pergoly",
  "pohony-na-brany": "Pohony na brány a závory",
  "dizajnove-plechy": "Dizajnové plechy",
  "montazne-sluzby": "Montážne služby",
  "3d-vizualizacie": "Interiérové štúdio 3D",
  "povrchova-uprava": "Povrchová úprava",
};

const SHOWCASE_ORDER: string[] = [
  "kovovyroba-ploty-brany",
  "garazove-brany-zavory",
  "sklenene-zabradlie-logie-pergoly",
  "pohony-na-brany",
  "dizajnove-plechy",
  "montazne-sluzby",
  "3d-vizualizacie",
  "povrchova-uprava",
];

const GARAGE_BLOCKS: ContentBlock[] = [
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
];

const TERMINATING_HEADINGS = new Set<string>([
  ...Object.values(SERVICE_HEADING),
  "Mobilné pieskovanie",
]);

function getBlocksForSlug(slug: string): ContentBlock[] {
  if (slug === "garazove-brany-zavory") return GARAGE_BLOCKS;

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
    <section id="sluzby" className="wm-container mt-16 scroll-mt-28">
      <div className="mb-10 text-center md:mb-14">
        <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
          Naše služby
        </p>
        <h2 className="mt-3 text-balance text-3xl font-extrabold leading-tight text-ink md:text-5xl">
          Všetky naše služby
        </h2>
      </div>

      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
        {SHOWCASE_ORDER.map((slug) => {
          const service = services.find((s) => s.slug === slug);
          if (!service) return null;
          const blocks = getBlocksForSlug(slug);

          return (
            <article key={slug} className="flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded bg-neutral-100">
                {service.image ? (
                  <Image
                    src={service.image.src}
                    alt={service.image.alt || service.title}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 42vw, 90vw"
                    className="object-cover"
                  />
                ) : null}
                <Link
                  href={service.path}
                  className="absolute bottom-3 left-3 inline-flex h-9 items-center justify-center rounded-full bg-ink px-4 text-sm font-extrabold text-white transition hover:bg-redline"
                >
                  Viac
                </Link>
              </div>

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
            </article>
          );
        })}
      </div>
    </section>
  );
}
