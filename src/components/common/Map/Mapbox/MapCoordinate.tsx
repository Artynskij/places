"use client";
import React, { useEffect, useMemo, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map as MapMapboxGL } from "react-map-gl/mapbox";

import { useMapboxGeocode } from "@/lib/hooks/useMapboxGeocode";
import { useUserLocation } from "@/lib/hooks/useUserLocation";
import { CONSTANT_TYPE_LOCATION_MAPBOX } from "@/asset/constants/typeLocation";
import { DefaultMarker } from "./_common/Markers/DefaultMarker";
import { IMapboxCoordPropToForm } from "@/lib/models/mapbox/mapbox";
import { useLocale } from "next-intl";

interface MapCoordinatePickerProps {
    setPosition: (value: IMapboxCoordPropToForm) => void;
    position?: IMapboxCoordPropToForm;
}

export const MapCoordinatePicker = ({
    setPosition,
    position,
}: MapCoordinatePickerProps) => {
    const locale = useLocale();
    const { byCoordinates } = useMapboxGeocode();
    const { userLocation, errorUserLocation } = useUserLocation();
    const centerMoscow = { lat: 51.77041291260454, lon: 29.195896311674147 };
    const zoom = 12;
    const [isInitialized, setIsInitialized] = useState(false);

    const [viewState, setViewState] = useState({
        latitude: centerMoscow.lat,
        longitude: centerMoscow.lon,
        zoom: zoom,
    });

    useEffect(() => {
        if (isInitialized) return;

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

    const handlerClick = async (e: mapboxgl.MapMouseEvent) => {
        const { lng, lat } = e.lngLat;
        const geocode = await byCoordinates(lat, lng);

        const country = geocode?.features.find((f) =>
            f.id.includes(CONSTANT_TYPE_LOCATION_MAPBOX.mapbox.country)
        )?.text;
        const place = geocode?.features.find((f) =>
            f.id.includes(CONSTANT_TYPE_LOCATION_MAPBOX.mapbox.place)
        )?.text;
        const address = geocode?.features.find((f) =>
            f.id.includes(CONSTANT_TYPE_LOCATION_MAPBOX.mapbox.address)
        );

        const fullLine = [country, place, address?.text, address?.address]
            .filter(Boolean)
            .join(", ");
        const addressLine = [address?.text, address?.address]
            .filter(Boolean)
            .join(" ");

        setPosition({ lat, lon: lng, addressLine, addressFullLine: fullLine });
    };

    if (!isInitialized) return null;

    return (
        <MapMapboxGL
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            onClick={handlerClick}
            language={locale}
        >
            {position && (
                <DefaultMarker
                    key="selection"
                    latitude={position.lat}
                    longitude={position.lon}
                    addressLine={position.addressFullLine || ""}
                />
            )}
        </MapMapboxGL>
    );
};
