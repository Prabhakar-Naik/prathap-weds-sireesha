"use client";

import React, { createContext, use, useState } from "react";

type LoaderContextType = {
  hasLoaded: boolean;
  setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <LoaderContext.Provider value={{ hasLoaded, setHasLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => {
  const context = use(LoaderContext);

  if (context === undefined) {
    throw new Error("isLoaded must be used within a LoaderProvider");
  }

  return context;
};
