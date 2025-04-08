"use client";

import style from "./cardReview.module.scss";

import Image from "next/image";
import { RateMain } from "../../RateCustom/RateMain";
import { mockReviews } from "@/asset/mockData/mockReviews";
import { IEstablishmentResponse } from "@/lib/models/api/response";
import { IconLocation, IconThumbDown, IconThumbUp } from "../../Icons";
import { useState } from "react";
import { BlockLikeDislike } from "../../BlockFunctional/BlockLikeDislike";
import { IEstablishmentFront } from "@/lib/models";

interface ICardReview {
    review: (typeof mockReviews)[0];
    establishmentReview?: IEstablishmentFront | null;
    tRate: (value: string) => string;
}
export const CardReview = ({
    review,
    establishmentReview,
    tRate,
}: ICardReview) => {
    const [reactionLike, setReactionLike] = useState<"like" | "dislike" | null>(
        null
    );
    const handleLike = () => {
        reactionLike === "like"
            ? setReactionLike(null)
            : setReactionLike("like");
    };

    const handleDisLike = () => {
        reactionLike === "dislike"
            ? setReactionLike(null)
            : setReactionLike("dislike");
    };
    return (
        <div className={style.cardReview}>
            <div className={style.user}>
                <div className={style.user_left}>
                    <div className={style.user_avatar}>
                        <Image
                            width={50}
                            height={50}
                            alt="avatar"
                            src={review.user.avatar}
                        />
                    </div>
                    <div className={style.user_info}>
                        <div className={style.user_name}>
                            <span>{review.user.name}</span> {"написал(a) отзыв"}
                        </div>
                        <div className={style.user_status}>
                            {review.user.status.value}
                        </div>
                        <div className={style.user_dateReview}>
                            {review.review.dateReview}
                        </div>
                    </div>
                </div>
                <div className={style.user_right}>
                    <BlockLikeDislike />
                    {/* <div className={`${reactionLike === "like" && style.reaction_like}`}>
            <IconThumbUp onClick={handleLike} className={style.reaction_icon} />
          </div>
          <div
            onClick={handleDisLike}
            className={`${reactionLike === "dislike" && style.reaction_dislike}`}
          >
            <IconThumbDown className={style.reaction_icon} />
          </div> */}
                </div>
            </div>
            {review.review.album && (
                <div className={style.album}>
                    {review.review.album.map((image, index) => (
                        <div className={style.album_image} key={index}>
                            <Image
                                width={200}
                                height={200}
                                src={image}
                                alt="album Item"
                            />
                        </div>
                    ))}
                </div>
            )}

            <div className={style.reviewBody}>
                <div className={style.reviewBody_mainRate}>
                    <RateMain
                        disabled
                        defaultValue={review.review.rating.rate}
                    />
                </div>

                <div className={style.reviewBody_title}>
                    {review.review.title}
                </div>
                <div className={style.reviewBody_description}>
                    {review.review.description}
                </div>
                <div className={style.reviewBody_dateVisit}>
                    Дата посещения: {review.review.dateVisit}
                </div>
                <div className={style.reviewBody_additionalRate}>
                    {Object.entries(review.review.rating.additional).map(
                        ([key, value]) => (
                            <div
                                className={style.reviewBody_additionalRate_rate}
                                key={key}
                            >
                                <RateMain disabled defaultValue={value} />
                                <label>{tRate(key)}</label>
                            </div>
                        )
                    )}
                </div>
            </div>
            {establishmentReview && (
                <div className={style.establishment}>
                    <div className={style.establishment_image}>
                        <Image
                            alt={establishmentReview.media.gallery[0].title}
                            src={`${establishmentReview.media.cdnHost}/${establishmentReview.media.gallery[0].blobPath}`}
                            width={establishmentReview.media.gallery[0].width}
                            height={establishmentReview.media.gallery[0].height}
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
                            <span>{establishmentReview.location.street}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
