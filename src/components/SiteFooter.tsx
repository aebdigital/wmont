import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { brand, navigation, services } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-ink text-white">
      <div className="wm-container grid gap-12 py-14 lg:grid-cols-[1fr_0.6fr_1.3fr_0.9fr]">
        <div>
          <p className="text-2xl font-extrabold uppercase tracking-normal">{brand.name}</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
            Zákazková kovovýroba, brány, ploty, garážové systémy, pergoly, povrchové úpravy
            a montážne služby po celom Slovensku.
          </p>
        </div>

        <nav className="grid gap-3" aria-label="Navigácia v pätičke">
          {navigation
            .filter((item) => item.href !== "/vsetky-sluzby")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="footer-link inline-flex items-center gap-2 text-sm font-semibold"
              >
                <ArrowUpRight aria-hidden="true" size={16} className="text-redline" />
                {item.label}
              </Link>
            ))}
        </nav>

        <nav aria-label="Služby v pätičke">
          <p className="text-xs font-extrabold uppercase tracking-wider text-white/52">
            Služby
          </p>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={service.path}
                className="footer-link inline-flex items-start gap-2 text-sm font-semibold"
              >
                <ArrowUpRight aria-hidden="true" size={16} className="mt-[2px] shrink-0 text-redline" />
                <span>{service.title}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="grid gap-4 text-sm text-white/76">
          <a href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`} className="footer-link flex gap-3">
            <Phone aria-hidden="true" size={18} className="mt-1 shrink-0 text-redline" />
            <span>{brand.phone}</span>
          </a>
          <a href={`mailto:${brand.email}`} className="footer-link flex gap-3">
            <Mail aria-hidden="true" size={18} className="mt-1 shrink-0 text-redline" />
            <span>{brand.email}</span>
          </a>
          <p className="flex gap-3">
            <MapPin aria-hidden="true" size={18} className="mt-1 shrink-0 text-redline" />
            <span>{brand.address}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wm-container flex flex-col gap-4 py-6 text-xs text-white/52 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}</p>
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
