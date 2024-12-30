"use client";

import { FC, useEffect } from "react";
import style from "./overlay.module.scss";
import ScrollLock from "../../UI/ScroollLock/ScrollLock";

interface IOverlay {
  setActive: (param: boolean) => void;
  active?: boolean;
  scrollLock?: boolean;
}

export const Overlay: FC<IOverlay> = ({
  setActive,
  active,
  scrollLock = true,
}) => {
  return (
    <div
      onClick={() => setActive(false)}
      active-target={`${active}`}
      className={style.overlay}
    >
      {scrollLock && active && <ScrollLock />}
    </div>
  );
};
