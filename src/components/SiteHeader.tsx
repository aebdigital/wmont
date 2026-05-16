"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand, navigation, services } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const servicePaths = services.map((service) => service.path);

  return (
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
                <div key={item.href} className="group relative">
                  <button
                    type="button"
                    className={`inline-flex items-center gap-2 rounded px-4 py-3 text-sm font-semibold transition ${
                      active ? "bg-ink text-white" : "text-ink hover:bg-neutral-100"
                    }`}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" size={16} />
                  </button>
                  <div className="invisible absolute left-0 top-full w-[320px] pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="grid gap-1 rounded border border-line bg-white p-3 shadow-soft">
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={service.path}
                          className="rounded px-3 py-3 text-sm font-semibold leading-5 text-muted transition hover:bg-ink hover:text-white"
                        >
                          {service.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-4 py-3 text-sm font-semibold transition ${
                  active ? "bg-ink text-white" : "text-ink hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex h-11 items-center gap-2 rounded bg-redline px-4 text-sm font-bold text-white transition hover:bg-black"
          >
            <Phone aria-hidden="true" size={18} />
            <span>{brand.phone}</span>
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink transition hover:border-ink lg:hidden"
          aria-label={open ? "Zatvoriť menu" : "Otvoriť menu"}
          title={open ? "Zatvoriť menu" : "Otvoriť menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="wm-container grid gap-2 py-4" aria-label="Mobilná navigácia">
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
              className="inline-flex items-center justify-center gap-2 rounded bg-redline px-4 py-4 text-sm font-bold text-white"
            >
              <Phone aria-hidden="true" size={18} />
              {brand.phone}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
