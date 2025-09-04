import style from "./inputDate.module.scss";
import InputMask from "react-input-mask";
import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState, useEffect } from "react";

dayjs.extend(customParseFormat);

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
    const [inputValue, setInputValue] = useState("");

    // синхронизируем value → строку
    useEffect(() => {
        setInputValue(value ? dayjs(value).format("DD.MM.YYYY") : "");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.target.value;
        setInputValue(str);

        if (str.length === 10) {
            const parsed = dayjs(str, "DD.MM.YYYY", true);
            if (parsed.isValid()) {
                onChange(parsed.toDate());
                return;
            }
        }

        // если поле не пустое, но дата ещё невалидная → ничего не делаем
        if (str.trim() === "") {
            onChange(null);
        }
    };

    return (
        <div className={style.ctn_input}>
            <label htmlFor="input-dateMask" className={style.input_name}>
                {titleSpan}
            </label>
            <InputMask
                // maskChar={null}
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
