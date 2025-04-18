import { Marker, Popup, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

import style from "./mapGoogle.module.scss";
import "leaflet/dist/leaflet.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import * as maptilersdk from "@maptiler/sdk";

import { mockObjectsCafe } from "@/asset/mockData/mockObject";

export const MapLeaflet = () => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const almaty = { lng: 76.889709, lat: 43.238949 };
  const [zoom] = useState(11);
  const locale = useLocale() as string;
  maptilersdk.config.apiKey = "dExlZ0zCTdbacCMN7qmO";

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [almaty.lng, almaty.lat],
      zoom: zoom,
      //@ts-ignore
      language: `name:${locale}` || "name:en",
    });
    const markerHeight = 50,
      markerRadius = 10,
      linearOffset = 25;
    const popupOffsets = {
      // top: [0, 0],
      "top-left": [0, 0],
      "top-right": [0, 0],
      // bottom: [0, -markerHeight],
      "bottom-left": [
        linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      "bottom-right": [
        -linearOffset,
        (markerHeight - markerRadius + linearOffset) * -1,
      ],
      // left: [markerRadius, (markerHeight - markerRadius) * -1],
      // right: [-markerRadius, (markerHeight - markerRadius) * -1],
    };
    mockObjectsCafe.forEach((item) => {
      // new maptilersdk.Marker({ draggable: false })
      //   //@ts-ignore
      //   .setLngLat([+item.coord?.lon, +item.coord?.lat])
      //   .addTo(map.current);
      new maptilersdk.Popup({
        offset: 1,
        className: "my-class",
      })
        //@ts-ignore
        .setLngLat([+item.coord?.lon, +item.coord?.lat])
        .setHTML(`<img src=${item.img}/>`)
        // .setText("pisun")
        .setMaxWidth("300px")
        .addTo(map.current);
    });
  }, [almaty.lng, almaty.lat, zoom, locale]);

  return (
    <div className={style.map}>
      <div ref={mapContainer} className={style.map} />
    </div>
  );
};
