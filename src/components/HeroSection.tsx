import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimate, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import AnimatedText from "@/utils/AnimatedText";

const HeroSection = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { amount: 0.5, once: true });
  const [scope, animate] = useAnimate();
  const handleAnimation = async () => {
    animate(
      "#groom",
      {
        left: "1.25rem",
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
        left: "-1.5rem",
        opacity: 1,
      },
      {
        duration: 0.7,
        delay: 0.55,
        ease: [0.33, 1, 0.68, 1],
      }
    );

    await confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      gravity: 0.75,
      shapes: ["square"],
    });
  };

  useEffect(() => {
    if (inView) {
      handleAnimation();
    }
  }, [inView]);

  const brideVariants = {
    initial: {
      left: "2rem",
      opacity: 0,
    },
    end: {
      left: "-1.5rem",
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.55,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <section
      className="h-svh w-screen bg-primary relative overflow-x-hidden"
      ref={scope}
    >
      <AnimatedText
        text={["Uday", "weds", "Padmaja"]}
        className="text-5xl text-center text-text leading-15 absolute top-[17vh] w-screen"
        el="h1"
      />

      <div className="relative h-full w-[140vw] left-[50%] translate-x-[-50%] pointer-events-none">
        <Image src="./decoration.svg" alt="marriage_decoration" priority fill />
      </div>

      <div
        className="flex items-end absolute bottom-0 left-[50%] translate-x-[-50%]"
        ref={containerRef}
      >
        <motion.div
          className="relative h-[22rem] w-44"
          id="groom"
          initial={{
            left: "-2rem",
            opacity: 0,
          }}
        >
          <Image src="./Groom.svg" alt="groom_pic" priority fill />
        </motion.div>

        <motion.div
          className="relative h-80 w-52"
          id="bride"
          initial={{
            left: "2rem",
            opacity: 0,
          }}
        >
          <Image src="./Bride.svg" alt="bride_pic" priority fill />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
