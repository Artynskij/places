"use client";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { IPageProps } from "@/lib/models/IType";

import style from "./newsScreen.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
import Image from "next/image";

import { BlockReaction } from "@/components/common/BlockFunctional/BlockReaction";
import { BlockShare } from "@/components/common/BlockFunctional/BlockShare";

import { Markdown } from "@/components/common/MarkDown/MarkDown";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { BlockWatchCount } from "@/components/common/BlockFunctional/BlockWhatchCount";
import { PopularNews } from "../_component/_PopularNews/_PopularNews";

import { IArticleFront } from "@/lib/models/frontend/article/article.front";
import { ArticleService } from "@/lib/Api/article/article.service";

interface IProps extends IPageProps {
    params: IPageProps["params"] & {
        category: string;
        news: string;
    };
    articleData: IArticleFront | null;
}
export default function NewsScreen({
    params,
    searchParams,
    articleData,
}: IProps) {
    const api = new ArticleService();

    const popularNews = mockNews;
    
    const [anotherNews, setAnotherNews] = useState<[] | IArticleFront[]>([]);
    const [countAnotherArticle, setCountAnotherArticle] = useState<number>(1);
    async function updateAnotherNews() {
        const newArticle = await api.getArticlesByPagination({
            pagination: { page: countAnotherArticle, pageSize: 1 },
            lang: params.locale,
        });

        if (newArticle && newArticle[0]) {
            setAnotherNews((prev) => [...prev, newArticle[0]]);
            setCountAnotherArticle(countAnotherArticle + 1);
        }
    }

    return (
        <div className="container">
            <section className={style.content}>
                <div className={style.content_item}>
                    <PageNews
                        updateAnotherNews={updateAnotherNews}
                        article={articleData}
                    />
                </div>

                <PopularNews
                    containerClass={style.content_item}
                    popularNews={popularNews}
                />

                <div className={style.content_item}>
                    {anotherNews.length ? (
                        anotherNews.map((item, index) => {
                            return (
                                <PageNews
                                    updateAnotherNews={updateAnotherNews}
                                    key={index}
                                    article={item}
                                />
                            );
                        })
                    ) : (
                        <div style={{ color: "black" }}>Loading...</div>
                    )}
                </div>
            </section>
        </div>
    );
}
interface IPageNews {
    article: IArticleFront | null;
    updateAnotherNews: () => void;
}
function PageNews({ article, updateAnotherNews }: IPageNews) {
    const pathname = usePathname();
    const observerUrl = useInView({
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
    });

    useEffect(() => {
        if (observerUrl.inView && article) {
            const pathnameArray = pathname.split("/");
            pathnameArray[pathnameArray.length - 1] = article.id;
            const newUrl = pathnameArray.join("/");
            window.history.replaceState(null, "", newUrl);
            updateAnotherNews();
        }
    }, [observerUrl.inView]);
    if (!article) return <div>Данные по этой новости утеряны</div>;
    return (
        <div
            ref={observerUrl.ref}
            id={article.id}
            className={style.container_news}
        >
            <div className={style.breadcrumb}>
                <Breadcrumb />
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
                <BlockShare linkPage="https://www.lipsum.com/" />
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
