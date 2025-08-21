import { FC } from "react";

import style from "./modalCustom.module.scss";
import { ButtonClose } from "../Button/ButtonClose";
import { Overlay } from "@/components/common/Overlay/Overlay";

interface IModalProps {
    active: boolean;
    closeModal: (prop?: boolean) => void;
    children: React.ReactNode | React.ReactNode[] | null;
    title?: string;
    view?: "over" | "small" | "middle" | "big" | 'fit';
}

export const ModalCustom: FC<IModalProps> = ({
    closeModal,
    active,
    children,
    title,
    view = "small",
}) => {
    const viewModal: {
        over: string;
        big: string;
        middle: string;
        small: string;
        fit:string;
    } = {
        over: style.view_content_over,
        big: style.view_content_big,
        middle: style.view_content_middle,
        small: style.view_content_small,
        fit: style.view_content_fit,
    };

    return (
        <>
            <div
                className={`${style.modal}  ${
                    active ? " " + style.modal_active : ""
                }`}
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
            <Overlay setActive={closeModal} active={active} />
        </>
    );
};
