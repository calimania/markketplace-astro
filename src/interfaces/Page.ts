import type { CollectionEntry } from "astro:content";

export type Page = CollectionEntry<"pages">["data"];

export {
  type Page as default,
}

