"use client";
import {
    redirect,
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation";
import style from "./settings.module.scss";

import { SWITCHER_SETTINGS_TOURIST } from "@/asset/constants/front-database/switcher-tabs-page.data";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { ROUTES } from "@/lib/config/Routes";

import { FormSettingsTourist } from "@/components/common/Form/Settings/FormSettingsTourist";
import { FormNotificationTourist } from "@/components/common/Form/Settings/FormNotificationTourist";
import { IBasePageProps } from "@/lib/models";
import { Loader } from "@/components/common/Loader/Loader";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";
interface IProps
    extends IBasePageProps<
        {
            username: string;
        },
        {
            tab: "personal" | "notification";
        }
    > {}
export const TouristSettingsScreen = ({ params, searchParams }: IProps) => {
    if (!searchParams?.tab) {
        redirect(ROUTES.PROFILE.SETTINGS.TOURIST(params.username, "personal"));
    }
    const tabPersonal = searchParams.tab === "personal";
    const { user } = useUser();
    if (!user) return <Loader />;
    return (
        <AuthGuard roles={["tourist"]}>
            <div className={style.page}>
                <Breadcrumb
                    links={[
                        {
                            title: "Личный кабинет",
                            href: ROUTES.PROFILE.TOURIST(user.id),
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
        </AuthGuard>
    );
};
