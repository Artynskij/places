import { FC, useState } from "react";
import style from "./cardList.module.scss";
import Image from "next/image";
import { IconLike, IconLocation } from "@/components/common/Icons";
import { RateCustom } from "@/components/common/RateCustom/RateCustom";
import { IconShare } from "@/components/common/Icons/IconShare/IconShare";
import { ShareButton } from "@/components/common/ButtonFunctional/ShareButton";
import Link from "next/link";
interface ICardHotelList {
  id: number;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  type: string;
  img: string;
  additional: string;
  description: string;
  coord: {
    lat: string;
    lon: string;
  };
  liked: boolean;
}

export const CardList: FC<ICardHotelList> = ({
  img,
  location,
  rating,
  reviews,
  title,
  type,
  additional,
  description,
  liked = false,
}) => {
  const [activeLike, setActiveLike] = useState<boolean>(liked);
  function clickLike(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    setActiveLike(!activeLike);
  }
  return (
    <Link
      href={"/kazahstan/almatydistrict/almaty/objectTest"}
      className={style.card}
    >
      <div className={style.image_ctn}>
        <div className={style.image_type}>
          <div className={style.image_type_text}>{type}</div>
          <div className={style.image_type_icon}>
            <ShareButton
              linkPage="https://www.lipsum.com/"
              classNameIcon={style.image_type_icon_icon}
            />
          </div>
          <div onClick={clickLike} className={style.image_type_icon}>
            <IconLike
              active={activeLike}
              className={style.image_type_icon_icon}
            />
          </div>
        </div>
        <Image
          loading="lazy"
          className={style.image_image}
          width={448}
          height={220}
          src={img}
          alt={img}
        />
      </div>
      <div className={style.info_ctn}>
        <div className={style.info_title}>{title}</div>
        <div className={style.info_rating}>
          <RateCustom defaultValue={rating} disabled={true} />

          <span>{rating}</span>
          <span>-</span>
          <span>{reviews}</span>
          <span>отзывов</span>
        </div>
        {additional && <div className={style.info_subtitle}>{additional}</div>}
        <div className={style.info_location}>
          <IconLocation className={style.info_location_icon} />
          {location}
        </div>

        <div className={style.info_description}>{description}</div>
      </div>
    </Link>
  );
};
