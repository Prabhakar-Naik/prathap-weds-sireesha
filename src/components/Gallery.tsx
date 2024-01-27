import React, { useState, useRef } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";
import couplePic from "../../public/wedding_pics/weddingPic3.webp";
import groomPic from "../../public/wedding_pics/groom.webp";
import bridePic from "../../public/wedding_pics/bride.webp";
import WeddingPic1 from "../../public/wedding_pics/weddingPic1.webp";
import WeddingPic2 from "../../public/wedding_pics/weddingPic2.webp";
import AnimatedText from "@/utils/AnimatedText";
import type { Swiper as SwiperType } from "swiper";
import { useScroll, useTransform, motion } from "framer-motion";

const Gallery = () => {
  const [repeatedCount, setRepeatedCount] = useState<number>(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 7]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);

  const handleTextAnimation = (e: SwiperType) => {
    setRepeatedCount((current) => {
      if (e.activeIndex === 1) {
        return current + 1;
      }
      return current;
    });
  };

  const pictures = [
    { source: couplePic, scale: scale4 },
    { source: groomPic, scale: scale4 },
    { source: bridePic, scale: scale4 },
    { source: WeddingPic1, scale: scale4 },
    { source: WeddingPic2, scale: scale4 },
  ];

  return (
    <>
      <section className="min-h-svh w-screen bg-secondary relative overflow-x-hidden grid items-center md:hidden">
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
                text="Varun Reddy"
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
                text="Pooja Reddy"
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

      <div className="hidden pt-[25vh] bg-secondary md:block">
        <section className="h-[300vh] relative" ref={containerRef}>
          <div className="sticky top-0 overflow-hidden h-[100vh]">
            {pictures.map(({ source, scale }, index) => {
              return (
                <motion.div
                  key={index}
                  style={{ scale }}
                  className="w-full h-full absolute flex justify-center items-center"
                >
                  <div
                    className={`relative w-[25vw] h-[25vh] ${
                      index === 1 ? "-left-[27.5vw] h-[40vh]" : ""
                    } ${index === 2 ? "left-[27.5vw] h-[40vh]" : ""}
                    ${index === 3 ? "-top-[35vh] h-[40vh]" : ""}
                    ${index === 4 ? "-bottom-[35vh] h-[40vh]" : ""}
                    `}
                  >
                    <Image
                      src={source}
                      fill
                      alt={`wedding_image${index}`}
                      placeholder="blur"
                      className="object-cover object-center"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery;
