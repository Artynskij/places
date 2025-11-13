"use client";
import Image from "next/image";

import style from "./articleFull.module.scss";

import { IArticleFront, IPersonFront } from "@/lib/models";

import Link from "next/link";
import clsx from "clsx";
import { Breadcrumb } from "@/components/common/BreadCrumb/Breadcrumb";
import { BlockWatchCount } from "@/components/common/BlockFunctional/BlockWatchCount";
import { TipTapViewer } from "@/components/common/TipTap/Viewer/TipTapViewer";
import { BlockReadTime } from "@/components/common/BlockFunctional/BlockReadTime";
import { useEffect, useState } from "react";
import { ROUTES } from "@/lib/config/Routes";
import { createFormatDate } from "@/lib/helpers/create-format-date";
interface IProp {
    article: IArticleFront;

    author?: IPersonFront;
}

export const CardArticleFull = ({ article, author }: IProp) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    const authorId = article.author?.id || author?.id;
    return (
        <>
            <div className={style.breadcrumb}>
                <Breadcrumb
                    links={[
                        {
                            title: article?.type[0]?.value,
                            href: ROUTES.NEWS.TYPE(article?.type[0]?.id),
                        },
                        { title: article?.title },
                    ]}
                />
            </div>
            <h2 className={style.title}>{article.title}</h2>
            <div className={style.underTitle}>
                <div>
                    {`Автор: `}
                    <Link
                        className={clsx(
                            "hover-underline",
                            style.underTitle_author
                        )}
                        href={authorId ? ROUTES.NEWS.AUTHOR(authorId) : "#"}
                    >
                        {article.author?.personName?.fullName ||
                            author?.personName?.fullName ||
                            "неизвестный автор"}
                    </Link>
                </div>
                <BlockReadTime
                    count={article.readingTime}
                    text={JSON.stringify(article.markdown)}
                />
                <BlockWatchCount count={1000} />

                <div className={style.underTitle_publicDate}>
                    {createFormatDate(article.publishedDate)}
                </div>
            </div>
            <div className={style.description}>{article.description}</div>
            {article.titleImage && (
                <div className={style.mainImage}>
                    <Image
                        width={article.titleImage.width}
                        height={article.titleImage.height}
                        alt={article.titleImage.alt}
                        src={article.titleImage.src}
                    />
                    <span>{article.titleImage.title}</span>
                </div>
            )}

            {isClient ? (
                <TipTapViewer
                    mediaCollection={article.media}
                    // reHydrate={reHydrate}
                    contentEditor={article.markdown}
                />
            ) : (
                <div>{extractPlainText(article.markdown)}</div>
            )}
        </>
    );
};
function extractPlainText(json: any): string {
    if (!json?.content) return "";

    let text = "";

    const extractText = (node: any) => {
        if (node.type === "text") {
            text += node.text + " ";
        }
        if (node.content) {
            node.content.forEach(extractText);
        }
    };

    json.content.forEach(extractText);
    return text;
}
