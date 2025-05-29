"use client";
import React, { memo } from "react";
import { ISearchItemFront } from "@/lib/models";
import { CustomMarker } from "./Markers/CustomMarker";

interface Props {
    establishments: ISearchItemFront[];
    selectionFirstEst:boolean;
}

export const MarkersLayer = React.memo(({ establishments,selectionFirstEst }: Props) => {
    return (
        <>
            {establishments.map((est, index) => (
                <CustomMarker selectionFirstEst={selectionFirstEst && index===0} key={est.id} establishment={est} />
            ))}
        </>
    );
});
MarkersLayer.displayName = "MarkersLayer";
