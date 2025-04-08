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
import { mockTourist } from "@/asset/mockData/mockTourist";
import Link from "next/link";
import { ROUTES } from "@/lib/config/Routes";

export default function Profile() {
    const [popupActive, setPopupActive] = useState<boolean>(false);
    const blockProfileRef = useRef<HTMLDivElement | null>(null);
    const userData = mockTourist[0];
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
                    src={mockTourist[0].avatar}
                />
            </div>
            <div
                className={`${style.profile_popup} ${
                    popupActive && style.profile_popup_active
                }`}
            >
                <ul className={style.profile_list}>
                    <Link href={ROUTES.PROFILE.USER(userData.username)}>
                        <li className={style.profile_list_item}>
                            <IconPerson
                                className={style.profile_list_item_icon}
                            />
                            <span>мой аккаунт</span>
                        </li>
                    </Link>
                    <li className={style.profile_list_item}>
                        <IconSettings
                            style={{ marginLeft: "-3px" }}
                            className={style.profile_list_item_icon}
                        />
                        <span>настройки профиля</span>
                    </li>
                    <li className={style.profile_list_item}>
                        <IconEdit className={style.profile_list_item_icon} />
                        <span>редактирование профиля</span>
                    </li>
                    <li className={style.profile_list_item}>
                        <IconExit
                            style={{ marginLeft: "-2px" }}
                            className={style.profile_list_item_icon}
                        />
                        <span>выход</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
