import type { Metadata } from "next";

import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsScreen from "@/screens/(News)/NewsScreen/NewsScreen";

import { notFound } from "next/navigation";
import { ArticleService } from "@/lib/Api/article/article.service";

export async function generateMetadata({
    params,
}: {
    params: { category: string; news: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.news}`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        category: TCategoriesNews;
        news: string;
    };
}

export default async function NewsCategoryPage({
    params,
    searchParams,
}: IProps) {
    const apiArticles = new ArticleService();
    const article = await apiArticles.getArticleById(
        params.news,
        params.locale
    );
    const popularNews =
        (await apiArticles.getArticlesByPagination({
            lang: params.locale,
            pagination: { page: 1, pageSize: 8 },
        })) || [];
    return (
        <>
            <NewsScreen
                articleData={article}
                params={params}
                popularNews={popularNews}
                // searchParams={searchParams}
            />
        </>
    );
}
