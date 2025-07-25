"use client";

import React, { MutableRefObject, useRef, useState } from "react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { EffectCards } from "swiper/modules";
import dynamic from "next/dynamic";

import couplePic from "../../public/wedding_pics/group.webp";
import groomPic from "../../public/wedding_pics/prathap.webp";
import bridePic from "../../public/wedding_pics/sireesha.webp";
import WeddingPic1 from "../../public/wedding_pics/weddingPic1.avif";
import WeddingPic2 from "../../public/wedding_pics/weddingPic2.avif";
import AnimatedText from "@/utils/AnimatedText";
import { Dictionary } from "@/lib/types";
import { useWindowSize } from "@/utils/useWindowSize";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GalleryZoomIn = dynamic(() => import("./GalleryZoomIn"), { ssr: false });

const Gallery = ({ data }: { data: Dictionary }) => {
  const { groom, bride } = data;
  const { width } = useWindowSize();
  const swiperRef = useRef<SwiperType>(null) as MutableRefObject<SwiperType>;

  const [repeatedCount, setRepeatedCount] = useState<number>(0);

  const handleTextAnimation = (e: SwiperType) => {
    setRepeatedCount((current) => {
      if (e.activeIndex === 1) {
        return current + 1;
      }
      return current;
    });
  };

  return (
    <>
      {width < 768 ? (
        <section className="min-h-screen w-screen bg-secondary relative overflow-x-hidden grid items-center md:hidden">
          <Swiper
            effect={"cards"}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop
            modules={[EffectCards]}
            className="h-[550px] w-[325px]"
            onSlideChange={handleTextAnimation}
          >
            {/* groom_pic */}
            <SwiperSlide className="card">
              <Image
                src={groomPic}
                fill
                alt="groom_pic2"
                className="object-cover object-top"
                priority
                placeholder="blur"
                quality={100}
                sizes="500px"
              />

              <div className="z-20 absolute bottom-12 left-7">
                <AnimatedText
                  text={groom.title}
                  className="text-accent text-3xl capitalize"
                />
                <AnimatedText
                  text={groom.name}
                  className="text-primary font-secondary text-2xl"
                />
              </div>

              <div className="card-gradient" />
            </SwiperSlide>

            {/* bride_pic */}
            <SwiperSlide className="card">
              <Image
                src={bridePic}
                fill
                alt="bride_pic2"
                className="object-cover"
                priority
                placeholder="blur"
                sizes="500px"
              />

              <div className="z-20 absolute bottom-12 left-7">
                <AnimatedText
                  text={bride.title}
                  className="text-accent text-3xl"
                  repeatAnimation={repeatedCount === 1}
                />
                <AnimatedText
                  text={bride.name}
                  className="text-primary font-secondary text-2xl"
                  repeatAnimation={repeatedCount === 1}
                />
              </div>

              <div className="card-gradient" />
            </SwiperSlide>

            {/* couplePic */}
            <SwiperSlide className="card">
              <Image
                src={couplePic}
                fill
                alt="couple_pic"
                className="object-cover object-center"
                placeholder="blur"
                priority={false}
                sizes="500px"
              />
            </SwiperSlide>

            {/* candid shots */}
            {/* <SwiperSlide className="card">
              <Image
                src={WeddingPic1}
                fill
                alt="wedding_pic1"
                className="object-cover object-center"
                placeholder="blur"
                priority={false}
                sizes="500px"
              />
            </SwiperSlide>

            <SwiperSlide className="card">
              <Image
                src={WeddingPic2}
                fill
                alt="wedding_pic2"
                className="object-cover object-center"
                placeholder="blur"
                priority={false}
                sizes="500px"
              />
            </SwiperSlide> */}
          </Swiper>

          <div className="flex gap-2 justify-center -translate-y-4">
            <button
              className="h-12 relative w-12 grid place-items-center border hover:bg-text/10 transition-colors border-text rounded-full text-lg font-secondary"
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slidePrev();
                }
              }}
            >
              <ChevronLeft />
            </button>

            <button
              className="h-12 relative w-12 grid place-items-center border hover:bg-text/10 transition-colors border-text rounded-full text-lg font-secondary"
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideNext();
                }
              }}
            >
              <ChevronRight />
            </button>
          </div>
        </section>
      ) : (
        <GalleryZoomIn />
      )}
    </>
  );
};

export default Gallery;
