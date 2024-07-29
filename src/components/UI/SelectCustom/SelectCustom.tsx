"use client";

import { FC, useEffect, useRef, useState } from "react";
import style from "./selectCustom.module.scss";
import { IconArrowDown } from "../Icons";
import { ISelectOption } from "@/types/IType";

interface ISelectProps {
  options: ISelectOption[];
  onChange: (option: ISelectOption) => void;
  activeOption: string | null | undefined;
  title?: string;
}

export const SelectCustom: FC<ISelectProps> = ({
  options,
  activeOption,
  onChange,
  title,
}) => {
  const [activeSelect, setActiveSelect] = useState<boolean>(false);
  // const [activeValue, setActiveValue] = useState(title || options[0].value);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setActiveSelect(false);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  function toggleSelect() {
    setActiveSelect(!activeSelect);
  }
  function handleChange(item: ISelectOption) {
    onChange(item);

    setActiveSelect(false);
  }
  return (
    <div
      ref={rootRef}
      className={style.select + " " + (activeSelect ? style.active : "")}
    >
      <div onClick={toggleSelect} className={style.select_value}>
        <span>
          {options.find((item) => item.value === activeOption)?.name ||
            title ||
            options[0].name}
        </span>
        <IconArrowDown className={style.select_value_icon} />
      </div>
      <div className={style.select_options}>
        {options.map((item, index) => {
          let activeItem = false;
          if (item.value === activeOption) {
            activeItem = true;
          }
          return (
            <div
              onClick={() => handleChange(item)}
              key={index}
              className={
                style.select_options_item +
                " " +
                (activeItem ? style.select_options_item_active : "")
              }
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
