"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./businessScreen.module.scss";

import { switcherTabBusinessData } from "@/asset/constants/switcherTabsPage";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import TabEstablishmentCreated from "../_component/Tabs/TabEstablishment/TabEstablishmentCreated";
import { TabMarketingOwner } from "../_component/Tabs/TabMarketingOwner/TabMarketingOwner";
import { TabHistoryOwner } from "../_component/Tabs/TabHistoryOwner/TabHistoryOwner";
import { TabStatOwner } from "../_component/Tabs/TabStatOwner/TabStatOwner";
import TabBusinessOwner from "../_component/Tabs/TabBusinessOwner/TabBusinessOwner";
import { TabWalletOwner } from "../_component/Tabs/TabWalletOwner/TabWalletOwner";

const ContentComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <>
            <div className={style.switcher}>
                <SwitcherTabs data={switcherTabBusinessData} />
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
                ) : (
                    <TabWalletOwner></TabWalletOwner>
                )}
            </div>
        </>
    );
};
export default ContentComponent;
