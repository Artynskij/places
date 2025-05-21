"use client";
import { FC } from "react";

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
    classnameSwitcher?: string;
    classnameSwitcher_list?: string;
    classnameSwitcher_item?: string;
}
export const Switcher: FC<ISwitcher> = ({
    data,
    callBack,
    classnameSwitcher,

    classnameSwitcher_list,
    classnameSwitcher_item,
}) => {
    return (
        <div className={`${classnameSwitcher} ${style.switcher}`}>
            <div className={`${classnameSwitcher_list} ${style.switcher_list}`}>
                {data.map((item, index) => {
                    return (
                        <Button
                            className={`${classnameSwitcher_item} ${style.switcher_item}`}
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
        </div>
    );
};
