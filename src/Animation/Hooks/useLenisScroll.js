// src/hooks/useLenisScroll.js
import Lenis from "lenis";
import { useEffect } from "react";


let lenis; // shared instance

const useLenisScroll = () => {
  useEffect(() => {
    lenis = new Lenis({ smooth: true });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
};

export { lenis }; // export shared instance
export default useLenisScroll;
