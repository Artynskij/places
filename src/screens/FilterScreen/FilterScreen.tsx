"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import style from "./filterScreen.module.scss";

import FiltersComponent from "./_components/FilterComponent/FilterComponent";
import ParamComponent from "./_components/ContentComponent/ParamComponent/ParamComponent";

import { mockObjectsHotels } from "@/asset/mockData/mockObject";

import { CardSliderMainPage } from "@/components/common/Cards";

import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { setViewType } from "@/store/slices/typeViewListSlice";
import { CardList } from "@/components/common/Cards/CardList/CardList";
import { Switcher } from "@/components/common/Switcher/Switcher";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { mockFilterSort } from "@/asset/mockData/mockFilterSort";
import { useEffect, useState } from "react";
import { IPageProps } from "@/models/IType";
import {
  IApiEstablishmentsResponse,
  IApiTag,
  IApiTagsResponse,
} from "@/Api/IApi";
import { Pagination, PaginationProps } from "antd";
import { IMockBlock } from "@/asset/mockData/mockFilterCheckBox";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {};
  dataEstablishment: IApiEstablishmentsResponse;
  dataOfTags: any;
  dataTest: any;
}
export default function FilterScreen({
  params,
  searchParams,
  dataEstablishment,
  dataOfTags,
  dataTest,
}: IProps) {
  const [sortActiveItem, setSortActiveItem] = useState(mockFilterSort[3].value);
  const dispatch = useAppDispatch();
  const viewType = useSelector((state: RootState) => state.viewTypeSlice);
  const handlerSwitcher = (view: { title: string; value: string }) => {
    dispatch(setViewType(view.value as "list" | "table"));
  };
  useEffect(() => {
    console.log("mounted");

    console.log(dataOfTags);
    console.log(dataTest);
  }, []);
  return (
    <div className="container">
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <div className={style.container}>
        <div className={style.titleBLock}>
          <div className={style.titleBLock_left}>
            <h1>Где остановиться в Казахстане</h1>
            <div className={style.titleBLock_result}>
              {dataEstablishment.establishmentItems.length} результатов
            </div>
          </div>
          <div className={style.titleBLock_groupButton}>
            <Switcher data={viewType.viewData} callBack={handlerSwitcher} />
          </div>
        </div>
        <div id={"filter"} className={style.container_filter}>
          <FiltersComponent dataTags={dataOfTags} />
        </div>
        <div className={style.container_content}>
          <div className={style.param}>
            <ParamComponent dataTags={dataOfTags} />
          </div>
          <div className={style.sort}>
            <span>Сортировать</span>

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
              {dataEstablishment.establishmentItems.map((item) => {
                return (
                  <CardList
                    cdnName={dataEstablishment.cdnHost}
                    key={item.establishment.Id}
                    data={item}
                    langUI={params.locale}
                  />
                );
              })}
            </div>
          ) : (
            <div className={style.table}>
              {dataEstablishment.establishmentItems.map((item) => {
                return (
                  <CardSliderMainPage
                    langUI={params.locale}
                    cdnName={dataEstablishment.cdnHost}
                    data={item}
                    key={item.establishment.Id}
                  />
                );
              })}
            </div>
          )}

          <>
            <Pagination
              // showSizeChanger
              // onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
            />
            {/* <br />
            <Pagination
              showSizeChanger
              // onShowSizeChange={onShowSizeChange}
              defaultCurrent={3}
              total={500}
              disabled
            /> */}
          </>
        </div>
      </div>
    </div>
  );
}
