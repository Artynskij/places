"use client";

import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import style from "./modalCustom.module.scss";
import { ButtonClose } from "../Button/ButtonClose";
import { Overlay } from "@/components/common/Overlay/Overlay";

interface IModalProps {
    active: boolean;
    closeModal: (prop?: boolean) => void;
    children: React.ReactNode;
    title?: string;
    view?: "over" | "small" | "middle" | "big" | "fit";
    zIndex?: number;
}

export const ModalCustom: FC<IModalProps> = ({
    closeModal,
    active,
    children,
    title,
    view = "small",
    zIndex = 10,
}) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const viewModal = {
        over: style.view_content_over,
        big: style.view_content_big,
        middle: style.view_content_middle,
        small: style.view_content_small,
        fit: style.view_content_fit,
    };
    if (!mounted) return null;
    // if (typeof window === "undefined") return null;

    return createPortal(
        <>
            <div
                className={`${style.modal} ${active ? style.modal_active : ""}`}
                style={{ zIndex }}
            >
                <div className={`${style.modal_content} ${viewModal[view]}`}>
                    <div className={style.modal_content_title}>
                        <h4>{title}</h4>
                        <ButtonClose
                            className={style.modal_close}
                            onClick={() => closeModal(false)}
                        />
                    </div>
                    <div className={style.modal_content_children}>
                        {children}
                    </div>
                </div>
            </div>
            <Overlay
                setActive={closeModal}
                active={active}
                zIndex={zIndex - 1}
            />
        </>,

        document.body
    );
};
