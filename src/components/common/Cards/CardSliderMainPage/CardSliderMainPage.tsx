import { FC } from "react";
import style from "./cardSliderMainPage.module.scss";
import { IDataCardSlider } from "@/types/ICards";
import Image from "next/image";
import { IconLike, IconLocation, IconStar } from "@/components/common/Icons";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";
import { RateMain } from "../../RateCustom/RateMain";

export const CardSliderMainPage: FC<IDataCardSlider> = ({
  img,
  location,
  rating,
  reviews,
  title,
  type,
  additional,
  liked = false,
}) => {
  return (
    <Link
      href={"/kazahstan/almatydistrict/almaty/objectTest"}
      className={style.card_ctn}
    >
      <div className={style.image}>
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
          height={320}
          src={img}
          alt={img}
        />
      </div>
      <div className={style.description}>
        <div className={style.description_rating}>
          <RateMain defaultValue={rating} disabled={true} />

          {/* <span>{rating}</span>
          <span>-</span> */}
          <span>{reviews}</span>
          <span>отзывов</span>
        </div>
        <div className={style.description_title}>{title}</div>
        {additional && (
          <div className={style.description_subtitle}>{additional}</div>
        )}
        <div className={style.description_location}>
          <IconLocation className={style.description_location_icon} />
          {location}
        </div>
      </div>
    </Link>
  );
};
