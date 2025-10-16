"use client";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";

import style from "./businessScreen.module.scss";

import { IBusinessFront, IBasePageProps } from "@/lib/models";
import { useTranslations } from "next-intl";

import { BusinessService } from "@/lib/Api/business/business.service";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/context/UserContext/UserContext";

import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";
import { Button } from "@/components/UI/Button/Button";
import { IconEdit } from "@/components/common/Icons";

import { Loader } from "@/components/common/Loader/Loader";
import { useNotification } from "@/lib/context";
import Image from "next/image";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { SwitcherTabs } from "@/components/common/Switcher/SwitcherTabs/SwitcherTabs";
import {
    CONSTANT_TABS,
    SWITCHER_BUSINESS,
} from "@/asset/constants/front-database/switcher-tabs-page.data";
import { TabMarketingOwner } from "@/components/common/Tabs/profile/TabMarketingOwner/TabMarketingOwner";
import { TabHistoryOwner } from "@/components/common/Tabs/profile/TabHistoryOwner/TabHistoryOwner";
import { TabStatOwner } from "@/components/common/Tabs/profile/TabStatOwner/TabStatOwner";
import { TabEmployees } from "@/components/common/Tabs/profile/TabEmployeesBusiness/TabEmployees";
import { TabWalletOwner } from "@/components/common/Tabs/profile/TabWalletOwner/TabWalletOwner";
interface IProps
    extends IBasePageProps<{ business: string }, { tab: string }> {}

function BusinessScreenBase({ params, searchParams }: IProps) {
    const t = useTranslations("ProfilePage.header");
    const { user } = useUser();
    const activeTab = searchParams?.tab;
    const notification = useNotification();

    const businessService = new BusinessService();

    const [businessData, setBusinessData] = useState<IBusinessFront>();
    useEffect(() => {
        if (!user) {
            notification.error({ message: "user нету?????" });
            return;
        }
        businessService.getById(params.business).then((res) => {
            if (res) {
                console.log(res);
                setBusinessData(res);
            } else {
                notification.error({ message: "нету бизнеса" });
            }
        });
    }, []);

    if (!user) return null;
    if (!businessData) return <Loader />;
    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb
                    links={[
                        {
                            title: "личный кабинет",
                            href: ROUTES.PROFILE.OWNER(user.id),
                        },
                        {
                            title: "кабинет бизнеса",
                        },
                    ]}
                />
            </div>

            <div className={style.user}>
                <>
                    <div className={style.background}>
                        <Image
                            className={style.background_img}
                            width={1920}
                            height={1200}
                            src="/mock/profileBackgroundMock.jpg"
                            alt="background"
                        />
                    </div>
                    <div className={style.middle}>
                        {/* <div className={style.middle_avatar}>
                            <Image
                                className={style.middle_avatar_img}
                                width={96}
                                height={96}
                                src={
                                    user.avatar.ownerImageSrc ||
                                    CONSTANT_DEFAULT_AVATAR_URL
                                }
                                alt="avatar"
                            />
                        </div> */}
                        <h2>{businessData?.OfficialName}</h2>
                        <div className={style.middle_edit}>
                            <Link
                                href={ROUTES.PROFILE.SETTINGS.BUSINESS(
                                    businessData.Id
                                )}
                            >
                                <Button
                                    text={t("editProfile")}
                                    className={style.middle_edit_button}
                                    icon={
                                        <IconEdit
                                            className={
                                                style.middle_edit_button_icon
                                            }
                                        />
                                    }
                                    type="light"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <span className={style.bottom_mail}>
                            {businessData.Contacts?.Email}
                        </span>
                        <span className={style.bottom_date}>
                            {`День регистрации: ${
                                businessData.RegistrationDate
                                    ? businessData.RegistrationDate
                                    : "не указана"
                            }`}
                        </span>
                    </div>
                </>
            </div>
            <div className={style.content}>
                <div className={style.switcher}>
                    <SwitcherTabs data={SWITCHER_BUSINESS} />
                </div>

                <div className={style.switcher_content}>
                    {activeTab === CONSTANT_TABS.business.marketing ? (
                        <TabMarketingOwner />
                    ) : activeTab === CONSTANT_TABS.business.history ? (
                        <TabHistoryOwner />
                    ) : activeTab === CONSTANT_TABS.business.stat ? (
                        <TabStatOwner />
                    ) : activeTab === CONSTANT_TABS.business.employees ? (
                        <TabEmployees business={businessData} />
                    ) : (
                        <TabWalletOwner />
                    )}
                </div>
            </div>
        </div>
    );
}
const BusinessScreen = ({ params, searchParams }: IProps) => {
    return (
        <AuthGuard roles={["owner"]}>
            <BusinessScreenBase params={params} searchParams={searchParams} />
        </AuthGuard>
    );
};
export default BusinessScreen;
