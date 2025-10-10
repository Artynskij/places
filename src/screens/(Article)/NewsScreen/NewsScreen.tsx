"use client";

import { IBasePageProps } from "@/lib/models/common/IType";

import style from "./newsScreen.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";

import { useState } from "react";

import { PopularArticles } from "../_component/_PopularNews/_PopularNews";

import { IArticleFront } from "@/lib/models/frontend/article.front";

import { SpinnerAnt } from "@/components/common/Spinner/SpinnerAnt";
import { TCategoriesNews } from "@/lib/models/types/TCategoriesNews";
import BlockArticles from "../ArticleScreen/_components/BlockArticle/BlockArticles";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";

interface IProps
    extends IBasePageProps<{ category: TCategoriesNews; news: string }> {
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
        const newArticle = await api.getWithFilter({
            page: countAnotherArticle,
            pageSize: 1,
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
                    <BlockArticles
                        updateAnotherNews={updateAnotherNews}
                        article={articleData}
                        params={params}
                    />
                </div>

                <PopularArticles
                    containerClass={style.content_item}
                    popularNews={popularNews}
                />

                <div className={style.content_item}>
                    {anotherNews.length ? (
                        anotherNews.map((item, index) => {
                            return (
                                <BlockArticles
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
