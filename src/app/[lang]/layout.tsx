import localFont from "next/font/local";
import { NTR, Kalam, Noto_Sans_Telugu, Noto_Sans } from "next/font/google";
import LenisScrollProvider from "@/components/LenisScrollProvider";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Params } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { getDictionary } from "@/lib/dictionary";

const englishPrimaryFont = localFont({
  src: "../../../public/fonts/Stigmature.otf",
  variable: "--font-primary",
});

const teluguPrimaryFont = NTR({
  subsets: ["telugu"],
  variable: "--font-primary",
  weight: "400",
});

const hindiPrimaryFont = Kalam({
  subsets: ["devanagari"],
  variable: "--font-primary",
  weight: "400",
});

const teluguSecondaryFont = Noto_Sans_Telugu({
  subsets: ["latin", "telugu"],
  variable: "--font-secondary",
});

const hindiEnglishSecondaryFont = Noto_Sans({
  subsets: ["latin", "devanagari"],
  variable: "--font-secondary",
});

const fontFamily: {
  [key in "primary" | "secondary"]: {
    [key in Locale]: NextFontWithVariable;
  };
} = {
  primary: {
    en: englishPrimaryFont,
    te: teluguPrimaryFont,
    hi: hindiPrimaryFont,
  },
  secondary: {
    en: hindiEnglishSecondaryFont,
    te: teluguSecondaryFont,
    hi: hindiEnglishSecondaryFont,
  },
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const resolvedParams = (await params).lang;
  const data = await getDictionary(resolvedParams);

  return (
    <LenisScrollProvider>
      <Navbar groom={data.groom} bride={data.bride} />
      <main
        className={`${fontFamily.primary[resolvedParams].variable} ${fontFamily.secondary[resolvedParams].variable} font-primary antialiased`}
      >
        {children}
      </main>
    </LenisScrollProvider>
  );
}
