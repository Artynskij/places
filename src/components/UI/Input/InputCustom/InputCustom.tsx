import { IconCancel } from "@/components/common/Icons";
import style from "./inputCustom.module.scss";
interface IInputCustom {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
}
export const InputCustom = ({ value, setValue, placeholder }: IInputCustom) => {
    return (
        <div className={style.inputCtn}>
            <input
                className={style.input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder={placeholder}
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
