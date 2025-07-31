"use client";
import {
    redirect,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import style from "./settings.module.scss";

import { switcherSettingsTourist } from "@/asset/constants/switcherTabsPage";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { ROUTES } from "@/lib/config/Routes";

import { FormSettingsTourist } from "@/components/common/Form/Settings/FormSettingsTourist";
import { FormNotificationTourist } from "@/components/common/Form/Settings/FormNotificationTourist";
import { IPageProps } from "@/lib/models";
interface IProps extends IPageProps {
    params: IPageProps["params"] & {};
    searchParams: IPageProps["searchParams"] & {
        tab: "personal" | "notification";
    };
}
export const TouristSettingsScreen = ({ searchParams }: IProps) => {
    if (!searchParams.tab) {
        redirect(ROUTES.PROFILE.SETTINGS("tourist", "personal"));
    }
    const tabPersonal = searchParams.tab === "personal";
    return (
        <div className={style.page}>
            <Breadcrumb
                links={[
                    {
                        title: "Личный кабинет",
                        href: ROUTES.PROFILE.TOURIST("sherlock_bones"),
                    },
                    { title: tabPersonal ? "Настройки" : "Уведомления" },
                ]}
            />
            {/* <h3>
                {tabPersonal
                    ? "Настройки персональных данных"
                    : "Настройки уведомлений"}
            </h3> */}

            <div className={style.switcher_content}>
                {tabPersonal ? (
                    <FormSettingsTourist />
                ) : (
                    <FormNotificationTourist />
                )}
            </div>
        </div>
    );
};
