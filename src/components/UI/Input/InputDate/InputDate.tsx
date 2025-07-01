import style from "./inputDate.module.scss";

import InputMask from "react-input-mask";
import clsx from "clsx";
import * as Yup from "yup";

type Props = {
    value?: string;
    onChange: (val: string) => void;
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
    return (
        <div className={style.ctn_input}>
            <label htmlFor={`input-dateMask`} className={style.input_name}>
                {titleSpan}
            </label>
            <InputMask
                id="input-dateMask"
                mask="99.99.9999"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder || "ДД.ММ.ГГГГ"}
                className={clsx(style.input, error && style.input_error)}
            />
            {error && <span className={style.input_errorText}>{error}</span>}
        </div>
    );
};

