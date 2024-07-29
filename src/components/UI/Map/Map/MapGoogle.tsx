"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import style from "./mapGoogle.module.scss";

export const MapGoogle = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [globalMap, setGlobalMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: "quarterly",
        language: "ru",
      });
      const google = await loader.load();
      const { Map } = google.maps;
      // const { AdvancedMarkerElement } = google.maps.marker as google.maps.MarkerLibrary;
      // const { Marker } =  google.maps.marker as google.maps.MarkerLibrary;
      // console.dir(google.maps.Map)

      const locationMap = {
        lat: 51.76859946796236,
        lng: 27.200758815622816,
      };

      // Marker
      const { Marker } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      // const { AdvancedMarkerElement } = (await loader.importLibrary(
      //   "marker"
      // )) as google.maps.MarkerLibrary;
      const options: google.maps.MapOptions = {
        center: locationMap,
        zoom: 7,
        mapId: "NEXT_MAPS_TUTS",
        // fullscreenControl: false, // remove the top-right button
        // mapTypeControl: false, // remove the top-left buttons
        // streetViewControl: false, // remove the pegman
        // zoomControl: false,
        clickableIcons: true,
        
      };

      const map = new Map(mapRef.current as HTMLDivElement, options);
      // add the marker in the map
      setGlobalMap(map);
      console.log(new google.maps.Size(32, 32));
      new Marker({
        map: map,
        position: {
          lat: 51.76859946796236,
          lng: 27.200758815622816,
        },
        title: "first",

        icon: {
          url: "https://mmr.ua/uploaded/materials/a2a89af751.png",
          // size: new google.maps.Size(32, 32), // Размер иконки
          origin: new google.maps.Point(32, 32), // Начальная точка иконки
          anchor: new google.maps.Point(30, 32), // Точка крепления иконки
          fillOpacity: 1,
          labelOrigin: new google.maps.Point(32, 32),
        },
        // icon:"https://mmr.ua/uploaded/materials/a2a89af751.png"
      });
      new Marker({
        map: map,
        position: {
          lat: 52.76859946796236,
          lng: 27.200758815622816,
        },
        title: "title sec",
        label: "123",
      });

      // console.dir(map);
    };
    initializeMap();
  }, []);

  return (
    <>
      {" "}
      <div onClick={() => globalMap?.setZoom(1)} style={{ background: "red" }}>
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
