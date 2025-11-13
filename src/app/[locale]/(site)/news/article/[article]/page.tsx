import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import ArticleScreen from "@/screens/(Article)/ArticleScreen/ArticleScreen";

import { notFound } from "next/navigation";

import { TCategoriesNews } from "@/lib/models/types/TCategoriesNews";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";

export async function generateMetadata({
    params,
}: {
    params: {  article: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.article}`,
    };
}

interface IProps
    extends IBasePageProps<{ article: string }> {}

export default async function NewsCategoryPage({
    params,
    searchParams,
}: IProps) {
    const apiArticles = new ArticleService();
    const article = await apiArticles.getById(params.article, params.locale);
    const popularNews =
        (await apiArticles.getWithFilter({
            lang: params.locale,
            page: 1,
            pageSize: 8,
        })) || [];
    return (
        <>
            <ArticleScreen
                articleData={article}
                params={params}
                popularNews={popularNews}
                // searchParams={searchParams}
            />
        </>
    );
}
