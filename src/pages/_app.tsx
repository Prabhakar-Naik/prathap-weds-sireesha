import "../styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const customFont = localFont({
  src: "./Stigmature.otf",
  variable: "--font-primary",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-secondary",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${customFont.variable} ${inter.variable} font-primary antialiased`}
    >
      <Component {...pageProps} />
    </main>
  );
}
