"use client";

import { CSSProperties, FC, ReactNode, useState } from "react";
import style from "./inputForm.module.scss";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";
import { SpanErrorForm } from "../../Span/SpanErrorForm";
interface IIinputFormProps {
    error?: string;

    titleSpan: string;

    register?: FieldValues;
    placeholder?: string;
    type?: "text" | "email" | "password";
    inputClassName?: string;
    inlineStyle?: CSSProperties;
    titleNeighbor?: ReactNode;
    id?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
}
export const InputForm: FC<IIinputFormProps> = ({
    type,
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
        <div onClick={onClick} className={style.ctn_input}>
            <div className={style.ctn_input_title}>
                <label
                    htmlFor={`input-${register?.name}`}
                    className={style.input_name}
                >
                    {titleSpan}
                </label>

                <div className={style.input_additional}>{titleNeighbor}</div>
            </div>
            <div className={style.ctn_input_input}>
                <input
                    id={`input-${register?.name}`}
                    {...register}
                    value={value}
                    style={inlineStyle}
                    type={type}
                    className={clsx(style.input, !!error && style.input_error)}
                    placeholder={placeholder}
                    onChange={(e) => {
                        register?.onChange?.(e); // уведомляем react-hook-form
                        onChange?.(e); // вызываем свой кастомный onChange
                    }}
                />
            </div>
            {error && <SpanErrorForm text={error || ""} />}
        </div>
    );
};
