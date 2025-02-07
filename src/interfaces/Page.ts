import type { SEOImage } from "./Article";
/**
 *  Store Interface
 */
export default interface Page {
  id: number;
  Title: string;
  Description: string;
  slug: string;
  products: { data: [] };
  Links: { label: string, url: string, }[];
  Content: [],
  Logo: {
    id: string,
    formats: {
      medium: {
        ext: string,
        url: string,
        width: number,
        height: number,
      },
      small: {
        ext: string,
        url: string,
        width: number,
        height: number,
      }
    }
  },
  SEO: {
    metaDescription: string,
    metaTitle: string,
    socialImage: SEOImage,
  },
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
