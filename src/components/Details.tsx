"use client";

import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import AnimatedText from "@/utils/AnimatedText";
import { LocationIcon } from "@/utils/Icons";

const Details = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { amount: 0.5, once: true });
  const [startAnimation, setStartAnimation] = useState(false);

  const groomVariants = {
    initial: {
      left: "-2rem",
      opacity: 0,
    },
    animate: {
      left: "0.5rem",
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
    animate: {
      left: "-1rem",
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.55,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const buttonVariants = {
    initial: {
      top: "100%",
    },
    animate: {
      top: 0,
    },
  };

  const handleAnimation = () => {
    setStartAnimation((current) => !current);
  };

  return (
    <section className="min-h-svh w-screen bg-text relative overflow-x-hidden py-8 px-4 flex flex-col justify-evenly">
      <AnimatedText
        text={["You’re invited to", "celebrate with us on..."]}
        className="text-accent text-3xl text-center md:text-5xl"
      />

      <div
        className="flex items-end justify-center relative left-[50%] translate-x-[-50%] w-full"
        ref={containerRef}
      >
        <motion.div
          className="relative h-80 w-52 top-2 z-10 md:h-96 md:w-60"
          variants={groomVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <Image src="./groomDancing.svg" alt="groom_pic" priority fill />
        </motion.div>

        <motion.div
          className="relative h-72 w-52 md:h-[22rem]"
          variants={brideVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <Image src="./brideDancing.svg" alt="bride_pic" priority fill />
        </motion.div>
      </div>

      <AnimatedText
        text={[
          dayjs().add(1, "M").format("D MMM, dddd"),
          "at",
          "123 Anywhere st",
          "Any city",
        ]}
        className="text-primary font-secondary font-medium text-2xl text-center mt-8 md:text-3xl"
      />

      <a
        href="https://maps.app.goo.gl/3uUyw9qa1ZXYrAQXA"
        target="_blank"
        tabIndex={0}
        role="button"
        className="bg-primary w-56 h-12 rounded-full relative grid items-center overflow-hidden mx-auto mt-4"
        onMouseEnter={handleAnimation}
        onMouseLeave={handleAnimation}
      >
        <span className="flex items-center gap-2 text-xl font-secondary justify-center z-10 text-text">
          View in map <LocationIcon />
        </span>

        <motion.div
          variants={buttonVariants}
          initial="initial"
          animate={startAnimation ? "animate" : "initial"}
          className="h-full w-full absolute bg-accent rounded-full"
        />
      </a>

      <a
        href="https://pavanbhaskar.com"
        target="_blank"
        className="font-secondary text-primary text-center mt-4 text-xs"
      >
        Made with 💝 by <span className="underline">Pavan Bhaskar</span>
      </a>
    </section>
  );
};

export default Details;
