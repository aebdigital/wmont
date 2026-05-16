import type { ContentBlock, MediaItem, GalleryCategory } from "@/lib/types";

export const pageData = {
  slug: "montovane-haly",
  path: "/montovane-haly",
  title: "Montované oceľové haly na mieru pre priemysel a sklady",
  seoTitle: "Montované haly - wmont",
  excerpt:
    "Priemyselné a skladové haly navrhnuté pre konkrétnu prevádzku – od výrobných liniek až po logistické centrá. Návrh, projekcia aj realizácia z jednej ruky.",
  isService: true,
  blocks: [
    {
      type: "text",
      level: null,
      text: "Priemyselné a skladové haly tvoria základ pre množstvo odvetví – od výroby cez logistiku až po servisné prevádzky. Každá zákazka má svoje špecifiká a my k nej pristupujeme individuálne. Pri návrhu kladieme dôraz nielen na samotnú nosnú konštrukciu, ale predovšetkým na funkčné usporiadanie priestoru. Naši inžinieri pracujú s dispozíciou efektívne v ploche aj vo výške a od prvých skíc plánujú výrobné a skladové zóny tak, aby boli prevádzkovo logické a ekonomicky udržateľné.",
    },
    {
      type: "text",
      level: null,
      text: "Oceľové haly sú spoľahlivým riešením pre rastúce firmy, ktoré potrebujú vlastný funkčný priestor. Vďaka modulárnemu prístupu sa hodia rovnako pre menšie prevádzky aj rozsiahle priemyselné areály. Spájajú všestrannosť, dlhú životnosť a rozumné prevádzkové náklady – preto si ich vyberajú firmy z najrôznejších odvetví.",
    },

  ] as ContentBlock[],
  images: [] as MediaItem[],
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
