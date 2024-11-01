import Image, { StaticImageData } from "next/image";
import style from "./cardSliderFilter.module.scss";
import { FC } from "react";
interface ICardFilterSlider {
  title: string;
  image: StaticImageData;
  alt?: string;
}
export const CardSliderFilter: FC<ICardFilterSlider> = ({
  title,
  image,
  alt,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card_image}>
        <h4 className={style.card_image_title}>{title}</h4>
        <Image
          loading="lazy"
          className={style.card_image_image}
          width={image.width}
          height={image.height}
          src={image.src}
          alt={alt || title}
        />
        <div className={style.card_image_bg}></div>
      </div>
    </div>
  );
};
