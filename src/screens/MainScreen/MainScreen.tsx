import Image from "next/image";
import style from "./mainScreen.module.scss";
import Link from "next/link";
import { Switcher } from "@/components/common/Switcher/Switcher";
import FinderBlock from "./_components/FinderBlock/FinderBlock";

import { mockNews } from "@/asset/mockData/mockNews";
import { mockTowns } from "@/asset/mockData/mockCountry";
interface IProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}
export const MainScreen = ({ params, searchParams }: IProps) => {
  const newsData = mockNews.slice(0, 6);
  const recommendData = mockNews.slice(1, 7);
  const directionData = mockTowns.slice(0, 5);
  return (
    <div className={"container"}>
      <section className={style.banner}>
        <Image
          alt="banner"
          width={1200}
          height={400}
          sizes="100vw"
          src={"/mock/mockBanner.webp"}
        />
      </section>
      <section>
        <FinderBlock />
      </section>
      <section>
        <h4 className={style.title_second}>Новости туризма</h4>
        <div className={style.news_content}>
          {newsData.map((item, index) => {
            return (
              <Link
                href={`/news/someRubrik/${item.slug}`}
                key={`news-${index}`}
                className={style.cardNews}
              >
                <div className={style.cardNews_image}>
                  <Image
                    className={style.cardNews_image_img}
                    width={300}
                    height={150}
                    sizes="30vw"
                    src={item.image}
                    alt="photo"
                  />
                </div>
                <div className={style.cardNews_content}>
                  <span className={style.cardNews_content_title}>
                    {item.title}
                  </span>
                  <span className={style.cardNews_content_date}>
                    {item.date}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h4 className={style.title_second}>Полезные советы, лайфхаки</h4>
        <div className={style.recommend_content}>
          {recommendData.map((recItem, index) => {
            return (
              <Link
                href={`/news/someRubrik/${recItem.slug}`}
                key={`recommend-${index}`}
                className={style.cardRecommend}
              >
                <div className={style.cardRecommend_image}>
                  <Image
                    className={style.cardRecommend_image_img}
                    width={300}
                    height={150}
                    sizes="30vw"
                    src={recItem.image}
                    alt="photo"
                  />
                </div>
                <div className={style.cardRecommend_content}>
                  <span className={style.cardRecommend_content_title}>
                    {recItem.title}
                  </span>
                  <span className={style.cardRecommend_content_date}>
                    {recItem.date}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h4 className={style.title_second}>Обзоры</h4>
        <div className={style.recommend_content}>
          {recommendData.map((recItem, index) => {
            return (
              <Link
                href={`/news/someRubrik/${recItem.slug}`}
                key={`overview-${index}`}
                className={style.cardRecommend}
              >
                <div className={style.cardRecommend_image}>
                  <Image
                    className={style.cardRecommend_image_img}
                    width={300}
                    height={150}
                    sizes="30vw"
                    src={recItem.image}
                    alt="photo"
                  />
                </div>
                <div className={style.cardRecommend_content}>
                  <span className={style.cardRecommend_content_title}>
                    {recItem.title}
                  </span>
                  <span className={style.cardRecommend_content_date}>
                    {recItem.date}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h4 className={style.title_second}>Блог Туристов</h4>
        <div className={style.recommend_content}>
          {recommendData.map((recItem, index) => {
            return (
              <Link
                href={`/news/someRubrik/${recItem.slug}`}
                key={`blog-${index}`}
                className={style.cardRecommend}
              >
                <div className={style.cardRecommend_image}>
                  <Image
                    className={style.cardRecommend_image_img}
                    width={300}
                    height={150}
                    sizes="30vw"
                    src={recItem.image}
                    alt="photo"
                  />
                </div>
                <div className={style.cardRecommend_content}>
                  <span className={style.cardRecommend_content_title}>
                    {recItem.title}
                  </span>
                  <span className={style.cardRecommend_content_date}>
                    {recItem.date}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h4 className={style.title_second}>Лучшие/Популярные направления</h4>
        <div className={style.direction_content}>
          {directionData.map((directionItem, index) => {
            return (
              <Link
                href={`${directionItem.link}`}
                key={`direction-${index}`}
                className={style.cardDirection}
              >
                <div className={style.cardDirection_image}>
                  <Image
                    className={style.cardDirection_image_img}
                    width={300}
                    height={150}
                    sizes="40vw"
                    src={directionItem.img}
                    alt="photo"
                  />
                </div>
                <div className={style.cardDirection_content}>
                  <h4 className={style.cardDirection_content_title}>
                    {`${directionItem.location}, ${directionItem.title}`}
                  </h4>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};
