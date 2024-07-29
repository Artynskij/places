"use client";

import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./popup.module.scss";


import { Overlay } from "../Overlay/Overlay";
import { ButtonClose } from "../Button/ButtonClose";


interface IPopup {
  active: boolean;
  setActive: (value: boolean) => void;
  data: {
    title: string;
    body: string;
  };
}
export const Popup: FC<IPopup> = ({ active, setActive, data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function closePopup(_item?: boolean) {
    setActive(false);
    const params = new URLSearchParams(searchParams);
    params.delete("popup");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  // function createMarkup() {
  //   return { __html: data.body };
  // }

  return (
    <div className={style.popup + (active ? " " + style.popup_active : "")}>
      <div className={style.popup_container}>
        <div className={style.popup_content + " container"}>
          <div className={style.popup_content_top}>
            <h2 className={style.popup_title}>{data.title}</h2>
            <ButtonClose onClick={closePopup} />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.body }}
            className={style.content}
          ></div>

          {/* {data.body} */}
        </div>
      </div>
      {/* {active ? <ScrollLock /> : ""} */}
      <Overlay active={active} setActive={closePopup} />
    </div>
  );
};
