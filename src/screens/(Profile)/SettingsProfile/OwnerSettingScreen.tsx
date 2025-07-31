"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./settings.module.scss";

import { switcherSettingsOwner } from "@/asset/constants/switcherTabsPage";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";

import { FormSettingsTourist } from "@/components/common/Form/Settings/FormSettingsTourist";
import { FormSettingsOwner } from "@/components/common/Form/Settings/FormSettingsOwner";

export const OwnerSettingsScreen = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
       <div className={style.page}>
            <h2>Настройки профиля владельца</h2>

            <FormSettingsOwner />
        </div>
    );
};
