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
  mediaFit?: "cover" | "contain";
  mediaAspect?: "4/3" | "3/4" | "1/1";
  mediaCols?: "default" | "dense" | "trio";
  mediaShowHeader?: boolean;
  mediaShowCaptions?: boolean;
  mediaSkipFirst?: boolean;
};

export function ServicePageLayout({
  page,
  children,
  showMediaGrid = true,
  mediaFit = "cover",
  mediaAspect = "4/3",
  mediaCols = "default",
  mediaShowHeader = true,
  mediaShowCaptions = false,
  mediaSkipFirst = true,
}: ServicePageLayoutProps) {
  const galleryImages = mediaSkipFirst ? page.images.slice(1) : page.images;

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
            <MediaGrid
              images={galleryImages}
              title={page.title}
              contained={false}
              fit={mediaFit}
              aspect={mediaAspect}
              cols={mediaCols}
              showHeader={mediaShowHeader}
              showCaptions={mediaShowCaptions}
            />
          ) : null}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
