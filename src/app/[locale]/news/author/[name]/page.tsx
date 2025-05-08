import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsCategoryScreen from "@/screens/(News)/NewsCategoryScreen/NewsCategoryScreen";
import NewsAuthorScreen from "@/screens/(News)/NewsAuthorScreen/NewsAuthorScreen";
import { ArticleService } from "@/lib/Api/article/article.service";

export async function generateMetadata({
    params,
}: {
    params: { name: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.name}`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        name: string;
    };
}

export default async function AuthorPage({ params, searchParams }: IProps) {
    const apiArticles = new ArticleService();
    const mainNews =
        (await apiArticles.getArticlesByPagination({
            lang: params.locale,
            pagination: { page: 1, pageSize: 8 },
        })) || [];
    const popularNews =
        (await apiArticles.getArticlesByPagination({
            lang: params.locale,
            pagination: { page: 1, pageSize: 8 },
        })) || [];
    return <NewsAuthorScreen mainNews={mainNews} popularNews={popularNews} params={params} searchParams={searchParams} />;
}
