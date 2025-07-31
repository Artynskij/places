"use client";
import style from "./avatarBlock.module.scss";
import { CONSTANT_DEFAULT_AVATAR_URL } from "@/asset/constants/DefaultConstant";
import { DeleteButton } from "@/components/common/ButtonFunctional/DeleteButton";
import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import { IconDelete, IconEdit } from "@/components/common/Icons";
import { Button } from "@/components/UI/Button/Button";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import Image from "next/image";
import { useState } from "react";
import { FieldError } from "react-hook-form";

interface Props {
    typeUser?: "owner" | "tourist";
    value?: (File | undefined)[];
    onChange?: (files: File[]) => void;
    error: FieldError | null;
    serverPhotoUrl?: string | null;
    handlerDeleteAvatar: () => void;
}
export const AvatarBlockForm = ({
    value,
    onChange,
    error,
    serverPhotoUrl,
    handlerDeleteAvatar,
    typeUser = "tourist",
}: Props) => {
    const [activeModal, setActiveModal] = useState(false);
    const handlerOpenModal = () => {
        setActiveModal(true);
    };
    const handlerCloseModal = () => {
        setActiveModal(false);
    };
    const propsUser =
        typeUser === "owner"
            ? {
                  width: 96,
                  height: 96,
              }
            : { width: 250, height: 250 };
    return (
        <>
            {/* <Image
                className={style.avatar_img}
                width={250}
                height={250}
                alt="avatar"
                src={serverPhotoUrl || CONSTANT_DEFAULT_AVATAR_URL}
            /> */}
            {/* <div className={style.buttons}> */}
            <IconEdit
                className={style.buttons_edit}
                onClick={handlerOpenModal}
            />
            <IconDelete
                className={style.buttons_delete}
                onClick={handlerDeleteAvatar}
            />
            {/* <DeleteButton  /> */}
            {/* </div> */}

            <ModalCustom
                closeModal={handlerCloseModal}
                active={activeModal}
                title={"Загрузка аватарки"}
                view="middle"
            >
                <div className={style.upload}>
                    <div
                        style={{
                            width: propsUser.width,
                            height: propsUser.height,
                        }}
                        className={style.upload_preload}
                    >
                        {value && value.length > 0 ? (
                            <Image
                                className={style.upload_preload_image}
                                fill
                                alt="avatar"
                                src={URL.createObjectURL(value[0] as Blob)}
                            />
                        ) : (
                            <span>Рамка аватарки</span>
                        )}
                    </div>
                    <UploadButton
                        type="box"
                        titleSpan="Загрузить Аватар"
                        // titleButton={
                        //     personData.avatarImg
                        //         ? "Изменить фотографию"
                        //         : "Добавить фотографию"
                        // }
                        accept="image"
                        value={value}
                        maxCount={1}
                        onChange={onChange}
                        error={error || null}
                        className={style.upload_dragger}
                    />
                    <Button
                        onClick={handlerCloseModal}
                        className={style.upload_accept}
                        text="Подтвердить"
                    />
                </div>
                {error && <SpanErrorForm text={error.message} />}
            </ModalCustom>
        </>
    );
};
