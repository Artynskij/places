import style from "./inputDate.module.scss";
import InputMask from "react-input-mask";
import clsx from "clsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState, useEffect } from "react";

dayjs.extend(customParseFormat);

type Props = {
    value?: Date | null;
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

    useEffect(() => {
        setInputValue(value ? dayjs(value).format("DD.MM.YYYY") : "");
    }, [value]);

    
    const handleBeforeInput = (
        e: React.FormEvent<HTMLInputElement> & { data: string | null }
    ) => {
        const input = e.currentTarget;
        const newChar = e.data;
        if (!newChar || /\D/.test(newChar)) return; 
        const onlyNums = input.value.replace(/\D/g, "");
        const nextValue = onlyNums + newChar;

        if (nextValue.length === 2) {
            const day = Number(nextValue.slice(0, 2));
            if (day < 1 || day > 31) e.preventDefault(); 
        }
        if (nextValue.length === 4) {
            const month = Number(nextValue.slice(2, 4));
            if (month < 1 || month > 12) e.preventDefault(); 
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (newValue.length === 10) {
            const parsed = dayjs(newValue, "DD.MM.YYYY", true);
            if (parsed.isValid()) {
                onChange(parsed.toDate());
                return;
            }
        }

        if (newValue.trim() === "") {
            onChange(null);
        }
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
                onBeforeInput={handleBeforeInput}
                placeholder={placeholder || "ДД.ММ.ГГГГ"}
                className={clsx(style.input, error && style.input_error)}
            />
            {error && <span className={style.input_errorText}>{error}</span>}
        </div>
    );
};
