'use client'
import { IconCancel } from "@/components/common/Icons";
import style from "./inputCustom.module.scss";
interface IInputCustom {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    classNameInput?: string;
    classNameCtn?: string;
    ariaLabel?:string;
}
export const InputCustom = ({
    value,
    setValue,
    placeholder,
    classNameInput,
    classNameCtn,
    ariaLabel = 'поиск'
}: IInputCustom) => {
    return (
        <div className={`${style.inputCtn} ${classNameCtn}`}>
            <input
                className={`${style.input} ${classNameInput}`}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder={placeholder}
                aria-label={ariaLabel}
            />
            {value.length > 0 && (
                <IconCancel
                    className={style.buttonDelete}
                    onClick={() => setValue("")}
                />
            )}
        </div>
    );
};
