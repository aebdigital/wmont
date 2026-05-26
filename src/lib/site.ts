import type { MediaItem } from "@/lib/types";

export const brand = {
  "name": "W - Mont s.r.o.",
  "email": "wmont621@gmail.com",
  "phone": "+421 918 150 409",
  "address": "Rimavské Janovce, 980 01 Močiar 621/38",
  "logo": "/assets/uploads/2023/02/Logo--2048x768.png",
  "logoLight": "/assets/uploads/2023/02/cropped-Logobiele-1.png",
  "facebook": "https://www.facebook.com/wmontsro",
  "instagram": "https://www.instagram.com/invites/contact/?i=13tblrrlwnmvd&utm_content=m7lsrk5"
};

export const navigation = [
  {
    "label": "Domov",
    "href": "/"
  },
  {
    "label": "O nás",
    "href": "/o-nas"
  },
  {
    "label": "Služby",
    "href": "/#sluzby"
  },
  {
    "label": "Galéria",
    "href": "/galeria"
  },
  {
    "label": "Kontakt a cena",
    "href": "/kontakt"
  }
];

export type ServiceInfo = {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  image: MediaItem | null;
};

export const services: ServiceInfo[] = [
  {
    "slug": "montovane-haly",
    "path": "/montovane-haly",
    "title": "Montované haly",
    "excerpt": "Priemyselné haly – širokospektrálne využitie v priemysle, výrobe a skladovaní. Návrh a realizácia oceľových konštrukcií na mieru.",
    "image": {
      "type": "image",
      "src": "/haly/r_0024D.webp",
      "alt": "Montované haly"
    }
  },
  {
    "slug": "kovovyroba-ploty-brany",
    "path": "/kovovyroba-ploty-brany",
    "title": "Kovovýroba",
    "excerpt": "Zhotovujeme atypické stavebné zámočnícke prvky a ručne vyrábame rôzne predmety z kovov, ako sú napr. brány a súčastí oplotení, zábradlia a schodiská, mreže a pod., a následne zabezpečujeme ich montáž a prípadné opravy.",
    "image": {
      "type": "image",
      "src": "/assets/uploads/2023/02/95542074_718405152253166_1562507405772718080_n.jpg",
      "alt": "Koľajnicová brána"
    }
  },
  {
    "slug": "prenajom-plosin",
    "path": "/prenajom-plosin",
    "title": "Prenájom plošín",
    "excerpt": "Ponúkame profesionálny prenájom pracovných plošín pre výškové práce na stavbách, fasádach a v priemysle.",
    "image": {
      "type": "image",
      "src": "/genie-gs-2669rt.jpg",
      "alt": "Genie GS 2668 RT – nožnicová plošina"
    }
  },
  {
    "slug": "brany-a-pohony",
    "path": "/brany-a-pohony",
    "title": "Brány a pohony",
    "excerpt": "Výroba brán, plotov a oplotení pre rodinné domy a priemyselné areály. Ponúkame tiež motorizáciu vjazdových brán pre väčšie pohodlie a bezpečnosť s inteligentným ovládaním Nice a Key.",
    "image": {
      "type": "image",
      "src": "/assets/uploads/2023/02/315039930_662985928826243_7636035703157153224_n.jpg",
      "alt": ""
    }
  },
  {
    "slug": "garazove-brany-zavory",
    "path": "/garazove-brany-zavory",
    "title": "Garážové brány",
    "excerpt": "Firma W-Mont sa špecializuje na poskytovanie individuálnych riešení, ktoré zohľadňujú vaše špecifické potreby a stavebnú situáciu. Našim cieľom je zabezpečiť vašu maximálnu spokojnosť tým, že vám ponúkame vysokokvalitné a spoľahlivé produkty s dôrazom na detail a precíznosť.",
    "image": {
      "type": "image",
      "src": "/assets/uploads/2025/02/Garazova_Kridlova_9016.png",
      "alt": ""
    }
  },
  {
    "slug": "sklenene-zabradlie-logie-pergoly",
    "path": "/sklenene-zabradlie-logie-pergoly",
    "title": "Pergoly, terasy, logie a sklenené terasy",
    "excerpt": "je zameraná na plnenie tých najodvážnejších snov a predstáv v oblasti výroby a montáže opracovaného skla. Ak ste vždy túžili mať krásny moderný dizajn podľa svojich predstáv na schodisku a balkónoch svojho domova mať sklenené zábradlie, neváhajte sa nám zdôveriť so svojou predstavou, ktorú Vám radi pomôžeme zrealizovať. Ale to nie je ani zďaleka všetko čím môžeme byť pre Váš domov prínosom. V našich možnostiach je okrem iného aj výroba sklenených kuchynských zástien v rôznych farebných prevedeniach a s vlastnými grafickými motívmi. Zaoberáme sa aj výrobou sklenených stien, sklenených dverí, výrobou pochôdzneho skla, sklenených schodísk a rôznych iných sklenených výrobkov. Sklenené zábradlie použité či už v interiéri alebo exteriéri vie dodať Vášmu domovu alebo obchodným priestorom eleganciu a zároveň pridanú hodnotu, ktorá sa skrýva v modernom vzhžade. Vďaka sklenenému zábradliu sa môžu vaše priestory opticky viac zväčšiť a miestnosti sa môžu viac presvetliť.",
    "image": {
      "type": "image",
      "src": "/news/pergola.jpg",
      "alt": ""
    }
  },
  {
    "slug": "montazne-sluzby",
    "path": "/montazne-sluzby",
    "title": "Montážne služby",
    "excerpt": "V našej výrobnej prevádzke ponúka spoločnosť W-Mont, okrem iných, aj montážne služby. Naši kvalifikovaní výrobný pracovníci s dlhoročnou praxou montujú stroje a ich súčasti v súlade s vami alebo nami vytvorenou výkresovou dokumentáciou. Dokončujeme váš výrobok napríklad montážou oceľových častí, elektroniky a hydraulických alebo pneumatických komponentov. Vyrábame, dodávame a montujeme celozvárané alebo skrutkované oceľové konštrukcie. Pre montáž používame hospodárne profily s dôrazom na minimalizáciu nákladov na spodnú stavbu. Pri montáži kladieme dôraz na jednoduchosť a funkčnosť. Celý proces podporujeme technickou dokumentáciou, statickým posudkom, realizačnou resp. výrobnou dokumentáciou. Dokážeme zabezpečiť oceľové konštrukcie pre priemysel a stavebníctvo ale aj individuálne oceľové konštrukcie na mieru.",
    "image": {
      "type": "image",
      "src": "/assets/uploads/2023/02/montaz-zariadeni-na-mieru-assembly-of-custom-made-products-1024x683-1.jpg",
      "alt": ""
    }
  },
  {
    "slug": "povrchova-uprava",
    "path": "/povrchova-uprava",
    "title": "Povrchová úprava",
    "excerpt": "Povrchová úprava je proces úpravy produktov a výrobkov, ktorým je možnosť docieliť zlepšenie a zmenu vlastností, stavu povrchu. Zaraďuje sa tu:a) predúprava povrchub) tvorba umelých vrstiev na povrchu výrobku s rôznymi fyzikálnymi vlastnosťami a chemickým zložením, odlišným od základného kovu [1, 2].",
    "image": {
      "type": "image",
      "src": "/assets/uploads/2023/02/pieskovanie.jpg",
      "alt": ""
    }
  },
  {
    "slug": "dizajnove-plechy",
    "path": "/dizajnove-plechy",
    "title": "Dizajnové plechy",
    "excerpt": "Ponúkame vám dizajnové vypaľované plechy, ktoré sa stávajú neodmysliteľnou súčasťou moderných a nadčasových stavieb. Moderný dizajn a jedinečné vzory ktoré tieto plechy vytvárajú Vám dávajú možnosti vytvoriť unikátne fasády, pergoly, zábradlia , brány , ploty a mnoho iného. Vaše špecifické požiadavky nie sú prekážkou. Po vzájomnej konzultácií vieme vám ponúknuť oveľa širšiu škálu dizajnov, prípadne vyrobiť plechy podľa vašich predstáv a dizajnov. Dizajnové plechy sa stávajú neodmysliťeľnou súčasťou modernej architektúry.",
    "image": {
      "type": "image",
      "src": "/assets/uploads/2023/02/1-2-scaled.jpg",
      "alt": ""
    }
  }
];
