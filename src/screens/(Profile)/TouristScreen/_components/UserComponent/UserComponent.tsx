"use client";
import { Button } from "@/components/UI/Button/Button";
import style from "./userComponent.module.scss";

import Image from "next/image";
import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import { mockTourist } from "@/asset/mockData/mockTourist";
import { data } from "@maptiler/sdk";
import Link from "next/link";

import { SubscribeButton } from "@/components/common/ButtonFunctional/SubsribeButton";
import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import {
    IconEdit,
    IconEye,
    IconPerson,
    IconSettings,
} from "@/components/common/Icons";
import { ROUTES } from "@/lib/config/Routes";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect } from "react";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { useNotification } from "@/lib/context";
import { useLocale, useTranslations } from "next-intl";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";
import { Loader } from "@/components/common/Loader/Loader";
import { IPersonFront } from "@/lib/models/frontend/(person)/person.front";
import { IUser } from "@/lib/models/common/IUser";
import { getFormatDate } from "@/lib/helpers/getFormatDate";
interface IUserComponent {
    // dataUser: (typeof mockTourist)[0];
}
export const UserComponent = async ({}: IUserComponent) => {
    const t = useTranslations("ProfilePage.header");
    const locale = useLocale();
    const notification = useNotification();
    const personService = new PersonService();

    const { user, setUser } = useUser();
    useEffect(() => {
        personService
            .getPersonById("01JZMZWTCTHYV5APEJKD6F74DF")
            .then((res) => {
                if (!res) {
                    notification.error({ message: "нету пользователя" });
                    return;
                }
                setUser(res);
                // console.log(Date(res?.dateRegister));
            });
    }, []);
    const baseUrl = useBaseUrl();
    if (!user) return <Loader />;
    return (
        <>
            <div className={style.container}>
                <div className={style.avatar_block}>
                    <Image
                        src={user.avatarImg || CONSTANT_DEFAULT_AVATAR_URL}
                        alt="avatar"
                        width={250}
                        height={250}
                    />
                </div>
                <div className={style.info_container}>
                    <div>
                        <div className={style.info_name}>
                            <span>
                                {user.personName?.surname ||
                                user.personName?.name ||
                                user.personName?.secondName
                                    ? [
                                          user.personName?.surname,
                                          user.personName?.name,
                                          user.personName?.secondName,
                                      ]
                                          .filter(Boolean)
                                          .join(" ")
                                    : "(заполните имя)"}
                            </span>
                            {/* <SubscribeButton /> */}
                            {/* <div className={style.info_settings}> */}

                            {/* </div> */}
                        </div>
                        <div className={style.info_username}>
                            @{user.nickname}
                        </div>
                        {/* <div className={style.info_status}>
                            Статус путшественника: путешественник
                        </div> */}
                        {user.contacts?.address?.town ||
                        user.contacts?.address?.country ? (
                            <div className={style.info_hometown}>
                                Я из:{" "}
                                {[
                                    user.contacts?.address?.country,
                                    user.contacts?.address?.town,
                                ]
                                    .filter(Boolean)
                                    .join(", ")}
                            </div>
                        ) : null}

                        <div className={style.info_register_block}>
                            День регистрации: {getFormatDate(user.dateRegister)}
                        </div>
                        <div className={style.info_travel_block}>
                            Посетил: !заполнить! стран, !заполнить! городов
                        </div>
                        {user.aboutDescription && (
                            <div className={style.info_description}>
                                О себе: {user.aboutDescription}
                            </div>
                        )}
                    </div>

                    {/* <div className={style.info_buttons}>
                        <Button text="Материалы" />
                        <Button
                            text={`Подписчики ${dataUser.subscribe.yourSubscriber}`}
                        />
                        <Button
                            text={`Подписки ${dataUser.subscribe.youSubscribe}`}
                        />
                        <ShareButton
                            classNameButton={style.info_shareButton}
                            textButton="Поделиться"
                            baseUrl={baseUrl}
                            linkPage={"/tourist"}
                            importTitle={dataUser.name}
                        />
                    </div> */}
                </div>
                <div className={style.manageProfile}>
                    <Link href={ROUTES.PROFILE.SETTINGS("tourist", "personal")}>
                        <Button
                            className={style.manageProfile_button}
                            icon={<IconSettings />}
                            text="Настройки"
                        />
                    </Link>
                    <Link
                        href={ROUTES.PROFILE.SETTINGS(
                            "tourist",
                            "notification"
                        )}
                    >
                        <Button
                            className={style.manageProfile_button}
                            icon={<IconEye />}
                            text="Уведомления"
                        />
                    </Link>
                    {/* <Button icon={<IconEdit/>} text="редактировать профиль"/>
          <Button icon={<IconSettings/>} text="настройки профиля"/> */}
                </div>
            </div>
        </>
    );
};
