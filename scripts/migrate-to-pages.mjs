import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const json = JSON.parse(
  readFileSync(join(root, "src/data/site-content.json"), "utf-8")
);

// ── 1. Create src/data/pages/ directory ──
const dataDir = join(root, "src/data/pages");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

// ── 2. Generate individual page data files ──
for (const page of json.pages) {
  const slug = page.slug;

  const lines = [];
  lines.push(`import type { ContentBlock, MediaItem, GalleryCategory } from "@/lib/types";`);
  lines.push(``);
  lines.push(`export const pageData = {`);
  lines.push(`  slug: ${JSON.stringify(slug)},`);
  lines.push(`  path: ${JSON.stringify(page.path)},`);
  lines.push(`  title: ${JSON.stringify(page.title)},`);
  if (page.subtitle) {
    lines.push(`  subtitle: ${JSON.stringify(page.subtitle)},`);
  }
  lines.push(`  seoTitle: ${JSON.stringify(page.seoTitle)},`);
  lines.push(`  excerpt: ${JSON.stringify(page.excerpt)},`);
  lines.push(`  isService: ${page.isService},`);
  lines.push(`  blocks: ${JSON.stringify(page.blocks, null, 2)} as ContentBlock[],`);
  lines.push(`  images: ${JSON.stringify(page.images, null, 2)} as MediaItem[],`);
  lines.push(`  videos: ${JSON.stringify(page.videos || [], null, 2)} as MediaItem[],`);
  lines.push(
    `  galleryCategories: ${JSON.stringify(page.galleryCategories || [], null, 2)} as GalleryCategory[],`
  );
  lines.push(`};`);
  lines.push(``);

  writeFileSync(join(dataDir, `${slug}.ts`), lines.join("\n"));
  console.log(`✓ src/data/pages/${slug}.ts`);
}

// ── 3. Generate src/lib/site.ts ──
const services = json.services.map((s) => ({
  slug: s.slug,
  path: s.path,
  title: s.title,
  excerpt: s.excerpt,
  image: s.images[0] || null,
}));

const siteLines = [];
siteLines.push(`import type { MediaItem } from "@/lib/types";`);
siteLines.push(``);
siteLines.push(`export const brand = ${JSON.stringify(json.brand, null, 2)};`);
siteLines.push(``);
siteLines.push(
  `export const navigation = ${JSON.stringify(json.navigation, null, 2)};`
);
siteLines.push(``);
siteLines.push(`export type ServiceInfo = {`);
siteLines.push(`  slug: string;`);
siteLines.push(`  path: string;`);
siteLines.push(`  title: string;`);
siteLines.push(`  excerpt: string;`);
siteLines.push(`  image: MediaItem | null;`);
siteLines.push(`};`);
siteLines.push(``);
siteLines.push(
  `export const services: ServiceInfo[] = ${JSON.stringify(services, null, 2)};`
);
siteLines.push(``);

writeFileSync(join(root, "src/lib/site.ts"), siteLines.join("\n"));
console.log(`✓ src/lib/site.ts`);

console.log("\nDone! Generated files:");
console.log(`  - src/lib/site.ts (brand, navigation, services)`);
console.log(`  - src/data/pages/*.ts (${json.pages.length} page data files)`);
