"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./contentComponent.module.scss";

import { switcherTabOwnerData } from "@/asset/constants/switcherTabsPage";

import { TabMarketingOwner } from "../../_component/Tabs/TabMarketingOwner/TabMarketingOwner";
import { TabHistoryOwner } from "../../_component/Tabs/TabHistoryOwner/TabHistoryOwner";
import { TabStatOwner } from "../../_component/Tabs/TabStatOwner/TabStatOwner";
import { TabWalletOwner } from "../../_component/Tabs/TabWalletOwner/TabWalletOwner";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import TabBusinessOwner from "../../_component/Tabs/TabBusinessOwner/TabBusinessOwner";
import TabEstablishmentCreated from "@/screens/(Profile)/_component/Tabs/TabEstablishment/TabEstablishmentCreated";

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
                    <TabEstablishmentCreated></TabEstablishmentCreated>
                ) : searchParams.get("tab") === "marketing" ? (
                    <TabMarketingOwner></TabMarketingOwner>
                ) : searchParams.get("tab") === "history" ? (
                    <TabHistoryOwner></TabHistoryOwner>
                ) : searchParams.get("tab") === "stat" ? (
                    <TabStatOwner></TabStatOwner>
                ) : searchParams.get("tab") === "business" ? (
                    <TabBusinessOwner></TabBusinessOwner>
                ) : (
                    <TabWalletOwner></TabWalletOwner>
                )}
            </div>
        </>
    );
};
export default ContentComponent;
