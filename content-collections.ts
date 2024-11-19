import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

const pages = defineCollection({
  name: "pages",
  directory: "src/mdx-pages",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [pages],
});
