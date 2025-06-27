"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { switcherSettingsOwner, switcherTabOwnerData } from "@/asset/constants/switcherTabsPage";

import TabPersonal from "./TabPersonal/TabPersonal";
import TabBusiness from "./TabBusiness/TabBusiness";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";



const ContentComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            <div className={style.switcher}>
                <SwitcherTabs data={switcherSettingsOwner} />
            </div>

            <div className={style.switcher_content}>
                {searchParams.get("tab") === "personal" ? (
                    <TabPersonal></TabPersonal>
                ) : searchParams.get("tab") === "business" ? (
                    <TabBusiness></TabBusiness>
                ) :(
                    'этого не должно было случиться'
                )}
            </div>
        </>
    );
};
export default ContentComponent;
