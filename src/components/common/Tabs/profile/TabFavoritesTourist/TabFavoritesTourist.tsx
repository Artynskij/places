"use client";

import { useEffect, useState } from "react";
import style from "./favoritesTourist.module.scss";
import { useTranslations } from "next-intl";
import { IFavoriteFront } from "@/lib/models";
import { SkeletonSlider } from "@/components/common/Skeleton/SkeletonSlider";
import { CardSliderMainPage } from "@/components/common/Cards";
import { useBaseUrl } from "@/lib/hooks/baseUrl/useBaseUrl";
import { useFavorites } from "@/lib/context/FavoriteContext/FavoriteContext";

export const TabFavoritesTourist = () => {
    const [favoritesData, setFavoritesData] = useState<IFavoriteFront[] | null>(
        []
    );
    const t = useTranslations("ProfilePage");
    const baseUrl = useBaseUrl();
    const { favorites } = useFavorites();
    useEffect(() => {
        console.log(favorites);
        setFavoritesData(favorites);
    }, [favorites]);

    return (
        <>
            <div className={style.favorite}>
                <h3 className={style.favorite_title}>
                    {t("favoritesTab.myFavorite")}
                </h3>
                <div className={style.favorite_content}>
                    <ul className={style.favorite_content_list}>
                        {!favoritesData ? (
                            <div>У вас нету отмеченных объектов</div>
                        ) : favoritesData.length > 0 ? (
                            favoritesData.map((fav, index) => {
                                return fav.establishment ? (
                                    <CardSliderMainPage
                                        key={fav.id}
                                        baseUrl={baseUrl}
                                        dataEstablishment={fav.establishment}
                                        locationId={
                                            fav.establishment.location.town.id
                                        }
                                    />
                                ) : (
                                    <div>тут не объекты</div>
                                );
                            })
                        ) : (
                            <SkeletonSlider />
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};
