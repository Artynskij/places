import { useLocale } from "next-intl";
import { useCallback } from "react";
import { IMapboxGeocodeResponse } from "../models/mapbox/mapbox";

export const useMapboxGeocode = () => {
    const locale = useLocale();
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    // Обратное геокодирование: координаты → адрес
    const byCoordinates = useCallback(
        async (lat: number, lon: number): Promise<IMapboxGeocodeResponse | null> => {
            try {
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${token}&language=${locale}`
                );

                if (!response.ok) {
                    console.warn("⛔ Ошибка запроса обратного геокодирования");
                    return null;
                }

                return (await response.json()) as IMapboxGeocodeResponse;
            } catch (error) {
                console.error("Ошибка обратного геокодирования:", error);
                return null;
            }
        },
        [locale, token]
    );

    // Прямое геокодирование: название → координаты
    const byName = useCallback(
        async (placeName: string): Promise<IMapboxGeocodeResponse | null> => {
            try {
                const encodedName = encodeURIComponent(placeName);
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedName}.json?access_token=${token}&language=${locale}`
                );

                if (!response.ok) {
                    console.warn("⛔ Ошибка запроса прямого геокодирования");
                    return null;
                }

                return (await response.json()) as IMapboxGeocodeResponse;
            } catch (error) {
                console.error("Ошибка прямого геокодирования:", error);
                return null;
            }
        },
        [locale, token]
    );

    return { byCoordinates, byName };
};
