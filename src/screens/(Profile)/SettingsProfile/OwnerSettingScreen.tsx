"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./settings.module.scss";

import { switcherSettingsOwner } from "@/asset/constants/switcherTabsPage";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";

import { FormSettingsTourist } from "@/components/common/Form/Settings/FormSettingsTourist";
import { FormSettingsOwner } from "@/components/common/Form/Settings/FormSettingsOwner";

import { ROUTES } from "@/lib/config/Routes";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { Loader } from "@/components/common/Loader/Loader";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

export const OwnerSettingsScreen = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user } = useUser();
    if (!user) return <Loader />;
    return (
        <AuthGuard roles={["owner"]}>
            <div className={style.page}>
                <Breadcrumb
                    links={[
                        {
                            title: "Личный кабинет",
                            href: ROUTES.PROFILE.OWNER(user.id),
                        },
                        { title: "Настройки" },
                    ]}
                />
                <h2>Данные профиля законного представителя</h2>

                <FormSettingsOwner />
            </div>
        </AuthGuard>
    );
};
