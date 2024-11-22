import { IPageProps } from "@/types/IType";
import style from "./newsAuthorScreen.module.scss";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { mockNews } from "@/asset/mockData/mockNews";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";
import { SliderPopularNews } from "../../components/common/Slider/SliderPopularNews/SliderPopularNews";
import { mockAuthor } from "@/asset/mockData/mockAuthor";
import Image from "next/image";

interface IProps extends IPageProps {
  params: IPageProps["params"] & {
    name: string;
  };
}

export default function NewsAuthorScreen({ params, searchParams }: IProps) {
  const newsFirst = mockNews.filter((item, index) => {
    return index < 5 && item;
  }) as typeof mockNews;
  const newsSecond = mockNews.filter((item, index) => {
    return index >= 5 && item;
  }) as typeof mockNews;
  const popularNews = mockNews;
  const authorData = mockAuthor;
  return (
    <div className="container">
      <div className={style.breadcrumb}>
        <Breadcrumb />
      </div>
      <section>
        <div className={style.author}>
          <Image
            className={style.author_image}
            alt={authorData.name}
            height={200}
            width={200}
            src={authorData.img}
          />

          <div className={style.author_description}>
            <h2 className={style.title}>{authorData.name}</h2>
            <div className={style.author_description_text}>
              {authorData.description}
            </div>
          </div>
        </div>

        <div className={style.content}>
          <div className={style.content_item}>
            {newsFirst.map((item, index) => {
              return (
                <CardNews
                  typeNew="main"
                  descriptionShow
                  key={index}
                  item={item}
                />
              );
            })}
          </div>
          <div className={`${style.content_item} ${style.content_popular}`}>
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
          <div className={style.content_item}>
            {newsSecond.map((item, index) => {
              return (
                <CardNews
                  typeNew="main"
                  descriptionShow
                  key={index}
                  item={item}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
