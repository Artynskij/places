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
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";
import { IPageProps } from "@/lib/models/IType";

import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";

import {
    IEstablishmentFront,
    // ITagClassWithEstablishmentFront,
} from "@/lib/models";
import { useViewTypeList } from "@/lib/context";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";
import { ITagWithEstablishmentFront } from "@/lib/models/frontend/tags/tagWithEstablishment.front";
import { Loader } from "@/components/common/Loader/Loader";
import { usePathname, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        location: string;
        typeEstablishment: TTypesOfEstablishment;
    };
    establishmentList: IEstablishmentFront[];
    blockTags: ITagsBlockFront[];
    locationData: ILocationFront | null;
    tagsClassEstablishment: ITagWithEstablishmentFront[] | null;
    breadcrumbData: ILocationFront[] | null;
}
export default function FilterScreen({
    params,
    searchParams,
    establishmentList,
    blockTags,
    locationData,
    tagsClassEstablishment,
    breadcrumbData,
}: IProps) {
    const [sortActiveItem, setSortActiveItem] = useState(
        mockFilterSort[3].value
    );
    const searchParamsClient = useSearchParams();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false); // Добавляем состояние загрузки
    useEffect(() => {
        setIsLoading(false); // Скрываем лоадер при изменении URL
    }, [pathname, searchParamsClient]);
    const viewType = useViewTypeList();

    const totalEstablishmentCount =
        establishmentList[0]?.location.info.totalEstablishment || 0;
    const baseUrl = useBaseUrl();
    const filteredBreadcrumb =
        breadcrumbData?.slice(1, breadcrumbData.length) || null;
    return (
        <div className="container">
            {isLoading && <Loader />}
            <div className={style.breadcrumb}>
                {filteredBreadcrumb && (
                    <Breadcrumb
                        links={[
                            ...filteredBreadcrumb.map((crumb) => {
                                return {
                                    title: crumb.title,
                                    href: ROUTES.LOCATION.LOCATION(crumb.id),
                                };
                            }),
                            {
                                title: TYPES_OF_ESTABLISHMENT[
                                    params.typeEstablishment
                                ].secondValue,
                            },
                        ]}
                    />
                )}
            </div>
            <div className={style.container}>
                <div className={style.titleBLock}>
                    <div className={style.titleBLock_left}>
                        <h1>
                            {`${
                                TYPES_OF_ESTABLISHMENT[params.typeEstablishment]
                                    ?.secondValue
                            } в ${locationData?.title}`}
                        </h1>
                        <div className={style.titleBLock_result}>
                            {totalEstablishmentCount} результатов
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
                    <Suspense fallback={<Loader />}>
                        <FiltersComponent
                            totalEstablishmentCount={totalEstablishmentCount}
                            dataTags={blockTags}
                            setIsLoading={setIsLoading}
                        />
                    </Suspense>
                </div>
                <div className={style.container_content}>
                    <div className={style.param}>
                        <Suspense fallback={<Loader />}>
                            <ParamComponent
                                setIsLoading={setIsLoading}
                                dataTags={blockTags}
                            />
                        </Suspense>
                    </div>
                    {/* <div className={style.sort}>
                        <span>Сортировать</span>

                        <SelectCustom
                            classNameCtn={style.sort_select}
                            options={mockFilterSort}
                            activeOption={sortActiveItem}
                            onChange={(item) => {
                                setSortActiveItem(item.value);
                            }}
                        />
                    </div> */}
                    {establishmentList.length ? (
                        viewType.typeView === "list" ? (
                            <div className={style.list}>
                                {establishmentList.map((establishment) => {
                                    const tagClass =
                                        tagsClassEstablishment?.find(
                                            (tag) =>
                                                tag.establishmentId ===
                                                establishment.id
                                        );

                                    return (
                                        <CardList
                                            key={establishment.id}
                                            dataEstablishment={establishment}
                                            langUI={params.locale}
                                            locationId={params.location}
                                            baseUrl={baseUrl}
                                            classCount={
                                                tagClass?.tag.count || 0
                                            }
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={style.table}>
                                {establishmentList.map((establishment) => {
                                    const tagClass =
                                        tagsClassEstablishment?.find(
                                            (tag) =>
                                                tag.establishmentId ===
                                                establishment.id
                                        );
                                    return (
                                        <CardSliderMainPage
                                            key={establishment.id}
                                            langUI={params.locale}
                                            dataEstablishment={establishment}
                                            locationId={params.location}
                                            baseUrl={baseUrl}
                                            classCount={
                                                tagClass?.tag.count || 0
                                            }
                                        />
                                    );
                                })}
                            </div>
                        )
                    ) : (
                        <div>
                            По данным характеристикам заведений не найдено
                        </div>
                    )}
                    {totalEstablishmentCount > 30 && (
                        <PaginationAnt
                            pageSize={30}
                            defaultPage={30}
                            totalCount={totalEstablishmentCount}
                            setIsLoading={setIsLoading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
