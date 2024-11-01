import Image from "next/image";
import style from "./cardSearch.module.scss";
import { FC } from "react";

interface ICardSearch {
  src: string;
  alt: string;
  title: string;
  location: string;
}
export const CardSearch: FC<ICardSearch> = ({ src, alt, location, title }) => {
  return (
    <div
      onMouseDown={() => {
        console.log("onMouse");
      }}
      className={style.card}
    >
      <div className={style.card_img}>
        <Image src={src} alt={alt} width={50} height={50} />
      </div>
      <div className={style.card_info}>
        <h3 className={style.card_info_title}>{title}</h3>
        <div className={style.card_info_location}>{location}</div>
      </div>
    </div>
  );
};
