// import type { APIRoute } from "astro";
// import { getCollection, type CollectionEntry } from "astro:content";
// import { generateOgImageForPost } from "@utils/generateOgImages";
// import { slugifyStr } from "@utils/slugify";

export async function getStaticPaths() {
  // const posts = await getCollection("blog").then(p =>
  //   p.filter(({ data }) => !data.draft && !data.ogImage)
  // );

  // return posts.map(post => ({
  //   params: { slug: slugifyStr(post.data.title) },
  //   props: post,
  // }));
  return [];
}

// export const GET: APIRoute = async ({ props }) =>
//   new Response(await generateOgImageForPost(props as CollectionEntry<"posts">), {
//     headers: { "Content-Type": "image/png" },
//   });
