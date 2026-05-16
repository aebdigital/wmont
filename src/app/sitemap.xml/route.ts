import { services } from "@/lib/site";

const siteUrl = "https://www.wmont.sk";

type SitemapPage = {
  path: string;
  priority: string;
  changefreq: string;
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
}));

const allPages = [...staticPages, ...servicePages];

export function GET() {
  const lastmod = new Date().toISOString();

  const urls = allPages
    .map((page) =>
      [
        "  <url>",
        `    <loc>${siteUrl}${page.path}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        "  </url>",
      ].join("\n")
    )
    .join("\n");

  return new Response(
    ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', urls, "</urlset>"].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
