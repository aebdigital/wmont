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

export type LiftProduct = {
  name: string;
  description?: string;
  photos: { src: string; alt: string }[];
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
        src: "/prenajomplosin/10250_Z4525JDiagram.jpg",
        alt: "Genie Z-45 25J RT – pracovný diagram",
      },
    ],
  },
  {
    name: "Genie GS 2668 RT",
    description:
      "Nožnicová terénna plošina s veľkou pracovnou platformou a pohonom 4×4. Vhodná pre montážne, stavebné a údržbárske práce v exteriéri aj na nerovnom teréne.",
    photos: [
      {
        src: "/prenajomplosin/GS2668.jpg",
        alt: "Genie GS 2668 RT – nožnicová plošina",
      },
    ],
  },
];
