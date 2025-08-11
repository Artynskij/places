"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";

import { switcherTabOwnerData } from "@/asset/constants/switcherTabsPage";

import { TabMarketingOwner } from "./TabMarketingOwner/TabMarketingOwner";
import { TabHistoryOwner } from "./TabHistoryOwner/TabHistoryOwner";
import { TabStatOwner } from "./TabStatOwner/TabStatOwner";
import { TabWalletOwner } from "./TabWalletOwner/TabWalletOwner";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import TabBusinessOwner from "./TabBussinessOwner/TabBusinessOwner";
import TabEstablishment from "@/screens/(Profile)/_component/Tabs/TabEstablishment/TabEstablishment";

const ContentComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            <div className={style.switcher}>
                <SwitcherTabs data={switcherTabOwnerData} />
            </div>

            <div className={style.switcher_content}>
                {searchParams.get("tab") === "object" ? (
                    <TabEstablishment></TabEstablishment>
                ) : searchParams.get("tab") === "marketing" ? (
                    <TabMarketingOwner></TabMarketingOwner>
                ) : searchParams.get("tab") === "history" ? (
                    <TabHistoryOwner></TabHistoryOwner>
                ) : searchParams.get("tab") === "stat" ? (
                    <TabStatOwner></TabStatOwner>
                ) :searchParams.get("tab") === "business" ? (
                    <TabBusinessOwner></TabBusinessOwner>
                ) : (
                    <TabWalletOwner></TabWalletOwner>
                )}
            </div>
        </>
    );
};
export default ContentComponent;
