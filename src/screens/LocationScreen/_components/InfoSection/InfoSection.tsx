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
}
export const InfoSection: FC<IInfoSection> = ({ searchParams, townsData }) => {
    const tTiles = useTranslations("Tiles");
    const tText = useTranslations("LocationPage.text");
    const watchAllText = tTiles("text.watchAll");
    const useMedia = useSelector((state: RootState) => state.screenSize);
    const [showMoreTiles, setShowMoreTiles] = useState(true);

    useEffect(() => {
        if (useMedia?.isDesktop || useMedia?.isNetBook || useMedia?.isTablet) {
            setShowMoreTiles(true);
        } else {
            setShowMoreTiles(false);
        }
    }, []);

    return (
        <section className={style.info_block}>
            {informationCards.map((item, index) => {
                const activeParam = searchParams["popup"] === item.value;
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
                        key={item.id}
                        data={item}
                        markDownContent={
                            item.value === "towns" && townsData
                                ? transformToMarkdown(
                                      townsData.filter(
                                          (item) =>
                                              item.locationType.value ===
                                                  "CITY" ||
                                              item.locationType.value ===
                                                  "VILLAGE"
                                      )
                                  )
                                : item.value === "regions" && townsData
                                ? transformToMarkdown(
                                      townsData.filter(
                                          (item) =>
                                              item.locationType.value ===
                                              "REGION"
                                      )
                                  )
                                : item.body
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
function transformToMarkdown(towns: ILocationFront[]): string {
    const returned = towns.map(
        (item) =>
            `<a href=${ROUTES.LOCATION.LOCATION(`${item.id}`)}><span>${
                item.value
            }</span></a>`
    );
    return returned.join(" ");
}
