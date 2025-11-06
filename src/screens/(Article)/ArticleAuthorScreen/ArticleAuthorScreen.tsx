import { IBasePageProps } from "@/lib/models/common/IType";
import style from "./articleAuthorScreen.module.scss";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { mockNews } from "@/asset/mockData/mockNews";
import { CardArticle } from "@/components/common/Cards/(article)/CardArticle/CardArticle";
import { SliderPopularNews } from "../../../components/common/Slider/SliderPopularNews/SliderPopularNews";
import { mockAuthor } from "@/asset/mockData/mockAuthor";
import Image from "next/image";
import { PopularArticles } from "../_component/_PopularNews/_PopularNews";
import { IArticleFront, IPersonFront } from "@/lib/models";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/default.const";

interface IProps
    extends IBasePageProps<{
        name: string;
    }> {
    mainNews: IArticleFront[] | [];
    popularNews: IArticleFront[] | [];
    authorData: IPersonFront | null;
}

export default function ArticleAuthorScreen({
    params,
    searchParams,
    mainNews,
    popularNews,
    authorData,
}: IProps) {
    const newsFirst = mainNews.filter((item, index) => {
        return index < 5 && item;
    });
    const newsSecond = mainNews.filter((item, index) => {
        return index >= 5 && item;
    });

    if (!authorData) return <div>not found person</div>;
    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb
                    links={[
                        {
                            title:
                                authorData.personName?.fullName ||
                                "неизвестный автор",
                        },
                    ]}
                />
            </div>
            <section>
                <div className={style.author}>
                    <Image
                        className={style.author_image}
                        alt={"avatar author"}
                        height={200}
                        width={200}
                        src={
                            authorData.avatar.touristImageSrc ||
                            CONSTANT_DEFAULT_AVATAR_URL
                        }
                    />

                    <div className={style.author_description}>
                        <h2 className={style.title}>
                            {authorData.personName?.fullName ||
                                "неизвестный автор"}
                        </h2>
                        <div className={style.author_description_text}>
                            {authorData.aboutDescription}
                        </div>
                    </div>
                </div>

                <div className={style.content}>
                    <div className={style.content_item}>
                        {newsFirst.map((article, index) => {
                            return (
                                <CardArticle
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    article={article}
                                />
                            );
                        })}
                    </div>

                    <PopularArticles
                        popularNews={popularNews}
                        containerClass={style.content_item}
                    />
                    <div className={style.content_item}>
                        {newsSecond.map((article, index) => {
                            return (
                                <CardArticle
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
