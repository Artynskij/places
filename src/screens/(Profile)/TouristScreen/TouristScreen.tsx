// "use client";
import style from "./touristScreen.module.scss";

import { IBasePageProps } from "@/lib/models";
import UserComponent from "./_components/UserComponent";

import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

import {
    CONSTANT_TABS,
    SWITCHER_TOURIST,
} from "@/asset/constants/front-database/switcher-tabs-page.data";
import { TabReview } from "@/components/common/Tabs/profile/TabReview/TabReview";
import { TabVideo } from "@/components/common/Tabs/profile/TabVideo/TabVideo";
import { TabPhoto } from "@/components/common/Tabs/profile/TabPhoto/TabPhoto";
import { TabPublication } from "@/components/common/Tabs/profile/TabPublication/TabPublication";

import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import { TabEstablishmentCreated } from "@/components/common/Tabs/profile/TabEstablishment/TabEstablishmentCreated";
import { TabFavoritesTourist } from "@/components/common/Tabs/profile/TabFavoritesTourist/TabFavoritesTourist";

import TabTravelMap from "@/components/common/Tabs/profile/TabTravelMap/TabTravelMap";

interface IProps
    extends IBasePageProps<
        {
            username: string;
        },
        { tab: string }
    > {}
export default function TouristScreen({ params, searchParams }: IProps) {
    // const searchParams = useSearchParams();
    // const tab = searchParams.get("tab");
    const tab = searchParams?.tab;
    return (
        <AuthGuard roles={["tourist"]}>
            <div className="container">
                <section className={style.user}>
                    <UserComponent />
                </section>
                <section className={style.content}>
                    <div className={style.switcher}>
                        <SwitcherTabs
                            // activeTab={activeTab}
                            // setActiveTab={setActiveTab}
                            data={SWITCHER_TOURIST}
                        />
                    </div>
                    <div className={style.switcher_content}>
                        {tab === CONSTANT_TABS.tourist.publication ? (
                            <TabPublication />
                        ) : tab === CONSTANT_TABS.tourist.photos ? (
                            <TabPhoto />
                        ) : tab === CONSTANT_TABS.tourist.videos ? (
                            <TabVideo />
                        ) : tab === CONSTANT_TABS.tourist.reviews ? (
                            <TabReview />
                        ) : tab === CONSTANT_TABS.tourist.establishments ? (
                            <TabEstablishmentCreated />
                        ) : tab === CONSTANT_TABS.tourist.favorites ? (
                            <TabFavoritesTourist />
                        ) : tab === CONSTANT_TABS.tourist.travelMap ? (
                            <TabTravelMap />
                        ) : (
                            <div>это невозможно</div>
                        )}
                    </div>
                </section>
            </div>
        </AuthGuard>
    );
}
