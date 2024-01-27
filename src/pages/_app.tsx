import dayjs from "dayjs";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import Head from "next/head";
import LenisScrollProvider from "@/components/LenisScrollProvider";

const customFont = localFont({
  src: "../../public/fonts/Stigmature.otf",
  variable: "--font-primary",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>💝Varun weds Pooja</title>
        <meta
          name="description"
          content={`Join us for our wedding on ${dayjs()
            .add(1, "M")
            .format("D MMM, dddd")}`}
        />
      </Head>
      <LenisScrollProvider>
        <main
          className={`${customFont.variable} ${inter.variable} font-primary antialiased`}
        >
          <Component {...pageProps} />
        </main>
      </LenisScrollProvider>
    </>
  );
}
