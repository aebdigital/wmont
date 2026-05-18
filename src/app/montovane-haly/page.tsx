import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import {
  benefits,
  flexibilnyBlocks,
  introBlocks,
  komplexnaBlocks,
  pageData,
  scopeBlocks,
} from "@/data/pages/montovane-haly";

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
      <ContentBlocks blocks={introBlocks} title={pageData.title} mode="article" />
      <ContentBlocks blocks={komplexnaBlocks} title={pageData.title} mode="article" />
      <ContentBlocks blocks={flexibilnyBlocks} title={pageData.title} mode="article" />
      <ContentBlocks blocks={scopeBlocks} title={pageData.title} mode="article" />

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

    </ServicePageLayout>
  );
}
