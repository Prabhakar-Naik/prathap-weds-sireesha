"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import NumberFlow from "@number-flow/react";
import { useLoaderContext } from "@/utils/LoaderContext";
import { Play } from "lucide-react";

const buttonVariants = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const loaderVariants = {
  initial: {
    opacity: 1,
    zIndex: 50,
  },
  animate: {
    opacity: 0,
    zIndex: -10,
  },
};

const Loader = () => {
  const [percentage, setPercentage] = useState(0);
  const { hasLoaded, setHasLoaded } = useLoaderContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev === 100) {
          return prev;
        }

        return prev + 100 / 3;
      });
    }, 750);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.section
      variants={loaderVariants}
      initial="initial"
      animate={hasLoaded ? "animate" : "initial"}
      transition={{
        duration: 0.5,
      }}
      role="status"
      className="fixed h-screen w-screen top-0 left-0 bg-primary z-50 flex justify-center items-center flex-col gap-2"
    >
      <div className="text-4xl">
        <NumberFlow value={Math.floor(percentage)} className="font-semibold" />{" "}
        %
      </div>

      <div className="min-h-24">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          animate={percentage === 100 ? "animate" : "initial"}
          transition={{
            duration: 0.5,
          }}
          onClick={() => {
            const html = document.documentElement;

            if (html) {
              html.scrollTo({ top: 0, left: 0 });
              html.style.overflow = "auto";
            }

            setHasLoaded(true);
          }}
          className="h-12 relative w-12 grid place-items-center border hover:bg-text/10 transition-colors border-text rounded-full text-lg font-secondary"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text/70 opacity-75"></span>
          <Play className="relative fill-text" />
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Loader;
