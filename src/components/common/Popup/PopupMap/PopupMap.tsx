"use client";
import React, { useState } from "react";

import { Overlay } from "../../Overlay/Overlay";

import style from "./popupMap.module.scss";
import { Button } from "../../../UI/Button/Button";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";

import Image from "next/image";
import { MapboxMap } from "../../Map/Mapbox/Mapbox";

import { IconCancel } from "../../Icons";

import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";
interface IPopupMap {
    establishmentList: IMapItemFront[];
    mapActive: boolean;
    setMapActive: (value: boolean) => void;
}
export const PopupMap = ({
    establishmentList,
    mapActive,
    setMapActive,
}: IPopupMap) => {
    return (
        <>
            <div className={style.popup_map}>
                <div
                    className={
                        style.popup_content + " " + (mapActive && style.active)
                    }
                >
                    <Button
                        className={style.buttonClose}
                        onClick={() => {
                            console.log(mapActive);
                            setMapActive(false);
                        }}
                        type="blue"
                        text="Закрыть"
                        icon={<IconCancel className={style.buttonClose_icon} />}
                    />

                    {mapActive && (
                        <MapboxMap establishmentList={establishmentList} />
                    )}
                </div>
                <Overlay active={mapActive} setActive={setMapActive} />
            </div>
        </>
    );
};
