"use client";
import { Suspense, useEffect, useState } from "react";

import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import style from "./filterScreen.module.scss";

import FiltersComponent from "./_components/FilterComponent/FilterComponent";
import ParamComponent from "./_components/ContentComponent/ParamComponent/ParamComponent";

import { PaginationAnt } from "@/components/common/Pagination/PaginationAnt";
import { CardSliderMainPage } from "@/components/common/Cards";
import { CardList } from "@/components/common/Cards/CardList/CardList";
import { Switcher } from "@/components/common/Switcher/Switcher";
import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";

import { mockFilterSort } from "@/asset/mockData/mockFilterSort";

import { IPageProps } from "@/lib/models/IType";

import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";

import { IEstablishmentFront } from "@/lib/models";
import { useViewTypeList } from "@/lib/context";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {};
    dataEstablishment: IEstablishmentFront[];
    blockTags: ITagsBlockFront[];
}
export default function FilterScreen({
    params,
    searchParams,
    dataEstablishment,
    blockTags,
}: IProps) {
    const [sortActiveItem, setSortActiveItem] = useState(
        mockFilterSort[3].value
    );
    const viewType = useViewTypeList();

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
                            {dataEstablishment.length} результатов
                        </div>
                    </div>
                    <div className={style.titleBLock_groupButton}>
                        <Switcher
                            data={viewType.viewData}
                            callBack={() => viewType.toggleType()}
                        />
                    </div>
                </div>
                <div id={"filter"} className={style.container_filter}>
                    <Suspense fallback={null}>
                        <FiltersComponent dataTags={blockTags} />
                    </Suspense>
                </div>
                <div className={style.container_content}>
                    <div className={style.param}>
                        <Suspense fallback={null}>
                            <ParamComponent dataTags={blockTags} />
                        </Suspense>
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
                    {viewType.typeView === "list" ? (
                        <div className={style.list}>
                            {dataEstablishment.map((establishment) => {
                                return (
                                    <CardList
                                        key={establishment.id}
                                        dataEstablishment={establishment}
                                        langUI={params.locale}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className={style.table}>
                            {dataEstablishment.map((establishment) => {
                                return (
                                    <CardSliderMainPage
                                        key={establishment.id}
                                        langUI={params.locale}
                                        dataEstablishment={establishment}
                                    />
                                );
                            })}
                        </div>
                    )}

                    <PaginationAnt
                        pageSize={30}
                        defaultPage={30}
                        totalCount={90}
                    />
                </div>
            </div>
        </div>
    );
}
