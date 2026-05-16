import type { Metadata } from "next";
import Image from "next/image";
import { ContentBlocks } from "@/components/ContentBlocks";
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
          {product.description ? (
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-ink/72 md:text-base md:leading-8">
              {product.description}
            </p>
          ) : null}

          <div
            className={`mt-6 grid gap-4 ${
              product.photos.length > 1 ? "md:grid-cols-2" : "max-w-2xl"
            }`}
          >
            {product.photos.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[4/3] overflow-hidden rounded border border-line bg-neutral-100"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="object-contain p-2"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </ServicePageLayout>
  );
}
