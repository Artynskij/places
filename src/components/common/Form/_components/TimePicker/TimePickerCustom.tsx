"use client";

import React from "react";
import style from "./timePicker.module.scss"
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
dayjs.extend(customParseFormat);

interface ITimePickerCustomProps {
    value?: [Dayjs, Dayjs] | null;
    onChange?: (val: [Dayjs, Dayjs] | null) => void;
    error?: string | null;
}

export const TimePickerCustom = ({
    value,
    onChange,
    error,
}: ITimePickerCustomProps) => {
    const format = "HH:mm";
    return (
        <div className={style.time}>
            <input
                type="time"
                className={style.time_input}
                step={900}
                value={value ? value[0].format(format) : ""}
                onChange={(e) => {
                    const start = dayjs(e.target.value, format);
                    if (value && value[1]) {
                        onChange?.([start, value[1]]);
                    } else {
                        onChange?.([start, dayjs()]);
                    }
                }}
            />

            <div>/</div>

            <input
                type="time"
                className={style.time_input}
                step={900}
                value={value ? value[1].format(format) : ""}
                onChange={(e) => {
                    const end = dayjs(e.target.value, format);
                    if (value && value[0]) {
                        onChange?.([value[0], end]);
                    } else {
                        onChange?.([dayjs(), end]);
                    }
                }}
            />

            {error && <SpanErrorForm text={error || ''} />}
        </div>
    );
};
