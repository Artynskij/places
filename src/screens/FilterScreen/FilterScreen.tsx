"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import style from "./filterScreen.module.scss";


import { FiltersComponent } from "./_components/FilterComponent/FilterComponent";
import { ParamComponent } from "./_components/ContentComponent/ParamComponent/ParamComponent";


import { mockObjectsHotels } from "@/asset/mockData/mockObject";

import { CardSliderMainPage } from "@/components/common/Cards";


import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { setViewType } from "@/store/slices/typeViewListSlice";
import { CardList } from "@/components/common/Cards/CardList/CardList";
import { Switcher } from "@/components/common/Switcher/Switcher";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { mockFilterSort } from "@/asset/mockData/mockFilterSort";
import { useState } from "react";

export default function FilterScreen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [sortActiveItem, setSortActiveItem] = useState(mockFilterSort[3].value);
  const dispatch = useAppDispatch();
  const viewType = useSelector((state: RootState) => state.viewTypeSlice);
  const handlerSwitcher = (view: { title: string; value: string }) => {
    dispatch(setViewType(view.value as "list" | "table"));
  };
  return (
    <div className="container">
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={style.container}>
        <div className={style.title}>
          <div className={style.title_text}>
            <h3>Где остановиться в Казахстане</h3>
            <div className={style.title_result}>3200 результатов</div>
          </div>
          <div className={style.title_groupButton}>
            <Switcher data={viewType.viewData} callBack={handlerSwitcher} />
          </div>
        </div>
        <div id={"filter"} className={style.container_filter}>
          <FiltersComponent />
        </div>
        <div className={style.container_content}>
          <div className={style.param}>
            <ParamComponent />
          </div>
          <div className={style.sort}>
            <span>Сортировать по</span>

            <SelectCustom
              classNameCtn={style.sort_select}
              options={mockFilterSort}
              activeOption={sortActiveItem}
              onChange={(item) => {
                setSortActiveItem(item.value);
              }}
            />
          </div>
          {viewType.viewType === "list" ? (
            <div className={style.list}>
              {mockObjectsHotels.map((item) => {
                return <CardList liked={false} key={item.id} {...item} />;
              })}
            </div>
          ) : (
            <div className={style.table}>
              {mockObjectsHotels.map((item) => {
                return <CardSliderMainPage key={item.id} {...item} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
