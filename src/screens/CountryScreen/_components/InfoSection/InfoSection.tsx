"use client";
import { informationCards } from "@/asset/mockData/data";

import style from "./infoSection.module.scss";
import { Button } from "@/components/UI/Button/Button";
import { CardInfo } from "@/components/common/Cards";
import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSize } from "@/asset/hooks/useSize";
interface IInfoSection {
  //   tTiles: any;
  searchParams: any;
}
export const InfoSection: FC<IInfoSection> = ({ searchParams }) => {
  const tTiles = useTranslations("Tiles");
  const tText = useTranslations("CountryPage.text");
  const watchAllText = tTiles("text.watchAll");
  const sizeScreen = useSize();
  const [showMoreTiles, setShowMoreTiles] = useState(true);

  useEffect(() => {
    if (sizeScreen.isDesktop || sizeScreen.isNetBook || sizeScreen.isTablet) {
      setShowMoreTiles(true);
    } else {
      setShowMoreTiles(false);
    }
  }, [sizeScreen]);

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
            titleText={tTiles(`text.${informationCards[index].title}`)}
            seeMoreText={watchAllText}
            key={item.id}
            data={item}
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
