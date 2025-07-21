"use client";
import React, { useState } from "react";

import { Overlay } from "../../Overlay/Overlay";

import style from "./popupMap.module.scss";
import { Button } from "../../../UI/Button/Button";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";

import Image from "next/image";
import { MapboxMap } from "../../Map/Mapbox/Mapbox";

import { IconCancel, IconDone } from "../../Icons";

import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";
import { TModeMap } from "@/lib/models/types/TModeMap";
interface IPopupMap {
    establishmentList?: IMapItemFront[];
    mapActive: boolean;
    setMapActive: (value: boolean) => void;
    mode?: TModeMap[];
    setPosition?: (value: {
        lat: number;
        lon: number;
        addressLine: string;
    }) => void;
    position?: { lat: number; lon: number; addressLine: string };
}
export const PopupMap = ({
    establishmentList,
    mapActive,
    setMapActive,
    mode,
    setPosition,
    position,
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
                            setMapActive(false);
                        }}
                        type="blue"
                        text="Закрыть"
                        icon={<IconCancel className={style.buttonClose_icon} />}
                    />
                    {position && (
                        <Button
                            className={style.buttonAcceptPosition}
                            onClick={() => {
                                setMapActive(false);
                            }}
                            type="blue"
                            text="Потвердить позицию"
                            icon={
                                <IconDone className={style.buttonClose_icon} />
                            }
                        />
                    )}
                    {mapActive && (
                        <MapboxMap
                            setPosition={setPosition}
                            position={position}
                            mode={mode}
                            establishmentList={establishmentList}
                        />
                    )}
                </div>
                <Overlay active={mapActive} setActive={setMapActive} />
            </div>
        </>
    );
};
