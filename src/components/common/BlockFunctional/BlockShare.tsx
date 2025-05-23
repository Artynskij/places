import Link from "next/link";
import style from "./blockFunctional.module.scss";
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
} from "@/components/common/Icons";

interface IBlockShare {
    importTitle?: string;
    importDescription?: string;
    baseUrl: string;
    linkPage: string;
}
export const BlockShare = ({
    baseUrl,
    linkPage,
    importTitle,
    importDescription,
}: IBlockShare) => {
    const getShareUrl = (network: string) => {
        const encodedLink = encodeURIComponent(baseUrl + linkPage);
        const encodedTitle = encodeURIComponent(importTitle || "Some title");
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
        <div className={style.share}>
            <span className={style.share_title}>Поделиться :</span>
            <div className={style.share_list}>
                <Link href={getShareUrl("classmates")} target="_blank">
                    <IconClassmates className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("facebook")} target="_blank">
                    <IconFacebook className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("linkedin")} target="_blank">
                    <IconLinkedin className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("skype")} target="_blank">
                    <IconSkype className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("telegram")} target="_blank">
                    <IconTelegram className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("twitter")} target="_blank">
                    <IconTwitter className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("viber")} target="_blank">
                    <IconViber className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("vk")} target="_blank">
                    <IconVk className={style.share_list_item_icon} />
                </Link>
                <Link href={getShareUrl("whatsapp")} target="_blank">
                    <IconWhatApp className={style.share_list_item_icon} />
                </Link>
            </div>
        </div>
    );
};
