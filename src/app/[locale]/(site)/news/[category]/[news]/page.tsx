import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import ArticleScreen from "@/screens/(Article)/ArticleScreen/ArticleScreen";

import { notFound } from "next/navigation";
import { ArticleService } from "@/lib/Api/article/article.service";
import { TCategoriesNews } from "@/lib/models/types/TCategoriesNews";

export async function generateMetadata({
    params,
}: {
    params: { category: string; news: string };
}) {
    return {
        title: `${process.env.BASE_NAME} | ${params.news}`,
    };
}

interface IProps
    extends IBasePageProps<{ category: TCategoriesNews; news: string }> {}

export default async function NewsCategoryPage({
    params,
    searchParams,
}: IProps) {
    const apiArticles = new ArticleService();
    const article = await apiArticles.getById(params.news, params.locale);
    const popularNews =
        (await apiArticles.getByPagination({
            lang: params.locale,
            pagination: { page: 1, pageSize: 8 },
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
