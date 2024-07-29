"use client";

import { CSSProperties, FC, ReactNode, useState } from "react";
import style from "./inputForm.module.scss";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface IIinputFormProps {
  error?: string;

  placeholder: string;
  titleSpan: string;
  inputClassName?: string;
  inlineStyle?: CSSProperties;
  titleNeighbor?: ReactNode;
  register: FieldValues;
  type?: "text" | "email" | "password";

  id?: string;
}
export const InputForm: FC<IIinputFormProps> = ({
  type,
  placeholder,
  inputClassName,
  inlineStyle,
  titleSpan,
  titleNeighbor,
  error,
  register,
  id,
}) => {
  return (
    <div className={style.ctn_input}>
      <div className={style.ctn_input_title}>
        <label htmlFor={`input-${id}`} className={style.input_name}>
          {titleSpan}
        </label>

        <div className={style.input_additional}>{titleNeighbor}</div>
      </div>
      <div className={style.ctn_input_input}>
        <input
          id={`input-${id}`}
          {...register}
          style={inlineStyle}
          type={type}
          className={style.input + " " + inputClassName}
          placeholder={placeholder}
        />
      </div>
      <span className={style.input_error}> {error}</span>
    </div>
  );
};
