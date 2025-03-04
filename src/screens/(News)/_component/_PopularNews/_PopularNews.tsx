import { mockNews } from "@/asset/mockData/mockNews";
import { CardNews } from "@/components/common/Cards";
import { SliderPopularNews } from "@/components/common/Slider/SliderPopularNews/SliderPopularNews";

import style from "./popularNews.module.scss";

interface IPopularNewsProps {
  popularNews: typeof mockNews;
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
        {popularNews.map((item, index) => {
          return <CardNews typeNew="popular" key={index} item={item} />;
        })}
      </div>
      <div className={style.popular_mobile}>
        <SliderPopularNews newsPopular={popularNews} />
      </div>
    </div>
  );
};
