"use client";
import React from "react";

import { Overlay } from "../../Overlay/Overlay";

import style from "./popupMap.module.scss";
import { Button } from "../../../UI/Button/Button";


import { IconCancel, IconDone } from "../../Icons";



import { MapDisplay } from "../../Map/Mapbox/MapDisplay";
import { IMapItemFront } from "@/lib/models";
interface IPopupMap {
    establishmentList?: IMapItemFront[];
    mapActive: boolean;
    setMapActive: (value: boolean) => void;
    // mode?: TModeMap[];
    // setPosition?: (value: IMapboxCoordPropToForm) => void;
    // position?: IMapboxCoordPropToForm;
}
export const PopupMap = ({
    establishmentList,
    mapActive,
    setMapActive,
    // mode,
    // setPosition,
    // position,
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
                  
                    {mapActive && <MapDisplay establishmentList={establishmentList}/>}
                </div>
                <Overlay active={mapActive} setActive={setMapActive} />
            </div>
        </>
    );
};
