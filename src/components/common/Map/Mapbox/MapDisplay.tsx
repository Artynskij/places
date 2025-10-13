"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map as MapMapboxGL, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { debounce } from "lodash";

import { MapService } from "@/lib/Api/map/map.service";
import { getZoomToRadius } from "@/lib/hooks/useZoomToRadius";
import { MarkersLayer } from "./_common/MarkersLayer";

import { useUserLocation } from "@/lib/hooks/useUserLocation";
import { IMapItemFront } from "@/lib/models";
import useLocale from "@/lib/hooks/useLocale";

interface MapDisplayProps {
    establishmentList?: IMapItemFront[] | null;
    center?: { lon: number; lat: number };
}

export const MapDisplay = ({ establishmentList, center }: MapDisplayProps) => {
    const locale = useLocale();
    const apiMap = useMemo(() => new MapService(), []);
    const centerMoscow = { lon: 37.6173, lat: 55.7558 };
    const zoom = 12;

    const { userLocation, errorUserLocation } = useUserLocation();
    const [isInitialized, setIsInitialized] = useState(false);

    const [viewState, setViewState] = useState({
        latitude: centerMoscow.lat,
        longitude: centerMoscow.lon,
        zoom: zoom,
    });
    const filteredEstablishmentList = establishmentList?.filter(
        (est) =>
            !!est.location.lat && !!est.location.lon && est.typeEstablishment
    );
    const [establishments, setEstablishments] = useState<IMapItemFront[]>(
        filteredEstablishmentList || []
    );
    const [selectionFirstEst, setSelectionFirstEst] = useState(false);

    const fetchEstablishment = (lon: number, lat: number, zoom: number) => {
        const radius = getZoomToRadius(zoom, lat);
        apiMap.getEstablishmentByCoord({ lat, lon, radius }).then((res) => {
            if (!res) return;
            const filtered = res.filter(
                (est) =>
                    !!est.location.lat &&
                    !!est.location.lon &&
                    est.typeEstablishment &&
                    (est.location.country?.id || est.location.town?.id)
            );
            setEstablishments((prev) => {
                const map = new Map(prev.map((item) => [item.id, item]));
                let changed = false;
                filtered.forEach((item) => {
                    const existing = map.get(item.id);
                    if (
                        !existing ||
                        JSON.stringify(existing) !== JSON.stringify(item)
                    ) {
                        map.set(item.id, item);
                        changed = true;
                    }
                });
                return changed ? Array.from(map.values()) : prev;
            });
        });
    };

    const debouncedFetch = useCallback(
        debounce((params) => {
            fetchEstablishment(params.longitude, params.latitude, params.zoom);
        }, 1000),
        []
    );

    useEffect(() => {
        if (isInitialized) return;

        if (center) {
            setViewState({ latitude: center.lat, longitude: center.lon, zoom });
            setIsInitialized(true);
        } else if (
            establishmentList?.[0]?.location?.lat &&
            establishmentList?.[0]?.location?.lon
        ) {
            setViewState({
                latitude: establishmentList[0].location.lat,
                longitude: establishmentList[0].location.lon,
                zoom,
            });
            setIsInitialized(true);
        } else if (userLocation) {
            setViewState({
                latitude: userLocation.lat,
                longitude: userLocation.lon,
                zoom,
            });
            setIsInitialized(true);
        } else if (errorUserLocation) {
            setIsInitialized(true);
        }
    }, [center, establishmentList, userLocation, errorUserLocation]);

    useEffect(() => {
        if (establishments.length <= 1) {
            setSelectionFirstEst(true);
            fetchEstablishment(
                viewState.longitude,
                viewState.latitude,
                viewState.zoom
            );
        }

        return () => debouncedFetch.cancel();
    }, []);

    const handlerMoveEnd = (e: ViewStateChangeEvent) => {
        const { latitude, longitude, zoom } = e.viewState;
        setViewState({ latitude, longitude, zoom });
        debouncedFetch({ latitude, longitude, zoom });
    };

    if (!isInitialized) return null;

    return (
        <MapMapboxGL
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            onMoveEnd={handlerMoveEnd}
            language={locale}
        >
            {establishments.length > 0 && (
                <MarkersLayer
                    selectionFirstEst={selectionFirstEst}
                    establishments={establishments}
                />
            )}
        </MapMapboxGL>
    );
};
