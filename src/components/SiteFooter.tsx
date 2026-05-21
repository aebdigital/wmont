import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { brand, navigation, services } from "@/lib/site";

export function SiteFooter() {
  const serviceColumns = [
    services.slice(0, Math.ceil(services.length / 2)),
    services.slice(Math.ceil(services.length / 2)),
  ];

  return (
    <footer className="relative z-10 mt-24 border-t border-line bg-ink text-white">
      <div className="wm-container grid gap-12 py-14 lg:grid-cols-[1fr_0.6fr_1.3fr_0.9fr]">
        <div>
          <p className="text-2xl font-extrabold uppercase tracking-normal">W-Mont obchod s.r.o.</p>
          <div className="mt-4 space-y-1.5 text-sm leading-7 text-white/68">
            <p>Sídlo: Močiar 621/38, 980 01 Rimavské Janovce</p>
            <p>IČO: 52 194 884</p>
            <p>DIČ: 2120933034</p>
          </div>
        </div>

        <nav aria-label="Navigácia v pätičke">
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/52">
            Navigácia
          </p>
          <div className="mt-4 grid gap-3">
            {navigation
              .filter((item) => item.href !== "/vsetky-sluzby")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="footer-link-group inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <ArrowUpRight aria-hidden="true" size={16} className="text-redline" />
                  <span className="footer-link">{item.label}</span>
                </Link>
              ))}
          </div>
        </nav>

        <nav aria-label="Služby v pätičke">
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/52">
            Služby
          </p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {serviceColumns.map((column, index) => (
              <div key={index} className="grid content-start gap-3">
                {column.map((service) => (
                  <Link
                    key={service.slug}
                    href={service.path}
                    className="footer-link-group inline-flex items-start gap-2 text-sm font-semibold leading-5"
                  >
                    <ArrowUpRight aria-hidden="true" size={16} className="mt-[2px] shrink-0 text-redline" />
                    <span className="footer-link">{service.title}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>

        <div className="grid gap-4 text-sm text-white/76">
          <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="footer-link-group flex items-center gap-3">
            <Phone aria-hidden="true" size={18} className="shrink-0 text-redline" />
            <span className="footer-link">{brand.phone}</span>
          </a>
          <a href={`mailto:${brand.email}`} className="footer-link-group flex items-center gap-3">
            <Mail aria-hidden="true" size={18} className="shrink-0 text-redline" />
            <span className="footer-link">{brand.email}</span>
          </a>
          <p className="flex items-center gap-3">
            <MapPin aria-hidden="true" size={18} className="shrink-0 text-redline" />
            <span>{brand.address}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wm-container flex flex-col gap-4 py-6 text-xs text-white/52 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} W-Mont obchod s.r.o.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/ochrana-osobnych-udajov" className="footer-link font-semibold">
              Ochrana osobných údajov
            </Link>
            <CookieSettingsButton />
            <a
              href="https://aebdigital.sk"
              target="_blank"
              rel="noreferrer"
              className="footer-link font-semibold"
            >
              Tvorba webu - AEB Digital
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
