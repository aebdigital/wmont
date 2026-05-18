import { services } from "@/lib/site";

const siteUrl = "https://www.wmont.sk";

// Bump this when content is meaningfully updated. Using a single stable date
// avoids signalling "everything updated today" to crawlers on every request.
const lastmod = "2026-05-18";

type SitemapImage = {
  url: string;
  alt?: string;
};

type SitemapPage = {
  path: string;
  priority: string;
  changefreq: string;
  images?: SitemapImage[];
};

const staticPages: SitemapPage[] = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/o-nas", priority: "0.7", changefreq: "monthly" },
  { path: "/galeria", priority: "0.7", changefreq: "weekly" },
  { path: "/kontakt", priority: "0.7", changefreq: "monthly" },
];

const servicePages: SitemapPage[] = services.map((s) => ({
  path: s.path,
  priority: "0.8",
  changefreq: "monthly",
  images: s.image ? [{ url: s.image.src, alt: s.image.alt || s.title }] : undefined,
}));

const allPages = [...staticPages, ...servicePages];

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const urls = allPages
    .map((page) => {
      const lines = [
        "  <url>",
        `    <loc>${siteUrl}${page.path}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
      ];

      if (page.images) {
        for (const image of page.images) {
          lines.push("    <image:image>");
          lines.push(`      <image:loc>${siteUrl}${image.url}</image:loc>`);
          if (image.alt) {
            lines.push(`      <image:caption>${xmlEscape(image.alt)}</image:caption>`);
          }
          lines.push("    </image:image>");
        }
      }

      lines.push("  </url>");
      return lines.join("\n");
    })
    .join("\n");

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemaps-image/1.1">',
      urls,
      "</urlset>",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
