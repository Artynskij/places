"use client";

import { switcherFinderMainPage } from "@/asset/constants/switcherTabsPage";
import { Switcher } from "@/components/common/Switcher/Switcher";
import style from "./switcherSearchPage.module.scss";
import { TTypesOfSearchKey } from "@/lib/models/common/TTypesGlobal";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
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
    const switcherDataStart = switcherFinderMainPage;
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
