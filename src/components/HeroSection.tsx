import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedText from "@/utils/AnimatedText";

const HeroSection = () => {
  const groomVariants = {
    initial: {
      left: "-2rem",
      opacity: 0,
    },
    end: {
      left: "1.25rem",
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.55,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

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
    <section className="h-svh w-screen bg-primary relative overflow-x-hidden">
      <AnimatedText
        text={["Uday", "weds", "Padmaja"]}
        className="text-5xl text-center text-text leading-15 absolute top-[17vh] w-screen"
        el="h1"
      />

      <div className="relative h-full w-[140vw] left-[50%] translate-x-[-50%] pointer-events-none">
        <Image src="./decoration.svg" alt="marriage_decoration" priority fill />
      </div>

      <div className="flex items-end absolute bottom-0 left-[50%] translate-x-[-50%]">
        <motion.div
          className="relative h-[22rem] w-44"
          variants={groomVariants}
          initial="initial"
          animate="end"
        >
          <Image src="./Groom.svg" alt="groom_pic" priority fill />
        </motion.div>

        <motion.div
          className="relative h-80 w-52"
          variants={brideVariants}
          initial="initial"
          animate="end"
        >
          <Image src="./Bride.svg" alt="bride_pic" priority fill />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
