import { ControllerRenderProps, FieldError } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import style from "./inputPhone.module.scss";
import clsx from "clsx";
import * as Yup from "yup";

interface IInputPhoneNumber<TFieldName extends string> {
    field: ControllerRenderProps<any, TFieldName>;
    error: FieldError | null;
    className?: string;
    titleSpam: string;
}
export const InputPhoneNumber = <TFieldName extends string>({
    field,
    error,
    className,
    titleSpam,
}: IInputPhoneNumber<TFieldName>) => {
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
