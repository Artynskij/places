import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import ArticlesCategoryScreen from "@/screens/(Article)/ArticleCategoryScreen/ArticleCategoryScreen";
import ArticleAuthorScreen from "@/screens/(Article)/ArticleAuthorScreen/ArticleAuthorScreen";
import { ArticleService } from "@/lib/Api/article/article.service";
interface IProps extends IBasePageProps<{ name: string }> {}
export async function generateMetadata({ params }: IProps) {
    return {
        title: `${process.env.BASE_NAME} | ${params.name}`,
    };
}

export default async function AuthorPage({ params, searchParams }: IProps) {
    const apiArticles = new ArticleService();
    const mainNews =
        (await apiArticles.getByPagination({
            lang: params.locale,
            pagination: { page: 1, pageSize: 8 },
        })) || [];
    const popularNews =
        (await apiArticles.getByPagination({
            lang: params.locale,
            pagination: { page: 1, pageSize: 8 },
        })) || [];
    return (
        <ArticleAuthorScreen
            mainNews={mainNews}
            popularNews={popularNews}
            params={params}
            searchParams={searchParams}
        />
    );
}
