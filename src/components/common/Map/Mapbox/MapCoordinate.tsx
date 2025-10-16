"use client";
import React, { useEffect, useMemo, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map as MapMapboxGL } from "react-map-gl/mapbox";

import { useMapboxGeocode } from "@/lib/hooks/useMapboxGeocode";
import { useUserLocation } from "@/lib/hooks/useUserLocation";
import { CONSTANT_TYPE_LOCATION_MAPBOX } from "@/asset/constants/database/type-location";
import { DefaultMarker } from "./_common/Markers/DefaultMarker";
import { IMapboxCoordPropToForm } from "@/lib/models/mapbox/mapbox";
import useLocale from "@/lib/hooks/useLocale";
import { LocationService } from "@/lib/Api/location/location.service";

interface MapCoordinatePickerProps {
    setPosition: (value: IMapboxCoordPropToForm) => void;
    position?: IMapboxCoordPropToForm | null;
    locationId?: string | null;
}

export const MapCoordinatePicker = ({
    setPosition,
    position,
    locationId,
}: MapCoordinatePickerProps) => {
    const locale = useLocale();
    const { byCoordinates, byName } = useMapboxGeocode();
    const { userLocation, errorUserLocation } = useUserLocation();
    const locationService = new LocationService();
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

        const getCenter = async () => {
            switch (true) {
                case !!position:
                    setViewState({
                        latitude: position.lat,
                        longitude: position.lon,
                        zoom,
                    });
                    setIsInitialized(true);
                    break;
                case !!locationId:
                    const location = await locationService.getById(locationId);

                    const coordByName = location
                        ? await byName(location.title)
                        : null;
                    const coordinates = coordByName?.features.find((item) =>
                        item.id.includes(
                            CONSTANT_TYPE_LOCATION_MAPBOX.mapbox.place
                        )
                    )?.center;
                    if (coordinates) {
                        setViewState({
                            latitude: coordinates[1],
                            longitude: coordinates[0],
                            zoom,
                        });
                        setIsInitialized(true);
                        break;
                    }
                case !!userLocation:
                    if (userLocation) {
                        setViewState({
                            latitude: userLocation.lat,
                            longitude: userLocation.lon,
                            zoom,
                        });
                        setIsInitialized(true);
                        break;
                    }

                case !!errorUserLocation:
                    setIsInitialized(true);
            }
        };
        getCenter();
    }, [position, userLocation, errorUserLocation, locationId]);

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
