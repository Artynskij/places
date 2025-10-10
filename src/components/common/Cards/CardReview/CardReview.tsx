"use client";

import style from "./cardReview.module.scss";

import Image from "next/image";
import { RateMain } from "../../RateCustom/RateMain";
import { mockReviews } from "@/asset/mockData/mockReviews";

import { IconLocation, IconThumbDown, IconThumbUp } from "../../Icons";
import { useState } from "react";
import { BlockLikeDislike } from "../../BlockFunctional/BlockLikeDislike";
import { IEstablishmentFront, IEstablishmentRateFront } from "@/lib/models";
import { useTranslations } from "next-intl";
import {
    CONSTANT_DEFAULT_AVATAR_URL,
    CONSTANT_DEFAULT_IMAGE_URL,
} from "@/asset/constants/DefaultConstant";
import { getFormatDate } from "@/lib/helpers/getFormatDate";

interface ICardReview {
    review: IEstablishmentRateFront;
    // establishmentReview?: IEstablishmentFront | null;
    // tRate: (value: string) => string;
}
export const CardReview = ({
    review,
}: // tRate,
ICardReview) => {
    const tRate = useTranslations("Rates");
    const mainRate = review.rates.find((item) => item.key === "Rate");
    const additionalRates = review.rates.filter((item) => item.key !== "Rate");
    const establishmentReview = review.establishment;
    const gallery = establishmentReview?.media.gallery || null;
    return (
        <div className={style.cardReview}>
            <div className={style.user}>
                <div className={style.user_left}>
                    <div className={style.user_avatar}>
                        <Image
                            width={50}
                            height={50}
                            alt="avatar"
                            src={
                                review.person.avatar.touristImageSrc ||
                                CONSTANT_DEFAULT_AVATAR_URL
                            }
                        />
                    </div>
                    <div className={style.user_info}>
                        <div className={style.user_name}>
                            <span>{review.person.personName?.fullName}</span>{" "}
                            {"написал(a) отзыв"}
                        </div>

                        <div className={style.user_dateReview}>
                            {getFormatDate(review.CreatedDate)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.reviewBody}>
                <div className={style.reviewBody_mainRate}>
                    <RateMain disabled defaultValue={mainRate?.value || 0} />
                </div>

                <div className={style.reviewBody_title}>
                    {/* {review.review.title} */}
                </div>
                <div className={style.reviewBody_description}>
                    {/* {review.review.description} */}
                </div>
                <div className={style.reviewBody_dateVisit}>
                    Дата посещения: {getFormatDate(review.PersonsVisitDate)}
                </div>
                <div className={style.reviewBody_additionalRate}>
                    {additionalRates.map((rate) => (
                        <div
                            className={style.reviewBody_additionalRate_rate}
                            key={rate.key}
                        >
                            <RateMain disabled defaultValue={rate.value} />
                            <label>{tRate(rate.key)}</label>
                        </div>
                    ))}
                </div>
            </div>
            {establishmentReview && (
                <div className={style.establishment}>
                    <div className={style.establishment_image}>
                        <Image
                            alt={gallery ? gallery[0].title : "image"}
                            src={
                                gallery
                                    ? gallery[0].src
                                    : CONSTANT_DEFAULT_IMAGE_URL
                            }
                            width={gallery ? gallery[0].width : 300}
                            height={gallery ? gallery[0].height : 200}
                        />
                    </div>
                    <div className={style.establishment_right}>
                        <div className={style.establishment_rate}>
                            <RateMain
                                disabled
                                defaultValue={Number(
                                    establishmentReview.rates.main
                                )}
                            />
                            <span>{`(${establishmentReview.rates.count} отзывов)`}</span>
                        </div>

                        <div className={style.establishment_title}>
                            {establishmentReview.title}
                        </div>
                        <div className={style.establishment_location}>
                            <IconLocation />
                            <span>{establishmentReview.location.street} {establishmentReview.location.town.title} {establishmentReview.location.country.title}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
