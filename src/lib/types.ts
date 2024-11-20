import { Locale } from "@/i18n.config";
import { z } from "zod";

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
  invite: string;
  date: string;
};

export const ParamsSchema = z.enum(["en", "te"]);
export type Params = Promise<{ lang: Locale | string }>;
