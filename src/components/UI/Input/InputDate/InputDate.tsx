import style from "./inputDate.module.scss";
import InputMask from "react-input-mask";
import clsx from "clsx";
import { parse, format } from "date-fns";
import { useState, useEffect } from "react";

type Props = {
    value?: Date | null; // текущее значение
    onChange: (val: Date | null) => void;
    error?: string;
    placeholder?: string;
    titleSpan: string;
};

export const InputDate = ({
    value,
    onChange,
    error,
    placeholder,
    titleSpan,
}: Props) => {
    // локальный state для строки
    const [inputValue, setInputValue] = useState("");

    // если value изменилось извне → синхронизируем
    useEffect(() => {
        setInputValue(value ? format(value, "dd.MM.yyyy") : "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;
        setInputValue(str); // обновляем строку для отображения

        // проверяем полную дату
        if (str.length === 10) {
            const parsed = parse(str, "dd.MM.yyyy", new Date());
            if (!isNaN(parsed.getTime())) {
                onChange(parsed);
                return;
            }
        }

        // если ещё невалидно → наружу null
        onChange(null);
    };

    return (
        <div className={style.ctn_input}>
            <label htmlFor="input-dateMask" className={style.input_name}>
                {titleSpan}
            </label>
            <InputMask
                mask="99.99.9999"
                value={inputValue}
                onChange={handleChange}
                placeholder={placeholder || "ДД.ММ.ГГГГ"}
                className={clsx(style.input, error && style.input_error)}
            />
            {error && <span className={style.input_errorText}>{error}</span>}
        </div>
    );
};
