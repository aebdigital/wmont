import type { ContentBlock, MediaItem, GalleryCategory } from "@/lib/types";

export const introBlocks: ContentBlock[] = [
  {
    type: "image_right",
    level: null,
    text: "Veľkorozmerná priemyselná hala s kovovým opláštením",
    src: "/haly/r_0024D.webp",
    alt: "Veľkorozmerná priemyselná hala s kovovým opláštením a hladkou prístupovou plochou",
  },
  {
    type: "text",
    level: null,
    text: "Realizujeme priemyselné a skladové haly v plnom rozsahu – od prvej obhliadky pozemku až po odovzdanie hotovej stavby pripravenej na okamžitú prevádzku. Rozumieme tomu, že každý zákazník je v inom bode prípravy: niekto má len pozemok a víziu, iný už hotové základy a hľadá partnera, ktorý dotiahne zvyšok. Spoluprácu preto vždy nastavujeme podľa toho, kde sa práve nachádzate.",
  },
];

export const komplexnaBlocks: ContentBlock[] = [
  {
    type: "heading",
    level: 2,
    text: "Komplexná realizácia od základov po kolaudáciu",
  },
  {
    type: "image_right",
    level: null,
    text: "Moderná logistická hala s bielou panelovou fasádou",
    src: "/haly/Fixinggroup_Lagerhalle.jpg",
    alt: "Moderná logistická hala s bielou panelovou fasádou a nakladacími vrátami",
  },
  {
    type: "text",
    level: null,
    text: "Ak prichádzate s prázdnym pozemkom, zoberieme na seba celý projekt. Začíname výkopovými a zemnými prácami, pokračujeme spodnou stavbou a betónovými základmi, montážou oceľovej nosnej konštrukcie, opláštením, strechou až po priemyselné podlahy, vráta a technologické rozvody. Hala vám stojí na kľúč – vy prídete a začnete vyrábať alebo skladovať.",
  },
  {
    type: "text",
    level: null,
    text: "Súčasťou plnej dodávky je aj sprostredkovanie všetkého, čo stavba potrebuje na úrovni dokumentácie a povolení. Zabezpečíme statický posudok, projektovú dokumentáciu, geologický prieskum aj kompletný inžiniering – od územného rozhodnutia a stavebného povolenia až po komunikáciu s úradmi, dotknutými orgánmi a správcami sietí. Vy schvaľujete míľniky, my riešime papierovačky.",
  },
];

export const flexibilnyBlocks: ContentBlock[] = [
  {
    type: "heading",
    level: 2,
    text: "Flexibilný rozsah – nadviažeme aj ukončíme tam, kde to dáva zmysel",
  },
  {
    type: "image_right",
    level: null,
    text: "Interiér priemyselnej haly s oceľovou konštrukciou a mostovými žeriavmi",
    src: "/haly/industrial-structure-14-1200x675.jpg",
    alt: "Interiér priemyselnej haly s oceľovou priehradovou konštrukciou a mostovými žeriavmi",
  },
  {
    type: "text",
    level: null,
    text: "Nie každý zákazník nás potrebuje od prvého výkopu. Ak už máte hotové základy alebo časť spodnej stavby a hľadáte, kto postaví oceľovú konštrukciu a opláštenie, nadviažeme tam, kde to vaši predchádzajúci dodávatelia nechali. Posúdime existujúcu prípravu, doladíme statiku na novú konštrukciu a hladko prevezmeme rozpracovaný projekt.",
  },
  {
    type: "text",
    level: null,
    text: "Funguje to aj opačne. Ak máte vlastné kapacity na finalizáciu, postavíme len tú časť, ktorú vy alebo váš tím nezvládnete – napríklad hrubú stavbu a opláštenie – a zvyšok si dokončíte podľa vlastného harmonogramu. Vždy hľadáme rozsah, ktorý dáva zmysel pre váš rozpočet, časový plán aj interné možnosti.",
  },
];

export const scopeBlocks: ContentBlock[] = [
  {
    type: "heading",
    level: 3,
    text: "Čo všetko vieme zastrešiť",
  },
  { type: "list", level: null, text: "Výkopové a zemné práce, príprava staveniska a HTÚ" },
  { type: "list", level: null, text: "Spodná stavba a betónové základy vrátane základových pätiek" },
  { type: "list", level: null, text: "Statický posudok a kompletná projektová dokumentácia" },
  { type: "list", level: null, text: "Inžinierska činnosť, územné rozhodnutie a stavebné povolenia" },
  { type: "list", level: null, text: "Oceľová nosná konštrukcia a opláštenie sendvičovými panelmi" },
  { type: "list", level: null, text: "Strecha, klampiarske práce a odvodnenie objektu" },
  { type: "list", level: null, text: "Priemyselné betónové podlahy s vystužením podľa zaťaženia" },
  { type: "list", level: null, text: "Sekčné vráta, okná, dvere a vnútorné panelové priečky" },
  { type: "list", level: null, text: "Príprava na technológie a koordinácia profesných subdodávateľov" },
  { type: "list", level: null, text: "Odovzdanie stavby pripravenej na kolaudáciu" },
];

export const pageData = {
  slug: "montovane-haly",
  path: "/montovane-haly",
  title: "Montované oceľové haly na mieru pre priemysel a sklady",
  seoTitle: "Montované haly - wmont",
  excerpt:
    "Priemyselné a skladové haly na mieru – komplexne od výkopov a základov, vrátane povolení a statiky, alebo flexibilne len v rozsahu, ktorý potrebujete dotiahnuť do konca.",
  isService: true,
  blocks: [
    ...introBlocks,
    ...komplexnaBlocks,
    ...flexibilnyBlocks,
    ...scopeBlocks,
  ] as ContentBlock[],
  images: [
    {
      type: "image",
      src: "/haly/r_0024D.webp",
      alt: "Veľkorozmerná priemyselná hala s kovovým opláštením a hladkou prístupovou plochou",
    },
    {
      type: "image",
      src: "/haly/Fixinggroup_Lagerhalle.jpg",
      alt: "Moderná logistická hala s bielou panelovou fasádou a nakladacími vrátami",
    },
    {
      type: "image",
      src: "/haly/industrial-structure-14-1200x675.jpg",
      alt: "Interiér priemyselnej haly s oceľovou priehradovou konštrukciou a mostovými žeriavmi",
    },
  ] as MediaItem[],
  videos: [] as MediaItem[],
  galleryCategories: [] as GalleryCategory[],
};

export type Benefit = {
  title: string;
  text: string;
};

export const benefits: Benefit[] = [
  {
    title: "Všetko pod jednou strechou",
    text: "Výrobnú aj administratívnu časť dokážeme spojiť v rámci jednej budovy bez kompromisov v komforte ani prevádzke.",
  },
  {
    title: "Rýchla realizácia",
    text: "Montáž oceľovej konštrukcie prebehne výrazne rýchlejšie než klasická murovaná stavba – produkcia môže nabehnúť skôr.",
  },
  {
    title: "Návrh podľa vašich potrieb",
    text: "Rozmery, tvar aj vnútorné rozčlenenie pripravíme tak, aby presne sedeli vašej prevádzke a logistike materiálu.",
  },
  {
    title: "Variabilné členenie",
    text: "Hala sa dá kedykoľvek operatívne predeliť panelovými priečkami na samostatné výrobné, montážne alebo skladové zóny.",
  },
  {
    title: "Izolovaná aj neizolovaná časť",
    text: "V jednej budove je možné kombinovať tepelne izolovaný priestor (kancelárie, prevádzka) s neizolovaným (sklad) – podľa toho, ako konkrétna zóna pracuje.",
  },
  {
    title: "Energeticky efektívna stavba",
    text: "Modernú izoláciu a technológie hospodárenia s energiou vieme integrovať priamo do konštrukcie, takže prevádzkové náklady ostávajú pod kontrolou.",
  },
  {
    title: "Pripravená na rozšírenie",
    text: "Hala môže obsahovať podlažie, ďalšie okná, dvere či vetracie systémy – a ak časom potrebujete viac priestoru, dá sa prirodzene rozšíriť bez búrania.",
  },
  {
    title: "Pevnosť a životnosť",
    text: "Oceľová kostra znesie vysoké zaťaženie aj nepriaznivé počasie a poskytuje dlhú životnosť bez kompromisov pri údržbe.",
  },
  {
    title: "Otvorený interiér bez rušivých stĺpov",
    text: "Konštrukcia ponúka veľký nečlenený priestor, ktorý je ideálny pre výrobné linky, regálové systémy aj manipulačnú techniku.",
  },
];

export type HallType = {
  code: string;
  description: string;
  specs: string[];
};

export const hallTypes: HallType[] = [
  {
    code: "TYP A",
    description: "Rámová konštrukcia so sedlovou strechou",
    specs: [
      "Využiteľná šírka: 6 – 25 m",
      "Využiteľná výška: 3 – 12 m",
      "Modulová vzdialenosť stĺpov: 4 – 6 m",
    ],
  },
  {
    code: "TYP B",
    description: "Rámová konštrukcia s pultovou strechou",
    specs: [
      "Využiteľná šírka: 6 – 20 m",
      "Využiteľná výška: 3 – 12 m",
      "Modulová vzdialenosť stĺpov: 4 – 6 m",
    ],
  },
  {
    code: "TYP C",
    description: "Konštrukcia s posilneným priehradovým väzníkom so sedlovou strechou",
    specs: [
      "Využiteľná šírka: 15 – 30 m",
      "Využiteľná výška: 3 – 12 m",
      "Modulová vzdialenosť stĺpov: 4 – 6 m",
    ],
  },
  {
    code: "TYP D",
    description: "Konštrukcia s priehradovým väzníkom so sedlovou strechou",
    specs: [
      "Využiteľná šírka: 6 – 15 m",
      "Využiteľná výška: 3 – 12 m",
      "Modulová vzdialenosť stĺpov: 4 – 6 m",
    ],
  },
  {
    code: "TYP E",
    description: "Priehradová konštrukcia s pultovou strechou",
    specs: [
      "Využiteľná šírka: 8 – 25 m",
      "Využiteľná výška: 3 – 12 m",
      "Modulová vzdialenosť stĺpov: 4 – 6 m",
    ],
  },
];
