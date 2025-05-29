"use client";

import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import {
    IEstablishmentFront,
    ILocationFront,
    ITagsBlockFront,
} from "@/lib/models";
import { mapEstablishmentToSearchItem } from "@/lib/utils/mappers/mapEstablishmentToSearchItem";
import { useState } from "react";

interface IBlockMapEstS {
    dataEstablishment: IEstablishmentFront;
    classTag: ITagsBlockFront | null;
    locationCountryData: ILocationFront;
    children: React.ReactNode;
}
const BlockMapEstS = ({
    dataEstablishment,
    classTag,
    locationCountryData,
    children,
}: IBlockMapEstS) => {
    const [mapActive, setMapActive] = useState(false);
    const establishmentForMap = mapEstablishmentToSearchItem(
        dataEstablishment,
        classTag
            ? {
                  establishmentId: "",
                  categoryTag: { id: "", key: "", value: "" },
                  tag: classTag?.tags[0],
              }
            : null
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
export default BlockMapEstS;
