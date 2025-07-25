"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeOff, Volume2, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import { useLoaderContext } from "@/components/LoaderContext";
import PrathapProfilePic from "../../public/prathap-profile.webp";
import SireeshaProfilePic from "../../public/sireesha-profile.webp";
import { motion } from "motion/react";
import { useWindowSize } from "@/utils/useWindowSize";

const Navbar = () => {
  const { lang, slug } = useParams<{ lang: Locale; slug: string }>();
  const { width } = useWindowSize();
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

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
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

  const navVariants = {
    initial: {
      ...(width > 768 ? { top: "-10rem" } : { bottom: "-10rem" }),
      opacity: 0,
    },
    animate: {
      ...(width > 768 ? { top: "1rem" } : { bottom: "1rem" }),
      opacity: 1,
    },
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="initial"
        animate={hasLoaded ? "animate" : "initial"}
        transition={{
          delay: 2.5,
          ease: [0.33, 1, 0.68, 1],
        }}
        className="fixed w-full z-20 md:top-4 h-max"
      >
        <div className="bg-primary/50 border border-text/50 flex justify-between items-center w-60 mx-auto py-2 px-2.5 rounded-full backdrop-blur-md">
          <Link
            href={`/${lang}`}
            className={`font-primary text-2xl p-2 rounded-full ${
              slug === undefined ? "bg-text text-primary" : "text-text"
            }`}
          >
            <House />
          </Link>

          <Link
            href={`/${lang}/groom`}
            className="h-max flex gap-2 items-center capitalize font-secondary"
          >
            <Image
              height={300}
              width={300}
              src={PrathapProfilePic}
              alt="prathap pic"
              placeholder="blur"
              priority={false}
              className={`size-10 rounded-full border-text ${
                slug === "groom" && "border-4"
              }`}
            />
          </Link>

          <Link
            href={`/${lang}/bride`}
            className="h-max  capitalize font-secondary"
          >
            <Image
              height={300}
              width={300}
              src={SireeshaProfilePic}
              placeholder="blur"
              alt="sireesha profile pic"
              priority={false}
              className={`size-10 rounded-full border-text ${
                slug === "bride" && "border-4"
              }`}
            />
          </Link>

          <button
            className="h-10 w-10 grid place-items-center rounded-full"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeOff size={20} />}
          </button>
        </div>
      </motion.nav>

      <audio id="musicplayer" ref={audioRef} loop className="sr-only">
        <source src="/bg-music.mp3" />
      </audio>
    </>
  );
};

export default Navbar;
