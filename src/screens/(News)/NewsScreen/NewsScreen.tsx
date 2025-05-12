"use client";

import { IPageProps } from "@/lib/models/IType";

import style from "./newsScreen.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";

import { useState } from "react";

import { PopularNews } from "../_component/_PopularNews/_PopularNews";

import { IArticleFront } from "@/lib/models/frontend/article/article.front";
import { ArticleService } from "@/lib/Api/article/article.service";

import BlockNews from "./_components/BlockNews/BlockNews";
import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import { TCategoriesNews } from "@/lib/models/common/TCategoriesNews";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        category: TCategoriesNews;
        news: string;
    };
    articleData: IArticleFront | null;
    popularNews: IArticleFront[] | [];
}
export default function NewsScreen({
    params,
    searchParams,
    articleData,
    popularNews,
}: IProps) {
    const api = new ArticleService();

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
                        <div style={{ color: "black" }}>
                            <SpinnerAnt />
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
