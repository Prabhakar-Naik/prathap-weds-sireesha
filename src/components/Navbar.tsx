"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Dictionary } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import Timer from "./Timer";

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
  const { lang } = useParams<{ lang: Locale }>();

  return (
    <>
      <nav className="fixed top-4 w-full z-20">
        <div className="bg-primary/50 border border-text/50 flex justify-between items-center w-11/12 mx-auto py-2 px-4 rounded-full backdrop-blur-md max-w-3xl">
          <Link href={`/${lang}`} className="font-primary text-2xl text-text">
            {lang === "en" ? "Wedding Invitation" : "పెండ్లి పిలుపు"}
          </Link>

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

      <div className="fixed w-full top-[4.5rem] z-20" key={"content-open"}>
        <div className="flex w-11/12 max-w-3xl mx-auto justify-end">
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: open ? "12rem" : 0,
              opacity: open ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              easing: [0.22, 1, 0.36, 1],
            }}
            className={`bg-primary/50 text-text border text-lg border-text/50 backdrop-blur-md w-11/12 max-w-56 rounded-xl flex flex-col gap-2 p-4`}
          >
            <Link
              href={`/${lang}/groom`}
              onClick={() => {
                setOpen((current) => !current);
              }}
              className="h-max capitalize font-secondary"
            >
              🙍‍♂️ {groom.title}
            </Link>
            <Link
              href={`/${lang}/bride`}
              onClick={() => {
                setOpen((current) => !current);
              }}
              className="h-max capitalize font-secondary"
            >
              🙍‍♀️ {bride.title}
            </Link>
            <Link
              href="https://maps.app.goo.gl/yeJBRyUoHo6zgYJZA"
              onClick={() => {
                setOpen((current) => !current);
              }}
              target="_blank"
              className="h-max capitalize font-secondary"
            >
              📍 Location
            </Link>

            <Timer />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
