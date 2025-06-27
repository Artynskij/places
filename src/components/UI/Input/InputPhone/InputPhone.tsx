import { ControllerRenderProps, FieldError } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import style from "./inputPhone.module.scss";

interface IInputPhoneNumber {
    field: ControllerRenderProps<any, "phone">;
    error: FieldError | null;
    className?: string;
}
export const InputPhoneNumber = ({
    field,
    error,
    className,
}: IInputPhoneNumber) => {
    return (
        <div className={style.blockPhoneNumber}>
            <label htmlFor={`input-phoneNumber`}>Номер телефона</label>
            <PhoneInput
                {...field}
                defaultCountry="BY"
                international
                withCountryCallingCode
                className={style.inputPhone}
                id={`input-phoneNumber`}
            />
            {error && <span className={style.errorInput}>{error.message}</span>}
        </div>
    );
};
