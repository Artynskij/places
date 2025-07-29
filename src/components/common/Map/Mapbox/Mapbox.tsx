"use client"; // Обязательно для использования Web API (Mapbox GL работает только на клиенте)
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import "mapbox-gl/dist/mapbox-gl.css";

import { useLocale } from "next-intl";

import { Map as MapMapboxGL, ViewStateChangeEvent } from "react-map-gl/mapbox";
import { debounce } from "lodash";

import { MapService } from "@/lib/Api/map/map.service";
import { getZoomToRadius } from "@/lib/hooks/useZoomToRadius";
import { MarkersLayer } from "./_common/MarkersLayer";
import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";
import { TModeMap } from "@/lib/models/types/TModeMap";
import { DefaultMarker } from "./_common/Markers/DefaultMarker";
import { useReverseGeocode } from "@/lib/hooks/useReverseGeocode";
import { CONSTANT_TYPE_LOCATION } from "@/asset/constants/typeLocation";
import { useUserLocation } from "@/lib/hooks/useUserLocation";
import { IMapboxCoordPropToForm } from "@/lib/models/mapbox/mapbox";
interface IMapboxMap {
    mode?: TModeMap[];
    establishmentList?: IMapItemFront[] | null;
    center?: { lon: number; lat: number };
    setPosition?: (value: IMapboxCoordPropToForm) => void;
    position?: IMapboxCoordPropToForm;
}

export const MapboxMap = ({
    establishmentList,
    center,
    mode = ["default"],
    setPosition,
    position,
}: IMapboxMap) => {
    const apiMap = useMemo(() => new MapService(), []);
    const locale = useLocale();

    const modeMapCoord = !!mode.find((item) => item === "getCoordinate");
    const centerMoscow = { lon: 37.6173, lat: 55.7558 };
    const zoom = 12;
    const [isInitialized, setIsInitialized] = useState(false);
    const { userLocation, errorUserLocation } = useUserLocation();

    const reverseGeocode = useReverseGeocode();
    const [viewState, setViewState] = useState<{
        latitude: number;
        longitude: number;
        zoom: number;
    }>({
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
        // make center
        if (isInitialized) return;

        if (center) {
            setViewState({
                latitude: center.lat,
                longitude: center.lon,
                zoom: zoom,
            });
            setIsInitialized(true);
        } else if (position) {
            setViewState({
                latitude: position.lat,
                longitude: position.lon,
                zoom: zoom,
            });
            setIsInitialized(true);
        } else if (
            establishments[0]?.location?.lon &&
            establishments[0]?.location?.lat
        ) {
            setViewState({
                longitude: establishments[0].location?.lon,
                latitude: establishments[0].location?.lat,
                zoom: zoom,
            });
            setIsInitialized(true);
        } else if (userLocation) {
            setViewState({
                latitude: userLocation.lat,
                longitude: userLocation.lon,
                zoom: zoom,
            });
            setIsInitialized(true);
        } else if (errorUserLocation) {
            setIsInitialized(true);
        }
    }, [
        center,
        position,
        userLocation,
        establishments,
        viewState,
        errorUserLocation,
    ]);
    useEffect(() => {
        if (modeMapCoord) return;
        if (establishments.length <= 1 && viewState) {
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
    }, [debouncedFetch, userLocation]);

    const handlerMoveEnd = (e: ViewStateChangeEvent) => {
        if (modeMapCoord) return;
        const { latitude, longitude, zoom } = e.viewState;
        setViewState({ latitude, longitude, zoom });
        debouncedFetch({ latitude, longitude, zoom });
    };
    const handlerClick = async (e: mapboxgl.MapMouseEvent) => {
        const { lng, lat } = e.lngLat;
        const addressGeocode = await reverseGeocode(lat, lng);
        const countryText = addressGeocode?.features.find((item) =>
            item.id.includes(CONSTANT_TYPE_LOCATION.mapbox.country)
        )?.text;
        const placeText = addressGeocode?.features.find((item) =>
            item.id.includes(CONSTANT_TYPE_LOCATION.mapbox.place)
        )?.text;
        const address = addressGeocode?.features.find((item) =>
            item.id.includes(CONSTANT_TYPE_LOCATION.mapbox.address)
        );

        const addressFullLine = `${countryText}, ${placeText} ${
            address?.text || address?.address
                ? `, ${address?.text || ""} ${address?.address || ""} `
                : ""
        }`;
        console.log(address);

        const addressLine = `${
            address?.text || address?.address
                ? ` ${address?.text || ""} ${address?.address || ""} `
                : ""
        }`;
        if (setPosition) {
            setPosition({
                lat: lat,
                lon: lng,
                addressLine: addressLine,
                addressFullLine: addressFullLine,
            });
        }

        // setSelectedPoint({ lat: lat, lon: lng, addressLine: addressLine });
    };
    if (!isInitialized) return null;
    return (
        <MapMapboxGL
            initialViewState={viewState}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            interactiveLayerIds={["markers"]}
            language={locale}
            onMoveEnd={handlerMoveEnd}
            onClick={handlerClick}
        >
            {establishments.length > 0 && (
                <MarkersLayer
                    selectionFirstEst={selectionFirstEst}
                    establishments={establishments}
                />
            )}
            {modeMapCoord && position && (
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
