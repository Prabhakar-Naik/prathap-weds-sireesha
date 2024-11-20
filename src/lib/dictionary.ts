import type { Locale } from "@/i18n.config";
import { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  te: () => import("./dictionaries/te.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const dictionaryFn = dictionaries[locale];
  if (typeof dictionaryFn === "function") {
    return dictionaryFn();
  }

  throw new Error(`No dictionary found for locale: ${locale}`);
};
