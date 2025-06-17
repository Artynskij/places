"use client";

import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import {
    IEstablishmentFront,
    ILocationFront,
    ITagsBlockFront,
} from "@/lib/models";
import { mapEstablishmentToSearchItem } from "@/lib/utils/mappers/mapEstablishmentToSearchItem";
import { useState } from "react";

interface IBlockMapEstScr {
    dataEstablishment: IEstablishmentFront;
    classTag: ITagsBlockFront | null;
    locationCountryData: ILocationFront;
    children: React.ReactNode;
}
const BlockMapEstScr = ({
    dataEstablishment,
    classTag,
    locationCountryData,
    children,
}: IBlockMapEstScr) => {
    const [mapActive, setMapActive] = useState(false);
    const establishmentForMap = mapEstablishmentToSearchItem(
        dataEstablishment,
        classTag
            ? {
                  establishmentId: "",
                  categoryTag: { id: "", key: "", value: "" },
                  tag: classTag?.tags[0],
              }
            : null,
        locationCountryData
    );

    return (
        <>
            <div onClick={() => setMapActive(true)}>{children}</div>
            {!!establishmentForMap.location.lon && (
                <PopupMap
                    establishmentList={[establishmentForMap]}
                    mapActive={mapActive}
                    setMapActive={setMapActive}
                />
            )}
        </>
    );
};
export default BlockMapEstScr;
