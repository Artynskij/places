"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./settings.module.scss";

import { switcherSettingsTourist } from "@/asset/constants/switcherTabsPage";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { ROUTES } from "@/lib/config/Routes";


import { FormSettingsTourist } from "@/components/common/Form/Settings/FormSettingsTourist";
import { FormNotificationTourist } from "@/components/common/Form/Settings/FormNotificationTourist";

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
                    <FormSettingsTourist />
                ) : searchParams.get("tab") === "notification" ? (
                    <FormNotificationTourist/>
                ) : (
                    "этого не должно было случиться"
                )}
            </div>
        </div>
    );
};
