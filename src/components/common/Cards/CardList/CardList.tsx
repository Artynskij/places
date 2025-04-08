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

interface ICardHotelList {
    dataEstablishment: IEstablishmentFront;
    // cdnName: string;
    langUI: string;
}
export const CardList: FC<ICardHotelList> = ({ dataEstablishment, langUI }) => {
    // if (!data.content) return null;
    return (
        <div className={style.card}>
            <div className={style.image}>
                <div className={style.image_type}>
                    <div className={style.image_type_text}>
                        {dataEstablishment.category || "false"}
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
                    href={`/belarus/minskoblast/minsk/${dataEstablishment.id}`}
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
                        href={`/belarus/minskoblast/minsk/${dataEstablishment.id}`}
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
                    <span>{dataEstablishment.rates.count}</span>
                    <span>отзывов</span>
                </div>
                {
                    <div className={style.description_subtitle}>
                        {dataEstablishment.typeEstablishment === "EATER" && (
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
                        {dataEstablishment.typeEstablishment ===
                            "ACCOMMODATION" && (
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
                    {dataEstablishment.location.street}
                </div>

                <div className={style.info_description}>
                    {dataEstablishment.description}
                </div>
            </div>
        </div>
    );
};
