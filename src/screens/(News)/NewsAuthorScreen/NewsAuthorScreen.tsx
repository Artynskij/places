import { IPageProps } from "@/lib/models/IType";
import style from "./newsAuthorScreen.module.scss";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { mockNews } from "@/asset/mockData/mockNews";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";
import { SliderPopularNews } from "../../../components/common/Slider/SliderPopularNews/SliderPopularNews";
import { mockAuthor } from "@/asset/mockData/mockAuthor";
import Image from "next/image";
import { PopularNews } from "../_component/_PopularNews/_PopularNews";
import { IArticleFront } from "@/lib/models";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        name: string;
    };
    mainNews: IArticleFront[] | [];
    popularNews: IArticleFront[] | [];
}

export default function NewsAuthorScreen({
    params,
    searchParams,
    mainNews,
    popularNews,
}: IProps) {
    const newsFirst = mainNews.filter((item, index) => {
        return index < 5 && item;
    });
    const newsSecond = mainNews.filter((item, index) => {
        return index >= 5 && item;
    });
    // const popularNews = mockNews;
    const authorData = mockAuthor;
    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb links={[{ title: authorData.name }]} />
            </div>
            <section>
                <div className={style.author}>
                    <Image
                        className={style.author_image}
                        alt={authorData.name}
                        height={200}
                        width={200}
                        src={authorData.img}
                    />

                    <div className={style.author_description}>
                        <h2 className={style.title}>{authorData.name}</h2>
                        <div className={style.author_description_text}>
                            {authorData.description}
                        </div>
                    </div>
                </div>

                <div className={style.content}>
                    <div className={style.content_item}>
                        {newsFirst.map((article, index) => {
                            return (
                                <CardNews
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    article={article}
                                />
                            );
                        })}
                    </div>

                    <PopularNews
                        popularNews={popularNews}
                        containerClass={style.content_item}
                    />
                    <div className={style.content_item}>
                        {newsSecond.map((article, index) => {
                            return (
                                <CardNews
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    article={article}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
