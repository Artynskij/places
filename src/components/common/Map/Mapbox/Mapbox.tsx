"use client"; // Обязательно для использования Web API (Mapbox GL работает только на клиенте)
import React, { useEffect, useRef, useState } from "react";

import style from "./mapbox.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import { useLocale } from "next-intl";
import {
    IEstablishmentFront,
    ITagsBlockFront,
    ITagWithEstablishmentFront,
} from "@/lib/models";
import { Map } from "react-map-gl/mapbox";

import { CustomMarker } from "../Markers/CustomMarker";
interface IMapboxMap {
    establishmentList: IEstablishmentFront[];
    tagsClassEstablishment: ITagWithEstablishmentFront[] | null;
}
// Установи свой токен
// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const MapboxMap = ({
    establishmentList,
    tagsClassEstablishment,
}: IMapboxMap) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const locale = useLocale();
    const filteredEstablishmentList = establishmentList.filter(
        (est) => !!est.location.latitude && !!est.location.longitude
    );

    if (!filteredEstablishmentList.length) return null;
    return (
        <Map
            initialViewState={{
                longitude: filteredEstablishmentList[0].location.longitude,
                latitude: filteredEstablishmentList[0].location.latitude,
                zoom: 12,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            interactiveLayerIds={["markers"]}
            language={locale}
        >
            {filteredEstablishmentList.map((establishment) => {
                const tagClass = tagsClassEstablishment?.find(
                    (tag) => tag.establishmentId === establishment.id
                );
               

                return (
                    <CustomMarker
                        key={establishment.id}
                        establishment={establishment}
                        tagClass={tagClass?.tag.count || 0}
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                    />
                );
            })}
        </Map>
    );
};
