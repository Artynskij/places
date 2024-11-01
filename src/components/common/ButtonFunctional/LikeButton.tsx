"use client";
import { FC, useState } from "react";
import { IconLike } from "../Icons";
import style from "./buttonFunctional.module.scss";
interface ILikeButton {
  classNameIcon?: string;
  classNameButton?: string;
  textButton?: string;
  classNameButtonActive?: string;
  callback?: (value: boolean) => void;
  liked: boolean;
}
export const LikeButton: FC<ILikeButton> = ({
  classNameIcon,
  classNameButton,
  classNameButtonActive,
  textButton,
  liked,
  callback,
}) => {
  const [activeLike, setActiveLike] = useState<boolean>(liked);
  function clickLike(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    if (callback) {
      callback(!activeLike);
    }
    setActiveLike(!activeLike);
  }
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
