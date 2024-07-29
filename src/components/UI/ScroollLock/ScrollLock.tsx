"use client";

import { useEffect } from "react";

const ScrollLock = () => {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = window.getComputedStyle(
      document.body
    ).paddingRight;
    document.body.style.paddingRight = `${
      window.innerWidth - document.body.clientWidth
    }px`;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      // document.body.style.overflow = originalOverflow;
      // document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  return null;
};

export default ScrollLock;
