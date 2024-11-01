"use client";

import { FC, useEffect, useState, useRef } from "react";
import { IconShare } from "../Icons/IconShare/IconShare";
import style from "./buttonFunctional.module.scss";
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

interface IShareButton {
  classNameIcon?: string;
  classNameButton?: string;
  classNameButtonActive?: string;
  importTitle?: string;
  importDescription?: string;
  textButton?: string;
  linkPage: string;
}

export const ShareButton: FC<IShareButton> = ({
  classNameIcon,
  classNameButton,
  classNameButtonActive,
  linkPage,
  importTitle,
  textButton,
  importDescription,
}) => {
  const [popupActive, setPopupActive] = useState(false);
  const blockShareRef = useRef<HTMLDivElement | null>(null); // Ссылка на модал

  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setPopupActive(!popupActive);
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Проверяем, есть ли клик вне модала
    if (
      blockShareRef.current &&
      !blockShareRef.current.contains(event.target as Node)
    ) {
      setPopupActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Ссылки для соцсетей

  const shareOnTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        linkPage
      )}&text=${encodeURIComponent(importTitle || "")}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${importTitle || ""} ${linkPage}`
      )}`,
      "_blank"
    );
  };

  const shareOnVk = () => {
    window.open(
      `https://vk.com/share.php?url=${encodeURIComponent(linkPage)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        linkPage
      )}`,
      "_blank"
    );
  };

  const shareOnLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        linkPage
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/share?url=${encodeURIComponent(
        linkPage
      )}&text=${encodeURIComponent(importTitle || "")}`,
      "_blank"
    );
  };

  const shareOnViber = () => {
    window.open(
      `viber://forward?text=${encodeURIComponent(
        `${importTitle || ""} ${linkPage}`
      )}`
    );
  };

  const shareOnSkype = () => {
    window.open(
      `https://web.skype.com/share?url=${encodeURIComponent(linkPage)}`,
      "_blank"
    );
  };

  const shareOnClassmates = () => {
    window.open(
      `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodeURIComponent(
        linkPage
      )}`,
      "_blank"
    );
  };

  return (
    <div
      onClick={toggle}
      ref={blockShareRef}
      className={`${classNameButton} ${style.share} ${
        popupActive && classNameButtonActive
      }`}
    >
      <IconShare className={classNameIcon} />
      {textButton && <span>{textButton}</span>}
      {popupActive && (
        <div className={style.share_popup}>
          <div className={style.share_popup_list}>
            <IconClassmates
              onClick={shareOnClassmates}
              className={style.share_popup_list_item}
            />
            <IconFacebook
              onClick={shareOnFacebook}
              className={style.share_popup_list_item}
            />
            <IconLinkedin
              onClick={shareOnLinkedin}
              className={style.share_popup_list_item}
            />
            <IconSkype
              onClick={shareOnSkype}
              className={style.share_popup_list_item}
            />
            <IconTelegram
              onClick={shareOnTelegram}
              className={style.share_popup_list_item}
            />
            <IconTwitter
              onClick={shareOnTwitter}
              className={style.share_popup_list_item}
            />
            <IconViber
              onClick={shareOnViber}
              className={style.share_popup_list_item}
            />
            <IconVk
              onClick={shareOnVk}
              className={style.share_popup_list_item}
            />
            <IconWhatApp
              onClick={shareOnWhatsApp}
              className={style.share_popup_list_item}
            />
          </div>
        </div>
      )}
    </div>
  );
};
