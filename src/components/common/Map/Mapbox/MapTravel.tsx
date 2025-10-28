"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map as MapMapboxGL, MapRef } from "react-map-gl/mapbox";

import { useMapboxGeocode } from "@/lib/hooks/useMapboxGeocode";
import { useUserLocation } from "@/lib/hooks/useUserLocation";
import { CONSTANT_TYPE_LOCATION_MAPBOX } from "@/asset/constants/database/type-location";
import { DefaultMarker } from "./_common/Markers/DefaultMarker";
import {
    IMapboxCoordProp,
    IMapboxCoordPropToForm,
} from "@/lib/models/mapbox/mapbox";
import useLocale from "@/lib/hooks/useLocale";

interface MapTravelProps {
    // setPosition: (value: IMapboxCoordPropToForm) => void;
    position?: IMapboxCoordProp;
}

export const MapTravel = ({ position }: MapTravelProps) => {
    const locale = useLocale();
    const mapRef = useRef<MapRef>(null);
    const { byName } = useMapboxGeocode();
    const { userLocation, errorUserLocation } = useUserLocation();
    const centerMoscow = { lat: 51.77041291260454, lon: 29.195896311674147 };
    const zoom = 2;
    const [isInitialized, setIsInitialized] = useState(false);

    const [viewState, setViewState] = useState({
        latitude: centerMoscow.lat,
        longitude: centerMoscow.lon,
        zoom: zoom,
    });

    useEffect(() => {
        if (isInitialized && position && mapRef.current) {
            mapRef.current.flyTo({
                center: [position.lon, position.lat],
                zoom: zoom,
                essential: true,
            });
            if (position?.bBox) {
                const { minLon, minLat, maxLon, maxLat } = position?.bBox;
                mapRef.current?.fitBounds([
                    [minLon, minLat],
                    [maxLon, maxLat],
                ]);
            }
            return;
        }

        if (position) {
            setViewState({
                latitude: position.lat,
                longitude: position.lon,
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
    }, [position, userLocation, errorUserLocation]);

    // const handlerClick = async (e: mapboxgl.MapMouseEvent) => {
    //     const { lng, lat } = e.lngLat;

    // };

    if (!isInitialized) return null;

    return (
        <MapMapboxGL
            ref={mapRef}
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            language={locale}

            // onClick={handlerClick}
        >
            {position && (
                <DefaultMarker
                    key="selection"
                    latitude={position.lat}
                    longitude={position.lon}
                />
            )}
        </MapMapboxGL>
    );
};
