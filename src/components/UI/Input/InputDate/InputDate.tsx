import style from "./inputDate.module.scss";
import InputMask from "react-input-mask";
import clsx from "clsx";
import { getFormatDate, parseDateToISO } from "@/lib/helpers/getFormatDate";

type Props = {
    value?: string; // Может прийти ISO или YYYY/DD/MM
    onChange: (val: string) => void; // Возвращаем ISO
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={style.ctn_input}>
            <label htmlFor="input-dateMask" className={style.input_name}>
                {titleSpan}
            </label>
            <InputMask
                mask="99.99.9999"
                // maskChar={null}
                value={value}
                onChange={handleChange}
                placeholder={placeholder || "ДД.ММ.ГГГГ"}
                className={clsx(style.input, error && style.input_error)}
            />
            {error && <span className={style.input_errorText}>{error}</span>}
        </div>
    );
};
