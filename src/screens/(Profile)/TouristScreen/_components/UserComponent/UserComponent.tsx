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
import { IconEdit, IconPerson, IconSettings } from "@/components/common/Icons";
import { ROUTES } from "@/lib/config/Routes";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect } from "react";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { useNotification } from "@/lib/context";
import { useTranslations } from "next-intl";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";
interface IUserComponent {
    // dataUser: (typeof mockTourist)[0];
}
export const UserComponent = async ({}: IUserComponent) => {
    const t = useTranslations("ProfilePage.header");
    const notification = useNotification();
    const personService = new PersonService();

    const { user, setUser } = useUser();
    useEffect(() => {
        personService
            .getPersonById("01JZMZWTCTHYV5APEJKD6F74DF")
            .then((res) => {
                setUser(res || null);   
            });
    }, []);
    const baseUrl = useBaseUrl();
    if (!user) null;
    return (
        <>
            <div className={style.container}>
                <div className={style.avatar_block}>
                    <Image
                        src={user?.avatarImg || CONSTANT_DEFAULT_AVATAR_URL}
                        alt="avatar"
                        width={500}
                        height={500}
                    />
                </div>
                <div className={style.info_container}>
                    <div>
                        <div className={style.info_name}>
                            <span>
                                {user?.personName?.name || "(заполните имя)"}
                            </span>
                            {/* <SubscribeButton /> */}
                            {/* <div className={style.info_settings}> */}
                            <Link href={ROUTES.PROFILE.SETTINGS("tourist")}>
                                <Button
                                    icon={<IconSettings />}
                                    text="Настройки профиль"
                                />
                            </Link>

                            {/* </div> */}
                        </div>
                        <div className={style.info_username}>
                            @{user?.nickname}
                        </div>
                        <div className={style.info_status}>
                            Статус путшественника: путешественник
                        </div>
                        <div className={style.info_hometown}>
                            Я из:
                            <Link href={"#"}>
                                {` ${user?.address?.town}(${user?.address?.country})`}
                            </Link>
                        </div>
                        <div className={style.info_register_block}>
                            День регистрации: !заполнить!
                        </div>
                        <div className={style.info_travel_block}>
                            Посетил: !заполнить! стран, !заполнить! городов
                        </div>
                        <div className={style.info_description}>
                            О себе: {user?.aboutDescription}
                        </div>
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
                    {/* <Button icon={<IconEdit/>} text="редактировать профиль"/>
          <Button icon={<IconSettings/>} text="настройки профиля"/> */}
                </div>
            </div>
        </>
    );
};
