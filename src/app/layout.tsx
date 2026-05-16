import type { Metadata } from "next";
import { CookieConsent } from "@/components/CookieConsent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { brand } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wmont.sk"),
  title: {
    default: "W - Mont s.r.o. | Kovové brány, ploty a kovovýroba",
    template: "%s | W - Mont s.r.o."
  },
  description:
    "Zákazková kovovýroba, kovové brány a ploty, garážové brány, pergoly, sklenené zábradlia, lakovanie a pieskovanie.",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: "W - Mont s.r.o.",
    description:
      "Moderná kovovýroba, brány, ploty, montážne služby a povrchová úprava kovov.",
    url: "https://www.wmont.sk/",
    siteName: brand.name,
    locale: "sk_SK",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "W - Mont s.r.o.",
    description:
      "Moderná kovovýroba, brány, ploty, montážne služby a povrchová úprava kovov."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <StructuredData />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
