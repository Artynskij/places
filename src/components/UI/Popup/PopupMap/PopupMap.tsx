"use client";
import { useState } from "react";

import { MapGoogle } from "../../Map/Map/MapGoogle";
import { Overlay } from "../../Overlay/Overlay";

import style from "./popupMap.module.scss";
import { Button } from "../../Button/Button";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";
import { MapLeaflet } from "../../Map/Map/MapLeaflet";

export const PopupMap = () => {
  const [mapActive, setMapActive] = useState(false);
  return (
    <>
      <Button
        className={style.button}
        onClick={() => setMapActive(!mapActive)}
        type="blue"
        text="map view"
        icon={<IconLocation className={style.button_icon} />}
      />
      <div className={style.popup_map}>
        <div
          className={style.popup_content + " " + (mapActive && style.active)}
        >
           {/* <MapGoogle /> */}
           <MapLeaflet />
        </div>
        <Overlay active={mapActive} setActive={setMapActive} />
      </div>
    </>
  );
};
