"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useId } from "react";
import { brand, navigation, services } from "@/lib/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        fill="#ffffff"
        d="M14 14.5h2.5l.5-3H14V9.5c0-.8.2-1.3 1.3-1.3H17V5.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11.5H8v3h2.6V22h3.4v-7.5z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  const gradId = useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="30%" cy="107%" r="130%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="22" height="22" x="1" y="1" rx="5" fill={`url(#${gradId})`} />
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="3" stroke="#ffffff" strokeWidth="1.5" fill="none" />
      <circle cx="15.5" cy="8.5" r="1" fill="#ffffff" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicePaths = services.map((service) => service.path);

  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const showScrolled = scrolled || open;

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
      <header
        className={`left-0 right-0 z-50 transition-all duration-300 ${
          isHome ? "fixed top-0" : "sticky top-0"
        } ${
          showScrolled
            ? "border-b border-white/10 bg-white/45 backdrop-blur-2xl text-ink shadow-sm"
            : "border-transparent bg-transparent text-white"
        }`}
      >
        {/* Dark gradient overlay behind header elements when transparent */}
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-transparent transition-opacity duration-300 ${
            showScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
        <div className="wm-container flex min-h-24 items-center justify-between gap-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="W - Mont s.r.o. domov"
            onClick={() => setOpen(false)}
          >
            <span className="relative flex h-16 w-fit shrink-0 overflow-hidden rounded md:h-20">
              <video
                src="/assets/uploads/2023/02/0001-0400-optimized.mp4"
                className="h-full w-auto object-contain pointer-events-none"
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
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
                        active
                          ? showScrolled
                            ? "bg-ink text-white"
                            : "bg-white text-ink"
                          : showScrolled
                          ? "text-ink hover:bg-ink/10"
                          : "text-white hover:bg-white/15"
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
                    active
                      ? showScrolled
                        ? "bg-ink text-white"
                        : "bg-white text-ink"
                      : showScrolled
                      ? "text-ink hover:bg-ink/10"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
              className="inline-flex items-center justify-center transition-transform hover:scale-110"
            >
              <FacebookIcon className="h-7 w-7" />
            </a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="inline-flex items-center justify-center transition-transform hover:scale-110"
            >
              <InstagramIcon className="h-7 w-7" />
            </a>
            <a
              href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
              className={`ml-1 inline-flex h-11 items-center gap-2 rounded px-4 text-sm font-bold text-white transition ${
                showScrolled ? "bg-redline hover:bg-black" : "bg-redline hover:bg-white hover:text-ink"
              }`}
            >
              <Phone aria-hidden="true" size={18} />
              <span>{brand.phone}</span>
            </a>
          </div>

          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded border transition ${
              showScrolled
                ? "border-line text-ink hover:border-ink"
                : "border-white/34 text-white hover:border-white"
            } lg:hidden`}
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
                <FacebookIcon className="h-5 w-5 text-[#1877F2]" />
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
                <InstagramIcon className="h-5 w-5 text-[#E1306C]" />
                Instagram
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
