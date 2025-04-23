"use client";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import style from "./descriptionBlock.module.scss";
import { FC, useState } from "react";
import { Button } from "@/components/UI/Button/Button";
interface IDescriptionBlock {
    description: string;
}
const DescriptionBlock: FC<IDescriptionBlock> = ({ description }) => {
    const [modalDetails, setModalDetails] = useState<boolean>(false);

    return (
        <>
            <h4>Описание</h4>

            <div className={style.info_description}>
                <div className={style.info_description_text}>{description}</div>

                <Button
                    onClick={() => setModalDetails(!modalDetails)}
                    className={style.button_queryList}
                    type="light"
                    text="Подробнее"
                />
            </div>
            <ModalCustom
                setActive={setModalDetails}
                active={modalDetails}
                title="Описание"
            >
                <div>{description}</div>
            </ModalCustom>
        </>
    );
};
export default DescriptionBlock;
