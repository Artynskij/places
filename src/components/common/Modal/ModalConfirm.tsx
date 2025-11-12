import { Button } from "@/components/UI/Button/Button";
import style from "./modalConfirm.module.scss";

import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useState } from "react";
import { BlockExtraInfo } from "../BlockFunctional/BlockExtraInfo";
import { useAlertMessage } from "@/lib/context";

interface IProp {
    children: React.ReactNode | React.ReactNode[];
    handlerAction: () => void;
    title?: string;
    content?: string;
}

export const ModalConfirm = ({
    children,
    handlerAction,
    title = "Внимание!",
    content = "Вы действительно хотите удалить? Все данные будут утеряны или удалены",
}: IProp) => {
    const [activeModal, setActiveModal] = useState(false);
    const message = useAlertMessage();
    const closeModal = () => {
        setActiveModal(false);
    };

    const handleConfirm = () => {
        handlerAction();
        closeModal();
    };
    return (
        <>
            <div
                onClick={() => {
                    setActiveModal(true);
                }}
            >
                {children}
            </div>
            <ModalCustom
                closeModal={closeModal}
                active={activeModal}
                title={title}
                view="fit"
            >
                <div className={style.content}>
                    <BlockExtraInfo
                        variant="error"
                        text={content}
                        fontSize="16"
                    />
                    <span className={style.text}></span>
                    <div className={style.buttons}>
                        <Button
                            onClick={closeModal}
                            className={style.button}
                            text="Отмена"
                        />
                        <Button
                            onClick={handleConfirm}
                            type="light"
                            className={style.button}
                            text="Удалить"
                        />
                    </div>
                </div>
            </ModalCustom>
        </>
    );
};
