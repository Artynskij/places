"use client";
import { IEstablishmentFront, ISearchItemFront } from "@/lib/models";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Marker, MarkerEvent, Popup } from "react-map-gl/mapbox";

import style from "./customMarker.module.scss";

import {
    IconAccommodation,
    IconAttraction,
    IconEater,
} from "../../../../Icons";
import { CardMap } from "../../../../Cards/CardMap/CardMap";
interface ICustomMarker {
    establishment: ISearchItemFront;
}

export const CustomMarkerComponent = ({ establishment }: ICustomMarker) => {
    const [hoverShowPopup, setHoverShowPopup] = useState(false);
    const [clickShowPopup, setClickShowPopup] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();
    // const markerRef = useRef<HTMLDivElement>(null);

    const handlerPopupMouseEnter = () => {
        clearTimeout(timerRef.current);
        setHoverShowPopup(true);
    };

    const handlerPopupMouseLeave = () => {
        timerRef.current = setTimeout(() => {
            setHoverShowPopup(false);
        }, 300);
    };

    const handlerClick = (e: MarkerEvent<MouseEvent>) => {
        e.originalEvent.stopPropagation();

        // setHoverShowPopup(true);
        setClickShowPopup(true);
    };

    const handlerClosePopup = () => {
        setHoverShowPopup(false);
        setClickShowPopup(false);
    };

    const renderMarkerIcon = () => {
        const baseClass = style.marker;
        const icons = {
            ACCOMMODATION: (
                <div className={`${baseClass} ${style.marker__accommodation}`}>
                    <IconAccommodation className={style.marker_icon} />
                </div>
            ),
            EATER: (
                <div className={`${baseClass} ${style.marker__eater}`}>
                    <IconEater className={style.marker_icon} />
                </div>
            ),
            ATTRACTION: (
                <div className={`${baseClass} ${style.marker__attraction}`}>
                    <IconAttraction className={style.marker_icon} />
                </div>
            ),
        };

        return (
            icons[establishment.typeEstablishment?.key || "EATER"] ||
            icons.ATTRACTION
        );
    };
    return (
        <div
            onMouseEnter={handlerPopupMouseEnter}
            onMouseLeave={handlerPopupMouseLeave}
        >
            <Marker
                longitude={establishment.location.lon as number}
                latitude={establishment.location.lat as number}
                onClick={handlerClick}
            >
                {renderMarkerIcon()}
            </Marker>

            {(hoverShowPopup || clickShowPopup) && (
                <Popup
                    longitude={establishment.location.lon as number}
                    latitude={establishment.location.lat as number}
                    onClose={() => setHoverShowPopup(false)}
                    closeOnClick={false}
                    closeButton={false}
                    anchor="top"
                    focusAfterOpen={false}
                >
                    <div>
                        <CardMap
                            establishment={establishment}
                            handlerClosePopup={handlerClosePopup}
                        />
                    </div>
                </Popup>
            )}
        </div>
    );
};
export const CustomMarker = React.memo(
    CustomMarkerComponent,
    (prevProps, nextProps) => {
        return (
            prevProps.establishment.id === nextProps.establishment.id &&
            JSON.stringify(prevProps.establishment) ===
                JSON.stringify(nextProps.establishment)
        );
    }
);
