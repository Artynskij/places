"use client";
import React, { FC, useMemo, useCallback } from "react";
import { IconLike } from "../Icons";
import style from "./buttonFunctional.module.scss";
import { FavoriteService } from "@/lib/Api/favorite/favorite.service";
import { useFavorites } from "@/lib/context/FavoriteContext/FavoriteContext";
import clsx from "clsx";
interface ILikeButton {
    classNameIcon?: string;
    classNameButton?: string;
    textButton?: string;
    classNameButtonActive?: string;
    // callback?: (value: boolean) => void;
    liked: boolean;
    idEstablishment: string;
}

export const LikeButton = React.memo<ILikeButton>(
    ({
        classNameIcon,
        classNameButton,
        classNameButtonActive,
        textButton,
        idEstablishment,
    }) => {
        const { toggleFavorite, favorites } = useFavorites();

        const activeLike = useMemo(
            () => favorites.some((item) => item.ItemId === idEstablishment),
            [favorites, idEstablishment]
        );

        const clickLike = useCallback(
            async (e: React.MouseEvent<HTMLDivElement>) => {
                e.preventDefault();
                await toggleFavorite(idEstablishment);
            },
            [toggleFavorite, idEstablishment]
        );

        return (
            <div
                onClick={clickLike}
                className={clsx(
                    classNameButton,
                    style.like,
                    activeLike && classNameButtonActive
                )}
            >
                <IconLike active={activeLike} className={classNameIcon} />
                {textButton && <span>{textButton}</span>}
            </div>
        );
    }
);
LikeButton.displayName = "LikeButton";
