"use client";
import { mockTourist } from "@/asset/mockData/mockTourist";
import style from "./tabReview.module.scss";
import { mockReviews } from "@/asset/mockData/mockReviews";
import Image from "next/image";
import { RateMain } from "@/components/common/RateCustom/RateMain";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { IEstablishmentFront } from "@/lib/models";
import { IEstablishmentResponse } from "@/lib/models/api/response";
import { CardSliderMainPage } from "@/components/common/Cards";
import { IconLocation } from "@/components/common/Icons";
import { CardReview } from "@/components/common/Cards/CardReview/CardReview";
import { EstablishmentService } from "@/lib/Api/establishment/establishment.service";
interface ITabReview {
    dataUser: (typeof mockTourist)[0];
}
const TabReview = ({ dataUser }: ITabReview) => {
    const reviewsData = mockReviews.filter(
        (item) => item.user.username === dataUser.username
    );
    const tRate = useTranslations("Rates");
    const [establishmentReview, setEstablishmentReview] =
        useState<IEstablishmentFront | null>(null);
    useEffect(() => {
        const api = new EstablishmentService();
        api.getEstablishmentById("01JJ221DJARES4ATVV9G6Y2GNT", "ru").then(
            (res) => {
                setEstablishmentReview(res);
            }
        );
    }, []);
    return (
        <div className={style.review_content}>
            {reviewsData.map((review, index) => {
                // return (
                //   <div key={index} className={style.cardReview}>
                //     <div className={style.user}>
                //       <div className={style.user_avatar}>
                //         <Image
                //           width={50}
                //           height={50}
                //           alt="avatar"
                //           src={review.user.avatar}
                //         />
                //       </div>
                //       <div className={style.user_right}>
                //         <div className={style.user_name}>
                //           <span>{review.user.name}</span> {"написал(a) отзыв"}
                //         </div>
                //         <div className={style.user_status}>
                //           {review.user.status.value}
                //         </div>
                //         <div className={style.user_dateReview}>
                //           {review.review.dateReview}
                //         </div>
                //       </div>
                //     </div>
                //     {review.review.album && (
                //       <div className={style.album}>
                //         {review.review.album.map((image, index) => (
                //           <div className={style.album_image} key={index}>
                //             <Image
                //               width={200}
                //               height={200}
                //               src={image}
                //               alt="album Item"
                //             />
                //           </div>
                //         ))}
                //       </div>
                //     )}

                //     <div className={style.reviewBody}>
                //       <div className={style.reviewBody_mainRate}>
                //         <RateMain disabled defaultValue={review.review.rating.rate} />
                //       </div>

                //       <div className={style.reviewBody_title}>
                //         {review.review.title}
                //       </div>
                //       <div className={style.reviewBody_description}>
                //         {review.review.description}
                //       </div>
                //       <div className={style.reviewBody_dateVisit}>
                //         Дата посещения: {review.review.dateVisit}
                //       </div>
                //       <div className={style.reviewBody_additionalRate}>
                //         {Object.entries(review.review.rating.additional).map(
                //           ([key, value]) => (
                //             <div
                //               className={style.reviewBody_additionalRate_rate}
                //               key={key}
                //             >
                //               <RateMain disabled defaultValue={value} />
                //               <label>{tRate(key)}</label>
                //             </div>
                //           )
                //         )}
                //       </div>
                //     </div>
                //     {dataEst && (
                //       <div className={style.establishment}>
                //         <div className={style.establishment_image}>
                //           <Image
                //             alt={
                //               dataEst.establishment.content.media.gallery[0].details[0]
                //                 .value.title
                //             }
                //             src={`${dataEst.cdnHost}/${dataEst.establishment.content.media.gallery[0].blobPath}`}
                //             width={dataEst.establishment.content.media.gallery[0].width}
                //             height={
                //               dataEst.establishment.content.media.gallery[0].height
                //             }
                //           />
                //         </div>
                //         <div className={style.establishment_right}>
                //           <div className={style.establishment_rate}>
                //             <RateMain
                //               disabled
                //               defaultValue={Number(
                //                 dataEst.establishment.establishment.Rates.Rate
                //               )}
                //             />
                //             <span>{`(${dataEst.establishment.establishment.Rates.Count} отзывов)`}</span>
                //           </div>

                //           <div className={style.establishment_title}>
                //             {dataEst.establishment.content.value[0].value.details.title}
                //           </div>
                //           <div className={style.establishment_location}>
                //             <IconLocation />
                //             <span>
                //               {
                //                 dataEst.establishment.content.value[0].value.location
                //                   .street1
                //               }
                //             </span>
                //           </div>
                //         </div>
                //       </div>
                //     )}
                //   </div>
                // );
                return (
                    <CardReview
                        key={index}
                        establishmentReview={establishmentReview}
                        review={review}
                        // tRate={tRate}
                    />
                );
            })}
        </div>
    );
};

export default TabReview;
