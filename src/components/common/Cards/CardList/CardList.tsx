import { FC } from "react";
import style from "./cardList.module.scss";
import Image from "next/image";
import { IconLocation, IconStar } from "@/components/common/Icons";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "../../ButtonFunctional/LikeButton";
import { RateMain } from "../../RateCustom/RateMain";
import { RateCafe } from "../../RateCustom/RateCafe";
import { IDataCardSlider } from "@/models/ICards";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { IApiEstablishment } from "@/Api/IApi";
import { RateHotel } from "../../RateCustom/RateHotel";

interface ICardHotelList {
  data: IApiEstablishment;
  cdnName: string;
  langUI: string;
}
export const CardList: FC<ICardHotelList> = ({ data, cdnName, langUI }) => {
  if (!data.content) return null;
  return (
    <div className={style.card}>
      <div className={style.image}>
        <div className={style.image_type}>
          <div className={style.image_type_text}>
            {data.establishment.Category.Content?.details[0].value || "false"}
          </div>

          <ShareButton
            linkPage="https://www.lipsum.com/"
            classNameButton={`${style.imageButton} ${style.imageButton_share}`}
            classNameIcon={style.imageButton_icon}
            classNameButtonActive={`${style.imageButton_active}`}
          />
          <LikeButton
            liked={false}
            classNameButton={style.imageButton}
            classNameIcon={style.imageButton_icon}
          />
        </div>
        <Link
          className={style.image_link}
          href={`/belarus/minskoblast/minsk/${data.establishment.Id}`}
        >
          <Image
            loading="lazy"
            className={style.image_image}
            // width={448}
            // height={320}
            fill
            src={`${cdnName}/${data.content?.media.gallery[0].blobPath}`}
            alt={
              data.content?.media.gallery[0].details[0].value.title || "image"
            }
            sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 100vw, 35vw`}
          />
        </Link>
      </div>
      <div className={style.info_ctn}>
        <div className={style.info_title}>
          <Link href={`/belarus/minskoblast/minsk/${data.establishment.Id}`}>
            {data.content?.value[0]?.value.details.title}
          </Link>
        </div>
        <div className={style.info_rating}>
          <RateMain
            defaultValue={data.establishment.Rates.Rate}
            disabled={true}
          />

          {/* <span>{rating}</span>
          <span>-</span> */}
          <span>{data.establishment.Rates.Count}</span>
          <span>отзывов</span>
        </div>
        {
          <div className={style.description_subtitle}>
            {data.establishment.Type.Name === "EATER" && (
              <>
                {/* <span className={style.rateHotel}> */}
                <RateCafe
                  disabled
                  classNameIcon={style.rateCafe}
                  defaultValue={3}
                />
                {/* </span> */}
              </>
            )}
            {data.establishment.Type.Name === "ACCOMMODATION" && (
              <>
                <RateHotel
                  disabled
                  defaultValue={4}
                  classNameIcon={style.titleBlock_class_icon}
                />
              </>
            )}
          </div>
        }
        <div className={style.info_location}>
          <IconLocation className={style.info_location_icon} />
          {data.content?.value[0]?.value.location.street1}
        </div>

        <div className={style.info_description}>
          {data.content?.value[0].value.details.description}
        </div>
      </div>
    </div>
  );
};
