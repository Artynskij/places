import { FC } from "react";
import style from "./cardSliderMainPage.module.scss";
import { IDataCardSlider } from "@/types/ICards";
import Image from "next/image";
import { IconLike, IconLocation, IconStar } from "@/components/common/Icons";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";
import { RateMain } from "../../RateCustom/RateMain";
import { RateHotel } from "../../RateCustom/RateHotel";
import { RateCafe } from "../../RateCustom/RateCafe";

export const CardSliderMainPage: FC<IDataCardSlider> = ({
  img,
  location,
  rating,
  reviews,
  title,
  type,
  additional,
  liked = false,
  globalType,
  costClass,
  hotelClass,
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
        <div className={style.description_title}>
          <span>{title}</span>
        </div>

        {(additional || costClass || hotelClass) && (
          <div className={style.description_subtitle}>
            {costClass && (
              <>
                <span>Средний чек : </span>
                <span className={style.rateHotel}>
                  <RateCafe
                    disabled
                    classNameIcon={style.rateCafe}
                    defaultValue={costClass}
                  />
                </span>
              </>
            )}
            {hotelClass && (
              <>
                <span>Класс отеля : </span>
                <span className={style.rateHotel}>
                  {Array.from({ length: hotelClass }).map((_, index) => (
                    <IconStar key={index} className={style.rateHotel_icon} />
                  ))}
                </span>
              </>
            )}
          </div>
        )}

        <div className={style.description_location}>
          <IconLocation className={style.description_location_icon} />
          {location}
        </div>
      </div>
    </Link>
  );
};
