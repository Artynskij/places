"use client";
import { FC } from "react";
import style from "./blockFunctional.module.scss";
import Image from "next/image";
interface IBlockReaction {
  reactions: number[];
}
export const BlockReaction: FC<IBlockReaction> = ({ reactions }) => {
  const emojiCollection = [
    "/icons/emoji/like-emoji.svg",
    "/icons/emoji/smile-emoji.svg",
    "/icons/emoji/normal-emoji.svg",
    "/icons/emoji/sad-emoji.svg",
    "/icons/emoji/dislike-emoji.svg",
  ];

  return (
    <div className={style.blockReaction}>
      <div className={style.blockReaction_title}>Оценить: </div>
      <div className={style.blockReaction_list}>
        {reactions.map((count, index) => {
          return (
            <div key={index} className={style.blockReaction_list_item}>
              <Image
                className={style.item_img}
                alt="icon"
                width={30}
                height={30}
                src={emojiCollection[index]}
              />

              <div className={style.item_count}>{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
