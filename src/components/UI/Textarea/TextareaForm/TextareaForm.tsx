import style from "../textarea.module.scss";

import { CSSProperties, FC, ReactNode, useState } from "react";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";
interface ITextareaFormProps {
    error?: string;

    titleSpan: string;

    register?: FieldValues;
    placeholder?: string;
    // type?: "text" | "email" | "password";
    inputClassName?: string;
    inlineStyle?: CSSProperties;
    titleNeighbor?: ReactNode;
    id?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClick?: () => void;
    className?: string;
}
export const TextareaForm: FC<ITextareaFormProps> = ({
    // type,
    inputClassName,
    inlineStyle,
    titleSpan,
    placeholder = titleSpan,
    titleNeighbor,
    error,
    register,
    id,
    value,
    onChange,
    onClick,
}) => {
    return (
        <div onClick={onClick} className={`${style.ctn_textarea}`}>
            <div className={style.ctn_textarea_title}>
                <label
                    htmlFor={`textarea-${register?.name}`}
                    className={style.textarea_name}
                >
                    {titleSpan}
                </label>

                <div className={style.textarea_additional}>{titleNeighbor}</div>
            </div>
            {/* <div className={style.ctn_textarea_textarea}> */}
            <textarea
                id={`textarea-${register?.name}`}
                {...register}
                name={register?.name}
                value={value}
                style={inlineStyle}
                // type={type}
                className={clsx(
                    style.textarea,
                    !!error && style.textarea_error
                )}
                placeholder={placeholder}
                onChange={(e) => {
                    register?.onChange?.(e); // уведомляем react-hook-form
                    onChange?.(e); // вызываем свой кастомный onChange
                }}
            />
            {/* </div> */}
            <span className={style.textarea_errorText}> {error}</span>
        </div>
    );
};
