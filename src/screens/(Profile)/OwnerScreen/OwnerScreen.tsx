"use client";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

import UserComponent from "./_components/UserComponent";
import style from "./ownerScreen.module.scss";

import {
    CONSTANT_TABS,
    switcherTabOwnerData,
} from "@/asset/constants/switcherTabsPage";

import {TabEstablishmentCreated} from "@/components/common/Tabs/profile/TabEstablishment/TabEstablishmentCreated";
import { IBasePageProps } from "@/lib/models";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { TabMarketingOwner } from "@/components/common/Tabs/profile/TabMarketingOwner/TabMarketingOwner";
import { TabHistoryOwner } from "@/components/common/Tabs/profile/TabHistoryOwner/TabHistoryOwner";
import { TabStatOwner } from "@/components/common/Tabs/profile/TabStatOwner/TabStatOwner";
import TabBusinessOwner from "@/components/common/Tabs/profile/TabBusinessOwner/TabBusinessOwner";
import { TabWalletOwner } from "@/components/common/Tabs/profile/TabWalletOwner/TabWalletOwner";
interface IProps
    extends IBasePageProps<
        {
            username: string;
        },
        { tab: string }
    > {}

export default function OwnerScreen({ params, searchParams }: IProps) {
    const tab = searchParams?.tab;
    return (
        <AuthGuard roles={["owner"]}>
            <div className="container">
                <div className={style.user}>
                    <UserComponent />
                </div>
                <div className={style.content}>
                    <div className={style.switcher}>
                        <SwitcherTabs data={switcherTabOwnerData} />
                    </div>

                    <div className={style.switcher_content}>
                        {tab === CONSTANT_TABS.owner.establishments ? (
                            <TabEstablishmentCreated></TabEstablishmentCreated>
                        )  : tab === CONSTANT_TABS.owner.business ? (
                            <TabBusinessOwner></TabBusinessOwner>
                        ) : (
                            <div>этого не могло произойти</div>
                        )}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
