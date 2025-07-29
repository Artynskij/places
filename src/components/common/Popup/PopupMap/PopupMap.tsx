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
import { IMapboxCoordPropToForm } from "@/lib/models/mapbox/mapbox";
interface IPopupMap {
    establishmentList?: IMapItemFront[];
    mapActive: boolean;
    setMapActive: (value: boolean) => void;
    mode?: TModeMap[];
    setPosition?: (value: IMapboxCoordPropToForm) => void;
    position?: IMapboxCoordPropToForm;
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
