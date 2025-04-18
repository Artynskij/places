"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Loader } from "@googlemaps/js-api-loader";
import { useLocale } from "next-intl";
import style from "./mapGoogle.module.scss";
import { mockObjectsAll } from "@/asset/mockData/mockObject";
import Image from "next/image";

export const MapGoogle = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [globalMap, setGlobalMap] = useState<google.maps.Map | null>(null);
    const locale = useLocale() as string;
    function MarkerContent({ title }: { title: string }) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                }}
            >
                <Image
                    src="https://cdn-icons-png.flaticon.com/512/5195/5195114.png"
                    alt="Custom Icon"
                    style={{ width: "30px", height: "30px" }}
                    width={30}
                    height={30}
                />
                <div>{title}</div>
            </div>
        );
    }
    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "quarterly",
                language: locale,
            });
            const google = await loader.load();
            const { Map } = google.maps;

            const locationMapAlmaty = {
                lat: 43.26020214770561,
                lng: 76.91632043410121,
            };
            const locationMapSec = {
                lat: 51.76859946796236,
                lng: 25.200758815622816,
            };

            const options: google.maps.MapOptions = {
                center: locationMapAlmaty,
                zoom: 7,
                mapId: "NEXT_MAPS_TUTS",
                // fullscreenControl: false, // remove the top-right button
                // mapTypeControl: false, // remove the top-left buttons
                // streetViewControl: false, // remove the pegman
                // zoomControl: false,
                clickableIcons: true,
            };

            const map = new Map(mapRef.current as HTMLDivElement, options);

            setGlobalMap(map);
            // const icon = {
            //   url: "https://mmr.ua/uploaded/materials/a2a89af751.png", // Ссылка на ваше изображение
            //   scaledSize: new google.maps.Size(20, 20), // Размер иконки
            //   origin: new google.maps.Point(0, 0), // Начальная точка изображения
            //   anchor: new google.maps.Point(25, 50), // Точка, где иконка крепится к маркеру
            // };
            // Marker
            const { AdvancedMarkerElement } = (await loader.importLibrary(
                "marker"
            )) as google.maps.MarkerLibrary;
            const { InfoWindow } = (await loader.importLibrary(
                "maps"
            )) as google.maps.MapsLibrary;

            mockObjectsAll.forEach((item) => {
                const icon = document.createElement("div");
                icon.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/5195/5195114.png" alt="Custom Icon" style="width:30px;height:30px;">`;
                const infoWindow = new InfoWindow({
                    content: item.additional || "",
                });

                const advancedMarker = new AdvancedMarkerElement({
                    map: map,
                    position: {
                        lat: +item.coord?.lat || 0,
                        lng: +item.coord?.lon || 0,
                    },
                    content: icon,
                    title: "Нажми на меня",
                });

                advancedMarker.addListener("click", () => {
                    infoWindow.open(map, advancedMarker);
                });
            });
        };
        initializeMap();
        const markerContent = document.createElement("div");
        // markerContent.innerHTML = CreateMarkerContent();
        const root = createRoot(markerContent);

        root.render(<p>This child is placed inside the parent div.</p>);
        console.log(markerContent);
    }, []);

    return (
        <>
            <div
                onClick={() => globalMap?.setZoom(1)}
                style={{ background: "red" }}
            >
                1
            </div>
            <div
                onClick={() => globalMap?.setZoom(10)}
                style={{ background: "blue" }}
            >
                10
            </div>
            <div className={style.map} ref={mapRef}></div>
        </>
    );
};
