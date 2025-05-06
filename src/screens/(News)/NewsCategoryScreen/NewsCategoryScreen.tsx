import { IPageProps } from "@/lib/models/IType";
import style from "./newsCategoryScreen.module.scss";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { mockNews } from "@/asset/mockData/mockNews";
import { CardNews } from "@/components/common/Cards/CardNews/CardNews";

import { PopularNews } from "../_component/_PopularNews/_PopularNews";
import { getTranslations } from "next-intl/server";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        category: string;
    };
}

export default async function NewsCategoryScreen({
    params,
    searchParams,
}: IProps) {
    const t = await getTranslations("CategoryNews");

    const newsFirst = mockNews.filter((item, index) => {
        return index < 5 && item;
    }) as typeof mockNews;
    const newsSecond = mockNews.filter((item, index) => {
        return index >= 5 && item;
    }) as typeof mockNews;
    const popularNews = mockNews;

    return (
        <div className="container">
            <div className={style.breadcrumb}>
                <Breadcrumb links={[{ title: t(params.category)}]} />
            </div>
            <section>
                <h2 className={style.title}>{t(params.category) || "some"}</h2>
                <div className={style.content}>
                    <div className={style.content_item}>
                        {newsFirst.map((item, index) => {
                            return (
                                <CardNews
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    item={item}
                                />
                            );
                        })}
                    </div>
                    {/* <div className={`${style.content_item} ${style.content_popular}`}>
            <h4 className={style.title_popular}>Популярное</h4>
            <div className={style.popular_desktop}>
              {popularNews.map((item, index) => {
                return <CardNews typeNew="popular" key={index} item={item} />;
              })}
            </div>
            <div className={style.popular_mobile}>
              <SliderPopularNews newsPopular={popularNews} />
            </div>
          </div> */}
                    <PopularNews
                        popularNews={popularNews}
                        containerClass={style.content_item}
                    />
                    <div className={style.content_item}>
                        {newsSecond.map((item, index) => {
                            return (
                                <CardNews
                                    typeNew="main"
                                    descriptionShow
                                    key={index}
                                    item={item}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
