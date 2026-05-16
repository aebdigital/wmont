import * as cheerio from "cheerio";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pageDir = join(root, "_source_mirror/www.wmont.sk/wp-json/wp/v2/pages");
const publicDir = join(root, "public");
const outFile = join(root, "src/data/site-content.json");

const pageOrder = [
  "domov",
  "o-nas",
  "vsetky-sluzby",
  "kovovyroba-ploty-brany",
  "garazove-brany-zavory",
  "sklenene-zabradlie-logie-pergoly",
  "pohony-na-brany",
  "montazne-sluzby",
  "povrchova-uprava",
  "dizajnove-plechy",
  "3d-vizualizacie",
  "galeria",
  "kontakt"
];

const serviceSlugs = new Set([
  "kovovyroba-ploty-brany",
  "garazove-brany-zavory",
  "sklenene-zabradlie-logie-pergoly",
  "pohony-na-brany",
  "montazne-sluzby",
  "povrchova-uprava",
  "dizajnove-plechy",
  "3d-vizualizacie"
]);

const sizePattern = /-\d{2,5}x\d{2,5}(?=\.(?:jpe?g|png|webp|gif)$)/i;
const repeatedBrandAssetPattern =
  /\/(?:Logo(?:--2048x768|2)?|cropped-Logobiele-1|i_5325470-150x150)\.(?:png|jpe?g|webp)$/i;
const galleryFilterLabels = new Set([
  "Brány a bráničky",
  "Zábradlia",
  "Schodiská",
  "Prístrešky",
  "Mreže",
  "Ostatné"
]);
const contactBoilerplate = new Set([
  "Kontaktujte nás",
  "Telefón:",
  "+421 (0) 918 283 469 / +421 (0)918 150 409",
  "Adresa:",
  "Rimavské Janovce, 980 01 Močiar 621/38",
  "Otváracie hodiny::",
  "Po – Pia: 6.00 – 18.00",
  "Sociálne siete",
  "Sociálne siete:"
]);
const repeatedExperienceText =
  "Na trhu v súčasnosti nájdeme množstvo firiem, ktoré ponúkajú služby v oblasti kovovýroby. Avšak iba veľmi málo z nich dokáže poskytnúť služby i tak, aby to bolo pre klienta naozaj efektívne a individuálne navrhnuté s jedinečným zákazníckym prístupom a prihliadnutím na ekológiu. W-Mont s.r.o. je spoločnosť, ktorá tieto služby vie nielen robiť, ale vďaka dlhodobým skúsenostiam má v prevádzke aj reálne overené ich fungovanie a životnosť so zárukou a dlhodobým servisom.";
const aboutIntroText =
  "Naša spoločnosť ponúka širokú škálu služieb v oblasti stavebníctva a kovovýroby vrátanevýroby brán, kovových konštrukcií, pergol a zábradlí. Na rozdiel od mnohých iných firiem poskytujeme služby, ktoré sú skutočne efektívne a individuálne navrhnuté s jedinečným zákazníckym prístupom a dôrazom na ekológiu.";

function cleanText(value = "") {
  return value
    .replace(/[\uE000-\uF8FF]/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeTitle(value = "") {
  return cheerio.load(`<span>${value}</span>`)("span").text();
}

function toAssetPath(value = "") {
  const raw = value.trim();
  if (!raw || raw.startsWith("data:")) return null;

  const fromSrcset = raw.split(/\s+/)[0];
  let href = fromSrcset.replace(/^\/\//, "https://").split("?")[0];
  href = href.replace(/^http:\/\/www\.wmont\.sk/i, "https://www.wmont.sk");

  const uploadMarker = "/wp-content/uploads/";
  const uploadIndex = href.indexOf(uploadMarker);
  if (uploadIndex >= 0) {
    return `/assets/uploads/${href.slice(uploadIndex + uploadMarker.length)}`;
  }

  if (href.startsWith("/assets/uploads/")) return href;
  return null;
}

function localExists(assetPath) {
  return existsSync(join(publicDir, assetPath));
}

function mediaKey(assetPath) {
  const filename = assetPath.split("?")[0].split("/").pop() ?? assetPath;
  return filename
    .replace(sizePattern, "")
    .replace(/-[a-z0-9]{18,}(?=\.(?:jpe?g|png|webp|gif)$)/i, "");
}

function mediaScore(assetPath) {
  const sized = assetPath.match(/-(\d{2,5})x(\d{2,5})(?=\.(?:jpe?g|png|webp|gif)$)/i);
  const thumbPenalty = assetPath.includes("/elementor/thumbs/") ? -5_000_000_000 : 0;
  if (!sized) return 10_000_000_000 + thumbPenalty;
  return Number(sized[1]) * Number(sized[2]) + thumbPenalty;
}

function addMedia(map, assetPath, alt = "") {
  if (!assetPath || !localExists(assetPath)) return;
  const ext = assetPath.split(".").pop()?.toLowerCase() ?? "";
  const type = ["mp4", "webm", "mov"].includes(ext) ? "video" : "image";
  const key = type === "image" ? mediaKey(assetPath) : assetPath;
  const current = map.get(key);
  const next = {
    type,
    src: assetPath,
    alt: cleanText(alt)
  };

  if (!current || mediaScore(next.src) > mediaScore(current.src)) {
    map.set(key, next);
  }
}

function extractMedia($) {
  const media = new Map();

  $("img").each((_, element) => {
    const node = $(element);
    const alt = node.attr("alt") ?? "";
    const candidates = [
      node.attr("src"),
      node.attr("data-src"),
      node.attr("data-large_image"),
      ...(node.attr("srcset") ?? "")
        .split(",")
        .map((part) => part.trim().split(/\s+/)[0])
    ];

    for (const candidate of candidates) {
      addMedia(media, toAssetPath(candidate), alt);
    }
  });

  $("a, source, video").each((_, element) => {
    const node = $(element);
    const candidates = [
      node.attr("href"),
      node.attr("src"),
      ...(node.attr("srcset") ?? "")
        .split(",")
        .map((part) => part.trim().split(/\s+/)[0])
    ];

    for (const candidate of candidates) {
      const assetPath = toAssetPath(candidate);
      if (/\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i.test(assetPath ?? "")) {
        addMedia(media, assetPath, node.attr("title") ?? "");
      }
    }
  });

  return [...media.values()];
}

function extractLinks($) {
  const seen = new Set();
  const links = [];

  $("a[href]").each((_, element) => {
    const node = $(element);
    const href = node.attr("href") ?? "";
    const text = cleanText(node.text());
    const internal = href.match(/^https?:\/\/www\.wmont\.sk\/([^?#]*)/i);
    if (!internal || !text || text.toLowerCase() === "viac") return;

    const slug = internal[1].replace(/\/$/, "") || "/";
    const normalizedSlug = slug === "kovovyroba" ? "kovovyroba-ploty-brany" : slug;
    const key = `${normalizedSlug}:${text.toLowerCase()}`;
    if (seen.has(key)) return;

    seen.add(key);
    links.push({
      label: text,
      href: normalizedSlug === "/" ? "/" : `/${normalizedSlug}`
    });
  });

  return links;
}

function shouldSkipBlock(text) {
  return (
    contactBoilerplate.has(text) ||
    text === "Naše skúsenosti:" ||
    text === repeatedExperienceText ||
    text === aboutIntroText ||
    galleryFilterLabels.has(text) ||
    text.startsWith("Rimavské Janovce, 980 01 Močiar 621/38") ||
    text.startsWith("+421 (0) 918 283 469 / +421 (0)918 150 409")
  );
}

function extractBlocks($) {
  const blocks = [];
  const seen = new Set();

  $("h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,td,th,label,.elementor-button-text").each(
    (_, element) => {
      const node = $(element);
      const text = cleanText(node.text());
      if (text.length < 2) return;
      if (/^(viac|menu|odoslať|submit)$/i.test(text)) return;
      if (/^rated\s+\d/i.test(text)) return;

      const tag = element.tagName?.toLowerCase() ?? "p";
      if (shouldSkipBlock(text)) return;
      const key = text.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);

      blocks.push({
        type: /^h[1-6]$/.test(tag) ? "heading" : tag === "li" ? "list" : "text",
        level: /^h[1-6]$/.test(tag) ? Number(tag.slice(1)) : null,
        text
      });
    }
  );

  return blocks;
}

function extractGalleryCategories($) {
  return [...galleryFilterLabels]
    .map((label) => {
      const heading = $("h1,h2,h3,h4,h5,h6")
        .filter((_, element) => cleanText($(element).text()) === label)
        .first();
      const section = heading.closest("section");
      const seen = new Set();
      const images = [];

      section.find("a[href]").each((_, element) => {
        const assetPath = toAssetPath($(element).attr("href"));
        if (
          !assetPath ||
          seen.has(assetPath) ||
          !localExists(assetPath) ||
          !/\.(jpe?g|png|webp|gif)$/i.test(assetPath)
        ) {
          return;
        }

        seen.add(assetPath);
        images.push({
          type: "image",
          src: assetPath,
          alt: label
        });
      });

      return { label, images };
    })
    .filter((category) => category.images.length > 0);
}

function pagePath(page) {
  return page.slug === "domov" ? "/" : `/${page.slug}`;
}

function excerptFrom(page, blocks) {
  if (page.slug === "o-nas") return aboutIntroText;

  const yoast = cleanText(page.yoast_head_json?.description ?? "");
  if (yoast) return yoast;

  const blockExcerpt = blocks
    .filter((block) => block.type === "text")
    .slice(0, 2)
    .map((block) => block.text)
    .join(" ");
  if (blockExcerpt) return blockExcerpt;

  const restExcerpt = cleanText(
    cheerio.load(page.excerpt?.rendered ?? "", { decodeEntities: true }).text()
  );
  if (restExcerpt) return restExcerpt;

  return blocks.find((block) => block.type === "text")?.text ?? "";
}

const pages = readdirSync(pageDir)
  .map((file) => JSON.parse(readFileSync(join(pageDir, file), "utf8")))
  .map((page) => {
    const $ = cheerio.load(page.content?.rendered ?? "", { decodeEntities: true });
    $("script,style,noscript,svg").remove();

    const blocks = extractBlocks($);
    const media = extractMedia($);
    const galleryCategories = page.slug === "galeria" ? extractGalleryCategories($) : [];

    const images = media.filter(
      (item) => item.type === "image" && !repeatedBrandAssetPattern.test(item.src)
    );
    const videos = media.filter((item) => item.type === "video");
    const title = decodeTitle(page.title?.rendered ?? page.slug);

    return {
      id: page.id,
      slug: page.slug,
      path: pagePath(page),
      title,
      seoTitle: cleanText(decodeTitle(page.yoast_head_json?.title ?? title)),
      excerpt: excerptFrom(page, blocks),
      isService: serviceSlugs.has(page.slug),
      blocks,
      links: extractLinks($),
      images,
      videos,
      galleryCategories,
      updatedAt: page.modified
    };
  })
  .sort((a, b) => pageOrder.indexOf(a.slug) - pageOrder.indexOf(b.slug));

const home = pages.find((page) => page.slug === "domov");
const services = pages.filter((page) => page.isService);

const content = {
  generatedAt: new Date().toISOString(),
  source: "https://www.wmont.sk/",
  brand: {
    name: "W - Mont s.r.o.",
    email: "wmont621@gmail.com",
    phone: "+421 (0) 918 150 409",
    address: "Rimavské Janovce, 980 01 Močiar 621/38",
    logo: "/assets/uploads/2023/02/Logo--2048x768.png",
    logoLight: "/assets/uploads/2023/02/cropped-Logobiele-1.png"
  },
  navigation: [
    { label: "Domov", href: "/" },
    { label: "O nás", href: "/o-nas" },
    { label: "Služby", href: "/vsetky-sluzby" },
    { label: "Galéria", href: "/galeria" },
    { label: "Kontakt", href: "/kontakt" }
  ],
  pages,
  services,
  home,
  aliases: [{ from: "/kovovyroba", to: "/kovovyroba-ploty-brany" }]
};

writeFileSync(outFile, `${JSON.stringify(content, null, 2)}\n`);
console.log(`Generated ${pages.length} pages, ${services.length} services -> ${outFile}`);
