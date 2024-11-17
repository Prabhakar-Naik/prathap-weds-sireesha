"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Dictionary } from "@/lib/types";
import Link from "next/link";

const variants = {
  initial: {
    scale: 0.5,
  },
  animate: {
    scale: 1,
  },
};

const Navbar = ({
  bride,
  groom,
}: {
  bride: Dictionary["bride"];
  groom: Dictionary["groom"];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 w-full z-10">
        <div className="bg-secondary/50 flex justify-between items-center w-11/12 mx-auto py-2 px-4 rounded-full backdrop-blur-md max-w-3xl">
          <Logo className="size-8" />

          <button
            onClick={() => {
              setOpen((current) => !current);
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <MotionConfig
                transition={{
                  duration: 0.25,
                }}
              >
                {open ? (
                  <motion.div
                    key="close"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                  >
                    <X />
                  </motion.div>
                ) : (
                  <motion.div
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    key="open"
                  >
                    <Menu />
                  </motion.div>
                )}
              </MotionConfig>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <div className={`fixed w-full top-[4.5rem] z-10`} key={"content-open"}>
        <div className="flex w-11/12 max-w-3xl justify-end">
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: open ? "10rem" : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              easing: [0.22, 1, 0.36, 1],
            }}
            className={`bg-secondary/50 backdrop-blur-md w-11/12 max-w-56 rounded-xl flex flex-col gap-2 p-4`}
          >
            <Link href="/" className="h-max capitalize font-secondary">
              🙍‍♂️ {groom.title}
            </Link>
            <Link href="/" className="h-max capitalize font-secondary">
              🙍‍♀️ {bride.title}
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
