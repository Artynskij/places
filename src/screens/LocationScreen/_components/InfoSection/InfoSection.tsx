"use client";
import { CONSTANT_TILES } from "@/asset/constants/front-database/tiles.data";

import style from "./infoSection.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { CardTile } from "../../../../components/common/Cards/CardTile/CardTile";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ILocationFront } from "@/lib/models";
import { TTilesContent } from "@/lib/models/types";

interface IInfoSection {
    searchParams: any;

    rootLocationPath: string;
}
export const InfoSection: FC<IInfoSection> = ({
    searchParams,

    rootLocationPath,
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
            {CONSTANT_TILES.map((infoCard, index) => {
                const activeParam = searchParams["popup"] === infoCard.key;
                if (index > 5 && !showMoreTiles) {
                    return;
                }

                return (
                    <CardTile
                        activeParam={activeParam}
                        titleText={tTiles(`text.${infoCard.title}`)}
                        seeMoreText={watchAllText}
                        key={infoCard.id}
                        data={infoCard}
                        typeTileContent={infoCard.key as TTilesContent}
                        dataTileContent={null}
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
