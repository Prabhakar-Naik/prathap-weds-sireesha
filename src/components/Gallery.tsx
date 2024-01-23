import React from "react";
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

const Gallery = () => {
  return (
    <section className="h-svh w-screen bg-secondary relative overflow-x-hidden grid items-center">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="h-[550px] w-[325px]"
      >
        {/* groom_pic */}
        <SwiperSlide className="card">
          <Image
            src={groomPic}
            fill
            alt="groom_pic2"
            className="object-cover object-center"
            quality={50}
          />

          <div className="absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-b from-[#00000000] via-[#00000000] to-[#000000]" />
        </SwiperSlide>

        {/* bride_pic */}
        <SwiperSlide className="card">
          <Image
            src={bridePic}
            fill
            alt="bride_pic2"
            className="object-cover object-right"
            quality={50}
          />
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
