import type { CollectionEntry } from "astro:content";

export type Store = CollectionEntry<'stores'>["data"];

export {
  type Store as default,
};
