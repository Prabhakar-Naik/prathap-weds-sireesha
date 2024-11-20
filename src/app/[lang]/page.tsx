import React from "react";

import HeroSection from "@/components/HeroSection";
import Gallery from "@/components/Gallery";
import Details from "@/components/Details";
import { getDictionary } from "@/lib/dictionary";
import { Params } from "@/lib/types";
import { ParamsSchema } from "@/lib/types";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Params }) => {
  const resolvedLanguage = (await params).lang;

  const { success, data: parsedLanguage } =
    ParamsSchema.safeParse(resolvedLanguage);

  // in case of unknown route redirecting to english
  if (!success) {
    return notFound();
  } else {
    const data = await getDictionary(parsedLanguage);

    return (
      <>
        <HeroSection data={data} />
        <Gallery data={data} />
        <Details invite={data.invite} date={data.date} />
      </>
    );
  }
};

export default page;
