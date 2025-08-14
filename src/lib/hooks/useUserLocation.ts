"use client";
import { useEffect, useState } from "react";

interface Position {
    lat: number;
    lon: number;
}

export const useUserLocation = () => {
    const [userLocation, setLocation] = useState<Position | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Геолокация не поддерживается вашим браузером");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (err) => {
                setError("Не удалось получить геопозицию: " + err.message);
            }
        );
    }, []);

    return { userLocation, errorUserLocation: error };
};
