"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "./paramComponent.module.scss";
import { IconCancel } from "@/components/common/Icons/IconCancel/IconCancel";
import {
  IMockFilter,
  mockFilterHotel,
} from "@/asset/mockData/mockFilterCheckBox";
import { Button } from "@/components/UI/Button/Button";

export const ParamComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [dataParams, setDataParams] = useState<IMockFilter[] | null>();

  useEffect(() => {
    const searchParamsArray = searchParams.get("filter")?.split("%");
    if (!searchParamsArray) {
      setDataParams(null);
      return;
    }
    const filteredSearchParamsArray: IMockFilter[] = [];
    mockFilterHotel.forEach((block) => {
      block.data.forEach((blockItem) => {
        if (
          searchParamsArray.find((searchItem) => searchItem === blockItem.value)
        )
          filteredSearchParamsArray.push(blockItem);
      });
    });
    setDataParams(filteredSearchParamsArray);
    // You can now use the current URL
    // ...
  }, [searchParams]);

  function removeParam(clickItem: IMockFilter) {
    const params = new URLSearchParams(searchParams.toString());
    const filterValue = dataParams?.filter(
      (item) => item.value !== clickItem.value
    );
    if (filterValue?.length !== 0) {
      params.set(
        "filter",
        filterValue?.map((item) => item.value)?.join("%") || "123"
      );
    } else {
      params.delete("filter");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function handlerResetAllParam() {
    router.replace(`${pathname}`, { scroll: false });
  }
  if (!dataParams) return null;
  return (
    <div className={style.param_ctn}>
      <div className={style.list}>
        {dataParams?.map((item, index) => {
          return (
            <div
              onClick={() => removeParam(item)}
              className={style.list_item}
              key={index}
            >
              <span className={style.list_item_text}>{item.name}</span>
              <IconCancel className={style.list_item_icon} />
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => handlerResetAllParam()}
        className={style.buttonResetAll}
        type="light"
        text="Сбросить все"
      />
    </div>
  );
};
