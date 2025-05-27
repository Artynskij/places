"use client";
import { useState } from "react";

import { MapGoogle } from "../../Map/Map/MapGoogle";
import { Overlay } from "../../Overlay/Overlay";

import style from "./popupMap.module.scss";
import { Button } from "../../../UI/Button/Button";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";
import { MapLeaflet } from "../../Map/Map/MapLeaflet";
import Image from "next/image";
import { MapboxMap } from "../../Map/Mapbox/Mapbox";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { IconCancel } from "../../Icons";
import { IEstablishmentFront, ITagsBlockFront, ITagWithEstablishmentFront } from "@/lib/models";
interface IPopupMap {
    establishmentList: IEstablishmentFront[];
    tagsClassEstablishment: ITagWithEstablishmentFront[] | null;
}
export const PopupMap = ({ establishmentList,tagsClassEstablishment }: IPopupMap) => {
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
                <div className={style.buttonOpen_ctn}>
                    <Button
                        className={style.buttonOpen}
                        onClick={() => setMapActive(!mapActive)}
                        type="blue"
                        text="Показать на карте"
                        icon={
                            <IconLocation className={style.buttonOpen_icon} />
                        }
                    />
                </div>
            </div>

            <div className={style.popup_map}>
                <div
                    className={
                        style.popup_content + " " + (mapActive && style.active)
                    }
                >
                    <Button
                        className={style.buttonClose}
                        onClick={() => setMapActive(false)}
                        type="blue"
                        text="Закрыть"
                        icon={<IconCancel className={style.buttonClose_icon} />}
                    />

                    {mapActive && (
                        <MapboxMap tagsClassEstablishment={tagsClassEstablishment || null} establishmentList={establishmentList} />
                    )}
                </div>
                <Overlay active={mapActive} setActive={setMapActive} />
            </div>
        </>
    );
};
