import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import style from "./mapGoogle.module.scss";
import "leaflet/dist/leaflet.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
export const MapLeaflet = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const tokyo = { lng: 139.753, lat: 35.6844 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = "dExlZ0zCTdbacCMN7qmO";

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
      language: "name:ru",
    });
  }, [tokyo.lng, tokyo.lat, zoom]);

  return (
    <div className={style.map}>
      <div ref={mapContainer} className={style.map} />
    </div>
  );
};
