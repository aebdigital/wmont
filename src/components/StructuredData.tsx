import { contactPhoneDisplay, openingHours } from "@/lib/contact";
import { brand, services } from "@/lib/site";

export function StructuredData() {
  const siteUrl = "https://www.wmont.sk";
  const businessImages = [
    `${siteUrl}${brand.logo}`,
    ...services
      .map((service) => (service.image ? `${siteUrl}${service.image.src}` : null))
      .filter((src): src is string => Boolean(src))
      .slice(0, 5)
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: brand.name,
      url: siteUrl,
      logo: `${siteUrl}${brand.logo}`,
      image: businessImages,
      email: brand.email,
      telephone: contactPhoneDisplay,
      sameAs: [brand.facebook, brand.instagram].filter(Boolean),
      address: {
        "@type": "PostalAddress",
        streetAddress: "Močiar 621/38",
        addressLocality: "Rimavské Janovce",
        postalCode: "980 01",
        addressCountry: "SK"
      },
      openingHours,
      areaServed: "Slovensko",
      priceRange: "€€",
      makesOffer: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${siteUrl}${service.path}`,
          description: service.excerpt
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: brand.name,
      url: siteUrl,
      inLanguage: "sk-SK",
      publisher: {
        "@id": `${siteUrl}/#localbusiness`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Služby W - Mont s.r.o.",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `${siteUrl}${service.path}`
      }))
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
