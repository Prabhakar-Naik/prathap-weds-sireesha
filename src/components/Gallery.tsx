import React, { useState } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import couplePic from "../../public/couplePic.webp";
import groomPic from "../../public/groom.webp";
import bridePic from "../../public/bride.webp";
import WeddingPic1 from "../../public/weddingPic1.webp";
import WeddingPic2 from "../../public/weddingPic2.webp";
import AnimatedText from "@/utils/AnimatedText";
import type { Swiper as SwiperType } from "swiper";

const Gallery = () => {
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
    <section className="h-svh w-screen bg-secondary relative overflow-x-hidden grid items-center">
      <Swiper
        effect={"cards"}
        grabCursor={true}
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
            className="object-cover object-center"
            quality={50}
            priority
            placeholder="blur"
          />

          <div className="z-20 absolute bottom-12 left-7">
            <AnimatedText text="Groom" className="text-accent text-3xl" />
            <AnimatedText
              text="Uday Kiran"
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
            className="object-cover object-right"
            quality={50}
            priority
            placeholder="blur"
          />

          <div className="z-20 absolute bottom-12 left-7">
            <AnimatedText
              text="Bride"
              className="text-accent text-3xl"
              repeatAnimation={repeatedCount === 1}
            />
            <AnimatedText
              text="Padmaja"
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
            quality={50}
          />
        </SwiperSlide>

        {/* candid shots */}
        <SwiperSlide className="card">
          <Image
            src={WeddingPic1}
            fill
            alt="wedding_pic1"
            className="object-cover object-center"
            placeholder="blur"
            priority={false}
            quality={50}
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
            quality={50}
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Gallery;
