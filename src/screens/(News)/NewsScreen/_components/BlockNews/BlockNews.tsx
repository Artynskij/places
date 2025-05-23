"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/lib/config/Routes";

import { IArticleFront, IPageProps } from "@/lib/models";

import style from "./blockNews.module.scss";
import Image from "next/image";
import Link from "next/link";

import { BlockReaction } from "@/components/common/BlockFunctional/BlockReaction";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { BlockShare } from "@/components/common/BlockFunctional/BlockShare";
import { BlockWatchCount } from "@/components/common/BlockFunctional/BlockWhatchCount";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { Markdown } from "@/components/common/MarkDown/MarkDown";
import { TCategoriesNews } from "@/lib/models/common/TCategoriesNews";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";

interface IBlockNews {
    article: IArticleFront | null;
    updateAnotherNews: () => void;
    params: IPageProps["params"] & {
        category: TCategoriesNews;
        news: string;
    };
}
export default function BlockNews({
    article,
    updateAnotherNews,
    params,
}: IBlockNews) {
    const pathname = usePathname();
    const observerUrl = useInView({
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
    });
    const tCategoryNews = useTranslations("CategoryNews");
    // TODO warning
    useEffect(() => {
        if (observerUrl.inView && article) {
            const pathnameArray = pathname.split("/");
            pathnameArray[pathnameArray.length - 1] = article.id;
            const newUrl = pathnameArray.join("/");
            window.history.replaceState(null, "", newUrl);
            updateAnotherNews();
        }
    }, [observerUrl.inView]);
    const baseUrl = useBaseUrl();
    if (!article) return <div>Данные по этой новости утеряны</div>;
    return (
        <div
            ref={observerUrl.ref}
            id={article.id}
            className={style.container_news}
        >
            <div className={style.breadcrumb}>
                <Breadcrumb
                    links={[
                        {
                            title: tCategoryNews(params.category),
                            href: ROUTES.NEWS.CATEGORY(params.category),
                        },
                        { title: article.title },
                    ]}
                />
            </div>
            <h2 className={style.title}>{article.title}</h2>
            <div className={style.underTitle}>
                <div className={style.underTitle_left}>
                    <div className={style.underTitle_author}>
                        {`Автор: `}
                        <Link
                            className={`${"hover-underline"}`}
                            href={`/news/author/${article.author}`}
                        >
                            {article.author}
                        </Link>
                    </div>
                    <BlockWatchCount count={1000} />
                    <BlockReadTime text={article.markdown} />
                </div>
                <div className={style.underTitle_right}>
                    <div className={style.underTitle_publicDate}>
                        {article.date}
                    </div>
                </div>
            </div>
            <div className={style.description}>{article.description}</div>
            <div className={style.block_mainImage}>
                <Image
                    className={style.mainImage}
                    width={600}
                    height={300}
                    alt="img"
                    src={article.titleImage}
                />
                <span>Подпись фото</span>
            </div>
            <div className={style.markdownContent}>
                <Markdown>{article.markdown}</Markdown>
            </div>
            <div className={style.share}>
                <BlockShare
                    baseUrl={baseUrl}
                    linkPage={ROUTES.NEWS.NEWS("news", article.id)}
                    importTitle={article.title}
                />
            </div>

            <div className={style.tags}>
                <div className={style.tags_title}>Теги : </div>
                <div className={style.tags_list}>
                    <div className={style.tags_list_item}>Беларусь</div>
                    <div className={style.tags_list_item}>Природа</div>
                    <div className={style.tags_list_item}>Топ</div>
                </div>
            </div>
            <div className={style.reaction}>
                <BlockReaction reactions={article.reactions} />
            </div>
        </div>
    );
}
