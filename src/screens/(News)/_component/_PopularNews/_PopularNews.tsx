import { mockNews } from "@/asset/mockData/mockNews";
import { CardNews } from "@/components/common/Cards";
import { SliderPopularNews } from "@/components/common/Slider/SliderPopularNews/SliderPopularNews";

import style from "./popularNews.module.scss";
import { IArticleFront } from "@/lib/models";

interface IPopularNewsProps {
    popularNews: IArticleFront[] | [];
    containerClass?: string;
}
export const PopularNews = ({
    popularNews,
    containerClass,
}: IPopularNewsProps) => {
    return (
        <div className={`${style.content_popular} ${containerClass}`}>
            <h4 className={style.title_popular}>Популярное</h4>
            <div className={style.popular_desktop}>
                {popularNews.length > 0
                    ? popularNews.map((article, index) => {
                          return (
                              <CardNews
                                  typeNew="popular"
                                  key={index}
                                  article={article}
                              />
                          );
                      })
                    : "Популярных новостей на данный момент нету"}
            </div>
            <div className={style.popular_mobile}>
                {popularNews.length > 0 ? (
                    <SliderPopularNews newsPopular={popularNews} />
                ) : (
                    "Популярных новостей на данный момент нету"
                )}
            </div>
        </div>
    );
};
