"use client";

import { FC, useState } from "react";
// import { ImageDefault } from "../../Image/Image";
import style from "./cardInfo.module.scss";
import { Popup } from "../../Popup/Popup";
import Image, { StaticImageData } from "next/image";
import { IconArrowRight } from "../../Icons/IconArrowRight/ArrowRightIcon";
import { IDataCardInfo } from "@/types/ICards";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ICardInfo {
  data: IDataCardInfo;
  activeParam: boolean;
  titleText: string;
  seeMoreText: string;
}

export const CardInfo: FC<ICardInfo> = ({ data, activeParam, titleText,seeMoreText }) => {
  const [active, setActive] = useState<boolean>(activeParam);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  function openPopup() {
    setActive(true);
    router.push(`${pathname}?popup=${data.value}`, { scroll: false });
  }

  return (
    <>
      <div onClick={openPopup} className={style.card}>
        <div className={style.card_title}>{titleText}</div>
        <div className={style.card_subtitle}>
          <div>{seeMoreText}</div>
          <IconArrowRight className={style.card_subtitle_icon} />
        </div>

        <Image
          className={style.card_icon_default}
          width={data.iconDefault.width}
          height={data.iconDefault.height}
          src={data.iconDefault.src}
          alt="iconDefault"
        />

        <Image
          className={style.card_icon_active}
          width={data.iconActive.width}
          height={data.iconActive.height}
          src={data.iconActive.src}
          alt="iconActive"
        />

        <div className={style.card_bg}></div>
      </div>
      <Popup
        data={{ title: titleText, body: data.body }}
        active={active}
        setActive={setActive}
      />
    </>
  );
};
