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
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";

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
    <div className={style.card}>
      <div className={style.image}>
        <div className={style.image_type}>
          <div className={style.image_type_text}>{type}</div>

          <ShareButton
            linkPage="https://www.lipsum.com/"
            classNameButton={`${style.imageButton} ${style.imageButton_share}`}
            classNameIcon={style.imageButton_icon}
            classNameButtonActive={`${style.imageButton_active}`}
          />
          <LikeButton
            liked={liked}
            classNameButton={style.imageButton}
            classNameIcon={style.imageButton_icon}
          />
        </div>
        <Link className={style.image_link} href={"/kazahstan/almatydistrict/almaty/objectTest"}>
          <Image
            loading="lazy"
            className={style.image_image}
            // width={448}
            // height={320}
            fill
            src={img}
            alt={img}
            sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 33vw`}
          />
        </Link>
      </div>
      <div className={style.description}>
        <div className={style.description_top}>
          <div className={style.description_rating}>
            <RateMain defaultValue={rating} disabled={true} />
            <span>{reviews}</span>
            <span>отзывов</span>
          </div>
          <div className={style.description_title}>
            <Link href={"/kazahstan/almatydistrict/almaty/objectTest"}>
              <span>{title}</span>
            </Link>
          </div>
        </div>

        <div className={style.description_bottom}>
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
      </div>
    </div>
  );
};
