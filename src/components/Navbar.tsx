"use client";

import React, { useEffect, useRef, useState } from "react";
import { VolumeOff, Volume2, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale } from "@/i18n.config";
import { useLoaderContext } from "@/utils/LoaderContext";
import UdayProfilePic from "../../public/uday-profile.webp";
import SwapnaProfilePic from "../../public/swapna-profile.webp";

const Navbar = () => {
  const { lang, slug } = useParams<{ lang: Locale; slug: string }>();
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
      <nav className="fixed bottom-4 w-full z-20 md:top-4">
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
              src={UdayProfilePic}
              alt="uday profile pic"
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
              src={SwapnaProfilePic}
              placeholder="blur"
              alt="swapna profile pic"
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
      </nav>

      <audio id="musicplayer" autoPlay ref={audioRef} loop className="sr-only">
        <source src="/bg-music.mp3" />
      </audio>
    </>
  );
};

export default Navbar;
