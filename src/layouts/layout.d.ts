
export interface LayoutProps {
  title?: string;
  author?: string;
  profile?: string;
  description?: string;
  ogImage?: string;
  canonicalURL?: string;
  pubDatetime?: Date;
  modDatetime?: Date | null;
  scrollSmooth?: boolean;
  className?: string;
  post?: CollectionEntry<"posts">;
  meta?: {
    title?: string;
    image?: string;
    description?: string;
    url?: string;
    pubDatetime?: string;
    modDatetime?: string;
  };
}