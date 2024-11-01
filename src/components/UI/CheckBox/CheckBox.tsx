"use client";

import { Checkbox } from "antd";
import style from "./checkBox.module.scss";
import { FC } from "react";

interface ICheckBox {
  name: string;
  value: string;
}

export const CheckBox: FC<ICheckBox> = ({ name, value }) => {
  return (
    <>
      <Checkbox
      
        rootClassName={style.checkBox_root}
        // className={style.checkBox}
        value={value}
      >
        {name}
      </Checkbox>
    </>
  );
};
