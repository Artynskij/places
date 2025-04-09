import Image from "next/image";
import style from "./mainScreen.module.scss";
import Link from "next/link";

import FinderBlock from "./_components/FinderBlock/FinderBlock";
import SliderCommercial from "./_components/SliderCommercial/SliderCommercial";

import { mockTowns } from "@/asset/mockData/mockCountry";
import { mockCommercialMainPage } from "@/asset/mockData/mockCommercialMainPage";
import { newsCategoriesData } from "@/asset/constants/data";


import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";

import { IArticleFront, IPageProps } from "@/lib/models";
import { getTranslations } from "next-intl/server";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {};
    articlesData: IArticleFront[] | [];
}
export const MainScreen = async ({ params, searchParams, articlesData }: IProps) => {
    const newsData = articlesData.slice(0, 6);
    const recommendData = articlesData.slice(1, 4);
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
                <FinderBlock />
            </section>
            {/* news block */}
            <section>
                <h2 className={style.title_second}>
                    <Link href={`/news/${newsCategoriesData.news}`}>
                        {t(newsCategoriesData.news)}
                    </Link>
                </h2>
                <div className={style.news_content}>
                    {newsData.map((item, index) => {
                        return (
                            <Link
                                href={`/news/${newsCategoriesData.news}/${item.id}`}
                                key={`news-${index}`}
                                className={style.cardNews}
                            >
                                <div className={style.cardNews_image}>
                                    <Image
                                        className={style.cardNews_image_img}
                                        width={300}
                                        height={150}
                                        sizes="30vw"
                                        src={item.titleImage}
                                        alt="photo"
                                    />
                                </div>
                                <div className={style.cardNews_content}>
                                    <span
                                        className={style.cardNews_content_title}
                                    >
                                        {item.title}
                                    </span>
                                    <div
                                        className={
                                            style.cardNews_content_additional
                                        }
                                    >
                                        <span
                                            className={
                                                style.cardNews_content_date
                                            }
                                        >
                                            {item.date}
                                        </span>
                                        <span
                                            className={
                                                style.cardNews_content_date
                                            }
                                        >
                                            <BlockReadTime
                                                text={item.markdown}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
            {/* recommend block */}
            <section>
                <h2 className={style.title_second}>
                    <Link href={`/news/${newsCategoriesData.recommend}`}>
                        {t(newsCategoriesData.recommend)}
                    </Link>
                </h2>
                <div className={style.recommend_content}>
                    {recommendData.map((recItem, index) => {
                        return (
                            <Link
                                href={`/news/${newsCategoriesData.recommend}/${recItem.id}`}
                                key={`recommend-${index}`}
                                className={style.cardRecommend}
                            >
                                <div className={style.cardRecommend_image}>
                                    <Image
                                        className={
                                            style.cardRecommend_image_img
                                        }
                                        width={300}
                                        height={150}
                                        sizes="30vw"
                                        src={recItem.titleImage}
                                        alt="photo"
                                    />
                                </div>
                                <div className={style.cardRecommend_content}>
                                    <span
                                        className={
                                            style.cardRecommend_content_title
                                        }
                                    >
                                        {recItem.title}
                                    </span>
                                    <div
                                        className={
                                            style.cardRecommend_content_additional
                                        }
                                    >
                                        <span
                                            className={
                                                style.cardRecommend_content_date
                                            }
                                        >
                                            {recItem.date}
                                        </span>
                                        <span
                                            className={
                                                style.cardRecommend_content_time
                                            }
                                        >
                                            <BlockReadTime
                                                text={recItem.markdown}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
            {/* overview block */}
            <section>
                <h2 className={style.title_second}>
                    <Link href={`news/${newsCategoriesData.overview}`}>
                        {t(newsCategoriesData.overview)}
                    </Link>
                </h2>
                <div className={style.recommend_content}>
                    {recommendData.map((recItem, index) => {
                        return (
                            <Link
                                href={`/news/${newsCategoriesData.overview}/${recItem.id}`}
                                key={`overview-${index}`}
                                className={style.cardRecommend}
                            >
                                <div className={style.cardRecommend_image}>
                                    <Image
                                        className={
                                            style.cardRecommend_image_img
                                        }
                                        width={300}
                                        height={150}
                                        sizes="30vw"
                                        src={recItem.titleImage}
                                        alt="photo"
                                    />
                                </div>
                                <div className={style.cardRecommend_content}>
                                    <span
                                        className={
                                            style.cardRecommend_content_title
                                        }
                                    >
                                        {recItem.title}
                                    </span>
                                    <div
                                        className={
                                            style.cardRecommend_content_additional
                                        }
                                    >
                                        <span
                                            className={
                                                style.cardRecommend_content_date
                                            }
                                        >
                                            {recItem.date}
                                        </span>
                                        <span
                                            className={
                                                style.cardRecommend_content_time
                                            }
                                        >
                                            <BlockReadTime
                                                text={recItem.markdown}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
            {/* blog block */}
            <section>
                <h2 className={style.title_second}>
                    <Link href={`/news/${newsCategoriesData.blog}`}>
                        {t(newsCategoriesData.blog)}
                    </Link>
                </h2>
                <div className={style.recommend_content}>
                    {recommendData.map((recItem, index) => {
                        return (
                            <Link
                                href={`/news/${newsCategoriesData.blog}/${recItem.id}`}
                                key={`blog-${index}`}
                                className={style.cardRecommend}
                            >
                                <div className={style.cardRecommend_image}>
                                    <Image
                                        className={
                                            style.cardRecommend_image_img
                                        }
                                        width={300}
                                        height={150}
                                        sizes="30vw"
                                        src={recItem.titleImage}
                                        alt="photo"
                                    />
                                </div>
                                <div className={style.cardRecommend_content}>
                                    <span
                                        className={
                                            style.cardRecommend_content_title
                                        }
                                    >
                                        {recItem.title}
                                    </span>
                                    <div
                                        className={
                                            style.cardRecommend_content_additional
                                        }
                                    >
                                        <span
                                            className={
                                                style.cardRecommend_content_date
                                            }
                                        >
                                            {recItem.date}
                                        </span>
                                        <span
                                            className={
                                                style.cardRecommend_content_time
                                            }
                                        >
                                            <BlockReadTime
                                                text={recItem.markdown}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
            <section>
                <h2 className={style.title_second}>{t("bestDestination")}</h2>
                <div className={style.direction_content}>
                    {directionData.map((directionItem, index) => {
                        return (
                            <Link
                                href={`${directionItem.link}`}
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
