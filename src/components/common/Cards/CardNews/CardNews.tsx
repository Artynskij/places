import Image from "next/image";
import style from "./cardNews.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
import Link from "next/link";
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
  const calcTimeRead = (item.description.split(' ').length / 130 * 60).toFixed(2)
  return (
    <Link
      href={`/news/someRubrik/${item.slug}`}
      className={`
        ${typeNew === "main" && style.card} 
        ${typeNew === "popular" && style.card_popular}
        ${typeView === "inline" && style.card_inline}`}
    >
      <div className={style.image}>
        <Image
          className={style.image_image}
          width={600}
          height={320}
          alt="Карточка"
          src={item.image}
        />
      </div>
      <div className={style.content}>
        <h3 className={`${style.content_title}`}>{item.title}</h3>
        {descriptionShow && (
          <div className={style.content_description}>{item.description}</div>
        )}
        {typeNew === "main" && (
          <div className={style.content_additional}>
            <div>Чтение: {calcTimeRead} секунд </div>
            <div>{item.author.title}</div>
          </div>
        )}
      </div>
    </Link>
  );
};
