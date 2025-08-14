import { FieldError } from "react-hook-form";
import style from "./photoBlock.module.scss";
import { useEffect, useState } from "react";
import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import Image from "next/image";
import { IconCancel } from "@/components/common/Icons";
import { UploadPhoto } from "@/components/common/Upload/UploadPhoto";
import { UploadFile } from "antd";
import { RcFile } from "antd/lib/upload";


interface Props {
    value: File[];
    onChange: (files: File[]) => void;
    error: FieldError | null;
}

const PhotoBlockForm = ({ value = [], onChange, error }: Props) => {
    const [activeModal, setActiveModal] = useState(false);
  
    const removeFile = (indexFile: number) => {
        if (!value) return;
        const newValue = [...value] as File[];
        newValue.splice(indexFile, 1); // удаляем строго по индексу
        onChange?.(newValue);
    };

    return (
        <>
            <UploadButton
                titleSpan="Прикрепление фотографии объекта*"
                accept="image"
                maxSizeMB={10}
                maxCount={100}
                value={value}
                onChange={onChange}
                error={error || null}
            />
            {/* <UploadPhoto
                value={value.map((file) => ({
                    uid: `${file.name} - ${file.lastModified}`,
                    ...file,
                }))}
                error={error || null}
                onChange={onChange}
            /> */}
            <div className={style.list}>
                {value.map((file, indexFile) => {
                    if (!file) return null;

                    return (
                        <div
                            className={style.list_item}
                            key={`${file.name}_${file.size}_${Date()}`}
                        >
                            <div className={style.list_item_iconDelete}>
                                <IconCancel
                                    onClick={() => removeFile(indexFile)}
                                    className={style.list_item_iconDelete_icon}
                                />
                            </div>

                            <Image
                                className={style.list_item_img}
                                alt={file.name}
                                fill
                                src={URL.createObjectURL(file)}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default PhotoBlockForm;
