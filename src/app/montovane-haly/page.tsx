import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { benefits, hallTypes, pageData } from "@/data/pages/montovane-haly";

export const metadata: Metadata = {
  title: pageData.seoTitle || pageData.title,
  description: pageData.excerpt,
  alternates: { canonical: pageData.path },
  openGraph: {
    title: pageData.seoTitle || pageData.title,
    url: pageData.path,
    description: pageData.excerpt,
    images: pageData.images[0] ? [{ url: pageData.images[0].src }] : undefined,
  },
};

export default function MontovaneHalyPage() {
  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <ContentBlocks blocks={pageData.blocks} title={pageData.title} mode="article" />

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
          Hlavné výhody priemyselných hál pre investora
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded border border-line p-5 transition hover:border-ink"
            >
              <h3 className="text-base font-extrabold leading-tight text-ink md:text-lg">
                {benefit.title}
              </h3>
              <div className="mt-3 h-[3px] w-10 rounded-full bg-redline" />
              <p className="mt-4 text-sm font-medium leading-7 text-ink/72">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="text-2xl font-extrabold text-ink md:text-3xl">Typy konštrukcií</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {hallTypes.map((type) => (
            <article
              key={type.code}
              className="rounded border border-line p-5 transition hover:border-ink"
            >
              <p className="text-xs font-extrabold uppercase tracking-wider text-redline">
                {type.code}
              </p>
              <h3 className="mt-2 text-base font-extrabold leading-tight text-ink md:text-lg">
                {type.description}
              </h3>
              <ul className="mt-4 grid gap-2">
                {type.specs.map((spec) => (
                  <li
                    key={spec}
                    className="border-l-2 border-redline pl-3 text-sm font-medium leading-7 text-ink/78"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  );
}
