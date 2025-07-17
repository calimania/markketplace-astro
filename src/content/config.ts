import { defineCollection } from "astro:content";
import { markketplace } from "@config";
import {
  fetchStrapiContent,
  fetchStrapiSchema,
  type StrapiQueryOptions,
  type StrapiConfig
} from 'cafecito';

const config: StrapiConfig = {
  store_slug: markketplace.STORE_SLUG,
  api_url: markketplace.STRAPI_URL,
  sync_interval: 6000,
};

/**
 * Creates a Strapi content loader for Astro
 * @param contentType The Strapi content type to load
 * @param filter The filter to apply to the content &filters[store][id][$eq]=${STRAPI_STORE_ID}
 * @returns An Astro loader for the specified content type
 */
function strapiLoader(query: StrapiQueryOptions) {
  return {
    name: `strapi-${query.contentType}`,
    schema: async () => await fetchStrapiSchema(query.contentType, config.api_url),

    async load({ store, logger, meta }) {
      const lastSynced = meta.get("lastSynced");
      if (lastSynced && Date.now() - Number(lastSynced) < config.sync_interval) {
        logger.info("Skipping sync");
        return;
      }

      const posts = await fetchStrapiContent(query, config);

      store.clear();
      posts.forEach((item: any) => store.set({ id: item.id, data: item }));
      meta.set("lastSynced", String(Date.now()));
    },
  };
};

const pages = defineCollection({
  loader: strapiLoader({
    contentType: "page",
    filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO.socialImage,albums,albums.tracks'
  }),
});

const store = defineCollection({
  loader: strapiLoader({
    contentType: "store",
    filter: `filters[slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO.socialImage,Logo,URLS,Favicon,Cover'
  }),
});

const stores = defineCollection({
  loader: strapiLoader({
    contentType: "store",
    filter: `filters[active]=true`,
    populate: 'SEO.socialImage,Logo,URLS,Favicon'
  }),
});

const products = defineCollection({
  loader: strapiLoader({
    contentType: "product",
    filter: `filters[stores][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO,SEO.socialImage,Thumbnail,Slides,PRICES'
  }),
});

const posts = defineCollection({
  loader: strapiLoader({
    contentType: "article",
    filter: `filters[store][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO.socialImage,Tags,store,cover',
    paginate: {
      limit: 100,
    }
  }),
});

const events = defineCollection({
  loader: strapiLoader({
    contentType: "event",
    filter: `filters[stores][slug][$eq]=${markketplace.STORE_SLUG}`,
    populate: 'SEO,SEO.socialImage,Tag,Thumbnail,Slides,stores'
  }),
});

export const collections = { posts, pages, stores, products, events, store };
