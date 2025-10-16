"use client";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

import UserComponent from "./_components/UserComponent";
import style from "./ownerScreen.module.scss";

import {
    CONSTANT_TABS,
    SWITCHER_OWNER,
} from "@/asset/constants/front-database/switcher-tabs-page.data";

import { TabEstablishmentCreated } from "@/components/common/Tabs/profile/TabEstablishment/TabEstablishmentCreated";
import { IBasePageProps } from "@/lib/models";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";

import { TabBusinessOwner } from "@/components/common/Tabs/profile/TabBusinessOwner/TabBusinessOwner";

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
                        <SwitcherTabs data={SWITCHER_OWNER} />
                    </div>

                    <div className={style.switcher_content}>
                        {tab === CONSTANT_TABS.owner.establishments ? (
                            <TabEstablishmentCreated></TabEstablishmentCreated>
                        ) : tab === CONSTANT_TABS.owner.business ? (
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
