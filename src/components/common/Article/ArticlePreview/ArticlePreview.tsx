import Image from "next/image";

import style from "./articlePreview.module.scss";
import { Breadcrumb } from "../../BreadCrumb/Breadcrumb";

import { BlockWatchCount } from "../../BlockFunctional/BlockWhatchCount";
import { TipTapViewer } from "../../TipTap/Viewer/TipTapViewer";
import { IArticleNewFront } from "@/lib/models";
import { BlockReadTime } from "../../BlockFunctional/BlockReadTime";
import Link from "next/link";
import clsx from "clsx";
interface IProp {
    article: IArticleNewFront;
    reHydrate: number;
}
export const ArticlePreview = ({ article, reHydrate }: IProp) => {
    return (
        <div className="container">
            <section className={style.preview}>
                <div className={style.preview_content}>
                    <div className={style.breadcrumb}>
                        <Breadcrumb
                            links={[
                                {
                                    title: article.category,
                                    // href: ROUTES.NEWS.CATEGORY(
                                    //     params.category
                                    // ),
                                },
                                { title: article.title },
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
                                href={`#`}
                            >
                                {article.author}
                            </Link>
                        </div>

                        <BlockReadTime text={JSON.stringify(article.content)} />
                        <BlockWatchCount count={1000} />

                        <div className={style.underTitle_publicDate}>
                            {article.date}
                        </div>
                    </div>
                    <div className={style.description}>
                        {article.description}
                    </div>
                    <div className={style.mainImage}>
                        <Image
                            width={article.titleImage.width}
                            height={article.titleImage.height}
                            alt={article.titleImage.alt}
                            src={article.titleImage.src}
                        />
                        <span>{article.titleImage.title}</span>
                    </div>

                    <TipTapViewer
                        mediaCollection={article.media}
                        reHydrate={reHydrate}
                        json={article.content}
                    />
                </div>
                <div className={style.popular}></div>
            </section>
        </div>
    );
};
