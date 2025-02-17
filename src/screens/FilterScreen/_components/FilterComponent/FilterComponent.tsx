"use client";

import style from "./filterComponent.module.scss";
import { MapStaticGoogle } from "@/components/common/Map/Map/MapStaticGoogle";

import { PopupMap } from "@/components/common/Popup/PopupMap/PopupMap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BlockCheckBox from "./BlockCheckBox/BlockCheckBox";
import {
  IMockBlock,
  mockFilterHotel,
} from "@/asset/mockData/mockFilterCheckBox";
import { Checkbox, GetProp } from "antd";
import { Button } from "@/components/UI/Button/Button";

import { ButtonClose } from "@/components/UI/Button/ButtonClose";

import { IconFilter } from "@/components/common/Icons/IconFilter/IconFilter";
import { Overlay } from "@/components/common/Overlay/Overlay";
import { IApiTagsResponse } from "@/Api/IApi";

interface IFilterComponentProp {
  dataTags?: IMockBlock[];
}

const FiltersComponent = ({ dataTags }: IFilterComponentProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filterActiveMobile, setFilterActiveMobile] = useState(false);
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  useEffect(() => {
    const filterValues = searchParams.get("filter")?.split("%") || [];
    setCheckedValues(filterValues);
  }, [searchParams]);

  const onChangeFilter: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checkedValues.length === 0) {
      params.delete("filter");
    } else {
      params.set("filter", checkedValues.join("%"));
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };
  function handlerResetAllParam() {
    router.replace(`${pathname}`, { scroll: false });
  }
  function handlerOpenFilter() {
    setFilterActiveMobile(true);
  }
  function handlerCloseFilter() {
    setFilterActiveMobile(false);
  }
  return (
    <>
      <div className={style.filter_map}>{/* <PopupMap /> */}</div>
      <Button
        className={style.filter_buttonOpen}
        onClick={handlerOpenFilter}
        text={`Открыть фильтры  ${
          checkedValues.length ? "| " + checkedValues.length : ""
        }`}
        icon={<IconFilter className={style.filter_buttonOpen_icon} />}
      />
      <div
        className={
          style.filter + " " + (filterActiveMobile && ` ${style.active}`)
        }
      >
        <div className={style.filter_relative}>
          <div className={style.filter_title}>
            <h2>Фильтры</h2>
            <ButtonClose onClick={handlerCloseFilter} />
          </div>
          <div className={style.filter_content}>
            <Checkbox.Group
              value={checkedValues}
              defaultValue={searchParams.get("filter")?.split("%")}
              onChange={onChangeFilter}
            >
              {dataTags?.map((item, index) => {
                return <BlockCheckBox key={index} data={item} />;
              })}
            </Checkbox.Group>
          </div>
          <div className={style.filter_buttonGroup}>
            <Button
              onClick={handlerCloseFilter}
              text="Показать 1200 совпадений"
            />
            <Button
              onClick={handlerResetAllParam}
              className={`${style.filter_buttonGroup_reset} ${
                checkedValues.length > 0 &&
                style.filter_buttonGroup_reset_active
              }`}
              text="Сбросить"
            />
          </div>
        </div>
      </div>
      <Overlay active={filterActiveMobile} setActive={setFilterActiveMobile} />
    </>
  );
};

export default FiltersComponent;
