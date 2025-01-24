import Image from "next/image";
import style from "./mainScreen.module.scss";
import Link from "next/link";
import { Switcher } from "@/components/common/Switcher/Switcher";
import FinderBlock from "./_components/FinderBlock/FinderBlock";
import SliderCommercial from "./_components/SliderCommercial/SliderCommercial";

import { mockNews } from "@/asset/mockData/mockNews";
import { mockTowns } from "@/asset/mockData/mockCountry";
import { mockCommercialMainPage } from "@/asset/mockData/mockCommercialMainPage";
import { newsCategoriesData } from "@/asset/mockData/data";
import { useTranslations } from "next-intl";
interface IProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}
export const MainScreen = ({ params, searchParams }: IProps) => {
  const newsData = mockNews.slice(0, 6);
  const recommendData = mockNews.slice(1, 4);
  const directionData = mockTowns.slice(0, 5);
  const t = useTranslations("CategoryNews");
  return (
    <div className={"container"}>
      <section className={style.commercial}>
        <SliderCommercial id={1}>
          {mockCommercialMainPage.map((comItem) => {
            return (
              <Image
                key={comItem.id}
                alt="banner"
                width={1200}
                height={400}
                sizes="100vw"
                src={comItem.image}
              />
            );
          })}
        </SliderCommercial>
      </section>
      <section>
        <FinderBlock />
      </section>
      {/* news block */}
      <section>
        <h2 className={style.title_second}>
          <Link href={`/news/${newsCategoriesData.news}`}>
            {t(newsCategoriesData.news)}
          </Link>
        </h2>
        <div className={style.news_content}>
          {newsData.map((item, index) => {
            return (
              <Link
                href={`/news/${newsCategoriesData.news}/${item.slug}`}
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
                  <div className={style.cardNews_content_additional}>
                    <span className={style.cardNews_content_date}>
                      {item.date}
                    </span>
                    <span className={style.cardNews_content_date}>Чтение</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* recommend block */}
      <section>
        <h2 className={style.title_second}>
          <Link href={`/news/${newsCategoriesData.recommend}`}>
            {t(newsCategoriesData.recommend)}
          </Link>
        </h2>
        <div className={style.recommend_content}>
          {recommendData.map((recItem, index) => {
            return (
              <Link
                href={`/news/${newsCategoriesData.recommend}/${recItem.slug}`}
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
                  <div className={style.cardRecommend_content_additional}>
                    <span className={style.cardRecommend_content_date}>
                      {recItem.date}
                    </span>
                    <span className={style.cardRecommend_content_time}>
                      Чтение
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* overview block */}
      <section>
        <h2 className={style.title_second}>
          <Link href={`news/${newsCategoriesData.overview}`}>
            {t(newsCategoriesData.overview)}
          </Link>
        </h2>
        <div className={style.recommend_content}>
          {recommendData.map((recItem, index) => {
            return (
              <Link
                href={`/news/${newsCategoriesData.overview}/${recItem.slug}`}
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
                  <div className={style.cardRecommend_content_additional}>
                    <span className={style.cardRecommend_content_date}>
                      {recItem.date}
                    </span>
                    <span className={style.cardRecommend_content_time}>
                      Чтение
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* blog block */}
      <section>
        <h2 className={style.title_second}>
          <Link href={`/news/${newsCategoriesData.blog}`}>
            {t(newsCategoriesData.blog)}
          </Link>
        </h2>
        <div className={style.recommend_content}>
          {recommendData.map((recItem, index) => {
            return (
              <Link
                href={`/news/${newsCategoriesData.blog}/${recItem.slug}`}
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
                  <div className={style.cardRecommend_content_additional}>
                    <span className={style.cardRecommend_content_date}>
                      {recItem.date}
                    </span>
                    <span className={style.cardRecommend_content_time}>
                      Чтение
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className={style.title_second}>{t("bestDestination")}</h2>
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
