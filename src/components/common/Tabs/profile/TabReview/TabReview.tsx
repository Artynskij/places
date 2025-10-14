"use client";
import { mockTourist } from "@/asset/mockData/mockTourist";
import style from "./tabReview.module.scss";
import { mockReviews } from "@/asset/mockData/mockReviews";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { IEstablishmentFront, IEstablishmentRateFront } from "@/lib/models";

import { CardReview } from "@/components/common/Cards/CardReview/CardReview";
import { EstablishmentService } from "@/lib/Api/(Establishment)/establishment/establishment.service";
import { useUser } from "@/lib/context/UserContext/UserContext";

interface ITabReview {}
const TabReview = ({}: ITabReview) => {
    // const reviewsData = mockReviews.filter(
    //     (item) => item.user.username === dataUser.username
    // );
    const { user, loadingUser } = useUser();
    const tRate = useTranslations("Rates");
    const establishmentService = new EstablishmentService();
    const [reviewsData, setReviewsData] = useState<
        IEstablishmentRateFront[] | null
    >(null);
    useEffect(() => {
        if (!user) return;
        establishmentService
            .getAllRatesReview({
                page: 1,
                limit: 100,
                personIds: [user.id],
            })
            .then((res) => {
                if (res) {
                    console.log(res.rates);
                    setReviewsData(res.rates);
                }
            });

        // establishmentService
        //     .getById("01JJ221DJARES4ATVV9G6Y2GNT", "ru")
        //     .then((res) => {
        //         setEstablishmentReview(res);
        //     });
    }, [loadingUser]);
    return (
        <div className={style.review_content}>
            {reviewsData && reviewsData.map((review, index) => {
                return (
                    <CardReview
                        key={index}
                        // establishmentReview={review}
                        review={review}
                    />
                );
            })}
        </div>
    );
};

export default TabReview;
