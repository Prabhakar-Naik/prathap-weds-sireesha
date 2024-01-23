import React, { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedText {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string; // className can be optional
}

const AnimatedText = ({
  text,
  el: Element = "p",
  className = "",
}: AnimatedText) => {
  const textRef = useRef(null);
  const inView = useInView(textRef, { amount: 0.5, once: true });
  const textArray = Array.isArray(text) ? text : [text];

  const defaultVariants = {
    initial: {
      opacity: 0,
      y: 50,
      transition: {
        staggerChildren: 0.1,
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <Element className={className}>
      <span className="sr-only">{text}</span>

      <motion.span
        aria-hidden
        initial="initial"
        animate={inView ? "animate" : "initial"}
        variants={defaultVariants}
        ref={textRef}
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
