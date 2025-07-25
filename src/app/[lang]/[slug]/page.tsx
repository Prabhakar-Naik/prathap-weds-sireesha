import { Locale } from "@/i18n.config";
import { allPages } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { i18n } from "@/i18n.config";
type Params = Promise<{ lang: Locale; slug: string }>;

export async function generateStaticParams() {
  const pages = ["bride", "groom"];

  return pages
    .map((slug) => {
      return i18n.locales.map((lang) => ({ lang, slug }));
    })
    .flat();
}

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
    <section className="bg-primary min-h-screen px-4 pt-8 pb-24">
      <article className="prose text-text prose-lg prose-stone prose-img:bg-stone-300 prose-a:after:content-['↗'] mx-auto prose-headings:font-normal prose-headings:mt-0 prose-headings:mb-2 prose-headings:font-primary font-secondary animate-in fade-in slide-in-from-bottom-24 duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]">
        <div className="relative not-prose aspect-square rounded-md overflow-hidden mb-10 bg-stone-300">
          <Image
            src={page.imageURL}
            fill
            alt={`${page.title}_pic`}
            className="object-cover object-top"
            priority
            quality={100}
            sizes="500px"
          />

          <div className="card-gradient" />

          <div className="z-10 absolute bottom-8 left-7">
            <p className="text-accent text-3xl capitalize font-primary">
              {page.title}
            </p>
            <h1 className="text-primary font-secondary text-2xl">
              {page.name}
            </h1>
          </div>
        </div>

        <MDXContent
          code={page?.mdx}
          components={{
            img: ({ src = "", alt = "" }) => {
              return (
                <div className="not-prose relative aspect-video rounded-md overflow-hidden">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover h-full w-full"
                    sizes="500px"
                  />
                </div>
              );
            },
          }}
        />
      </article>
    </section>
  );
};

export default DynamicPage;
