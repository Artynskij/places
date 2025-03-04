"use client";
import { IArticleFront } from "@/models";
import style from "./tabPublication.module.scss";
import Image from "next/image";
import Link from "next/link";
import { newsCategoriesData } from "@/asset/mockData/data";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { useEffect, useState } from "react";
import { ArticleService } from "@/Api/article/article.service";
import { useLocale } from "next-intl";
import Skeleton from "./SkeletonTabPublication";
// interface ITabPublication {
//   publications: IArticleFront[];
// }
const TabPublication = () => {
  const [publications, setPublication] = useState<IArticleFront[] | null>(null);

  const locale = useLocale();
  useEffect(() => {
    const articleService = new ArticleService();
    articleService
      .getArticlesByPagination({
        lang: locale,
        pagination: { page: 1, pageSize: 10 },
      })
      .then((res) => {
        setPublication(res);
      });
  }, []);
  // return <Skeleton />;
  if (!publications) return <Skeleton />;
  return (
    <>
      <div className={style.recommend_content}>
        {publications.map((recItem, index) => {
          return (
            <Link
              href={`/news/${newsCategoriesData.recommend}/${recItem.article.Id}`}
              key={`recommend-${index}`}
              className={style.cardRecommend}
            >
              <div className={style.cardRecommend_image}>
                <Image
                  className={style.cardRecommend_image_img}
                  width={300}
                  height={150}
                  sizes="30vw"
                  src={recItem.content.content[0].value.image}
                  alt="photo"
                />
              </div>
              <div className={style.cardRecommend_content}>
                <span className={style.cardRecommend_content_title}>
                  {recItem.content.content[0].value.title}
                </span>
                <div className={style.cardRecommend_content_additional}>
                  <span className={style.cardRecommend_content_date}>
                    {recItem.content.content[0].value.date}
                  </span>
                  <span className={style.cardRecommend_content_time}>
                    <BlockReadTime
                      text={recItem.content.content[0].value.markdown}
                    />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default TabPublication;
