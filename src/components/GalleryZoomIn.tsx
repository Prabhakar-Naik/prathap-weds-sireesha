"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import couplePic from "../../public/wedding_pics/group.avif";
import groomPic from "../../public/wedding_pics/uday.webp";
import bridePic from "../../public/wedding_pics/swapna.avif";
import WeddingPic1 from "../../public/wedding_pics/weddingPic1.avif";
import WeddingPic2 from "../../public/wedding_pics/weddingPic2.avif";

const GalleryZoomIn = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);

  const pictures = [
    { source: couplePic, scale },
    { source: groomPic, scale },
    { source: bridePic, scale },
    { source: WeddingPic1, scale },
    { source: WeddingPic2, scale },
  ];

  return (
    <div className="pt-[25vh] bg-secondary">
      <section className="h-[300vh] relative" ref={containerRef}>
        <div className="sticky top-0 overflow-hidden h-screen">
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
                    className="object-cover object-top"
                    sizes="1000px"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default GalleryZoomIn;
