"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { brand, services } from "@/lib/site";
import type { PageData } from "@/lib/types";
import { motion, useScroll, useTransform, animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function previewText(page: PageData, limit = 160) {
  const source =
    page.excerpt ||
    page.blocks.find((block) => block.type === "text")?.text ||
    page.blocks[0]?.text ||
    "";

  if (source.length <= limit) return source;
  return `${source.slice(0, limit).trim()}...`;
}

function pageEyebrow(page: PageData) {
  if (page.slug === "galeria") return "Galéria realizácií";
  if (page.slug === "kontakt") return "Kontakt a cenové ponuky";
  if (page.isService) return "Služba";
  if (page.slug === "vsetky-sluzby") return "Portfólio služieb";
  return brand.name;
}

export function HomeHero({ page }: { page: PageData }) {
  const halyService = services.find((s) => s.slug === "montovane-haly");
  const heroImageSrc = halyService?.image?.src || "/haly/r_0024D.webp";
  const heroImageAlt = halyService?.image?.alt || "Montované haly";

  const { scrollY } = useScroll();
  
  // Overlay goes from 0.5 (medium dark) to 0.95 (almost black) as we scroll 0px to 600px
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.5, 0.95]);
  
  // Parallax translation for the text content
  const contentY = useTransform(scrollY, [0, 600], [0, -80]);
  
  // Parallax translation for background image
  const imageY = useTransform(scrollY, [0, 600], ["0%", "15%"]);

  return (
    <>
      {/* Fixed container holding background image, overlay, and text */}
      <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0 bg-ink">
        <motion.div style={{ y: imageY, scale: 1.15 }} className="absolute inset-0 h-full w-full">
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        
        {/* Darkening overlay that updates on scroll */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black" 
        />

        {/* Content alignment wrapper */}
        <div className="absolute inset-0 flex items-end">
          <motion.div 
            className="wm-container w-full pb-14 text-white md:pb-20 xl:pb-24"
          >
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-4xl" data-reveal-stagger="120">
                <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-normal md:text-6xl xl:text-7xl">
                  Montované haly, kovové brány, ploty a kovovýroba na mieru
                </h1>
                <p className="mt-6 max-w-3xl text-pretty text-base font-medium leading-8 text-white/78 md:text-lg">
                  {previewText(page, 230)}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#sluzby"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded bg-redline px-5 text-sm font-extrabold text-white transition hover:bg-white hover:text-ink"
                  >
                    Služby
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </Link>
                  <Link
                    href="/kontakt"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded border border-white/34 px-5 text-sm font-extrabold text-white transition hover:border-white hover:bg-white hover:text-ink"
                  >
                    Kontakt
                    <Phone aria-hidden="true" size={18} />
                  </Link>
                </div>
              </div>

              {/* Counter on the right side */}
              <div className="hidden shrink-0 lg:block lg:pb-3">
                <div className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-5 backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="text-4xl font-black tracking-tight text-white md:text-5xl">
                      <CountUp value={2543} />+
                    </span>
                    <span className="mt-1 text-xs font-bold uppercase tracking-wider text-white/60">
                      Spokojných zákazníkov
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll down mouse indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Rolovať
          </span>
          <div className="relative h-8 w-5 rounded-full border border-white/30 flex justify-center p-1.5">
            <motion.div
              animate={{
                y: [0, 8, 0],
                opacity: [1, 0.2, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1 rounded-full bg-white"
            />
          </div>
        </div>
      </div>

      {/* Spacer to push downstream content below the fold */}
      <div className="h-screen w-full pointer-events-none" />
    </>
  );
}

type PageIntroProps = {
  page: PageData;
  showMedia?: boolean;
  descriptionLimit?: number;
};

export function PageIntro({ page, showMedia = true, descriptionLimit = 260 }: PageIntroProps) {
  const image = page.images[0];
  const video = page.videos[0];

  return (
    <section className="wm-container pt-12 md:pt-16" data-reveal-stagger="100">
      <p className="text-sm font-extrabold uppercase tracking-normal text-redline">
        {pageEyebrow(page)}
      </p>
      <h1 className="mt-4 max-w-6xl text-balance text-5xl font-extrabold leading-none text-ink md:text-7xl">
        {page.title}
      </h1>
      {page.subtitle ? (
        <h2 className="mt-6 max-w-4xl text-pretty text-2xl font-bold leading-tight text-ink md:text-3xl">
          {page.subtitle}
        </h2>
      ) : null}
      <p className="mt-6 max-w-4xl text-pretty text-base font-medium leading-8 text-muted md:text-lg">
        {previewText(page, descriptionLimit)}
      </p>
      {page.slug === "kontakt" ? (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${brand.phone.replace(/[^\d+]/g, "")}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded bg-redline px-5 text-sm font-extrabold text-white transition hover:bg-ink"
          >
            <Phone aria-hidden="true" size={18} />
            {brand.phone}
          </a>
          <a
            href={`mailto:${brand.email}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded border border-ink px-5 text-sm font-extrabold text-ink transition hover:bg-ink hover:text-white"
          >
            <Mail aria-hidden="true" size={18} />
            {brand.email}
          </a>
        </div>
      ) : null}
      {showMedia && video ? (
        <div className="mt-10 overflow-hidden rounded bg-ink">
          <video src={video.src} className="aspect-video w-full object-cover" controls playsInline />
        </div>
      ) : showMedia && image ? (
        <div className="relative mt-10 aspect-[16/7] overflow-hidden rounded bg-neutral-100">
          <Image
            src={image.src}
            alt={image.alt || page.title}
            fill
            sizes="90vw"
            className="object-cover"
            priority
          />
        </div>
      ) : null}
    </section>
  );
}
