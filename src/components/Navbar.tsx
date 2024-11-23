"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeOff, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dictionary } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import Timer from "./Timer";
import { useLoaderContext } from "@/utils/LoaderContext";
import UdayProfilePic from "../../public/uday-profile.webp";
import SwapnaProfilePic from "../../public/swapna-profile.webp";

const Navbar = ({
  bride,
  groom,
}: {
  bride: Dictionary["bride"];
  groom: Dictionary["groom"];
}) => {
  const [open, setOpen] = useState(false);
  const { lang } = useParams<{ lang: Locale }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const { hasLoaded } = useLoaderContext();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (hasLoaded && audioRef.current) {
      audioRef.current.play().then(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.2;
          audioRef.current.currentTime = 31.5;
        }
        setIsPlaying(true);
      });
    }
  }, [hasLoaded]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <nav className="fixed top-4 w-full z-20">
        <div className="bg-primary/50 border border-text/50 flex justify-between items-center w-11/12 mx-auto py-2 px-4 rounded-full backdrop-blur-md max-w-3xl">
          <Link href={`/${lang}`} className="font-primary text-2xl text-text">
            {lang === "en" ? "Wedding Invitation" : "పెండ్లి పిలుపు"}
          </Link>

          <div className="flex gap-2">
            <button
              className="h-10 w-10 grid place-items-center rounded-full"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Volume2 size={20} /> : <VolumeOff size={20} />}
            </button>

            <button
              className="group"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => {
                setOpen((current) => !current);
              }}
            >
              <svg
                className="pointer-events-none"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="fixed w-full top-[5rem] z-20" key={"content-open"}>
        <div className="flex w-11/12 max-w-3xl mx-auto justify-end">
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: open ? "13.5rem" : 0,
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
              className="h-max flex gap-2 items-center capitalize font-secondary"
            >
              <Image
                height={300}
                width={300}
                src={UdayProfilePic}
                alt="uday profile pic"
                placeholder="blur"
                priority={false}
                className="size-10 rounded-full"
              />
              {groom.title}
            </Link>
            <Link
              href={`/${lang}/bride`}
              onClick={() => {
                setOpen((current) => !current);
              }}
              className="h-max flex gap-2 items-center  capitalize font-secondary"
            >
              <Image
                height={300}
                width={300}
                src={SwapnaProfilePic}
                placeholder="blur"
                alt="swapna profile pic"
                priority={false}
                className="size-10 rounded-full"
              />{" "}
              {bride.title}
            </Link>
            <Link
              href="https://maps.app.goo.gl/yeJBRyUoHo6zgYJZA"
              onClick={() => {
                setOpen((current) => !current);
              }}
              target="_blank"
              className="h-max capitalize font-secondary"
            >
              📍 {lang === "en" ? "Location" : "కళ్యాణ వేదిక"}
            </Link>

            <Timer />
          </motion.div>
        </div>
      </div>

      <audio id="musicplayer" autoPlay ref={audioRef} loop className="sr-only">
        <source src="/bg-music.mp3" />
      </audio>
    </>
  );
};

export default Navbar;
