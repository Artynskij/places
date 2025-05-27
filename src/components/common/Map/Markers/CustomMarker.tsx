"use client";
import { IEstablishmentFront } from "@/lib/models";
import { useState, useCallback, useRef, useEffect } from "react";
import { Marker, MarkerEvent, Popup } from "react-map-gl/mapbox";

import style from "./customMarker.module.scss";

import { IconAccommodation, IconAttraction, IconEater } from "../../Icons";
import { CardMap } from "../../Cards/CardMap/CardMap";
interface ICustomMarker {
    establishment: IEstablishmentFront;
    tagClass: number;
    setSelectedId: (id: string | null) => void;
    selectedId: string | null;
}

export const CustomMarker = ({
    establishment,
    tagClass,
    setSelectedId,
    selectedId,
}: ICustomMarker) => {
    const [localShowPopup, setLocalShowPopup] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();
    const markerRef = useRef<HTMLDivElement>(null);

    const showPopup = selectedId === establishment.id || localShowPopup;

    const handlerPopupMouseEnter = useCallback(() => {
        clearTimeout(timerRef.current);
        setSelectedId(establishment.id);
    }, [establishment.id, setSelectedId]);

    const handlerPopupMouseLeave = useCallback(() => {
        timerRef.current = setTimeout(() => {
            setLocalShowPopup(false);
            if (selectedId === establishment.id) {
                setSelectedId(null);
            }
        }, 300);
    }, [selectedId, establishment.id, setSelectedId]);

    const handlerClick = (e: MarkerEvent<MouseEvent>) => {
        e.originalEvent.stopPropagation();
        setLocalShowPopup(true);
        setSelectedId(establishment.id);
        setSelectedId?.(establishment.id);
    };

    const handlerClosePopup = useCallback(() => {
        setLocalShowPopup(false);
        if (selectedId === establishment.id) {
            setSelectedId(null);
        }
    }, [selectedId, establishment.id, setSelectedId]);

    useEffect(() => {
        const markerElement = markerRef.current;
        if (markerElement) {
            markerElement.addEventListener(
                "mouseenter",
                handlerPopupMouseEnter
            );
            markerElement.addEventListener(
                "mouseleave",
                handlerPopupMouseLeave
            );

            return () => {
                markerElement.removeEventListener(
                    "mouseenter",
                    handlerPopupMouseEnter
                );
                markerElement.removeEventListener(
                    "mouseleave",
                    handlerPopupMouseLeave
                );
                clearTimeout(timerRef.current);
            };
        }
    }, [handlerPopupMouseEnter, handlerPopupMouseLeave]);
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

        return icons[establishment.typeEstablishment] || icons.ATTRACTION;
    };
    return (
        <div
            onMouseEnter={handlerPopupMouseEnter}
            onMouseLeave={handlerPopupMouseLeave}
        >
            <Marker
                longitude={establishment.location.longitude}
                latitude={establishment.location.latitude}
                onClick={handlerClick}
            >
                {renderMarkerIcon()}
            </Marker>

            {showPopup && (
                <Popup
                    longitude={establishment.location.longitude}
                    latitude={establishment.location.latitude}
                    onClose={() => setSelectedId(selectedId)}
                    closeOnClick={false}
                    closeButton={false}
                    anchor="top"
                    focusAfterOpen={false}
                >
                    <div>
                        <CardMap
                            establishment={{
                                id: establishment.id,
                                tagClass: tagClass,
                                mediaSrc: establishment.media.gallery[0].src,
                                rate: establishment.rates.main,
                                title: establishment.title,
                                typeEstablishment:
                                    establishment.typeEstablishment,
                                location: {
                                    lat: establishment.location.latitude,
                                    lon: establishment.location.longitude,
                                    country: establishment.location.country,
                                    town: establishment.location.town,
                                },
                            }}
                            handlerClosePopup={handlerClosePopup}
                        />
                    </div>
                </Popup>
            )}
        </div>
    );
};
