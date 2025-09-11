"use client";
import clsx from "clsx";
import { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import style from "./popup.module.scss";

import { Overlay } from "../Overlay/Overlay";
import { ButtonClose } from "../../UI/Button/ButtonClose";

interface IPopup {
    active: boolean;
    closePopup: (item?: boolean) => void;
    title?: string;
    children: React.ReactNode | React.ReactNode[] | null;
    size?: "small" | "standart";
    zIndex?: number;
}
export const Popup: FC<IPopup> = ({
    active,
    closePopup,
    title,
    children,
    size,
    zIndex = 10,
}) => {
    return (
        <>
            <div
                style={{ zIndex: zIndex }}
                className={clsx(style.popup, active && style.popup_active)}
            >
                <div
                    style={{ zIndex: zIndex + 1 }}
                    className={clsx(
                        style.popup_container,
                        size === "small" && style.popup_container__small
                    )}
                >
                    <div className={style.popup_content + " container"}>
                        <div className={style.popup_content_top}>
                            <h2 className={style.popup_title}>{title}</h2>
                            <ButtonClose onClick={closePopup} />
                        </div>
                        <div className={style.content}>{children}</div>
                    </div>
                </div>
                <Overlay
                    zIndex={zIndex}
                    active={active}
                    setActive={closePopup}
                />
            </div>
        </>
    );
};
