import Image from "next/image";
import style from "./cardNews.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
import { BlockReadTime } from "../../BlockFunctional/BlockReadTime";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
interface ICardNewsProp {
  item: (typeof mockNews)[0];
  descriptionShow?: boolean;
  typeView?: "inline" | "column";
  typeNew: "main" | "popular" | "mainAdditional";
}
export const CardNews = ({
  typeNew,
  typeView = "column",
  item,
  descriptionShow = false,
}: ICardNewsProp) => {
  // const calcTimeRead = (item.markdown.split(' ').length / 130 * 60).toFixed(2)
  return (
    <Link
      href={`/news/someRubrik/${item.slug}`}
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
            src={item.image}
            fill
            sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 95vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_TABLET}px) 50vw, 40vw`}
          />
        ) : typeNew === "popular" ? (
          <Image
            className={style.image_image}
            // width={600}
            // height={320}
            alt="Карточка"
            src={item.image}
            fill
            sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_TABLET}px) 40vw, 10vw`}
          />
        ) : (
          <Image
            className={style.image_image}
            // width={600}
            // height={320}
            alt="Карточка"
            src={item.image}
            fill
            sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 10vw`}
          />
        )}
      </div>
      <div className={style.content}>
        <h3 className={`${style.content_title}`}>{item.title}</h3>
        {descriptionShow && (
          <div className={style.content_description}>{item.description}</div>
        )}
        {typeNew === "main" && (
          <div className={style.content_additional}>
            <BlockReadTime text={item.markdown} />

            <div>{item.author.title}</div>
          </div>
        )}
      </div>
    </Link>
  );
};
