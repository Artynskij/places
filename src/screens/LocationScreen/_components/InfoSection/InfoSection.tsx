"use client";
import { informationCards } from "@/asset/constants/data";

import style from "./infoSection.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { CardInfo } from "@/components/common/Cards";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ILocationFront } from "@/lib/models/frontend/location/location.front";
import { ROUTES } from "@/lib/config/Routes";

interface IInfoSection {
    //   tTiles: any;
    searchParams: any;
    townsData: ILocationFront[] | null;
    rootLocationPath: string;
}
export const InfoSection: FC<IInfoSection> = ({
    searchParams,
    townsData,
    rootLocationPath,
}) => {
    const tTiles = useTranslations("Tiles");
    const tText = useTranslations("LocationPage.text");
    const watchAllText = tTiles("text.watchAll");
    const useMedia = useSelector((state: RootState) => state.screenSize);
    const [showMoreTiles, setShowMoreTiles] = useState(true);
    const nextLevelPathLengthOfRootLocation = rootLocationPath.length + 27;
    const towns = townsData
        ?.filter((town) =>
            ["CITY", "TOWN", "CAPITAL"].includes(town.locationType.value)
        )
        

    const districts = townsData
        ?.filter(
            (district) =>
                ["REGION", "DISTRICT"].includes(district.locationType.value) &&
                district.pathBreadcrumb.length === nextLevelPathLengthOfRootLocation
        )
      

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
                        titleText={tTiles(
                            `text.${informationCards[index].title}`
                        )}
                        seeMoreText={watchAllText}
                        key={infoCard.id}
                        data={infoCard}
                        markDownContent={
                            infoCard.value === "towns" && towns
                                ? transformToMarkdown(towns)
                                : infoCard.value === "regions" && districts
                                ? transformToMarkdown(districts)
                                : infoCard.body
                        }
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

function transformToMarkdown(locations: ILocationFront[]): string {
    return locations
        .map(
            (item) => `- [${item.value}](${ROUTES.LOCATION.LOCATION(item.id)}){ .testik }`
        )
        .join("\n");
}
