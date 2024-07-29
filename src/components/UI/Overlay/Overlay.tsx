"use client";

import { FC, useEffect } from "react";
import style from "./overlay.module.scss";
import ScrollLock from "../ScroollLock/ScrollLock";

interface IOverlay {
  setActive: (param:boolean) => void;
  active?: boolean;
}

export const Overlay: FC<IOverlay> = ({ setActive, active }) => {

  return (
    <div
      onClick={() => setActive(false)}
      active-target={`${active}`}
      className={style.overlay}
    >
      {active && <ScrollLock />}
    </div>
  );
};
