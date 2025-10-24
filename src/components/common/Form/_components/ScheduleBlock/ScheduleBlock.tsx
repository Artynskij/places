import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import style from "./scheduleBlock.module.scss";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { TimePickerCustom } from "../TimePicker/TimePickerCustom";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { TDayOfWeek } from "@/lib/models/types";
import { useTranslations } from "next-intl";
import { IScheduleFront } from "@/lib/models";

const days: TDayOfWeek[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const format = "HH:mm";

type TypeDayWork = "default" | "custom" | "isHoliday" | "is24Hours";

type InternalDay = {
    type: TypeDayWork;
    from?: string;
    to?: string;
};

type ScheduleRaw = Record<TDayOfWeek, InternalDay>;
export interface IScheduleFrontCreate extends Omit<IScheduleFront, "id"> {
    id?: string; // разрешаем undefined или ""
}
export const ScheduleBlockForm = ({
    value,
    onChange,
    error,
}: {
    value: IScheduleFrontCreate[] | null;
    onChange: (val: IScheduleFront[]) => void;
    error?: string | null;
}) => {
    const tSchedule = useTranslations("Schedule");

    const [internalSchedule, setInternalSchedule] = useState<ScheduleRaw>(
        {} as ScheduleRaw
    );

    useEffect(() => {
        if (!value) return;

        const defaultState: ScheduleRaw = {} as ScheduleRaw;

        days.forEach((day) => {
            const existing = value.find((item) => item.day === day);

            if (!existing) {
                defaultState[day] = { type: "default" };
                return;
            }

            if (existing.isHoliday) {
                defaultState[day] = { type: "isHoliday" };
            } else if (existing.is24Hours) {
                defaultState[day] = { type: "is24Hours" };
            } else {
                defaultState[day] = {
                    type: "custom",
                    from: existing.openTime,
                    to: existing.closeTime,
                };
            }
        });

        setInternalSchedule(defaultState);
    }, [value]);

    const updateForm = (newSchedule: ScheduleRaw) => {
        const formatted: IScheduleFront[] = days
            .map((day) => {
                const item = newSchedule[day];
                if (!item || item.type === "default") return null;

                const existing = value?.find((v) => v.day === day);

                const base = {
                    id: existing?.id || "", // сохраняем id из value, иначе используем day как временный
                    day,
                };

                if (item.type === "isHoliday") {
                    return {
                        ...base,
                        openTime: "00:00",
                        closeTime: "00:00",
                        is24Hours: false,
                        isHoliday: true,
                    };
                }

                if (item.type === "is24Hours") {
                    return {
                        ...base,
                        openTime: "00:00",
                        closeTime: "23:59",
                        is24Hours: true,
                        isHoliday: false,
                    };
                }

                return {
                    ...base,
                    openTime: item.from || "09:00",
                    closeTime: item.to || "18:00",
                    is24Hours: false,
                    isHoliday: false,
                };
            })
            .filter(Boolean) as IScheduleFront[];

        setInternalSchedule(newSchedule);
        onChange(formatted);
    };

    const handleTypeChange = (day: TDayOfWeek, type: TypeDayWork) => {
        const newSchedule = { ...internalSchedule };

        if (type === "custom") {
            newSchedule[day] = {
                type,
                from: "09:00",
                to: "18:00",
            };
        } else {
            newSchedule[day] = { type };
        }

        updateForm(newSchedule);
    };

    const handleTimeChange = (
        day: TDayOfWeek,
        times: [dayjs.Dayjs, dayjs.Dayjs] | null
    ) => {
        if (!times) return;

        const newSchedule = { ...internalSchedule };
        newSchedule[day] = {
            type: "custom",
            from: times[0].format(format),
            to: times[1].format(format),
        };

        updateForm(newSchedule);
    };

    return (
        <div className={style.scheduleWrapper}>
            {days.map((day) => {
                const current = internalSchedule?.[day] || { type: "default" };

                return (
                    <div key={day} className={style.dayRow}>
                        <div className={style.dayLabel}>{tSchedule(day)}</div>

                        <SelectCustom
                            classNameCtn={style.select_ctn}
                            options={[
                                {
                                    label: "Выбрать расписание",
                                    value: "default",
                                },
                                { label: "Время", value: "custom" },
                                { label: "Выходной", value: "isHoliday" },
                                { label: "Круглосуточно", value: "is24Hours" },
                            ]}
                            activeOption={current.type}
                            onChange={(option) =>
                                handleTypeChange(
                                    day,
                                    option.value as TypeDayWork
                                )
                            }
                        />
                        <div className={style.dayRow_emptyMobile}></div>
                        {current.type === "custom" ? (
                            <TimePickerCustom
                                value={[
                                    dayjs(current.from || "09:00", format),
                                    dayjs(current.to || "18:00", format),
                                ]}
                                onChange={(val) => handleTimeChange(day, val)}
                            />
                        ) : current.type === "isHoliday" ? (
                            <span>{"Выходной"}</span>
                        ) : current.type === "is24Hours" ? (
                            <span>{"Круглосуточно"}</span>
                        ) : (
                            <span
                                className={
                                    error ? style.scheduleNote_error : ""
                                }
                            >
                                {"Не выбрано"}
                            </span>
                        )}
                    </div>
                );
            })}

            {error && <SpanErrorForm text={error} />}
        </div>
    );
};
