import { IPageProps } from "@/lib/models/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import NewsCategoryScreen from "@/screens/(News)/NewsCategoryScreen/NewsCategoryScreen";
import { CONSTANT_CATEGORIES_NEWS } from "@/asset/constants/data";
import { notFound } from "next/navigation";
import { ArticleService } from "@/lib/Api/article/article.service";
// для SSG
// export async function generateStaticParams() {
//     return Object.keys(newsCategoriesData).map((category) => ({
//         category,
//     }));
// }
export async function generateMetadata({
    params,
}: {
    params: { category: string };
}) {
    const categoryName = Object.keys(CONSTANT_CATEGORIES_NEWS).find(
        (category) => params.category === category
    );

    if (!categoryName) {
        return {};
    }
    return {
        title: `${process.env.BASE_NAME} | ${params.category}`,
        description: `Explore the ${params.category} section on our website.`,
    };
}

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        category: string;
    };
}

export default async function NewsCategoryPage({
    params,
    searchParams,
}: IProps) {
    const apiArticles = new ArticleService();

    const categoryName = Object.keys(CONSTANT_CATEGORIES_NEWS).find(
        (category) => params.category === category
    );
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
    if (!categoryName) {
        notFound();
    }

    return (
        <>
            <NewsCategoryScreen
                params={params}
                searchParams={searchParams}
                mainNews={mainNews}
                popularNews={popularNews}
            />
        </>
    );
}
