import { ControllerRenderProps, FieldError } from "react-hook-form";
import "react-phone-number-input/style.css";
import style from "./inputPhone.module.scss";
import clsx from "clsx";
import { SpanErrorForm } from "../../Span/SpanErrorForm";
import { PhoneInput, defaultCountries, parseCountry } from 'react-international-phone';
import "react-international-phone/style.css";

interface IInputPhoneNumber<TFieldName extends string> {
    field: ControllerRenderProps<any, TFieldName>;
    error: FieldError | null;
    titleSpan: string;
}
export const InputPhoneNumber = <TFieldName extends string>({
    field,
    error,
    titleSpan,
}: IInputPhoneNumber<TFieldName>) => {


    return (
        <div className={style.blockPhoneNumber}>
            <label htmlFor={`input-phoneNumber`}>{titleSpan}</label>
            <PhoneInput
                className={clsx(
                    style.inputPhone,
                    !!error && style.inputPhone_error
                )}
                {...field}
                defaultCountry='by'
                inputProps={{
                    id: `input-phoneNumber`,
                    className: style.phoneInput
                }}
            />
            {error && <SpanErrorForm text={error.message} />}
        </div>
    );
};



// for future translate 
// const countryTranslations = {

//     "ua": "Украина",
//     "ru": "Россия",
//     "by": "Беларусь",

// };
// const translatedCountries = defaultCountries.map((country) => {
//     console.log(parseCountry(country));
//     const { iso2 } = parseCountry(country);
//     if (countryTranslations[iso2]) {
//         return [countryTranslations[iso2], country[1], country[2]];
//     }
//     return country;
// });