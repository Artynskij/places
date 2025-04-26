"use client";

import { FC, useState } from "react";
// import { ImageDefault } from "../../Image/Image";
import style from "./cardInfo.module.scss";

import Image, { StaticImageData } from "next/image";

import { IDataCardInfo } from "@/lib/models/ICards";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconArrowRight } from "@/components/common/Icons";
import { Popup } from "@/components/common/Popup/Popup";
import { Markdown } from "../../../../components/common/MarkDown/MarkDown";
import TileContent from "../Tiles/TileContent";
import { TTilesContent } from "@/lib/models/common/TTilesContent";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";

// import  TileContent  from "@/screens/LocationScreen/_components/Tiles/TileContent";

interface ICardInfo {
    data: IDataCardInfo;
    markDownContent?: string;
    activeParam: boolean;
    titleText: string;
    seeMoreText: string;
    typeTileContent: TTilesContent;
    dataTileContent: ILocationFront[] | null;
    rootLocationPath:string
}

export const CardInfo: FC<ICardInfo> = ({
    data,
    markDownContent,
    activeParam,
    titleText,
    seeMoreText,
    typeTileContent,
    dataTileContent,
    rootLocationPath
}) => {
    const [active, setActive] = useState<boolean>(activeParam);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    function openPopup() {
        setActive(true);
        router.push(`${pathname}?popup=${data.value}`, { scroll: false });
    }

    function closePopup(_item?: boolean) {
        setActive(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("popup");
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    return (
        <>
            <div onClick={openPopup} className={style.card}>
                <div className={style.card_title}>{titleText}</div>
                <div className={style.card_subtitle}>
                    <div>{seeMoreText}</div>
                    <IconArrowRight className={style.card_subtitle_icon} />
                </div>

                <Image
                    className={style.card_icon_default}
                    width={data.iconDefault.width}
                    height={data.iconDefault.height}
                    src={data.iconDefault.src}
                    alt="iconDefault"
                />

                <Image
                    className={style.card_icon_active}
                    width={data.iconActive.width}
                    height={data.iconActive.height}
                    src={data.iconActive.src}
                    alt="iconActive"
                />

                <div className={style.card_bg}></div>
            </div>
            <Popup
                // data={{ title: titleText, body: data.body }}
                title={titleText}
                active={active}
                closePopup={closePopup}
            >
                <TileContent rootLocationPath={rootLocationPath} dataTileContent={dataTileContent} typeTileContent={typeTileContent} />
                {/* <Markdown>{markDownContent}</Markdown> */}
            </Popup>
        </>
    );
};
