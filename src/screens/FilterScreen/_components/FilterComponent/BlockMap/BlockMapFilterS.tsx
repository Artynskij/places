"use client";
import Image from "next/image";
import style from "./blockMap.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { useState } from "react";
import { IconLocation } from "@/components/common/Icons";
import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";
import { IEstablishmentFront, ITagWithEstablishmentFront } from "@/lib/models";
import { mapEstablishmentToSearchItem } from "@/lib/utils/mappers/mapEstablishmentToSearchItem";

interface IBlockMapFilterS {
    establishmentList: IEstablishmentFront[];
    tagsClassEstablishment: ITagWithEstablishmentFront[] | null;
}

const BlockMapFilterS = ({
    establishmentList,
    tagsClassEstablishment,
}: IBlockMapFilterS) => {
    const [mapActive, setMapActive] = useState(false);
    const establishmentListForMap = establishmentList.map((est) => {
        const tagClass = tagsClassEstablishment?.find(
            (item) => item.establishmentId === est.id
        );
        return mapEstablishmentToSearchItem(est, tagClass || null);
    });
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
                    <PopupMap
                        mapActive={mapActive}
                        setMapActive={setMapActive}
                        establishmentList={establishmentListForMap}
                    />
                </div>
            </div>
        </>
    );
};

export default BlockMapFilterS;
