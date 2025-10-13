import { Button } from "@/components/UI/Button/Button";
import style from "./modalConfirm.module.scss";

import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { useState } from "react";
import { BlockExtraInfo } from "../BlockFunctional/BlockExtraInfo";
import { message } from "antd";

interface IProp {
    children: React.ReactNode | React.ReactNode[];
    handlerAction: () => void;
    textSpan?: string;
}

export const ModalConfirm = ({
    children,
    handlerAction,
    textSpan = "Вы действительно хотите удалить? Все данные будут утеряны или удалены",
}: IProp) => {
    const [activeModal, setActiveModal] = useState(false);
    const closeModal = () => {
        setActiveModal(false);
    };

    const handleConfirm = () => {
          message.success("Пока удаление невозможно");
        // handlerAction();
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
                title="Внимание!"
                view="fit"
            >
                <div className={style.content}>
                    <BlockExtraInfo
                        variant="error"
                        text={textSpan}
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
