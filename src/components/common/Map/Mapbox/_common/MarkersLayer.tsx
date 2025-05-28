"use client";
import React, { memo } from "react";
import { ISearchItemFront } from "@/lib/models";
import { CustomMarker } from "./Markers/CustomMarker";

interface Props {
    establishments: ISearchItemFront[];
}

export const MarkersLayer = React.memo(({ establishments }: Props) => {
    return (
        <>
            {establishments.map((est) => (
                <CustomMarker key={est.id} establishment={est} />
            ))}
        </>
    );
});
MarkersLayer.displayName = "MarkersLayer";
