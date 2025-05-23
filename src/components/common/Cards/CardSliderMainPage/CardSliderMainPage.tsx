import { FC } from "react";
import style from "./cardSliderMainPage.module.scss";
import { IDataCardSlider } from "@/lib/models/ICards";
import Image from "next/image";
import { IconLike, IconLocation, IconStar } from "@/components/common/Icons";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";
import { RateMain } from "../../RateCustom/RateMain";
import { RateHotel } from "../../RateCustom/RateHotel";
import { RateCafe } from "../../RateCustom/RateCafe";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { IEstablishmentFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { headers } from "next/headers";
import { getBaseUrlServer } from "@/lib/hooks/baseUrl/getBaseUrl";

interface ICardSliderMainPage {
    dataEstablishment: IEstablishmentFront;
    langUI?: string;
    locationId: string;
    baseUrl: string;
    classCount?: number;
}
export const CardSliderMainPage: FC<ICardSliderMainPage> = ({
    dataEstablishment,
    langUI,
    locationId,
    baseUrl,
    classCount,
}) => {
    //    const baseUrls= getBaseUrlServer()
    return (
        <div className={style.card}>
            <div className={style.image}>
                <div className={style.image_type}>
                    <Link
                        href={ROUTES.FILTER_WITH_QUERY(
                            locationId,
                            CONSTANT_TYPES_OF_ESTABLISHMENT[
                                dataEstablishment.typeEstablishment
                            ].key,
                            `${dataEstablishment.category.id}`,
                            "c"
                        )}
                        className={style.image_type_text}
                    >
                        {dataEstablishment.category.value || "false"}
                    </Link>

                    <ShareButton
                        importTitle={dataEstablishment.title}
                        baseUrl={baseUrl}
                        linkPage={ROUTES.LOCATION.ESTABLISHMENT(
                            dataEstablishment.location.town.id,
                            CONSTANT_TYPES_OF_ESTABLISHMENT[
                                dataEstablishment.typeEstablishment
                            ].key,
                            dataEstablishment.id
                        )}
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
                    href={ROUTES.LOCATION.ESTABLISHMENT(
                        locationId,
                        CONSTANT_TYPES_OF_ESTABLISHMENT[
                            dataEstablishment.typeEstablishment
                        ].key,
                        `${dataEstablishment.id}`
                    )}
                >
                    <Image
                        loading="lazy"
                        className={style.image_image}
                        // width={448}
                        // height={320}
                        fill
                        src={`${dataEstablishment.media.cdnHost}/${dataEstablishment.media.gallery[0].blobPath}`}
                        alt={
                            dataEstablishment.media.gallery[0].title || "image"
                        }
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 33vw`}
                    />
                </Link>
            </div>
            <div className={style.description}>
                <div className={style.description_top}>
                    <div className={style.description_rating}>
                        <RateMain
                            defaultValue={dataEstablishment.rates.main}
                            disabled={true}
                        />
                        <span>{dataEstablishment.rates.count || 0}</span>
                        <span>оценок</span>
                    </div>
                    <div className={style.description_title}>
                        <Link
                            href={ROUTES.LOCATION.ESTABLISHMENT(
                                locationId,
                                CONSTANT_TYPES_OF_ESTABLISHMENT[
                                    dataEstablishment.typeEstablishment
                                ].key,
                                `${dataEstablishment.id}`
                            )}
                        >
                            <span>{dataEstablishment.title}</span>
                        </Link>
                    </div>
                </div>

                <div className={style.description_bottom}>
                    {/* {(additional || costClass || hotelClass) && (
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
          )} */}
                    <div className={style.description_subtitle}>
                        {dataEstablishment.typeEstablishment === "EATER" && (
                            <>
                                {/* <span className={style.rateHotel}> */}
                                <span>Средний чек :</span>
                                <RateCafe
                                    disabled
                                    classNameIcon={style.rateCafe}
                                    defaultValue={classCount || 0}
                                />

                                {/* </span> */}
                            </>
                        )}
                        {dataEstablishment.typeEstablishment ===
                            "ACCOMMODATION" && (
                            <>
                                <span>Класс отеля :</span>
                                <RateHotel
                                    disabled
                                    defaultValue={classCount || 0}
                                    classNameIcon={style.titleBlock_class_icon}
                                />
                            </>
                        )}
                    </div>
                    <Link
                        href={ROUTES.LOCATION.LOCATION(
                            dataEstablishment.location.town.id
                        )}
                        className={style.description_location}
                    >
                        <IconLocation
                            className={style.description_location_icon}
                        />
                        {dataEstablishment.location.town.title}
                    </Link>
                </div>
            </div>
        </div>
    );
};
