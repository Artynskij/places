"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";
import { useState } from "react";

import { SwitcherProfileContent } from "../../../_component/Switcher/Switcher";
import {
    switcherTabTouristData,
    switcherTabUserData,
} from "@/asset/constants/switcherTabsPage";
import TabReview from "@/screens/(Profile)/_component/Tabs/TabReview/TabReview";
import TabTravelMap from "@/screens/(Profile)/_component/Tabs/TabTravelMap/TabTravelMap";
import TabVideo from "@/screens/(Profile)/_component/Tabs/TabVideo/TabVideo";
import TabPhoto from "@/screens/(Profile)/_component/Tabs/TabPhoto/TabPhoto";
import TabPublication from "@/screens/(Profile)/_component/Tabs/TabPublication/TabPublication";
import { mockTourist } from "@/asset/mockData/mockTourist";
interface IContentComponent {
    dataUser: (typeof mockTourist)[0];
}
export const ContentComponent = ({ dataUser }: IContentComponent) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            <div className={style.switcher}>
                <SwitcherProfileContent
                    // activeTab={activeTab}
                    // setActiveTab={setActiveTab}
                    data={switcherTabTouristData}
                />
            </div>
            <div className={style.switcher_content}>
                {searchParams.get("tab") === "publications" ? (
                    <TabPublication></TabPublication>
                ) : searchParams.get("tab") === "photos" ? (
                    <TabPhoto></TabPhoto>
                ) : searchParams.get("tab") === "videos" ? (
                    <TabVideo></TabVideo>
                ) : searchParams.get("tab") === "reviews" ? (
                    <TabReview dataUser={dataUser}></TabReview>
                ) : (
                    <TabTravelMap></TabTravelMap>
                )}
            </div>
        </>
    );
};
