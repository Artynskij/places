"use client";
import { IArticleFront } from "@/lib/models";
import style from "./tabPublication.module.scss";
import Image from "next/image";
import Link from "next/link";
import { newsCategoriesData } from "@/asset/constants/data";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { useEffect, useState } from "react";

import { useLocale } from "next-intl";
import Skeleton from "./SkeletonTabPublication";
import { ArticleService } from "@/lib/Api/article/article.service";
// interface ITabPublication {
//   publications: IArticleFront[];
// }
const TabPublication = () => {
    const [publications, setPublication] = useState<IArticleFront[] | null>(
        null
    );

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
            <div className={style.publication_content}>
                {publications.map((article, index) => {
                    return (
                        <Link
                            href={`/news/${newsCategoriesData.recommend}/${article.id}`}
                            key={`recommend-${index}`}
                            className={style.cardArticle}
                        >
                            <div className={style.cardArticle_image}>
                                <Image
                                    className={style.cardArticle_image_img}
                                    width={300}
                                    height={150}
                                    sizes="30vw"
                                    src={article.titleImage}
                                    alt="photo"
                                />
                            </div>
                            <div className={style.cardArticle_content}>
                                <span
                                    className={style.cardArticle_content_title}
                                >
                                    {article.title}
                                </span>
                                <div
                                    className={
                                        style.cardArticle_content_additional
                                    }
                                >
                                    <span
                                        className={
                                            style.cardArticle_content_date
                                        }
                                    >
                                        {article.date}
                                    </span>
                                    <span
                                        className={
                                            style.cardArticle_content_time
                                        }
                                    >
                                        <BlockReadTime
                                            text={article.markdown}
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
