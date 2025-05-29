import { FC } from "react";
import style from "./cardRecommend.module.scss";
import { IDataCardSlider } from "@/lib/models/ICards";
import Image from "next/image";
import { IconLike, IconLocation, IconStar } from "@/components/common/Icons";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";

import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { IEstablishmentFront } from "@/lib/models";
import { ROUTES } from "@/lib/config/Routes";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { headers } from "next/headers";
import { getBaseUrlServer } from "@/lib/hooks/baseUrl/getBaseUrl";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { IMapItemFront } from "@/lib/models/frontend/map/mapItem.front";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";

interface ICardRecommend {
    dataEstablishment: IMapItemFront;
    langUI?: string;
    locationId: string;
    baseUrl: string;
    classCount?: number;
}
const CardRecommend: FC<ICardRecommend> = ({
    dataEstablishment,
    langUI,
    locationId,
    baseUrl,
    classCount,
}) => {
    //    const baseUrls= getBaseUrlServer()
    if (!dataEstablishment.typeEstablishment) return null;
    return (
        <div className={style.card}>
            <div className={style.image}>
                <div className={style.image_type}>
                    {!!dataEstablishment.categories[0] && (
                        <Link
                            href={ROUTES.FILTER_WITH_QUERY(
                                locationId,
                                CONSTANT_TYPES_OF_ESTABLISHMENT[
                                    dataEstablishment.typeEstablishment?.key
                                ].key,
                                `${dataEstablishment.categories[0].key}`,
                                "c"
                            )}
                            className={style.image_type_text}
                        >
                            {dataEstablishment.categories[0].value}
                        </Link>
                    )}
                    {!!dataEstablishment.location.town && (
                        <ShareButton
                            importTitle={dataEstablishment.title}
                            baseUrl={baseUrl}
                            linkPage={ROUTES.LOCATION.ESTABLISHMENT(
                                dataEstablishment.location.town?.id,
                                CONSTANT_TYPES_OF_ESTABLISHMENT[
                                    dataEstablishment.typeEstablishment.key
                                ].key,
                                dataEstablishment.id
                            )}
                            classNameButton={`${style.imageButton} ${style.imageButton_share}`}
                            classNameIcon={style.imageButton_icon}
                            classNameButtonActive={`${style.imageButton_active}`}
                        />
                    )}

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
                            dataEstablishment.typeEstablishment.key
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
                        src={dataEstablishment.media ? `${dataEstablishment.media?.cdnHost}/${dataEstablishment.media?.mainImage}` : CONSTANT_DEFAULT_IMAGE_URL}
                        alt={dataEstablishment.title || "image"}
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 33vw`}
                    />
                </Link>
            </div>
            <div className={style.description}>
                <div className={style.description_top}>
                    <div className={style.description_rating}>
                        <RateMain
                            defaultValue={dataEstablishment.rate || 0}
                            disabled={true}
                        />
                        {/* <span>{dataEstablishment.rates.count || 0}</span> */}
                        {/* <span>оценок</span> */}
                    </div>
                    <div className={style.description_title}>
                        <Link
                            href={ROUTES.LOCATION.ESTABLISHMENT(
                                locationId,
                                CONSTANT_TYPES_OF_ESTABLISHMENT[
                                    dataEstablishment.typeEstablishment.key
                                ].key,
                                `${dataEstablishment.id}`
                            )}
                        >
                            <span>{dataEstablishment.title}</span>
                        </Link>
                    </div>
                </div>

                <div className={style.description_bottom}>
                    <div className={style.description_subtitle}>
                        {dataEstablishment.typeEstablishment.key ===
                            "EATER" && (
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
                        {dataEstablishment.typeEstablishment.key ===
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
                    {!!dataEstablishment.location.town && (
                        <Link
                            href={ROUTES.LOCATION.LOCATION(
                                dataEstablishment.location.town.id
                            )}
                            className={style.description_location}
                        >
                            <IconLocation
                                className={style.description_location_icon}
                            />
                            {!!dataEstablishment.location.country &&
                                `${dataEstablishment.location.country.title}, `}
                            {dataEstablishment.location.town.title}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CardRecommend;
