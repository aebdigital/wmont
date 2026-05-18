export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /3d-vizualizacie",
      "Disallow: /ochrana-osobnych-udajov",
      "",
      "Sitemap: https://www.wmont.sk/sitemap.xml"
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain"
      }
    }
  );
}
