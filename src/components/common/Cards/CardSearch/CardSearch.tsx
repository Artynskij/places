import style from "./cardSearch.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getUrlForUrl } from "@/lib/hooks/getUrlForSearch";
import { getTranslations } from "next-intl/server";

import { ISearchItemFront } from "@/lib/models";

import { CONSTANTS_SCREENS } from "@/asset/constants/ScreensConst";
import { CONSTANT_DEFAULT_IMAGE_URL } from "@/asset/constants/DefaultConstant";
import { ROUTES } from "@/lib/config/Routes";

import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import { LikeButton } from "@/components/common/ButtonFunctional/LikeButton";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { RateCafe } from "@/components/common/RateCustom/RateCafe";
import { RateHotel } from "@/components/common/RateCustom/RateHotel";
import { IconLocation } from "@/components/common/Icons";

interface ICardSearchDefault {
    dataCard: ISearchItemFront;
    baseUrl: string;
}

export const CardSearch = async ({ dataCard, baseUrl }: ICardSearchDefault) => {
    const linkData = getUrlForUrl(dataCard, dataCard.globalTypeEntity);
    const tCard = await getTranslations("SearchPage.card");
    
    const textCategory = dataCard.typeEstablishment
        ? tCard(`type.${[dataCard.typeEstablishment.key]}`)
        : tCard(`type.${[dataCard.globalTypeEntity]}`);

    return (
        <div className={style.card}>
            <div className={style.image}>
                <div className={style.image_type}>
                    <div className={style.image_type_text}>{textCategory}</div>

                    <ShareButton
                        baseUrl={baseUrl}
                        linkPage={linkData}
                        importTitle={dataCard.title}
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
                <Link className={style.image_link} href={linkData}>
                    <Image
                        loading="lazy"
                        className={style.image_image}
                        fill
                        src={
                            dataCard.media
                                ? `${dataCard.media.cdnHost}/${dataCard.media.mainImage}`
                                : CONSTANT_DEFAULT_IMAGE_URL
                        }
                        alt={"image search"}
                        sizes={`(max-width: ${CONSTANTS_SCREENS.SCREEN_PHONE}px) 90vw,(max-width: ${CONSTANTS_SCREENS.SCREEN_NETBOOK}px) 40vw, 33vw`}
                    />
                </Link>
            </div>
            <div className={style.description}>
                <div className={style.description_top}>
                    {dataCard.rate && (
                        <div className={style.description_rating}>
                            <RateMain
                                defaultValue={dataCard.rate}
                                disabled={true}
                            />
                        </div>
                    )}

                    <div className={style.description_title}>
                        <Link href={linkData}>
                            <span>{dataCard.title}</span>
                        </Link>
                    </div>
                </div>

                <div className={style.description_bottom}>
                    <div className={style.description_subtitle}>
                        {dataCard.globalTypeEntity === "establishment" &&
                            dataCard.typeEstablishment?.key === "EATER" && (
                                <>
                                    {/* <span className={style.rateHotel}> */}
                                    <span>Средний чек :</span>
                                    <RateCafe
                                        disabled
                                        classNameIcon={style.rateCafe}
                                        defaultValue={
                                            dataCard.priceCategory?.count || 0
                                        }
                                    />

                                    {/* </span> */}
                                </>
                            )}
                        {dataCard.globalTypeEntity === "establishment" &&
                            dataCard.typeEstablishment?.key ===
                                "ACCOMMODATION" && (
                                <>
                                    <span>Класс отеля :</span>
                                    <RateHotel
                                        disabled
                                        defaultValue={
                                            dataCard.starRating?.count || 0
                                        }
                                        classNameIcon={
                                            style.titleBlock_class_icon
                                        }
                                    />
                                </>
                            )}
                    </div>
                    {dataCard.location.town && (
                        <Link
                            href={ROUTES.LOCATION.LOCATION(
                                dataCard.location.town.id
                            )}
                            className={style.description_location}
                        >
                            <IconLocation
                                className={style.description_location_icon}
                            />

                            {`${dataCard.location.country?.title}, ` || ""}
                            {dataCard.location.town.title}
                        </Link>
                    )}
                    {dataCard.location.country && !dataCard.location.town && (
                        <Link
                            href={ROUTES.LOCATION.LOCATION(
                                dataCard.location.country.id
                            )}
                            className={style.description_location}
                        >
                            <IconLocation
                                className={style.description_location_icon}
                            />

                            {`${dataCard.location.country?.title}`}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
