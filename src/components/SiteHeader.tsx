"use client";

import { ChevronDown, Facebook, Instagram, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { brand, navigation, services } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicePaths = services.map((service) => service.path);

  useEffect(() => {
    const closeTimer = window.setTimeout(() => {
      setServicesOpen(false);
    }, 320);

    return () => window.clearTimeout(closeTimer);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-white/[0.98] backdrop-blur-lg">
        <div className="wm-container flex min-h-24 items-center justify-between gap-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="W - Mont s.r.o. domov"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-16 w-36 shrink-0 items-center md:h-20 md:w-44">
              <Image
                src={brand.logo}
                alt="W - Mont s.r.o."
                fill
                sizes="(min-width: 768px) 176px, 144px"
                className="object-contain object-left"
                priority
              />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Hlavná navigácia">
            {navigation.map((item) => {
              const isServices = item.label === "Služby";
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href) ||
                    (isServices && servicePaths.some((href) => pathname.startsWith(href)));

              if (isServices) {
                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    onFocus={() => setServicesOpen(true)}
                  >
                    <button
                      type="button"
                      onClick={() => setServicesOpen((value) => !value)}
                      aria-expanded={servicesOpen}
                      className={`inline-flex items-center gap-2 rounded px-4 py-3 text-base font-extrabold transition ${
                        active ? "bg-ink text-white" : "text-ink hover:bg-neutral-100"
                      }`}
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" size={16} />
                    </button>
                    <div
                      className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 transition ${
                        servicesOpen
                          ? "visible opacity-100"
                          : "invisible pointer-events-none opacity-0"
                      }`}
                    >
                      <div className="w-[min(95vw,1100px)]">
                        <div className="grid grid-cols-5 gap-3 border border-line bg-white p-4 shadow-soft">
                          {services.map((service) => (
                            <Link
                              key={service.slug}
                              href={service.path}
                              className="group/card flex flex-col border border-transparent p-2 transition hover:border-ink"
                            >
                              <span className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                                {service.image ? (
                                  <Image
                                    src={service.image.src}
                                    alt=""
                                    fill
                                    sizes="(min-width: 1280px) 18vw, 22vw"
                                    className={`transition duration-500 group-hover/card:scale-[1.08] ${
                                      service.slug === "prenajom-plosin"
                                        ? "object-contain p-2"
                                        : "object-cover"
                                    }`}
                                  />
                                ) : null}
                              </span>
                              <span className="mt-2 block text-sm font-extrabold leading-tight text-ink">
                                {service.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded px-4 py-3 text-base font-extrabold transition ${
                    active ? "bg-ink text-white" : "text-ink hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-white"
            >
              <Facebook aria-hidden="true" size={18} />
            </a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink transition hover:border-ink hover:bg-ink hover:text-white"
            >
              <Instagram aria-hidden="true" size={18} />
            </a>
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
              className="ml-1 inline-flex h-11 items-center gap-2 rounded bg-redline px-4 text-sm font-bold text-white transition hover:bg-black"
            >
              <Phone aria-hidden="true" size={18} />
              <span>{brand.phone}</span>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink transition hover:border-ink lg:hidden"
            aria-label={open ? "Zatvoriť menu" : "Otvoriť menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-panel"
            title={open ? "Zatvoriť menu" : "Otvoriť menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
          </button>
        </div>
      </header>

      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/45 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobilná navigácia"
        className={`fixed inset-x-0 bottom-0 z-[70] flex h-[80vh] flex-col rounded-t-2xl border-t border-line bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
            Menu
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Zatvoriť menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-line text-ink transition hover:border-ink"
          >
            <X aria-hidden="true" size={21} />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-5 py-5"
          aria-label="Mobilná navigácia – zoznam"
        >
          <div className="grid gap-2">
            {navigation.map((item) =>
              item.label === "Služby" ? (
                <div key={item.href} className="grid gap-2">
                  <p className="px-1 pt-2 text-xs font-extrabold uppercase tracking-normal text-redline">
                    Služby
                  </p>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={service.path}
                      className="rounded border border-line px-4 py-4 text-sm font-bold"
                      onClick={() => setOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded border border-line px-4 py-4 text-sm font-bold"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded bg-redline px-4 py-4 text-sm font-bold text-white"
            >
              <Phone aria-hidden="true" size={18} />
              {brand.phone}
            </a>
            <div className="mt-1 flex gap-2">
              <a
                href={brand.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded border border-line text-sm font-bold text-ink"
                onClick={() => setOpen(false)}
              >
                <Facebook aria-hidden="true" size={18} />
                Facebook
              </a>
              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded border border-line text-sm font-bold text-ink"
                onClick={() => setOpen(false)}
              >
                <Instagram aria-hidden="true" size={18} />
                Instagram
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
