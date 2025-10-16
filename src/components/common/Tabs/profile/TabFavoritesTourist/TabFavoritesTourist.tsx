"use client";

import { useEffect, useState } from "react";
import style from "./favoritesTourist.module.scss";
import { useTranslations } from "next-intl";
import { IEstablishmentFront } from "@/lib/models";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";
import { CardSliderMainPage } from "@/components/common/Cards";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";
import { useFavorites } from "@/lib/context/FavoriteContext/FavoriteContext";

export const TabFavoritesTourist = () => {
    const [establishments, setEstablishments] = useState<
        IEstablishmentFront[] | null
    >(null);
    const t = useTranslations("ProfilePage");
    const baseUrl = useBaseUrl();
    const { favorites } = useFavorites();
    useEffect(() => {
        console.log(favorites);
        setTimeout(() => {
            setEstablishments([]);
        }, 2000);
    }, [favorites]);

    return (
        <>
            <div className={style.favorite}>
                <h3 className={style.favorite_title}>
                    {t("favoritesTab.myFavorite")}
                </h3>
                <div className={style.favorite_content}>
                    <ul className={style.favorite_content_list}>
                        {!establishments ? (
                            <SkeletonSlider />
                        ) : establishments.length > 0 ? (
                            establishments.map((establishment, index) => {
                                return (
                                    <CardSliderMainPage
                                        key={establishment.id}
                                        baseUrl={baseUrl}
                                        dataEstablishment={establishment}
                                        locationId={
                                            establishment.location.town.id
                                        }
                                    />
                                );
                            })
                        ) : (
                            <div>У вас нету отмеченных объектов</div>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};
