"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "./mapBlockForm.module.scss";
import { useEffect, useState } from "react";

import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import { FieldError } from "react-hook-form";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { IMapboxCoordPropToForm } from "@/lib/models/mapbox/mapbox";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { MapCoordinatePicker } from "@/components/common/Map/Mapbox/MapCoordinate";
import { IconDone } from "@/components/common/Icons";

interface Prop {
    error: FieldError | null;
    onChange: (value: IMapboxCoordPropToForm) => void;
    value: {
        addressFullLine: string | null;
        addressLine: string | null;
        lon: number;
        lat: number;
    } | null;
    locationId?: string | null;
}
const MapBlockForm = ({ error, onChange, value, locationId }: Prop) => {
    const [mapActive, setMapActive] = useState<boolean>(false);
    const [coord, setCoord] = useState<IMapboxCoordPropToForm>();

    useEffect(() => {
        if (value) {
            setCoord(value);
        }
    }, [value]);
    const handleOpenMap = () => {
        setMapActive(true);
    };
    const handleSetCoord = (value: IMapboxCoordPropToForm) => {
        onChange(value);
        // setCoord(value);
    };
    const handlerCloseMap = () => {
        setMapActive(false);
    };
    return (
        <div className={style.mapBlock}>
            <Button
                className={style.mapBlock_button}
                onClick={handleOpenMap}
                text="Получить координаты"
            />
            {mapActive && (
                <ModalCustom
                    title="Отметьте месторасположение объекта"
                    view="over"
                    closeModal={handlerCloseMap}
                    active={mapActive}
                    zIndex={11}
                >
                    <MapCoordinatePicker
                        position={coord}
                        setPosition={handleSetCoord}
                        locationId={locationId}
                    />
                    {coord && (
                        <Button
                            className={style.buttonAcceptPosition}
                            onClick={() => {
                                setMapActive(false);
                            }}
                            type="blue"
                            text="Потвердить позицию"
                            icon={
                                <IconDone className={style.buttonClose_icon} />
                            }
                        />
                    )}
                </ModalCustom>
            )}

            {coord && (
                <div className={style.choice}>
                    {coord.lat} , {coord.lon}
                </div>
            )}

            {error && <SpanErrorForm text={"Координаты обязательны"} />}
        </div>
    );
};

export default MapBlockForm;
