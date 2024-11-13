"use client";
import { FC, useState } from "react";

import style from "./Switcher.module.scss";
import { Button } from "@/components/UI/Button/Button";
interface IDataSwitcher {
  title: string;
  value: string;
  active: boolean;
}
interface ISwitcher {
  data: IDataSwitcher[];
  callBack: (type: IDataSwitcher) => void;
}
export const Switcher: FC<ISwitcher> = ({ data, callBack }) => {
  return (
    <div className={style.switcher}>
      {data.map((item, index) => {
        return (
          <Button
            className={style.switcher_item}
            onClick={() => {
              callBack(data[index]);
            }}
            key={index}
            type={item.active ? "blue" : "light"}
            text={item.title}
            active={item.active ? true : false}
          />
        );
      })}
    </div>
  );
};
