export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "",
      "Sitemap: https://www.wmont.sk/sitemap.xml",
      "Host: https://www.wmont.sk"
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain"
      }
    }
  );
}
