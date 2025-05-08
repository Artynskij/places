import Image from "next/image";
import style from "./cardNews.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
import { BlockReadTime } from "../../BlockFunctional/BlockReadTime";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { IArticleFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
interface ICardNewsProp {
    article: IArticleFront;
    descriptionShow?: boolean;
    typeView?: "inline" | "column";
    typeNew: "main" | "popular" | "mainAdditional";
}
export const CardNews = ({
    typeNew,
    typeView = "column",
    article,
    descriptionShow = false,
}: ICardNewsProp) => {
    // const calcTimeRead = (item.markdown.split(' ').length / 130 * 60).toFixed(2)
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
                        src={article.titleImage}
                        fill
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 95vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_TABLET}px) 50vw, 40vw`}
                    />
                ) : typeNew === "popular" ? (
                    <Image
                        className={style.image_image}
                        // width={600}
                        // height={320}
                        alt="Карточка"
                        src={article.titleImage}
                        fill
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_TABLET}px) 40vw, 10vw`}
                    />
                ) : (
                    <Image
                        className={style.image_image}
                        // width={600}
                        // height={320}
                        alt="Карточка"
                        src={article.titleImage}
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
                        <BlockReadTime text={article.markdown} />

                        <div>{article.author}</div>
                    </div>
                )}
            </div>
        </Link>
    );
};
