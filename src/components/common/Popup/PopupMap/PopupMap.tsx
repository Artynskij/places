"use client";
import { useState } from "react";

import { MapGoogle } from "../../Map/Map/MapGoogle";
import { Overlay } from "../../Overlay/Overlay";

import style from "./popupMap.module.scss";
import { Button } from "../../../UI/Button/Button";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";
import { MapLeaflet } from "../../Map/Map/MapLeaflet";
import Image from "next/image";

export const PopupMap = () => {
  const [mapActive, setMapActive] = useState(false);
  return (
    <>
      <div className={style.image_ctn}>
        <Image
          alt="map tiler"
          width={276}
          height={164}
          src={"/mock/mockObjErevan-map.jpg"}
          className={style.image_ctn_image}
        />
        <div className={style.button_ctn}>
          <Button
            className={style.button}
            onClick={() => setMapActive(!mapActive)}
            type="blue"
            text="Показать на карте"
            icon={<IconLocation className={style.button_icon} />}
          />
        </div>
      </div>

      <div className={style.popup_map}>
        <div
          className={style.popup_content + " " + (mapActive && style.active)}
        >
          <MapGoogle />
          {/* {<MapLeaflet />} */}
        </div>
        <Overlay active={mapActive} setActive={setMapActive} />
      </div>
    </>
  );
};
