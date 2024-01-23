import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uday weds Padmaja",
  description: "Marriage website for couple uday & padmaja",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return { children };
};

export default RootLayout;
