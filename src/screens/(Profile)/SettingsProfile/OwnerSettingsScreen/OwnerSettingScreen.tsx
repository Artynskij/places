"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "../settings.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    switcherSettingsOwner,
    switcherSettingsTourist,
    switcherTabOwnerData,
} from "@/asset/constants/switcherTabsPage";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { ROUTES } from "@/lib/config/Routes";
import TabPersonal from "../tabs/TabPersonal/TabPersonal";
import TabBusiness from "../tabs/TabBusiness/TabBusiness";

export const OwnerSettingsScreen = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            <h3>Настройки профиля владельца</h3>
            <div className={style.switcher}>
                <SwitcherTabs data={switcherSettingsOwner} />
            </div>

            <div className={style.switcher_content}>
                {searchParams.get("tab") === "personal" ? (
                    <TabPersonal></TabPersonal>
                ) : searchParams.get("tab") === "business" ? (
                    <TabBusiness></TabBusiness>
                ) : (
                    "этого не должно было случиться"
                )}
            </div>
        </>
    );
};
