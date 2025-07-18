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
import TabNotification from "../tabs/TabNotofication/TabNotification";

export const TouristSettingsScreen = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    return (
        <div className={style.page}>
            <Breadcrumb
                links={[
                    {
                        title: "Личный кабинет",
                        href: ROUTES.PROFILE.TOURIST("sherlock_bones"),
                    },
                    { title: "Настройки" },
                ]}
            />
            <h3>Настройки профиля Туриста</h3>
            <div className={style.switcher}>
                <SwitcherTabs data={switcherSettingsTourist} />
            </div>

            <div className={style.switcher_content}>
                {searchParams.get("tab") === "personal" ? (
                    <TabPersonal></TabPersonal>
                ) : searchParams.get("tab") === "notification" ? (
                    <TabNotification></TabNotification>
                ) : (
                    "этого не должно было случиться"
                )}
            </div>
        </div>
    );
};
