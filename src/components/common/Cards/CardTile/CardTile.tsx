"use client";

import { FC, useState } from "react";

import style from "./cardTile.module.scss";

import Image from "next/image";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconArrowRight } from "@/components/common/Icons";
import { Popup } from "@/components/common/Popup/Popup";

import TileContent from "../../Tiles/TileContent";
import { IDataCardInfo, ILocationFront } from "@/lib/models";
import { TTilesContent } from "@/lib/models/types";

// import  TileContent  from "@/screens/LocationScreen/_components/Tiles/TileContent";

interface ICardTile {
    data: IDataCardInfo;
    markDownContent?: string;
    activeParam: boolean;
    titleText: string;
    seeMoreText: string;
    typeTileContent: TTilesContent;
    dataTileContent: ILocationFront[] | null;
    rootLocationPath: string;
}

export const CardTile: FC<ICardTile> = ({
    data,
    markDownContent,
    activeParam,
    titleText,
    seeMoreText,
    typeTileContent,
    dataTileContent,
    rootLocationPath,
}) => {
    const [active, setActive] = useState<boolean>(activeParam);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    function openPopup() {
        setActive(true);
        router.replace(`${pathname}?popup=${data.key}`, { scroll: false });
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
                <TileContent
                    rootLocationPath={rootLocationPath}
                    dataTileContent={dataTileContent}
                    typeTileContent={typeTileContent}
                />
                {/* <Markdown>{markDownContent}</Markdown> */}
            </Popup>
        </>
    );
};
