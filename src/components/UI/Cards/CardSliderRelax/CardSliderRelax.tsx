"use client";
import { FC, useState } from "react";
import style from "./cardSliderRelax.module.scss";
import { IDataCardSlider } from "@/types/ICards";
import Image from "next/image";
import { IconStar } from "../../Icons/IconStar/IconStar";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";
import { IconLike } from "../../Icons/IconLike/IconLike";

export const CardSliderHotel: FC<IDataCardSlider> = ({
  img,
  location,
  rating,
  reviews,
  title,
  type,
  additional,
  liked = false,
}) => {
  const [activeLike, setActiveLike] = useState<boolean>(liked);

  function clickLike() {
    setActiveLike(!activeLike);
  }
  return (
    <div className={style.card}>
      <div className={style.card_image}>
        <div className={style.card_image_type}>
          <div className={style.card_image_type_text}>{type}</div>
          <div onClick={clickLike} className={style.card_image_type_icon}>
            <IconLike
              active={activeLike}
              className={style.card_image_type_icon_icon}
            />
          </div>
        </div>
        <Image
          loading="lazy"
          className={style.card_image_image}
          width={448}
          height={320}
          src={img}
          alt={img}
        />
      </div>
      <div className={style.card_description}>
        <div className={style.card_description_rating}>
          <IconStar className={style.card_description_rating_icon} />
          <span>{rating}</span>
          <span>-</span>
          <span>{reviews}</span>
          <span>отзывов</span>
        </div>
        <div className={style.card_description_title}>{title}</div>
        {additional && (
          <div className={style.card_description_subtitle}>{additional}</div>
        )}
        <div className={style.card_description_location}>
          <IconLocation className={style.card_description_location_icon} />
          {location}
        </div>
      </div>
    </div>
  );
};
