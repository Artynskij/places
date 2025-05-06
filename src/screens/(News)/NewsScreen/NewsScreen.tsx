"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { IPageProps } from "@/lib/models/IType";

import style from "./newsScreen.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
import Image from "next/image";

import { BlockReaction } from "@/components/common/BlockFunctional/BlockReaction";
import { BlockShare } from "@/components/common/BlockFunctional/BlockShare";

import { Markdown } from "@/components/common/MarkDown/MarkDown";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { BlockWatchCount } from "@/components/common/BlockFunctional/BlockWhatchCount";
import { PopularNews } from "../_component/_PopularNews/_PopularNews";

import { IArticleFront } from "@/lib/models/frontend/article/article.front";
import { ArticleService } from "@/lib/Api/article/article.service";
import { useTranslations } from "next-intl";
import { ROUTES } from "@/lib/config/Routes";
import { newsCategoriesData } from "@/asset/constants/data";
import BlockNews from "./_components/BlockNews";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        category: (typeof newsCategoriesData)[keyof typeof newsCategoriesData];
        news: string;
    };
    articleData: IArticleFront | null;
}
export default function NewsScreen({
    params,
    searchParams,
    articleData,
}: IProps) {
    const api = new ArticleService();

    const popularNews = mockNews;
    
    const [anotherNews, setAnotherNews] = useState<[] | IArticleFront[]>([]);
    const [countAnotherArticle, setCountAnotherArticle] = useState<number>(1);
    
    async function updateAnotherNews() {
        const newArticle = await api.getArticlesByPagination({
            pagination: { page: countAnotherArticle, pageSize: 1 },
            lang: params.locale,
        });

        if (newArticle && newArticle[0]) {
            setAnotherNews((prev) => [...prev, newArticle[0]]);
            setCountAnotherArticle(countAnotherArticle + 1);
        }
    }

    return (
        <div className="container">
            <section className={style.content}>
                <div className={style.content_item}>
                    <BlockNews
                        updateAnotherNews={updateAnotherNews}
                        article={articleData}
                        params={params}
                    />
                </div>

                <PopularNews
                    containerClass={style.content_item}
                    popularNews={popularNews}
                />

                <div className={style.content_item}>
                    {anotherNews.length ? (
                        anotherNews.map((item, index) => {
                            return (
                                <BlockNews
                                    updateAnotherNews={updateAnotherNews}
                                    key={index}
                                    article={item} 
                                    params={params}
                                />
                            );
                        })
                    ) : (
                        <div style={{ color: "black" }}>Loading...</div>
                    )}
                </div>
            </section>
        </div>
    );
}

