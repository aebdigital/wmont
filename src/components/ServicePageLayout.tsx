import { ContactBand } from "@/components/ContactBand";
import { ContentBlocks } from "@/components/ContentBlocks";
import { PageIntro } from "@/components/Hero";
import { MediaGrid } from "@/components/MediaGrid";
import { ServiceSidebar } from "@/components/ServiceSidebar";
import type { PageData } from "@/lib/types";

type ServicePageLayoutProps = {
  page: PageData;
  children?: React.ReactNode;
  showMediaGrid?: boolean;
};

export function ServicePageLayout({ page, children, showMediaGrid = true }: ServicePageLayoutProps) {
  const galleryImages = page.images.slice(1);

  return (
    <>
      <PageIntro page={page} showMedia={false} />
      <section className="wm-container mt-14 grid gap-10 lg:grid-cols-[300px_1fr]">
        <ServiceSidebar currentSlug={page.slug} />
        <div className="min-w-0">
          {children || (
            <ContentBlocks blocks={page.blocks} title={page.title} mode="article" />
          )}
          {showMediaGrid && galleryImages.length > 0 ? (
            <MediaGrid images={galleryImages} title={page.title} contained={false} />
          ) : null}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
