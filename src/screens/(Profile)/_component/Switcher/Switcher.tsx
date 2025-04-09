"use client";
import style from "./switcher.module.scss";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

import { SelectCustom } from "@/components/UI/SelectCustom/SelectCustom";
import { ISelectOption } from "@/lib/models/IType";
import { useTranslations } from "next-intl";
// import { getTranslations } from "next-intl/server";

interface ISwitcherProfileContentProps {
    data: ISelectOption[];
    // activeTab: string | null;
    // setActiveTab: (value: string | null) => void;
}

export const SwitcherProfileContent: FC<ISwitcherProfileContentProps> = ({
    data,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations("ProfilePage.switcher");
    const [activeTab, setActiveTab] = useState<string | null>(
        searchParams.get("tab")
    );

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab) {
            setActiveTab(tab);
        } else {
            const defaultTab = data[0].value;
            router.push(`${pathname}?tab=${defaultTab}`, { scroll: false });
            setActiveTab(defaultTab);
        }
    }, [searchParams, data, pathname, router]);
    const handleChangeSwitch = (option: ISelectOption) => {
        router.push(`${pathname}?tab=${option.value}`, { scroll: false });
    };

    return (
        <>
            <div className={style.switcher}>
                {data.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            href={`${pathname}?tab=${item.value}`}
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
