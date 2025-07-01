import { ControllerRenderProps, FieldError } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import style from "./inputPhone.module.scss";
import clsx from "clsx";
import * as Yup from "yup";

interface IInputPhoneNumber {
    field: ControllerRenderProps<any, string>;
    error: FieldError | null;
    className?: string;
    titleSpam: string;
}
export const InputPhoneNumber = ({
    field,
    error,
    className,
    titleSpam,
}: IInputPhoneNumber) => {
    return (
        <div className={style.blockPhoneNumber}>
            <label htmlFor={`input-phoneNumber`}>{titleSpam}</label>
            <PhoneInput
                {...field}
                defaultCountry="BY"
                international
                withCountryCallingCode
                className={clsx(
                    style.inputPhone,
                    !!error && style.inputPhone_error
                )}
                id={`input-phoneNumber`}
            />
            {error && (
                <span className={style.inputPhone_errorText}>
                    {error.message}
                </span>
            )}
        </div>
    );
};
