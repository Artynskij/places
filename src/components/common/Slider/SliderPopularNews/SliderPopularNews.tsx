"use client";

import { CardArticle } from "@/components/common/Cards/(article)/CardArticle/CardArticle";
import { Slider } from "@/components/common/Slider/Slider";
import { RootState } from "@/store/store";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ISliderPopularNews {
    newsPopular: any[];
}
export const SliderPopularNews: FC<ISliderPopularNews> = ({ newsPopular }) => {
    const [clientLoad, setClientLoad] = useState(false);
    const useMedia = useSelector((state: RootState) => state.screenSize);
    useEffect(() => {
        setClientLoad(true);
    }, []);
    return (
        <>
            {clientLoad && useMedia.width < 1025 && (
                <Slider id={1}>
                    {newsPopular.map((article, index) => {
                        return (
                            <CardArticle
                                typeNew="popular"
                                key={index}
                                article={article}
                            />
                        );
                    })}
                </Slider>
            )}
        </>
    );
};
