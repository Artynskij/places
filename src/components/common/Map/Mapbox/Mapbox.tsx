"use client"; // Обязательно для использования Web API (Mapbox GL работает только на клиенте)
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import style from "./mapbox.module.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import { useLocale } from "next-intl";

import { Map as MapMapboxGL, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { debounce } from "lodash";
import { CustomMarker } from "./_common/Markers/CustomMarker";
import { MapService } from "@/lib/Api/map/map.service";
import { getZoomToRadius } from "@/lib/hooks/useZoomToRadius";
import { MarkersLayer } from "./_common/MarkersLayer";
import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";
interface IMapboxMap {
    establishmentList: IMapItemFront[];
}

export const MapboxMap = ({ establishmentList }: IMapboxMap) => {
    const apiMap = useMemo(() => new MapService(), []);
    const locale = useLocale();
    const filteredEstablishmentList = establishmentList.filter(
        (est) =>
            !!est.location.lat && !!est.location.lon && est.typeEstablishment
    );
    const [establishments, setEstablishments] = useState<IMapItemFront[]>(
        filteredEstablishmentList
    );
    const [viewState, setViewState] = useState({
        longitude: establishments[0].location.lon as number,
        latitude: establishments[0].location.lat as number,
        zoom: 12,
    });
    const [selectionFirstEst, setSelectionFirstEst] = useState(false);
    const fetchEstablishment = (lon: number, lat: number, zoom: number) => {
        const radius = getZoomToRadius(zoom, lat);

        apiMap
            .getEstablishmentByCoord({
                lat: lat,
                lon: lon,
                radius: radius,
            })
            .then((res) => {
                if (res) {
                    const filteredRes = res.filter(
                        (est) =>
                            !!est.location.lat &&
                            !!est.location.lon &&
                            est.typeEstablishment &&
                            (est.location.country?.id || est.location.town?.id)
                    );

                    setEstablishments((prev) => {
                        const prevMap = new Map(
                            prev.map((item) => [item.id, item])
                        );

                        let changed = false;
                        filteredRes.forEach((item) => {
                            const existing = prevMap.get(item.id);
                            if (
                                !existing ||
                                JSON.stringify(existing) !==
                                    JSON.stringify(item)
                            ) {
                                prevMap.set(item.id, item);
                                changed = true;
                            }
                        });

                        if (!changed) return prev;
                        console.log(
                            `state Establishments update ${prev.length}`
                        );
                        return Array.from(prevMap.values());
                    });
                }
            });
    };
    const debouncedFetch = useCallback(
        debounce((params) => {
            fetchEstablishment(params.longitude, params.latitude, params.zoom);
        }, 1000),
        []
    );
    useEffect(() => {
        if (establishments.length <= 1) {
            console.log(establishments);

            setSelectionFirstEst(true);
            fetchEstablishment(
                viewState.longitude,
                viewState.latitude,
                viewState.zoom
            );
        }
        return () => {
            debouncedFetch.cancel();
        };
    }, [debouncedFetch]);

    const handlerMoveEnd = (e: ViewStateChangeEvent) => {
        const { latitude, longitude, zoom } = e.viewState;
        setViewState({ latitude, longitude, zoom });
        debouncedFetch({ latitude, longitude, zoom });
    };
    if (!establishments.length) return null;
    return (
        <MapMapboxGL
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            interactiveLayerIds={["markers"]}
            language={locale}
            onMoveEnd={handlerMoveEnd}
        >
            <MarkersLayer
                selectionFirstEst={selectionFirstEst}
                establishments={establishments}
            />
        </MapMapboxGL>
    );
};
