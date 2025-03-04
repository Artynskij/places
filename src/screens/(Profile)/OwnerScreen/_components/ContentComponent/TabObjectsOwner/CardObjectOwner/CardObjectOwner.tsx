import { IconEdit, IconLocation, IconStar } from "@/components/common/Icons";
import style from "./cardObjectOwner.module.scss";
import { IDataCardSlider } from "@/models/ICards";
import { FC } from "react";
import { Button } from "@/components/UI/Button/Button";
import Image from "next/image";

interface ICardObjectOwner {
  data: IDataCardSlider;
  editObjectText: string;
}
export const CardObjectOwner: FC<ICardObjectOwner> = ({
  data,
  editObjectText,
}) => {
  return (
    <div className={style.card}>
      <div className={style.card_title}>
        <div className={style.card_title_left}>
          <div className={style.card_title_rating}>
            <IconStar className={style.card_title_rating_icon} />
            <span>{data.rating}</span>
            <span>-</span>
            <span>{data.reviews} отзывов</span>
          </div>
          <div className={style.card_title_text}>{data.title}</div>
          <div className={style.card_title_location}>
            <IconLocation className={style.card_title_location_icon} />
            {data.location}
          </div>
        </div>
        <div className={style.card_title_right}>
          <Button
            className={style.card_title_button}
            type="light"
            text={editObjectText}
            icon={<IconEdit className={style.card_title_icon} />}
          />
        </div>
      </div>
      <div className={style.card_img}>
        <Image
          className={style.card_img_img}
          src={data.img}
          alt={data.img}
          width={1000}
          height={1000}
        />

        <div className={style.card_img_type}>
          <Button text={data.type} />
        </div>
      </div>
    </div>
  );
};
