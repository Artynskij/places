import { FC } from "react";
import style from "./cardList.module.scss";
import Image from "next/image";
import { IconLocation } from "@/components/common/Icons";


import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "../../ButtonFunctional/LikeButton";
import { RateMain } from "../../RateCustom/RateMain";
interface ICardHotelList {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
  img: string;
  additional: string;
  description: string;
  coord: {
    lat: string;
    lon: string;
  };
  liked: boolean;
}

export const CardList: FC<ICardHotelList> = ({
  img,
  location,
  rating,
  reviews,
  title,
  type,
  additional,
  description,
  liked = false,
}) => {
  return (
    <Link
      href={"/kazahstan/almatydistrict/almaty/objectTest"}
      className={style.card}
    >
      <div className={style.image_ctn}>
        <div className={style.image_type}>
          <div className={style.image_type_text}>{type}</div>

          <ShareButton
            linkPage="https://www.lipsum.com/"
            classNameButton={style.image_type_icon}
            classNameIcon={style.image_type_icon_icon}
          />
          <LikeButton
            liked={liked}
            classNameButton={style.image_type_icon}
            classNameIcon={style.image_type_icon_icon}
          />
        </div>
        <Image
          loading="lazy"
          className={style.image_image}
          width={448}
          height={220}
          src={img}
          alt={img}
        />
      </div>
      <div className={style.info_ctn}>
        <div className={style.info_title}>{title}</div>
        <div className={style.info_rating}>
          <RateMain defaultValue={rating} disabled={true} />

          <span>{rating}</span>
          <span>-</span>
          <span>{reviews}</span>
          <span>отзывов</span>
        </div>
        {additional && <div className={style.info_subtitle}>{additional}</div>}
        <div className={style.info_location}>
          <IconLocation className={style.info_location_icon} />
          {location}
        </div>

        <div className={style.info_description}>{description}</div>
      </div>
    </Link>
  );
};
