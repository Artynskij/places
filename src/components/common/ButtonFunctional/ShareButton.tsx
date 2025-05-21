"use client";

import { FC, useEffect, useState, useRef, useCallback } from "react";
import { IconShare } from "../Icons/IconShare/IconShare";
import style from "./buttonFunctional.module.scss";
import Link from "next/link";
import {
    IconClassmates,
    IconFacebook,
    IconLinkedin,
    IconSkype,
    IconTelegram,
    IconTwitter,
    IconViber,
    IconVk,
    IconWhatApp,
} from "../Icons";

import { Popup } from "../Popup/Popup";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface IShareButton {
    classNameIcon?: string;
    classNameButton?: string;
    classNameButtonActive?: string;
    importTitle?: string;
    importDescription?: string;
    textButton?: string;
    linkPage: string;
    linkData: string;
}

export const ShareButton: FC<IShareButton> = ({
    classNameIcon,
    classNameButton,
    classNameButtonActive,
    linkPage,
    textButton,
    importTitle,
    importDescription,
    linkData,
}) => {
    const [popupActive, setPopupActive] = useState(false);
    const blockShareRef = useRef<HTMLDivElement | null>(null); // Ссылка на модал

    const useMedia = useSelector((state: RootState) => state.screenSize);

    const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setPopupActive(!popupActive);
    };

    useEffect(() => {
        if (popupActive) {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    blockShareRef.current &&
                    !blockShareRef.current.contains(event.target as Node)
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

    const getShareUrl = useCallback(
        (network: keyof typeof urls) => {
            const encodedLink = encodeURIComponent(linkPage + linkData);
            const encodedTitle = encodeURIComponent(importTitle || "");
            const urls = {
                telegram: `https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`,
                whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedLink}`,
                vk: `https://vk.com/share.php?url=${encodedLink}`,
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`,
                linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`,
                twitter: `https://twitter.com/share?url=${encodedLink}&text=${encodedTitle}`,
                viber: `viber://forward?text=${encodedTitle} ${encodedLink}`,
                skype: `https://web.skype.com/share?url=${encodedLink}`,
                classmates: `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodedLink}`,
            };
            return urls[network] || "";
        },
        [importTitle, linkPage, linkData]
    );
    const closePopup = () => {
        setPopupActive(false);
    };
    return (
        <div ref={blockShareRef} className={`${style.share}`}>
            <div
                className={` ${classNameButton}  ${
                    popupActive && classNameButtonActive
                } ${style.share_title}`}
                onClick={toggle}
            >
                <IconShare className={classNameIcon} />
                {textButton && <span>{textButton}</span>}
            </div>

            {useMedia && (
                <>
                    <Popup
                        active={
                            popupActive &&
                            useMedia.width < CONSTANTS_SCREENS.SCREEN_PHONE
                        }
                        closePopup={closePopup}
                        size="small"
                        title="Поделиться объектом"
                    >
                        <div className={style.share_popup_list}>
                            <Link
                                href={getShareUrl("classmates")}
                                target="_blank"
                            >
                                <IconClassmates
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("facebook")}
                                target="_blank"
                            >
                                <IconFacebook
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("linkedin")}
                                target="_blank"
                            >
                                <IconLinkedin
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("skype")} target="_blank">
                                <IconSkype
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("telegram")}
                                target="_blank"
                            >
                                <IconTelegram
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("twitter")} target="_blank">
                                <IconTwitter
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("viber")} target="_blank">
                                <IconViber
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("vk")} target="_blank">
                                <IconVk
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("whatsapp")}
                                target="_blank"
                            >
                                <IconWhatApp
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                        </div>
                    </Popup>
                    <div
                        className={`${style.share_popup} ${
                            popupActive &&
                            !(
                                useMedia.width < CONSTANTS_SCREENS.SCREEN_PHONE
                            ) &&
                            style.share_popup_active
                        }`}
                    >
                        <div className={style.share_popup_list}>
                            <Link
                                href={getShareUrl("classmates")}
                                target="_blank"
                            >
                                <IconClassmates
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("facebook")}
                                target="_blank"
                            >
                                <IconFacebook
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("linkedin")}
                                target="_blank"
                            >
                                <IconLinkedin
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("skype")} target="_blank">
                                <IconSkype
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("telegram")}
                                target="_blank"
                            >
                                <IconTelegram
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("twitter")} target="_blank">
                                <IconTwitter
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("viber")} target="_blank">
                                <IconViber
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link href={getShareUrl("vk")} target="_blank">
                                <IconVk
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                            <Link
                                href={getShareUrl("whatsapp")}
                                target="_blank"
                            >
                                <IconWhatApp
                                    className={style.share_popup_list_item}
                                />
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
