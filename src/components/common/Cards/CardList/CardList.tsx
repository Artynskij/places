import { FC } from "react";
import style from "./cardList.module.scss";
import Image from "next/image";
import { IconLocation, IconStar } from "@/components/common/Icons";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "../../ButtonFunctional/LikeButton";
import { RateMain } from "../../RateCustom/RateMain";
import { RateCafe } from "../../RateCustom/RateCafe";
import { IDataCardSlider } from "@/lib/models/ICards";
import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";

import { RateHotel } from "../../RateCustom/RateHotel";
import { IEstablishmentFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
import { TYPES_OF_ESTABLISHMENT } from "@/asset/constants/typesOfEstablishment";

interface ICardHotelList {
    dataEstablishment: IEstablishmentFront;
    // cdnName: string;
    langUI?: string;
    locationId: string;
    baseUrl: string;
    classCount?: number;
}
export const CardList: FC<ICardHotelList> = ({
    dataEstablishment,
    langUI,
    locationId,
    baseUrl,
    classCount,
}) => {
    // if (!data.content) return null;
    return (
        <div className={style.card}>
            <div className={style.image}>
                <div className={style.image_type}>
                    <Link
                        href={ROUTES.FILTER_WITH_QUERY(
                            locationId,
                            TYPES_OF_ESTABLISHMENT[
                                dataEstablishment.typeEstablishment
                            ].key,
                            dataEstablishment.category.id,
                            "c"
                        )}
                        className={style.image_type_text}
                    >
                        {dataEstablishment.category.value || "false"}
                    </Link>

                    <ShareButton
                        linkData={[
                            dataEstablishment.location.town.id,
                            TYPES_OF_ESTABLISHMENT[
                                dataEstablishment.typeEstablishment
                            ].key,
                            dataEstablishment.id,
                        ]}
                        linkPage={baseUrl}
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
                        TYPES_OF_ESTABLISHMENT[
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
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 100vw, 35vw`}
                    />
                </Link>
            </div>
            <div className={style.info_ctn}>
                <div className={style.info_title}>
                    <Link
                        href={ROUTES.LOCATION.ESTABLISHMENT(
                            locationId,
                            TYPES_OF_ESTABLISHMENT[
                                dataEstablishment.typeEstablishment
                            ].key,
                            dataEstablishment.id
                        )}
                    >
                        {dataEstablishment.title}
                    </Link>
                </div>
                <div className={style.info_rating}>
                    <RateMain
                        defaultValue={dataEstablishment.rates.main}
                        disabled={true}
                    />

                    {/* <span>{rating}</span>
          <span>-</span> */}
                    <span>{dataEstablishment.rates.count || 0}</span>
                    <span>оценок</span>
                </div>
                {
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
                }
                <Link
                    href={ROUTES.LOCATION.LOCATION(
                        dataEstablishment.location.town.id
                    )}
                    className={style.info_location}
                >
                    <IconLocation className={style.info_location_icon} />
                    {dataEstablishment.location.town.title}
                </Link>

                <div className={style.info_description}>
                    {dataEstablishment.description}
                </div>
            </div>
        </div>
    );
};
