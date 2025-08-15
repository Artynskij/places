"use client";
import Image from "next/image";
import style from "./profile.module.scss";
import {
    IconDelete,
    IconEdit,
    IconExit,
    IconPerson,
    IconPhone,
    IconSettings,
} from "../../Icons";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

import { useTranslations } from "next-intl";
import { Button } from "@/components/UI/Button/Button";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";

export default function Profile() {
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const blockProfileRef = useRef<HTMLDivElement | null>(null);
    const tHeader = useTranslations("Header");

    const { user, setUser } = useUser();
    useEffect(() => {
        if (popupActive) {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    blockProfileRef.current &&
                    !blockProfileRef.current.contains(event.target as Node)
                ) {
                    setPopupActive(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [popupActive]);
    const handlerOpenPopup = () => {
        setPopupActive(true);
    };
    const handlerClosePopup = () => {
        setPopupActive(false);
    };

    return (
        <>
            {user ? (
                <div
                    ref={blockProfileRef}
                    onClick={() => {
                        popupActive ? handlerClosePopup() : handlerOpenPopup();
                    }}
                    className={style.profile}
                >
                    <div className={style.profile_image}>
                        <Image
                            width={54}
                            height={54}
                            alt="profileImage"
                            src={
                                user.typeUser === "owner"
                                    ? user.avatar.ownerImageSrc ||
                                      CONSTANT_DEFAULT_AVATAR_URL
                                    : user.avatar.touristImageSrc ||
                                      CONSTANT_DEFAULT_AVATAR_URL
                            }
                        />
                    </div>
                    <div
                        className={`${style.profile_popup} ${
                            popupActive && style.profile_popup_active
                        }`}
                    >
                        <ul className={style.profile_list}>
                            <Link
                                href={
                                    user.typeUser === "owner"
                                        ? ROUTES.PROFILE.OWNER(
                                              user.id || "noNick"
                                          )
                                        : ROUTES.PROFILE.TOURIST(
                                              user.id || "noNick"
                                          )
                                }
                            >
                                <li className={style.profile_list_item}>
                                    <IconPerson
                                        className={style.profile_list_item_icon}
                                    />
                                    <span>мой аккаунт</span>
                                </li>
                            </Link>
                            <Link
                                href={
                                    user.typeUser === "owner"
                                        ? ROUTES.PROFILE.SETTINGS.OWNER(user.id)
                                        : ROUTES.PROFILE.SETTINGS.TOURIST(
                                              user.id
                                          )
                                }
                            >
                                <li className={style.profile_list_item}>
                                    <IconSettings
                                        style={{ marginLeft: "-3px" }}
                                        className={style.profile_list_item_icon}
                                    />
                                    <span>настройки профиля</span>
                                </li>
                            </Link>
                            {/* <li className={style.profile_list_item}>
                                <IconEdit
                                    className={style.profile_list_item_icon}
                                />
                                <span>редактирование профиля</span>
                            </li> */}
                            <li
                                onClick={() => {
                                    setUser(null);
                                }}
                                className={style.profile_list_item}
                            >
                                <IconExit
                                    style={{ marginLeft: "-2px" }}
                                    className={style.profile_list_item_icon}
                                />
                                <span>выход</span>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : (
                <Link href={"/login"}>
                    <Button
                        className={style.right_auth_button}
                        text={tHeader("text.buttonLogin")}
                    />
                </Link>
            )}
        </>
    );
}
