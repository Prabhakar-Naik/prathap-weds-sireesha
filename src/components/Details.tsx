import dayjs from "dayjs";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import AnimatedText from "@/utils/AnimatedText";

const Details = () => {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { amount: 0.5, once: true });

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

  return (
    <section className="h-screen w-screen bg-text relative overflow-x-hidden py-8 px-4">
      <AnimatedText
        text={["You’re invited to", "celebrate with us on..."]}
        className="text-accent text-3xl text-center"
      />

      <div
        className="flex items-end justify-center relative left-[50%] translate-x-[-50%] w-full"
        ref={containerRef}
      >
        <motion.div
          className="relative h-80 w-52 top-2 z-10"
          variants={groomVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          <Image src="./groomDancing.svg" alt="groom_pic" priority fill />
        </motion.div>

        <motion.div
          className="relative h-72 w-52"
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
        className="text-primary font-secondary font-medium text-2xl text-center mt-4"
      />
    </section>
  );
};

export default Details;
