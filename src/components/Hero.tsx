import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/site";
import type { PageData } from "@/lib/types";

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
  const video = page.videos[0];
  const image = page.images[0];

  return (
    <section className="wm-container pt-5 reveal">
      <div className="relative flex min-h-[74svh] overflow-hidden rounded bg-ink">
        {video ? (
          <video
            src={video.src}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : image ? (
          <Image
            src={image.src}
            alt={image.alt || brand.name}
            fill
            sizes="90vw"
            className="object-cover"
            priority
          />
        ) : null}
        <div className="absolute inset-0 bg-black/58" />
        <div className="relative z-10 flex w-full items-end">
          <div className="max-w-5xl px-5 pb-8 text-white md:px-10 md:pb-12 xl:px-14 xl:pb-16" data-reveal-stagger="120">
            <h1 className="text-balance text-5xl font-extrabold leading-[0.95] tracking-normal md:text-7xl xl:text-8xl">
              Kovové brány, ploty a kovovýroba na mieru
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
        </div>
      </div>
    </section>
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
