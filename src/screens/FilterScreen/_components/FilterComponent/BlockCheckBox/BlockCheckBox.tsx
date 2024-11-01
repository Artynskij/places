"use client";

import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";
import style from "./blockCheckBox.module.scss";
import { FC, useState } from "react";
import { CheckBox } from "@/components/UI/CheckBox/CheckBox";
import { Button } from "@/components/UI/Button/Button";
import { IconArrowDown } from "@/components/common/Icons/IconArrowDown/IconArrowDown";
interface IBlockCheckBox {
  data: IMockBlock;
}
export const BlockCheckBox: FC<IBlockCheckBox> = ({ data }) => {
  const [blockActive, setBlockActive] = useState(true);
  const [listBlockActive, setListBlockActive] = useState(false);
  function switchBlock() {
    setBlockActive(!blockActive);
  }
  function openAllFilter() {
    setListBlockActive(!listBlockActive);
  }
  return (
    <div className={style.block + ` ${blockActive && style.block_active}`}>
      <div onClick={switchBlock} className={style.block_title}>
        <span className={style.block_title_text}>{data.title}</span>
        <IconArrowDown className={style.block_title_icon} />
      </div>
      <div
        className={
          style.block_list + ` ${listBlockActive && style.block_list_active}`
        }
      >
        {data.data.map((item, index) => {
          if (index <= 3) {
            return (
              <div key={item.id} className={style.block_list_item}>
                <CheckBox name={item.name} value={item.value} />
              </div>
            );
          }

          return (
            <div key={item.id} className={style.block_list_itemDropdown}>
              <CheckBox name={item.name} value={item.value} />
            </div>
          );
        })}
        <Button
          onClick={openAllFilter}
          className={style.block_openAll}
          text={listBlockActive ? "Показать меньше" : "Показать больше"}
        />
      </div>
    </div>
  );
};
