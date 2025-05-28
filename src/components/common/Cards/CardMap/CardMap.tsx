"use client";

import style from "./cardMap.module.scss";
import Link from "next/link";
import Image from "next/image";

import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";
import { ROUTES } from "@/lib/config/Routes";

import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { IconCancel, IconLocation } from "@/components/common/Icons";
import { TTypesOfEstablishment } from "@/lib/models/common/TTypesEstablishment";
import { CONSTANT_TYPES_OF_ESTABLISHMENT } from "@/asset/constants/TypesOfEstablishment";
import { ISearchItemFront } from "@/lib/models";
interface IDataCard {
    id: string;
    title: string;
    rate: number | null;
    mediaSrc: string | null;
    typeEstablishment: TTypesOfEstablishment;

    tagClass: number | null;
    location: {
        lat: number | null;
        lon: number | null;
        country: { id: string; title: string };
        town: { id: string; title: string };
    };
}
interface ICardMap {
    establishment: ISearchItemFront;
    handlerClosePopup: () => void;
}

export const CardMap = ({ establishment, handlerClosePopup }: ICardMap) => {
    const linkEstablishment = ROUTES.LOCATION.ESTABLISHMENT(
        establishment.location.town?.id || "",
        CONSTANT_TYPES_OF_ESTABLISHMENT[
            establishment.typeEstablishment?.key || "EATER"
        ].key,
        establishment.id
    );
    if (!establishment.typeEstablishment) return null;
    return (
        <div className={style.card}>
            <div className={style.image}>
                <div className={style.image_type}>
                    <LikeButton
                        liked={false}
                        classNameButton={style.imageButton}
                        classNameIcon={style.imageButton_icon}
                    />
                </div>
                <Link className={style.image_link} href={linkEstablishment}>
                    <Image
                        loading="lazy"
                        className={style.image_image}
                        fill
                        src={
                            establishment.media
                                ? `${establishment.media.cdnHost}/${establishment.media.mainImage}`
                                : CONSTANT_DEFAULT_IMAGE_URL
                        }
                        alt={establishment.title}
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 33vw`}
                    />
                </Link>
            </div>
            <div className={style.description}>
                <div className={style.description_top}>
                    {establishment.rate && (
                        <div className={style.description_rating}>
                            <RateMain
                                defaultValue={establishment.rate}
                                disabled={true}
                            />
                        </div>
                    )}

                    <div className={style.description_title}>
                        <Link href={linkEstablishment}>
                            <span>{establishment.title}</span>
                        </Link>
                    </div>
                </div>

                <div className={style.description_bottom}>
                    <div className={style.description_subtitle}>
                        {establishment.typeEstablishment.key === "EATER" && (
                            <>
                                {/* <span className={style.rateHotel}> */}
                                <span>Средний чек :</span>
                                <RateCafe
                                    disabled
                                    classNameIcon={style.rateCafe}
                                    defaultValue={establishment.priceCategory?.count || 0}
                                />

                                {/* </span> */}
                            </>
                        )}
                        {establishment.typeEstablishment.key ===
                            "ACCOMMODATION" && (
                            <>
                                <span>Класс отеля :</span>
                                <RateHotel
                                    disabled
                                    defaultValue={establishment.starRating?.count || 0}
                                    classNameIcon={style.titleBlock_class_icon}
                                />
                            </>
                        )}
                    </div>
                    {establishment.location.town && (
                        <Link
                            href={ROUTES.LOCATION.LOCATION(
                                establishment.location.town.id
                            )}
                            className={style.description_location}
                        >
                            <IconLocation
                                className={style.description_location_icon}
                            />

                            {/* {`${establishment.location.country?.title}, ` || ""} */}
                            {establishment.location.town.title}
                        </Link>
                    )}
                </div>
            </div>
            <div onClick={() => handlerClosePopup()} className={style.btnClose}>
                <IconCancel className={style.btnClose_icon} />
            </div>
        </div>
    );
};
