import Image from "next/image";
import style from "../cardNews.module.scss";
import { mockNews } from "@/asset/mockData/mockNews";
interface ICardNewsPopularProp {
  item: (typeof mockNews)[0];
  descriptionShow?: boolean;
  typeView?:'inline' | 'column'
 
}
export const CardNewsPopular = ({typeView = 'inline', item, descriptionShow=false }: ICardNewsPopularProp) => {
  return (
    <div className={`${style.card_popular} ${typeView==='inline' && style.card_inline}`}>
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
      </div>
    </div>
  );
};
