import { useLocale } from "next-intl";
import { useCallback } from "react";
import { IMapboxGeocodeResponse } from "../models/mapbox/mapbox";


export const useReverseGeocode = () => {
    const locale = useLocale();

    const reverseGeocode = useCallback(
        async (lat: number, lon: number): Promise<IMapboxGeocodeResponse | null> => {
            try {
                const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${token}&language=${locale}`
                );

                if (!response.ok) {
                    console.warn("⛔ Ошибка запроса обратного геокодирования");
                    return null;
                }

                const data: IMapboxGeocodeResponse = await response.json();
                return data;
            } catch (error) {
                console.error("Ошибка обратного геокодирования:", error);
                return null;
            }
        },
        [locale]
    );

    return reverseGeocode;
};