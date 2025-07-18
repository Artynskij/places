"use client";

import React from "react";
import style from "./timePicker.module.scss"
import { TimePicker as TimeAntd } from "antd";
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
            <TimeAntd.RangePicker
                minuteStep={15}
                format={format}
                placeholder={["Открытие", "Закрытие"]}
                value={value}
                onChange={(dates) => {
                    if (dates && dates[0] && dates[1]) {
                        onChange?.([dates[0], dates[1]]);
                    } else {
                        onChange?.(null);
                    }
                }}
            />
            {error && <SpanErrorForm text={error || ''} />}
        </div>
    );
};
