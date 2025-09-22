import { IBasePageProps } from "@/lib/models/common/IType";
import style from "./articleCategoryScreen.module.scss";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { mockNews } from "@/asset/mockData/mockNews";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";

import { PopularArticles } from "../_component/_PopularNews/_PopularNews";
import { getTranslations } from "next-intl/server";
import { IArticleFront } from "@/lib/models";

interface IProps extends IBasePageProps<{ category: string }> {
    mainNews: IArticleFront[] | [];
    popularNews: IArticleFront[] | [];
}

export default async function ArticlesCategoryScreen({
    params,
    searchParams,
    mainNews,
    popularNews,
}: IProps) {
    const t = await getTranslations("CategoryNews");

    const newsFirst = mainNews.filter((article, index) => {
        return index < 5 && article;
    });
    const newsSecond = mainNews.filter((article, index) => {
        return index >= 5 && article;
    });
    // const popularNews = mockNews;

    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb links={[{ title: t(params.category) }]} />
            </div>
            <section>
                <h2 className={style.title}>{t(params.category) || "some"}</h2>
                <div className={style.content}>
                    <div className={style.content_item}>
                        {newsFirst.map((article, index) => {
                            return (
                                <CardNews
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    article={article}
                                />
                            );
                        })}
                    </div>

                    <PopularArticles
                        popularNews={popularNews}
                        containerClass={style.content_item}
                    />

                    <div className={style.content_item}>
                        {newsSecond.map((article, index) => {
                            return (
                                <CardNews
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    article={article}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
