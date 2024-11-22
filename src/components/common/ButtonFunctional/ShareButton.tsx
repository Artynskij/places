"use client";

import { FC, useEffect, useState, useRef } from "react";
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
  textButton,
  importTitle,
  importDescription,
}) => {
  const [popupActive, setPopupActive] = useState(false);
  const blockShareRef = useRef<HTMLDivElement | null>(null); // Ссылка на модал

  const toggle = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.preventDefault();
    setPopupActive(!popupActive);
  };

  const handleClickOutside = (event: MouseEvent) => {
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
  const getShareUrl = (network: string) => {
    const encodedLink = encodeURIComponent(linkPage);
    const encodedTitle = encodeURIComponent(importTitle || "");
    switch (network) {
      case "telegram":
        return `https://t.me/share/url?url=${encodedLink}&text=${encodedTitle}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedLink}`;
      case "vk":
        return `https://vk.com/share.php?url=${encodedLink}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`;
      case "twitter":
        return `https://twitter.com/share?url=${encodedLink}&text=${encodedTitle}`;
      case "viber":
        return `viber://forward?text=${encodedTitle} ${encodedLink}`;
      case "skype":
        return `https://web.skype.com/share?url=${encodedLink}`;
      case "classmates":
        return `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=${encodedLink}`;
      default:
        return "";
    }
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
            <Link href={getShareUrl("classmates")} target="_blank">
              <IconClassmates className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("facebook")} target="_blank">
              <IconFacebook className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("linkedin")} target="_blank">
              <IconLinkedin className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("skype")} target="_blank">
              <IconSkype className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("telegram")} target="_blank">
              <IconTelegram className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("twitter")} target="_blank">
              <IconTwitter className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("viber")} target="_blank">
              <IconViber className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("vk")} target="_blank">
              <IconVk className={style.share_popup_list_item} />
            </Link>
            <Link href={getShareUrl("whatsapp")} target="_blank">
              <IconWhatApp className={style.share_popup_list_item} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
