"use client";

import { Button } from "@/components/UI/Button/Button";
import style from "./mapBlockForm.module.scss";
import { useState } from "react";

import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import { FieldError } from "react-hook-form";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { IMapboxCoordPropToForm } from "@/lib/models/mapbox/mapbox";

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

    return (
        <div className={style.mapBlock}>
            <Button onClick={handleOpenMap} text="Получить координаты" />
            {mapActive && (
                <PopupMap
                    mode={["getCoordinate"]}
                    mapActive={mapActive}
                    setMapActive={setMapActive}
                    setPosition={handleSetCoord}
                    position={coord}
                />
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
