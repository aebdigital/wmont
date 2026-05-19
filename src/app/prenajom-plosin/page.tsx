import type { Metadata } from "next";
import { ContentBlocks } from "@/components/ContentBlocks";
import { LiftProductPhotos } from "@/components/LiftProductPhotos";
import { ServicePageLayout } from "@/components/ServicePageLayout";
import { liftProducts, pageData } from "@/data/pages/prenajom-plosin";

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

export default function PrenajomPlosinPage() {
  return (
    <ServicePageLayout page={pageData} showMediaGrid={false}>
      <ContentBlocks blocks={pageData.blocks} title={pageData.title} mode="article" />

      {liftProducts.map((product) => (
        <section
          key={product.name}
          className="mt-12 border-t border-line pt-10"
        >
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">{product.name}</h2>
          {product.meta ? (
            <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-redline">
              {product.meta}
            </p>
          ) : null}
          {product.description ? (
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-ink/72 md:text-base md:leading-8">
              {product.description}
            </p>
          ) : null}

          <LiftProductPhotos photos={product.photos} productName={product.name} />

          {product.specs && product.specs.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-base font-extrabold text-ink md:text-lg">
                Technické parametre
              </h3>
              <div className="mt-3 h-[3px] w-12 rounded-full bg-redline" />
              <dl className="mt-5 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <dt className="text-sm font-semibold text-ink/72">{spec.label}</dt>
                    <dd className="text-right text-sm font-extrabold text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </section>
      ))}
    </ServicePageLayout>
  );
}
