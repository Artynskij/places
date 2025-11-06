import type { Metadata } from "next";

import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import ArticlesCategoryScreen from "@/screens/(Article)/ArticleCategoryScreen/ArticleCategoryScreen";
import ArticleAuthorScreen from "@/screens/(Article)/ArticleAuthorScreen/ArticleAuthorScreen";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";

interface IProps extends IBasePageProps<{ name: string }> {}
export async function generateMetadata({ params }: IProps) {
    return {
        title: `${process.env.BASE_NAME} | ${params.name}`,
    };
}

export default async function AuthorPage({ params, searchParams }: IProps) {
    const apiArticles = new ArticleService();
    const apiPerson = new PersonService();
    const mainNews =
        (await apiArticles.getWithFilter({
            lang: params.locale,
            // page: 1,
            // pageSize: 8,
            personId: params.name,
        })) || [];
    const popularNews =
        (await apiArticles.getWithFilter({
            lang: params.locale,
            page: 1,
            pageSize: 8,
        })) || [];
    const personResponse = await apiPerson.getById(params.name);
    // if(!personResponse)
    return (
        <ArticleAuthorScreen
            mainNews={mainNews}
            popularNews={popularNews}
            params={params}
            searchParams={searchParams}
            authorData={personResponse}
        />
    );
}
