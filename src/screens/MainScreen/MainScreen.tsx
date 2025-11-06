import Image from "next/image";
import style from "./mainScreen.module.scss";
import Link from "next/link";

import SliderCommercial from "./_components/SliderCommercial/SliderCommercial";

import { mockTowns } from "@/asset/mockData/mockCountry";
import { mockCommercialMainPage } from "@/asset/mockData/mockCommercialMainPage";
import { CONSTANT_CATEGORIES_NEWS } from "@/asset/constants/front-database/tiles.data";

import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";

import {
    IArticleFront,
    IArticleTypeWithArticles,
    IBasePageProps,
} from "@/lib/models";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/lib/config/Routes";
import FinderMainPage from "@/components/common/Finder/FinderMainPage/FinderMainPage";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/default.const";
import { CardArticleMainPage } from "@/components/common/Cards/(article)/CardArticleMainPage/CardArticleMainPage";

interface IProps extends IBasePageProps {
    params: IBasePageProps["params"] & {};
    typeWithArticles: IArticleTypeWithArticles[] | [];
}
export const MainScreen = async ({
    params,
    searchParams,
    typeWithArticles,
}: IProps) => {
    // const newsCategoryData = articlesData.slice(0, 6);
    // const recommendCategoryData = articlesData.slice(0, 3);
    const directionData = mockTowns.slice(0, 5);
    const t = await getTranslations("CategoryNews");
    // const api = new ApiEstablishment();
    // api.getEstablishmentByPagination({ page: 1, pageSize: 1 });

    return (
        <div className={"container"}>
            <section className={style.commercial}>
                <SliderCommercial id={1}>
                    {mockCommercialMainPage.map((comItem) => {
                        return (
                            <Image
                                key={comItem.id}
                                alt="banner"
                                width={1200}
                                height={400}
                                sizes="100vw"
                                src={comItem.image}
                            />
                        );
                    })}
                </SliderCommercial>
            </section>
            <section>
                <FinderMainPage />
            </section>

            {typeWithArticles.map((item) => {
                const articleType = item.type;
                return (
                    <section key={articleType.id}>
                        <h2 className={style.title_second}>
                            <Link href={ROUTES.NEWS.CATEGORY(articleType.id)}>
                                {articleType.value}
                            </Link>
                        </h2>
                        <div className={style.news_content}>
                            {item.articles.map((item, index) => {
                                return (
                                    <CardArticleMainPage
                                        key={`${CONSTANT_CATEGORIES_NEWS.news}-${item.id}`}
                                        article={item}
                                        category={CONSTANT_CATEGORIES_NEWS.news}
                                        cardClass={style.cardNews}
                                        contentClass={style.cardNews_content}
                                        imgClass={style.cardNews_img}
                                    />
                                );
                            })}
                        </div>
                    </section>
                );
            })}

            {/* news block */}
            {/* {newsCategoryData.length > 0 && (
                <section>
                    <h2 className={style.title_second}>
                        <Link
                            href={ROUTES.NEWS.CATEGORY(
                                CONSTANT_CATEGORIES_NEWS.news
                            )}
                        >
                            {t(CONSTANT_CATEGORIES_NEWS.news)}
                        </Link>
                    </h2>
                    <div className={style.news_content}>
                        {newsCategoryData.map((item, index) => {
                            return (
                                <CardArticleMainPage
                                    key={`${CONSTANT_CATEGORIES_NEWS.news}-${item.id}`}
                                    article={item}
                                    category={CONSTANT_CATEGORIES_NEWS.news}
                                    cardClass={style.cardNews}
                                    contentClass={style.cardNews_content}
                                    imgClass={style.cardNews_img}
                                />
                            );
                        })}
                    </div>
                </section>
            )} */}

            {/* recommend block */}
            {/* {recommendCategoryData.length > 0 && (
                <section>
                    <h2 className={style.title_second}>
                        <Link
                            href={ROUTES.NEWS.CATEGORY(
                                CONSTANT_CATEGORIES_NEWS.recommend
                            )}
                        >
                            {t(CONSTANT_CATEGORIES_NEWS.recommend)}
                        </Link>
                    </h2>
                    <div className={style.recommend_content}>
                        {recommendCategoryData.map((recItem) => {
                            return (
                                <CardArticleMainPage
                                    key={`${CONSTANT_CATEGORIES_NEWS.recommend}-${recItem.id}`}
                                    category={
                                        CONSTANT_CATEGORIES_NEWS.recommend
                                    }
                                    article={recItem}
                                />
                            );
                        })}
                    </div>
                </section>
            )} */}

            {/* overview block */}
            {/* {recommendCategoryData.length > 0 && (
                <section>
                    <h2 className={style.title_second}>
                        <Link
                            href={ROUTES.NEWS.CATEGORY(
                                CONSTANT_CATEGORIES_NEWS.overview
                            )}
                        >
                            {t(CONSTANT_CATEGORIES_NEWS.overview)}
                        </Link>
                    </h2>
                    <div className={style.recommend_content}>
                        {recommendCategoryData.map((recItem) => {
                            return (
                                <CardArticleMainPage
                                    key={`${CONSTANT_CATEGORIES_NEWS.overview}-${recItem.id}`}
                                    category={CONSTANT_CATEGORIES_NEWS.overview}
                                    article={recItem}
                                />
                            );
                        })}
                    </div>
                </section>
            )} */}

            {/* blog block */}
            {/* <section>
                <h2 className={style.title_second}>
                    <Link
                        href={ROUTES.NEWS.CATEGORY(
                            CONSTANT_CATEGORIES_NEWS.blog
                        )}
                    >
                        {t(CONSTANT_CATEGORIES_NEWS.blog)}
                    </Link>
                </h2>
                <div className={style.recommend_content}>
                    {recommendCategoryData.map((recItem, index) => {
                        return (
                            <CardArticleMainPage
                                key={`${CONSTANT_CATEGORIES_NEWS.blog}-${recItem.id}`}
                                category={CONSTANT_CATEGORIES_NEWS.blog}
                                article={recItem}
                            />
                        );
                    })}
                </div>
            </section> */}
            <section>
                <h2 className={style.title_second}>{t("bestDestination")}</h2>
                <div className={style.direction_content}>
                    {directionData.map((directionItem, index) => {
                        return (
                            <Link
                                href={ROUTES.LOCATION.LOCATION(
                                    directionItem.id
                                )}
                                key={`direction-${index}`}
                                className={style.cardDirection}
                            >
                                <div className={style.cardDirection_image}>
                                    <Image
                                        className={
                                            style.cardDirection_image_img
                                        }
                                        width={300}
                                        height={150}
                                        sizes="40vw"
                                        src={directionItem.img}
                                        alt="photo"
                                    />
                                </div>
                                <div className={style.cardDirection_content}>
                                    <h4
                                        className={
                                            style.cardDirection_content_title
                                        }
                                    >
                                        {`${directionItem.location}, ${directionItem.title}`}
                                    </h4>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
