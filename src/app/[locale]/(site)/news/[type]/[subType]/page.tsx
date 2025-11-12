import { IBasePageProps } from "@/lib/models/common/IType";
import { unstable_setRequestLocale } from "next-intl/server";
import ArticlesTypeScreen from "@/screens/(Article)/ArticleTypeScreen/ArticleTypeScreen";
import { CONSTANT_CATEGORIES_NEWS } from "@/asset/constants/front-database/tiles.data";
import { notFound } from "next/navigation";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import { ArticleTypeService } from "@/lib/Api/(Article)/article-type.api";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/search-params.const";
import { ArticleSubTypeService } from "@/lib/Api/(Article)/article-subType.api";

// для SSG
// export async function generateStaticParams() {
//     return Object.keys(newsCategoriesData).map((category) => ({
//         category,
//     }));
// }
interface IProps
    extends IBasePageProps<
        { type: string; subType: string },
        { [CONSTANT_SEARCH_PARAMS.PAGE]: string }
    > {}
export async function generateMetadata({ params }: IProps) {
    // const categoryName = Object.keys(CONSTANT_CATEGORIES_NEWS).find(
    //     (category) => params.type === category
    // );

    // if (!categoryName) {
    //     return {};
    // }

    return {
        title: `${process.env.BASE_NAME} | ${params.type}`,
        description: `Самые лучшие ${params.type} для туристов всего мира.`,
    };
}

export default async function NewsCategoryPage({
    params,
    searchParams,
}: IProps) {
    const articleService = new ArticleService();
    const articleTypeService = new ArticleTypeService();
    const articleSubTypeService = new ArticleSubTypeService();
    const articleTypeResponse = await articleTypeService.getById(
        params.type,
        params.locale
    );
    const articleSubTypeResponse = await articleSubTypeService.getById(
        params.subType,
        params.locale
    );

    const popularNews =
        (await articleService.getWithFilter({
            lang: params.locale,
            page: 1,
            pageSize: 8,
        })) || [];
    if (!articleSubTypeResponse || !articleTypeResponse) {
        notFound();
    }

    return (
        <>
            <ArticlesTypeScreen
                type="subType"
                articleType={articleTypeResponse}
                articleSubType={articleSubTypeResponse}
                params={params}
                searchParams={searchParams}
                // mainNews={mainNews}
                popularNews={popularNews}
            />
        </>
    );
}
