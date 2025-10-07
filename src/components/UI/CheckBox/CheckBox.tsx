"use client";

import { Checkbox } from "antd";
import style from "./checkBox.module.scss";
import { FC } from "react";

interface ICheckBox {
  name: string;
  value: string;
  error?: boolean;
}

export const CheckBox: FC<ICheckBox> = ({ value, name, error }) => {

  
  return (
    <>
      <Checkbox
      // className={style.checkBox_notRoot}
         rootClassName={`${style.checkBox_root} ${error ? "checkbox--error" : ""}`}
        // className={style.checkBox}
        value={value}
        
      >
        {name}
      </Checkbox>
    </>
  );
};
