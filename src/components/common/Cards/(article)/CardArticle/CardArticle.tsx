import Image from "next/image";
import style from "./cardArticle.module.scss";

import Link from "next/link";
import { BlockReadTime } from "../../../BlockFunctional/BlockReadTime";
import { CONSTANTS_SCREENS } from "@/asset/constants/screens.const";
import { IArticleFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/default.const";
interface ICardNewsProp {
    article: IArticleFront;
    descriptionShow?: boolean;
    typeView?: "inline" | "column";
    typeNew: "main" | "popular" | "mainAdditional";
}
export const CardArticle = ({
    typeNew,
    typeView = "column",
    article,
    descriptionShow = false,
}: ICardNewsProp) => {
    if (!article) return <span>нету новости</span>;
    return (
        <Link
            href={ROUTES.NEWS.NEWS("news", article.id)}
            className={`
        ${typeNew === "main" && style.card} 
        ${typeNew === "popular" && style.card_popular}
        ${typeView === "inline" && style.card_inline}`}
        >
            <div className={style.image}>
                {typeNew === "main" ? (
                    <Image
                        className={style.image_image}
                        // width={600}
                        // height={320}
                        alt="Карточка"
                        src={
                            article.titleImage?.src ||
                            CONSTANT_DEFAULT_IMAGE_URL
                        }
                        fill
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 95vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_TABLET}px) 50vw, 40vw`}
                    />
                ) : typeNew === "popular" ? (
                    <Image
                        className={style.image_image}
                        alt="Карточка"
                        src={
                            article.titleImage?.src ||
                            CONSTANT_DEFAULT_IMAGE_URL
                        }
                        fill
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_TABLET}px) 40vw, 10vw`}
                    />
                ) : (
                    <Image
                        className={style.image_image}
                        // width={600}
                        // height={320}
                        alt="Карточка"
                        src={
                            article.titleImage?.src ||
                            CONSTANT_DEFAULT_IMAGE_URL
                        }
                        fill
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 10vw`}
                    />
                )}
            </div>
            <div className={style.content}>
                <h3 className={`${style.content_title}`}>{article.title}</h3>
                {descriptionShow && (
                    <div className={style.content_description}>
                        {article.description}
                    </div>
                )}
                {typeNew === "main" && (
                    <div className={style.content_additional}>
                        <BlockReadTime
                            count={article.readingTime}
                            text={JSON.stringify(article.markdown)}
                        />

                        <div>{article.author?.Id || ""}</div>
                    </div>
                )}
            </div>
        </Link>
    );
};
