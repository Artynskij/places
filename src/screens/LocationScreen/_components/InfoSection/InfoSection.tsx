"use client";
import { informationCards } from "@/asset/constants/data";

import style from "./infoSection.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { CardInfo } from "../CardInfo/CardInfo";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";

import { TTilesContent } from "@/lib/models/common/TTilesContent";

interface IInfoSection {
    searchParams: any;
    townsData: ILocationFront[] | null;
    rootLocationPath: string;
    dataTileContent: ILocationFront[] | null;
}
export const InfoSection: FC<IInfoSection> = ({
    searchParams,
    
    rootLocationPath,
    dataTileContent,
}) => {
    const tTiles = useTranslations("Tiles");
    const tText = useTranslations("LocationPage.text");
    const watchAllText = tTiles("text.watchAll");
    const useMedia = useSelector((state: RootState) => state.screenSize);
    const [showMoreTiles, setShowMoreTiles] = useState(true);

    useEffect(() => {
        // Автоматическое управление отображением плиток на основе размера экрана
        setShowMoreTiles(
            !!(useMedia?.isDesktop || useMedia?.isNetBook || useMedia?.isTablet)
        );
    }, [useMedia]);

    return (
        <section className={style.info_block}>
            {informationCards.map((infoCard, index) => {
                const activeParam = searchParams["popup"] === infoCard.value;
                if (index > 5 && !showMoreTiles) {
                    return;
                }

                return (
                    <CardInfo
                        activeParam={activeParam}
                        titleText={tTiles(`text.${infoCard.title}`)}
                        seeMoreText={watchAllText}
                        key={infoCard.id}
                        data={infoCard}
                        typeTileContent={infoCard.value as TTilesContent}
                        dataTileContent={dataTileContent}
                        rootLocationPath={rootLocationPath}
                    />
                );
            })}
            <div className={style.info_block_seeMore}>
                <Button
                    onClick={() => setShowMoreTiles(!showMoreTiles)}
                    text={!showMoreTiles ? tText("showMore") : tText("hidden")}
                />
            </div>
        </section>
    );
};
