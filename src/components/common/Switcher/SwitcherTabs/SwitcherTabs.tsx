"use client";
import style from "./switcherTabs.module.scss";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { ISelectOption } from "@/lib/models/IType";
import { useTranslations } from "next-intl";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";
// import { getTranslations } from "next-intl/server";

interface ISwitcherTabsProps {
    data: ISelectOption[];
}

export const SwitcherTabs: FC<ISwitcherTabsProps> = ({ data }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations("ProfilePage.switcher");
    const [activeTab, setActiveTab] = useState<string | null>(
        searchParams.get(CONSTANT_SEARCH_PARAMS.TAB)
    );

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const tabSearchParam = searchParams.get(CONSTANT_SEARCH_PARAMS.TAB);
        const foundTab = data.find((item) => item.value === tabSearchParam);
        if (foundTab) {
            setActiveTab(tabSearchParam);
        } else {
            const defaultTab = data[0].value;
            params.set(CONSTANT_SEARCH_PARAMS.TAB, defaultTab);
            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
            setActiveTab(defaultTab);
        }
    }, [searchParams, data, pathname, router]);
    const handleChangeSwitch = (option: ISelectOption) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set(CONSTANT_SEARCH_PARAMS.TAB, option.value);

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <>
            <div className={style.switcher}>
                {data.map((item, index) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set(CONSTANT_SEARCH_PARAMS.TAB, item.value);
                    return (
                        <Link
                            key={index}
                            href={`${pathname}?${params.toString()}`}
                            className={
                                style.switcher_item +
                                (activeTab === item.value
                                    ? " " + `${style.active}`
                                    : "")
                            }
                        >
                            {t(`${item.value}`)}
                        </Link>
                    );
                })}
            </div>
            <div className={style.switcher__mob}>
                <SelectCustom
                    options={data}
                    activeOption={activeTab}
                    onChange={handleChangeSwitch}
                />
            </div>
        </>
    );
};
