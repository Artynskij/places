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
            console.log("Геолокация не поддерживается");
            setError("Геолокация не поддерживается вашим браузером");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Геолокация получена:", position);
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            (err) => {
                console.log("Ошибка получения геолокации:", err);
                setError("Не удалось получить геопозицию: " + err.message);
            }
        );
    }, []);

    return { userLocation, errorUserLocation: error };
};
