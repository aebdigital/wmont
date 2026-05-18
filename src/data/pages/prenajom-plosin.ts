import type { ContentBlock, MediaItem, GalleryCategory } from "@/lib/types";

export const pageData = {
  slug: "prenajom-plosin",
  path: "/prenajom-plosin",
  title: "Prenájom plošín",
  seoTitle: "Prenájom plošín - wmont",
  excerpt:
    "Ponúkame profesionálny prenájom pracovných plošín pre výškové práce na stavbách, fasádach a v priemysle.",
  isService: true,
  blocks: [
    {
      type: "heading",
      level: 2,
      text: "Prenájom pracovných plošín",
    },
    {
      type: "text",
      level: null,
      text: "Ponúkame profesionálny prenájom pracovných plošín pre výškové práce na stavbách, fasádach, halách a v priemyselných prevádzkach. Plošiny sú pravidelne servisované a pripravené na okamžité nasadenie.",
    },
    {
      type: "text",
      level: null,
      text: "Pre podrobnejšie informácie o dostupnosti, parametroch a cenách nás kontaktujte – radi vám pripravíme ponuku na mieru podľa charakteru vašej zákazky.",
    },
  ] as ContentBlock[],
  images: [] as MediaItem[],
  videos: [] as MediaItem[],
  galleryCategories: [] as GalleryCategory[],
};

export type SpecRow = { label: string; value: string };

export type LiftProduct = {
  name: string;
  meta?: string;
  description?: string;
  photos: { src: string; alt: string }[];
  specs?: SpecRow[];
};

export const liftProducts: LiftProduct[] = [
  {
    name: "Genie Z-45 25J RT",
    description:
      "Kĺbová terénna plošina s pracovnou výškou cez 16 m. Ideálna pre práce vo výškach na stavenisku aj v ťažko dostupných miestach – „J“ rameno umožňuje dosiahnuť ponad prekážky.",
    photos: [
      {
        src: "/prenajomplosin/10250_Z45-25JBoomLift.jpg",
        alt: "Genie Z-45 25J RT – kĺbová plošina",
      },
      {
        src: "/Gemini_Generated_Image_l1a3vdl1a3vdl1a3.png",
        alt: "Genie Z-45 25J RT – pracovný diagram",
      },
    ],
  },
  {
    name: "Genie GS 2668 RT",
    meta: "Rok: 2008 · Umiestnenie: Prešov 080 05",
    description:
      "Nožnicová terénna plošina s veľkou pracovnou platformou a pohonom 4×4. Vhodná pre montážne, stavebné a údržbárske práce v exteriéri aj na nerovnom teréne.",
    photos: [
      {
        src: "/prenajomplosin/GS2668.jpg",
        alt: "Genie GS 2668 RT – nožnicová plošina",
      },
    ],
    specs: [
      { label: "Kategória", value: "Nožnicové zdvíhacie plošiny" },
      { label: "Značka", value: "Genie GS 2668 RT" },
      { label: "Pracovná výška", value: "1 000 cm" },
      { label: "Výška zdvihu", value: "800 cm" },
      { label: "Zdvíhacia kapacita", value: "567 kg" },
      { label: "Hrubá hmotnosť", value: "3 455 kg" },
      { label: "Druh náhonu", value: "4 WD" },
      { label: "Typ pohonu", value: "Naftový" },
      { label: "Výrobca motora", value: "Kubota D905" },
      { label: "Hodiny prevádzky", value: "2 556 h" },
      { label: "Počet predchádzajúcich vlastníkov", value: "1" },
      { label: "Skladové č.", value: "2668/51079" },
      { label: "Výrobné číslo", value: "GS6808-51079" },
      { label: "Pôvodná farba", value: "modrá" },
      { label: "Transportné rozmery (D × Š × V)", value: "3300 × 1730 × 2300 mm" },
      { label: "Značka pneumatík", value: "OTR" },
      { label: "Stav predných pneumatík", value: "75 %" },
      { label: "Stav zadných pneumatík", value: "90 %" },
      { label: "Certifikácia", value: "CE" },
    ],
  },
];
