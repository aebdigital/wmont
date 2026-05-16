export type ContentBlock = {
  type: "heading" | "text" | "list" | "image_right";
  level: number | null;
  text: string;
  src?: string;
  alt?: string;
};

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
};

export type GalleryCategory = {
  label: string;
  images: MediaItem[];
};

export type PageData = {
  slug: string;
  path: string;
  title: string;
  subtitle?: string;
  seoTitle: string;
  excerpt: string;
  isService: boolean;
  blocks: ContentBlock[];
  images: MediaItem[];
  videos: MediaItem[];
  galleryCategories: GalleryCategory[];
};
