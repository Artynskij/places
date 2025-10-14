"use client";
import { FC, useEffect, useState } from "react";
import { IconLike } from "../Icons";
import style from "./buttonFunctional.module.scss";
import { FavoriteService } from "@/lib/Api/favorite/favorite.service";
import { useFavorites } from "@/lib/context/FavoriteContext/FavoriteContext";
interface ILikeButton {
    classNameIcon?: string;
    classNameButton?: string;
    textButton?: string;
    classNameButtonActive?: string;
    // callback?: (value: boolean) => void;
    liked: boolean;
    idEstablishment: string;
}
export const LikeButton: FC<ILikeButton> = ({
    classNameIcon,
    classNameButton,
    classNameButtonActive,
    textButton,

    idEstablishment,
}) => {
    // const favoriteService = new FavoriteService();
    const { favorites, toggleFavorite } = useFavorites();
    const [activeLike, setActiveLike] = useState<boolean>(false);
    useEffect(() => {
        setActiveLike(
            !!favorites.find((item) => item.ItemId === idEstablishment)
        );
    }, [favorites]);
    const clickLike = async (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (activeLike) {
        }
        setActiveLike(!activeLike);
    };
    return (
        <div
            onClick={clickLike}
            className={`${classNameButton} ${style.like} ${
                activeLike && classNameButtonActive
            }`}
        >
            <IconLike active={activeLike} className={classNameIcon} />
            {textButton && <span>{textButton}</span>}
        </div>
    );
};
