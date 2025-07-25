import React, { Fragment, JSX, useRef } from "react";
import { motion, useInView, Variants } from "motion/react";

interface AnimatedText {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string; // className can be optional
  repeatAnimation?: boolean;
}

const AnimatedText = ({
  text,
  el: Element = "p" as const,
  className = "",
  repeatAnimation = false,
}: AnimatedText) => {
  const textRef = useRef(null);
  const inView = useInView(textRef, { amount: 0.5, once: true });
  const textArray = Array.isArray(text) ? text : [text];

  const defaultVariants: Variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    repeat: {
      opacity: [0, 1],
      y: [50, 0],
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <Element className={className}>
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden
        ref={textRef}
        animate={inView ? (repeatAnimation ? "repeat" : "animate") : "initial"}
        initial="initial"
        transition={{ staggerChildren: 0.1 }}
      >
        {textArray.map((words, key) => {
          return (
            <span className="block" key={words + key}>
              {words.split(" ").map((word, key) => {
                return (
                  <Fragment key={key}>
                    <motion.span
                      variants={defaultVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                    <span>&nbsp;</span>
                  </Fragment>
                );
              })}
            </span>
          );
        })}
      </motion.span>
    </Element>
  );
};

export default AnimatedText;
