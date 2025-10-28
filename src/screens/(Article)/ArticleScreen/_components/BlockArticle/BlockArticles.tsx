"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

import { ROUTES } from "@/lib/config/Routes";

import { IArticleFront, IBasePageProps } from "@/lib/models";

import style from "./blockArticles.module.scss";
import Image from "next/image";
import Link from "next/link";

import { BlockReaction } from "@/components/common/BlockFunctional/BlockReaction";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { BlockShare } from "@/components/common/BlockFunctional/BlockShare";
import { BlockWatchCount } from "@/components/common/BlockFunctional/BlockWatchCount";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { Markdown } from "@/components/common/MarkDown/MarkDown";
import { TCategoriesNews } from "@/lib/models/types/TCategoriesNews";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/default.const";
import { CardArticleFull } from "@/components/common/Cards/(article)/ArticleFull/ArticleFull";

interface IBlockArticles {
    article: IArticleFront | null;
    updateAnotherArticle: () => void;
    params: IBasePageProps["params"] & {
        category: TCategoriesNews;
        news: string;
    };
}
export default function BlockArticles({
    article,
    updateAnotherArticle,
    params,
}: IBlockArticles) {
    const pathname = usePathname();
    const observerUrl = useInView({
        threshold: 0,
        rootMargin: "-50% 0px -50% 0px",
    });

    const tCategoryNews = useTranslations("CategoryNews");

    useEffect(() => {
        if (observerUrl.inView && article) {
            const pathnameArray = pathname.split("/");
            pathnameArray[pathnameArray.length - 1] = article.id;
            const newUrl = pathnameArray.join("/");
            window.history.replaceState(null, "", newUrl);
            updateAnotherArticle();
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
            <CardArticleFull article={article} />

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
