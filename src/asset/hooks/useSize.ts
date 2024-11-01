"use client";
import { useState, useEffect } from "react";
import { CONSTANTS_SCREENS } from "../constants/ScreensConst";

export const useSize = () => {
  // Проверяем наличие window
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = (event: any) => {
      setWidth(event.target.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isSmallMobile: width <= CONSTANTS_SCREENS.SCREEN_MINI_PHONE,
    isMobile:
      width > CONSTANTS_SCREENS.SCREEN_MINI_PHONE &&
      width <= CONSTANTS_SCREENS.SCREEN_PHONE,
    isTablet:
      width > CONSTANTS_SCREENS.SCREEN_PHONE &&
      width <= CONSTANTS_SCREENS.SCREEN_TABLET,
    isNetBook:
      width > CONSTANTS_SCREENS.SCREEN_TABLET &&
      width <= CONSTANTS_SCREENS.SCREEN_NETBOOK,
    isDesktop: width > CONSTANTS_SCREENS.SCREEN_NETBOOK,
  };
};