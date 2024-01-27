import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const LenisScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenisInstance = new Lenis();

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  });

  return <>{children}</>;
};

export default LenisScrollProvider;
