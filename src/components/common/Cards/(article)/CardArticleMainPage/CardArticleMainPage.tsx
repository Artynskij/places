import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/default.const";
import style from "./cardArticle.module.scss";
import { IArticleFront } from "@/lib/models";
import Image from "next/image";
import Link from "next/link";
import { BlockReadTime } from "../../../BlockFunctional/BlockReadTime";
import clsx from "clsx";
import { createFormatDate } from "@/lib/helpers/create-format-date";
import { ROUTES } from "@/lib/config/Routes";
interface IProp {
    article: IArticleFront;

    cardClass?: string;
    contentClass?: string;
    imgClass?: string;
}
export const CardArticleMainPage = ({
    article,
    cardClass,
    contentClass,
    imgClass,
}: IProp) => {
    return (
        <Link
            href={ROUTES.NEWS.ARTICLE(article.id)}
            className={clsx(style.card, cardClass)}
        >
            <div className={style.card_image}>
                <Image
                    className={clsx(style.card_image_img, imgClass)}
                    width={300}
                    height={150}
                    sizes="30vw"
                    src={article.titleImage?.src || CONSTANT_DEFAULT_IMAGE_URL}
                    alt="photo"
                />
            </div>
            <div className={clsx(style.card_content, contentClass)}>
                <span className={style.card_content_title}>
                    {article.title}
                </span>
                <div className={style.card_content_additional}>
                    <span className={style.card_content_date}>
                        {createFormatDate(article.publishedDate)}
                    </span>
                    <span className={style.card_content_date}>
                        <BlockReadTime
                            count={article.readingTime}
                            text={JSON.stringify(article.markdown)}
                        />
                    </span>
                </div>
            </div>
        </Link>
    );
};
