"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "./mapBlockForm.module.scss";
import { useState } from "react";

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
}
const MapBlockForm = ({ error, onChange }: Prop) => {
    const [mapActive, setMapActive] = useState<boolean>(false);
    const [coord, setCoord] = useState<IMapboxCoordPropToForm>();
    const handleOpenMap = () => {
        setMapActive(true);
    };
    const handleSetCoord = (value: IMapboxCoordPropToForm) => {
        onChange(value);
        setCoord(value);
    };
    const handlerCloseMap = () => {
        setMapActive(false);
    };
    return (
        <div className={style.mapBlock}>
            <Button onClick={handleOpenMap} text="Получить координаты" />
            {mapActive && (
                <ModalCustom
                    title="Выбор Координат"
                    view="over"
                    closeModal={handlerCloseMap}
                    active={mapActive}
                >
                    <MapCoordinatePicker
                        position={coord}
                        setPosition={handleSetCoord}
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
