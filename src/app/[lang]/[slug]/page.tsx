import { Locale } from "@/i18n.config";
import { allPages } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";

type Params = Promise<{ lang: Locale; slug: string }>;

const DynamicPage = async ({ params }: { params: Params }) => {
  const resolvedLanguage = (await params).lang;
  const resolvedSlug = (await params).slug;

  const page = allPages.find((page) => {
    return page._meta.path === `${resolvedLanguage}-${resolvedSlug}`;
  });

  if (!page) {
    return notFound();
  }

  return (
    <article className="prose prose-xl prose-headings:font-normal bg-primary min-h-screen px-4 pt-24">
      <MDXContent code={page?.mdx} />
    </article>
  );
};

export default DynamicPage;
