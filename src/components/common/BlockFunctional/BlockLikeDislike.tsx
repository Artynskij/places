"use client";

import style from "./blockFunctional.module.scss";

import { IconThumbDown, IconThumbUp } from "../Icons";
import { useState } from "react";

export const BlockLikeDislike = () => {
  const [reactionLike, setReactionLike] = useState<"like" | "dislike" | null>(
    null
  );
  const handleLike = () => {
    reactionLike === "like" ? setReactionLike(null) : setReactionLike("like");
  };

  const handleDisLike = () => {
    reactionLike === "dislike"
      ? setReactionLike(null)
      : setReactionLike("dislike");
  };
  return (
    <div className={style.blockLikeDislike}>
      <div className={`${reactionLike === "like" && style.blockLikeDislike_like}`}>
        <IconThumbUp onClick={handleLike} className={style.blockLikeDislike_icon} />
      </div>
      <div
        onClick={handleDisLike}
        className={`${reactionLike === "dislike" && style.blockLikeDislike_dislike}`}
      >
        <IconThumbDown className={style.blockLikeDislike_icon} />
      </div>
    </div>
  );
};
