"use client";
import { useEffect } from "react";

let lockCounter = 0;

const ScrollLock = () => {
  useEffect(() => {
    lockCounter++;
    if (lockCounter === 1) {
      document.body.style.paddingRight = `${
        window.innerWidth - document.body.clientWidth
      }px`;
      document.body.style.overflow = "hidden";
    }

    return () => {
      lockCounter--;
      if (lockCounter === 0) {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
    };
  }, []);

  return null;
};

export default ScrollLock;
