"use client";
import { FC, useState } from "react";
import style from "./cardSliderLocation.module.scss";
import { IDataCardSliderLocation } from "@/types/ICards";
import Image from "next/image";
import { IconStar } from "../../Icons/IconStar/IconStar";
import { IconLocation } from "../../Icons/IconLocation/IconLocation";
import { IconLike } from "../../Icons/IconLike/IconLike";
import Link from "next/link";

export const CardSliderLocation: FC<IDataCardSliderLocation> = ({
  img,
  link,
  title,
  liked = false,
}) => {
  const [activeLike, setActiveLike] = useState<boolean>(liked);

  function clickLike(e:React.MouseEvent<HTMLDivElement>) {
    e.preventDefault()
    setActiveLike(!activeLike);
  }
  return (
    <Link href={`${link}`} className={style.card} >
      <div className={style.card_image}>
        <div className={style.card_image_type}>
          {/* <div className={style.card_image_type_text}>{type}</div> */}
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
        {/* <div className={style.card_description_rating}>
          <IconStar className={style.card_description_rating_icon} />

          <span>-</span>

          <span>отзывов</span>
        </div> */}
        <div className={style.card_description_title}>{title}</div>
        {/* {additional && (
          <div className={style.card_description_subtitle}>{additional}</div>
        )} */}
        {/* <div className={style.card_description_location}>
          <IconLocation className={style.card_description_location_icon} />
          {location}
        </div> */}
      </div>
    </Link>
  );
};
