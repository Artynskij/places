"use client";
import React from "react";

import { Overlay } from "../../Overlay/Overlay";
import clsx from "clsx";
import style from "./popupMap.module.scss";
import { Button } from "../../../UI/Button/Button";

import { IconCancel, IconDone } from "../../Icons";

import { MapDisplay } from "../../Map/Mapbox/MapDisplay";
import { IMapItemFront } from "@/lib/models";
interface IPopupMap {
    establishmentList?: IMapItemFront[];
    mapActive: boolean;
    setMapActive: (value: boolean) => void;
    zIndex?: number;
}
export const PopupMap = ({
    establishmentList,
    mapActive,
    setMapActive,
    zIndex = 10,
}: IPopupMap) => {
    return (
        <>
            <div className={style.popup_map}>
                <div
                    className={clsx(
                        style.popup_content,
                        mapActive && style.active
                    )}
                    style={{ zIndex: zIndex + 1 }}
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

                    {mapActive && (
                        <MapDisplay establishmentList={establishmentList} />
                    )}
                </div>
                <Overlay
                    zIndex={zIndex}
                    active={mapActive}
                    setActive={setMapActive}
                />
            </div>
        </>
    );
};
