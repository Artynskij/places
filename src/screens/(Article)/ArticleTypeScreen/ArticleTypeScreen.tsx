import { IBasePageProps } from "@/lib/models/common/IType";
import style from "./articleTypeScreen.module.scss";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";

import { CardArticle } from "@/components/common/Cards/(article)/CardArticle/CardArticle";

import { PopularArticles } from "../_component/_PopularNews/_PopularNews";

import {
    IArticleFront,
    IArticleSubTypeFront,
    IArticleTypeFront,
} from "@/lib/models";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import { notFound } from "next/navigation";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/search-params.const";
import { ROUTES } from "@/lib/config/Routes";

interface IProps
    extends IBasePageProps<
        { type: string; subType: string },
        { [CONSTANT_SEARCH_PARAMS.PAGE]: string }
    > {
    articleType: IArticleTypeFront;
    articleSubType: IArticleSubTypeFront | null;
    popularNews: IArticleFront[] | [];
    type: "type" | "subType";
}

export default async function ArticlesTypeScreen({
    params,
    searchParams,
    articleType,
    articleSubType,
    type,
    popularNews,
}: IProps) {
    const articleService = new ArticleService();
    const page = +(searchParams?.[CONSTANT_SEARCH_PARAMS.PAGE] || 1);
    const articles =
        type === "type"
            ? await articleService.getWithFilter({
                  articleTypeIds: [params.type, ""],
                  page: page,
                  pageSize: 10,
              })
            : await articleService.getWithFilter({
                  articleSubTypeIds: [params.subType, ""],
                  page: page,
                  pageSize: 10,
              });
    if (!articles) notFound();
    const newsFirst = articles.filter((article, index) => {
        return index < 5 && article;
    });
    const newsSecond = articles.filter((article, index) => {
        return index >= 5 && article;
    });
    const breadCrumbData = articleSubType
        ? [
              {
                  title: articleType.value,
                  href: ROUTES.NEWS.TYPE(articleType.id),
              },
              { title: articleSubType.value },
          ]
        : [
              {
                  title: articleType.value,
              },
          ];

    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb links={breadCrumbData} />
            </div>
            <section>
                <h2 className={style.title}>
                    {articleSubType?.value || articleType.value || "some"}
                </h2>
                <div className={style.content}>
                    <div className={style.content_item}>
                        {newsFirst.map((article, index) => {
                            return (
                                <CardArticle 
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
                                <CardArticle
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
