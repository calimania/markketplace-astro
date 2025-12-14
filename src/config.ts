import type { Site, SocialObjects } from "./types";

// Loading .env files to populate the configuration
const {
  BASE_URL,
  PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRAPI_URL,
  STORE_SLUG,
  COLOR_PRIMARY,
  COLOR_ACCENT,
  POSTHOG_ID,
  MARKKET_STYLE
} = import.meta.env;

/**
 * @type {{[string]: string}} Global Configuration attributes for the markket instance
 */
export const markketplace = {
  STRAPI_URL: (STRAPI_URL || '').replace(/\/$/, '') || 'https://api.markket.place',
  STORE_SLUG: (STORE_SLUG as string) || 'fika',
  /** @deprecated - using public/$[style].css files */
  colors: {
    primary: COLOR_PRIMARY as string || '#fbda0c',
    accent: COLOR_ACCENT as string || '#38b2ac',
  },
  POSTHOG_ID: POSTHOG_ID as string || '',
  url: BASE_URL.startsWith('http') ? BASE_URL : 'https://markket.place/',
  STRIPE_PUBLISHABLE_KEY: PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  style: MARKKET_STYLE || 'markket',
  defaults: {
    hero: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/f69f2055647b83d6d921f42cf6dda20e.jpg',
    product: 'https://markketplace.nyc3.digitaloceanspaces.com/uploads/a686ab9808e93237df4dfd7a72b4e743.png',
  }
};

/**
 * Global configuration attributes for the astro site
 *
 * @TODO: Read these values from the API during launch or build time
 */
export const SITE: Site = {
  website: markketplace.url,
  author: "Markket",
  profile: "https://markket.place/",
  desc: "A minimal, responsive and SEO-friendly Markketplace theme",
  title: "Markket Theme",
  ogImage: "https://markketplace.nyc3.digitaloceanspaces.com/uploads/3852868ed9aad1e45e4ee4992fe43177.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/orgs/calimania/repositories?q=markket",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
];
