"use client";
import { Button } from "@/components/UI/Button/Button";
import style from "./userComponent.module.scss";
import { IconEdit } from "@/components/common/Icons/IconEdit/IconEdit";
import Image from "next/image";

import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";
import { useTranslations } from "next-intl";

import { useUser } from "@/lib/context/UserContext/UserContext";
import { useEffect } from "react";

import { Loader } from "@/components/common/Loader/Loader";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/default.const";
import { getFormatDate } from "@/lib/helpers/getFormatDate";

const UserComponent = () => {
    const t = useTranslations("ProfilePage.header");

    const { user } = useUser();
    useEffect(() => {}, []);

    if (!user) return <Loader />;
    return (
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
                <div className={style.middle_avatar}>
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
                </div>
                <div className={style.middle_edit}>
                    <Link href={ROUTES.PROFILE.SETTINGS.OWNER(user.id)}>
                        <Button
                            text={t("editProfile")}
                            className={style.middle_edit_button}
                            icon={
                                <IconEdit
                                    className={style.middle_edit_button_icon}
                                />
                            }
                            type="light"
                        />
                    </Link>
                </div>
            </div>
            <div className={style.bottom}>
                <h4 className={style.bottom_name}>
                    {user.personName?.originalSurname ||
                    user.personName?.originalName ||
                    user.personName?.originalSecondName
                        ? [
                              user.personName?.originalSurname,
                              user.personName?.originalName,
                              user.personName?.originalSecondName,
                          ]
                              .filter(Boolean)
                              .join(" ")
                        : "Верификация не пройдена"}
                </h4>
                <span className={style.bottom_mail}>{}</span>
                <span className={style.bottom_date}>
                    День регистрации: {getFormatDate(user.dateRegister)}
                </span>
            </div>
        </>
    );
};
export default UserComponent;
