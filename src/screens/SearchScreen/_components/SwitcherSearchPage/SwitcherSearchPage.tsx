"use client";

import { SWITCHER_FINER_MAIN_PAGE } from "@/asset/constants/front-database/switcher-tabs-page.data";
import { Switcher } from "@/components/common/Switcher/Switcher";
import style from "./switcherSearchPage.module.scss";
import { TTypesOfSearchKey } from "@/lib/models/types/TTypesGlobal";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/search-params.const";
import { useState } from "react";
const SwitcherSearchPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchQueryInput = searchParams.get(
        CONSTANT_SEARCH_PARAMS.SEARCH
    ) as string;
    const searchQueryIndexSearch = searchParams
        .get(CONSTANT_SEARCH_PARAMS.INDEX_SEARCH)
        ?.toLocaleUpperCase();

    const handleSwitcherChange = (value: TTypesOfSearchKey) => {
        if (value == "all") {
            router.push(ROUTES.SEARCH(searchQueryInput));
        } else {
            router.push(
                ROUTES.SEARCH(searchQueryInput, value.toLocaleLowerCase())
            );
        }
    };
    const switcherDataStart = SWITCHER_FINER_MAIN_PAGE;
    return (
        <Switcher
            callBack={({ value }) =>
                handleSwitcherChange(value as TTypesOfSearchKey)
            }
            data={switcherDataStart.map((item) => ({
                ...item,
                active: item.value === (searchQueryIndexSearch || "all"),
            }))}
            classnameSwitcher={style.switcher}
            classnameSwitcher_list={style.switcher_list}
            classnameSwitcher_item={style.switcher_item}
        />
    );
};

export default SwitcherSearchPage;
