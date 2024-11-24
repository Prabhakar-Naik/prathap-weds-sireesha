"use client";

import React from "react";
import Navbar from "./Navbar";
import Loader from "./Loader";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Loader />
    </>
  );
};

export default LayoutProvider;
