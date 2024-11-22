"use client";

import { useSize } from "@/asset/hooks/useSize";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";
import { Slider } from "@/components/common/Slider/Slider";
import { FC, useEffect, useState } from "react";

interface ISliderPopularNews {
  newsPopular: any[];
}
export const SliderPopularNews: FC<ISliderPopularNews> = ({ newsPopular }) => {
  const [clientLoad, setClientLoad] = useState(false);
  const sizeScreen = useSize();
  useEffect(() => {
    setClientLoad(true);
  }, []);
  return (
    <>
      {clientLoad && sizeScreen.width < 1025 && (
        <Slider id={1}>
          {newsPopular.map((item, index) => {
            return <CardNews typeNew="popular" key={index} item={item} />;
          })}
        </Slider>
      )}
    </>
  );
};
