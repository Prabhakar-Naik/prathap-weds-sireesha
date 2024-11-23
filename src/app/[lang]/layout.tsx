import localFont from "next/font/local";
import { NTR, Noto_Sans_Telugu, Noto_Sans } from "next/font/google";
import LenisScrollProvider from "@/components/LenisScrollProvider";
import "../../styles/globals.css";
import Navbar from "@/components/Navbar";
import { Params, ParamsSchema } from "@/lib/types";
import { Locale } from "@/i18n.config";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { getDictionary } from "@/lib/dictionary";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { LoaderContextProvider } from "@/utils/LoaderContext";

const englishPrimaryFont = localFont({
  src: "../../../public/fonts/Monalisa.otf",
  variable: "--font-primary",
});

const teluguPrimaryFont = NTR({
  subsets: ["telugu"],
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
  },
  secondary: {
    en: hindiEnglishSecondaryFont,
    te: teluguSecondaryFont,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const resolvedParams = (await params).lang;

  const { success, data: parsedLanguage } =
    ParamsSchema.safeParse(resolvedParams);

  if (!success) {
    return {};
  }

  const data = await getDictionary(parsedLanguage);

  return {
    title: data.title,
    metadataBase: new URL("https://uday-weds-swapna.vercel.app"),
    openGraph: {
      title: data.title,
      url: "https://uday-weds-swapna.vercel.app",
      images: [
        {
          url: "/og-image-together.webp",
          width: 1200,
          height: 630,
          alt: `og image`,
        },
      ],
      locale: parsedLanguage === "en" ? "en_US" : "te_IN",
      type: "website",
    },
  };
}

export const viewport = {
  colorScheme: "light",
  initialScale: 1,
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const resolvedParams = (await params).lang;
  const { success, data: parsedLanguage } =
    ParamsSchema.safeParse(resolvedParams);

  if (!success) {
    return redirect("/en");
  }

  const data = await getDictionary(parsedLanguage);

  return (
    <LenisScrollProvider>
      <LoaderContextProvider>
        <main
          className={`${fontFamily.primary[parsedLanguage].variable} ${fontFamily.secondary[parsedLanguage].variable} font-primary bg-primary text-text antialiased`}
        >
          <Navbar groom={data.groom} bride={data.bride} />
          {children}
        </main>
      </LoaderContextProvider>
    </LenisScrollProvider>
  );
}
