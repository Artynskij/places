"use client";

import { FC, useEffect, useState, useRef } from "react";

import style from "./buttonFunctional.module.scss";
import { mockObjectForObjectPage } from "@/asset/mockData/mockObject";
import Link from "next/link";
import { IconPhone } from "../Icons/IconPhone/IconPhone";
import {
    IconInstagram,
    IconTelegram,
    IconViber,
    IconWhatApp,
} from "../Icons/Social";

import { Popup } from "../Popup/Popup";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
    IContactsEstablishmentEntity,
    IContactsEstablishmentFront,
} from "@/lib/models";

interface IContactButton {
    classNameButton?: string;
    classNameButtonActive?: string;
    importTitle?: string;
    importDescription?: string;
    textButton?: string;
    contactData: IContactsEstablishmentFront | null;
}

export const ContactButton: FC<IContactButton> = ({
    //   classNameIcon,
    classNameButton,
    classNameButtonActive,
    importTitle,
    textButton,
    importDescription,
    contactData,
}) => {
    const [popupActive, setPopupActive] = useState(false);
    const blockContactRef = useRef<HTMLDivElement | null>(null);
    const useMedia = useSelector((state: RootState) => state.screenSize);
    const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setPopupActive(!popupActive);
    };

    useEffect(() => {
        if (popupActive) {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    blockContactRef.current &&
                    !blockContactRef.current.contains(event.target as Node)
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
    const closePopup = () => {
        setPopupActive(false);
    };
    return (
        <div
            ref={blockContactRef}
            className={`${classNameButton || ""} ${style.contact} ${
                (popupActive && classNameButtonActive) || ""
            }`}
        >
            {textButton && <span onClick={toggle}>{textButton}</span>}
            {useMedia && (
                <>
                    <Popup
                        active={
                            popupActive &&
                            useMedia.width < CONSTANTS_SCREENS.SCREEN_PHONE
                        }
                        closePopup={closePopup}
                        size="small"
                        title={textButton}
                    >
                        <ul className={style.contact_popup_list}>
                            {!contactData && <div> Контактов нету</div>}
                            {contactData?.phone && (
                                <li className={style.contact_popup_list_item}>
                                    <Link href={`tel:${contactData.phone}`}>
                                        <IconPhone
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span> {contactData.phone}</span>
                                    </Link>
                                </li>
                            )}
                            {contactData?.socialNetworks?.Telegram && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`https://t.me/${contactData.socialNetworks?.Telegram}`}
                                        target="_blank"
                                    >
                                        <IconTelegram
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Telegram</span>
                                    </Link>
                                </li>
                            )}
                            {contactData?.socialNetworks?.Viber && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`viber://contact?number=${contactData.socialNetworks.Viber}`}
                                        target="_blank"
                                    >
                                        <IconViber
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Viber</span>
                                    </Link>
                                </li>
                            )}
                            {contactData?.socialNetworks?.WhatsApp && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`https://wa.me/${contactData.socialNetworks.WhatsApp}`}
                                        target="_blank"
                                    >
                                        <IconWhatApp
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Whatsapp</span>
                                    </Link>
                                </li>
                            )}
                            {contactData?.socialNetworks?.Instagram && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`https://instagram.com/${contactData.socialNetworks.Instagram}`}
                                        target="_blank"
                                    >
                                        <IconInstagram
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Instagram</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        {/* </div> */}
                    </Popup>
                    <div
                        className={`${style.contact_popup} ${
                            popupActive &&
                            !(
                                useMedia.width < CONSTANTS_SCREENS.SCREEN_PHONE
                            ) &&
                            style.contact_popup_active
                        }`}
                    >
                        <h4>Контакты</h4>
                        <ul className={style.contact_popup_list}>
                            {!contactData && <div> Контактов нету</div>}
                            {contactData?.phone && (
                                <li className={style.contact_popup_list_item}>
                                    <Link href={`tel:${contactData.phone}`}>
                                        <IconPhone
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span> {contactData.phone}</span>
                                    </Link>
                                </li>
                            )}

                            {contactData?.socialNetworks?.Telegram && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`https://t.me/${contactData.socialNetworks?.Telegram}`}
                                        target="_blank"
                                    >
                                        <IconTelegram
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Telegram</span>
                                    </Link>
                                </li>
                            )}

                            {contactData?.socialNetworks?.Viber && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`viber://contact?number=${contactData.socialNetworks?.Viber}`}
                                        target="_blank"
                                    >
                                        <IconViber
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Viber</span>
                                    </Link>
                                </li>
                            )}

                            {contactData?.socialNetworks?.WhatsApp && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`https://wa.me/${contactData.socialNetworks.WhatsApp}`}
                                        target="_blank"
                                    >
                                        <IconWhatApp
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Whatsapp</span>
                                    </Link>
                                </li>
                            )}
                            {contactData?.socialNetworks?.Instagram && (
                                <li className={style.contact_popup_list_item}>
                                    <Link
                                        href={`https://instagram.com/${contactData.socialNetworks.Instagram}`}
                                        target="_blank"
                                    >
                                        <IconInstagram
                                            className={
                                                style.contact_popup_list_item_icon
                                            }
                                        />
                                        <span>Instagram</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};
