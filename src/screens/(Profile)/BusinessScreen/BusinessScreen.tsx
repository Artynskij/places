"use client";
import { AuthGuard } from "@/components/common/Auth/guards/AuthGuard";
import ContentComponent from "./ContentComponent";
import UserComponent from "./UserComponent";
import style from "./businessScreen.module.scss";

import { IBusinessFront, IPageProps } from "@/lib/models";
import { useLocale, useTranslations } from "next-intl";

import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { BusinessService } from "@/lib/Api/business/business.service";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/context/UserContext/UserContext";

import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";
import { Button } from "@/components/UI/Button/Button";
import { IconEdit } from "@/components/common/Icons";
import { getFormatDate } from "@/lib/helpers/getFormatDate";
import { Loader } from "@/components/common/Loader/Loader";
import { useNotification } from "@/lib/context";
import Image from "next/image";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        business: string;
    };
}

function BusinessScreenBase({ params, searchParams }: IProps) {
    const t = useTranslations("ProfilePage.header");
    const { user } = useUser();
    const locale = useLocale();
    const notification = useNotification();
    const personService = new PersonService();
    const businessService = new BusinessService();

    const [businessData, setBusinessData] = useState<IBusinessFront>();
    useEffect(() => {
        if (!user) {
            notification.error({ message: "user нету?????" });
            return;
        }
        businessService.getBusinessById(params.business).then((res) => {
            if (res) {
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
                <ContentComponent business={businessData} />
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
