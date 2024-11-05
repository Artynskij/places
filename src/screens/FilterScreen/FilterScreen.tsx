"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import style from "./filterScreen.module.scss";

import { SliderFilterComponent } from "./_components/ContentComponent/SliderFilterComponent/SliderFilterComponent";
import { FiltersComponent } from "./_components/FilterComponent/FilterComponent";
import { ParamComponent } from "./_components/ContentComponent/ParamComponent/ParamComponent";

import { mockFilterSliderCard } from "@/asset/mockData/mockFilterSlider";
import { mockObjectsHotels } from "@/asset/mockData/mockObject";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { CardSliderMainPage } from "@/components/common/Cards";
import { Button } from "@/components/UI/Button/Button";

import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { setViewType } from "@/store/slices/typeViewListSlice";
import { CardList } from "@/components/common/Cards/CardList/CardList";
import { Switcher } from "@/components/common/Switcher/Switcher";

export default function FilterScreen({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
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
