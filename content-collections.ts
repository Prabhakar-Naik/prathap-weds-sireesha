import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import rehypeUnwrapImages from "rehype-unwrap-images";

const pages = defineCollection({
  name: "pages",
  directory: "src/mdx-pages",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    name: z.string(),
    imageURL: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [rehypeUnwrapImages],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [pages],
});
