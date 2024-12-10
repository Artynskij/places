"use client";

import { FC, useEffect, useState, useRef } from "react";
import { IconShare } from "../Icons/IconShare/IconShare";
import style from "./buttonFunctional.module.scss";
import { mockObjectForObjectPage } from "@/asset/mockData/mockObject";
import Link from "next/link";
import { IconPhone } from "../Icons/IconPhone/IconPhone";
import { IconInstagram, IconTelegram, IconViber, IconWhatApp } from "../Icons";

interface IContactButton {
  classNameButton?: string;
  classNameButtonActive?: string;
  importTitle?: string;
  importDescription?: string;
  textButton?: string;
  contactData: typeof mockObjectForObjectPage.contacts;
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

  return (
    <div
      ref={blockContactRef}
      className={`${classNameButton} ${style.contact} ${
        popupActive && classNameButtonActive
      }`}
    >
      {textButton && <span onClick={toggle}>{textButton}</span>}
      {popupActive && (
        <div className={style.contact_popup}>
          <h4>Контакты</h4>
          <ul className={style.contact_popup_list}>
            {contactData.phoneNumber && (
              <li className={style.contact_popup_list_item}>
                <Link href={`tel:${contactData.phoneNumber}`}>
                  <IconPhone className={style.contact_popup_list_item_icon} />
                  <span> {contactData.phoneNumber}</span>
                </Link>
              </li>
            )}

            {contactData.telegram.value && (
              <li className={style.contact_popup_list_item}>
                <Link
                  href={`https://t.me/${contactData.telegram.value}`}
                  target="_blank"
                >
                  <IconTelegram
                    className={style.contact_popup_list_item_icon}
                  />
                  <span>Telegram</span>
                </Link>
              </li>
            )}

            {contactData.viber.value && (
              <li className={style.contact_popup_list_item}>
                <Link
                  href={`viber://contact?number=${contactData.viber.value}`}
                  target="_blank"
                >
                  <IconViber className={style.contact_popup_list_item_icon} />
                  <span>Viber</span>
                </Link>
              </li>
            )}

            {contactData.whatsapp.value && (
              <li className={style.contact_popup_list_item}>
                <Link
                  href={`https://wa.me/${contactData.whatsapp.value}`}
                  target="_blank"
                >
                  <IconWhatApp className={style.contact_popup_list_item_icon} />
                  <span>Whatsapp</span>
                </Link>
              </li>
            )}
            {contactData.instagram.value && (
              <li className={style.contact_popup_list_item}>
                <Link
                  href={`https://instagram.com/${contactData.instagram.value}`}
                  target="_blank"
                >
                  <IconInstagram
                    className={style.contact_popup_list_item_icon}
                  />
                  <span>Instagram</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
