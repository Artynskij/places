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
import { ITagsBlockFront } from "@/lib/models/frontend/tags/tagsBlock.front";
import { Loader } from "@/components/common/Loader/Loader";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
import { IEstablishmentFront, ITagWithEstablishmentFront } from "@/lib/models";

interface IFilterComponentProp {
    establishmentList: IEstablishmentFront[];
    dataTags?: ITagsBlockFront[];
    totalEstablishmentCount: number;
    setIsLoading: (state: boolean) => void;
    tagsClassEstablishment: ITagWithEstablishmentFront[] | null;
}

const FiltersComponent = ({
    establishmentList,
    dataTags,
    totalEstablishmentCount,
    setIsLoading,
    tagsClassEstablishment
}: IFilterComponentProp) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // const [isLoading, setIsLoading] = useState(false); // Добавляем состояние загрузки
    const [filterActiveMobile, setFilterActiveMobile] = useState(false);
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    useEffect(() => {
        const filterValues =
            searchParams.get(CONSTANT_SEARCH_PARAMS.FILTER)?.split("%") || [];
        setCheckedValues(filterValues);
    }, [searchParams]);

    const onChangeFilter: GetProp<typeof Checkbox.Group, "onChange"> = (
        checkedValues
    ) => {
        setIsLoading(true); // Показываем лоадер перед навигацией

        const params = new URLSearchParams(searchParams.toString());
        if (checkedValues.length === 0) {
            params.delete(CONSTANT_SEARCH_PARAMS.FILTER);
        } else {
            params.set(CONSTANT_SEARCH_PARAMS.FILTER, checkedValues.join("%"));
        }
        params.delete(CONSTANT_SEARCH_PARAMS.PAGE);
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
        <div>
            <div className={style.filter_map}>
                <PopupMap tagsClassEstablishment={tagsClassEstablishment || null}  establishmentList={establishmentList}/>
            </div>
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
                    style.filter +
                    " " +
                    (filterActiveMobile && ` ${style.active}`)
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
                            defaultValue={searchParams
                                .get(CONSTANT_SEARCH_PARAMS.FILTER)
                                ?.split("%")}
                            onChange={onChangeFilter}
                        >
                            {dataTags?.map((item) => {
                                return (
                                    <BlockCheckBox
                                        checkedValues={checkedValues}
                                        key={item.groupKey.id}
                                        tagsGroup={item}
                                    />
                                );
                            })}
                        </Checkbox.Group>
                    </div>
                    <div className={style.filter_buttonGroup}>
                        <Button
                            onClick={handlerCloseFilter}
                            text={`Показать ${
                                totalEstablishmentCount || 0
                            } совпадений`}
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
            <Overlay
                active={filterActiveMobile}
                setActive={setFilterActiveMobile}
            />
        </div>
    );
};

export default FiltersComponent;
