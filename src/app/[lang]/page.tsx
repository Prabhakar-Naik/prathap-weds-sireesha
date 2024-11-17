import React from "react";
import HeroSection from "@/components/HeroSection";
import Gallery from "@/components/Gallery";
import Details from "@/components/Details";
import { getDictionary } from "@/lib/dictionary";
import { Params } from "@/lib/types";

const page = async ({ params }: { params: Params }) => {
  const resolvedLanguage = (await params).lang;
  const data = await getDictionary(resolvedLanguage);

  return (
    <>
      <HeroSection data={data} />
      <Gallery data={data} />
      <Details />
    </>
  );
};

export default page;
