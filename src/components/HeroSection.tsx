"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimate, useInView } from "motion/react";
import confetti from "canvas-confetti";
import AnimatedText from "@/utils/AnimatedText";
import { Dictionary } from "@/lib/types";
import { useLoaderContext } from "@/components/LoaderContext";

const HeroSection = ({ data }: { data: Dictionary }) => {
  const containerRef = useRef(null);
  const { hasLoaded } = useLoaderContext();
  const inView = useInView(containerRef, { amount: 0.5, once: true });
  const [scope, animate] = useAnimate();
  const handleAnimation = async () => {
    animate(
      "#groom",
      {
        left: "3rem",
        opacity: 1,
      },
      {
        duration: 0.7,
        delay: 0.55,
        ease: [0.33, 1, 0.68, 1],
      }
    );

    await animate(
      "#bride",
      {
        left: "0rem",
        opacity: 1,
      },
      {
        duration: 0.7,
        delay: 0.55,
        ease: [0.33, 1, 0.68, 1],
      }
    );

    await confetti({
      particleCount: 150,
      spread: 160,
      origin: { y: 0.6 },
      gravity: 0.75,
      shapes: ["square"],
    });
  };

  useEffect(() => {
    if (inView && hasLoaded) {
      handleAnimation();
    }
  }, [inView, hasLoaded]);

  return (
    <section ref={scope}>
      <div className="h-screen w-screen bg-gradient-to-b from-primary to-text relative overflow-x-hidden">
        <AnimatedText
          text={data.title.split(" ")}
          className="text-5xl text-center text-text leading-15 absolute top-[17vh] w-screen tall:top-[20vh] md:portrait:text-7xl"
          el="h1"
          repeatAnimation={hasLoaded}
        />

        <div className="relative h-screen w-[140vw] left-[50%] translate-x-[-50%] pointer-events-none">
          <Image
            src="/decoration.svg"
            alt="marriage_decoration"
            priority
            fill
          />
        </div>

        <div
          className="flex items-end absolute bottom-0 left-[50%] translate-x-[-50%] md:translate-x-[-45%]"
          ref={containerRef}
        >
          <motion.div
            className="relative h-[22rem] w-44 md:portrait:h-[34rem] md:portrait:w-52 z-10"
            id="groom"
            initial={{
              left: "-1rem",
              opacity: 0,
            }}
          >
            <Image src="/Groom.svg" alt="groom_pic" priority fill />
          </motion.div>

          <motion.div
            className="relative h-80 w-52 md:portrait:h-[30.5rem] md:portrait:w-[19rem]"
            id="bride"
            initial={{
              left: "3rem",
              opacity: 0,
            }}
          >
            <Image src="/Bride.svg" alt="bride_pic" priority fill />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
