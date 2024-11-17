import { Locale } from "@/i18n.config";

export type Dictionary = {
  title: string;
  description: string;
  groom: {
    title: string;
    name: string;
  };
  bride: {
    title: string;
    name: string;
  };
};

export type Params = Promise<{ lang: Locale }>;
