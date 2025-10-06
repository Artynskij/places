import { FieldError } from "react-hook-form";
import style from "./photoBlock.module.scss";
import { useEffect, useState } from "react";
import { UploadButton } from "@/components/common/ButtonFunctional/UploadButton";
import Image from "next/image";
import { IconCancel } from "@/components/common/Icons";
import { Upload } from "antd";
import { UploadOutlined, StarOutlined, StarFilled } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { IMediaFront } from "@/lib/models";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";

interface Props {
    value: (UploadFile | undefined)[];
    onChange: (files: (UploadFile | undefined)[]) => void;
    error: FieldError | null;
}

const PhotoBlockForm = ({ value = [], onChange, error }: Props) => {
    // const handlerToStart = (indexFile: number) => {
    //     const newValue = [...value] as UploadFile[];
    //     newValue.unshift(newValue.splice(indexFile, 1)[0]);
    //     onChange?.(newValue);
    // };

    // const handlerRemove = (indexFile: number) => {
    //     if (!value) return;
    //     const newValue = [...value] as UploadFile[];
    //     newValue.splice(indexFile, 1); // удаляем строго по индексу
    //     onChange?.(newValue);
    // };

    return (
        <div className={style.photoBlock}>
            <Upload
                fileList={(value || []).filter(Boolean) as UploadFile[]}
                name="file"
                listType="picture-card"
                multiple
                beforeUpload={() => false} // чтобы не грузить сразу, а только при сабмите
                onChange={({ fileList }) => onChange(fileList)}
                itemRender={(originNode, file, fileList) => {
                    // const isMain = file === fileList[0];

                    return (
                        <div className={style.card}>
                            {originNode}{" "}
                            {/* 👈 тут сохраняется дефолтный preview + delete */}
                            {/* своя кнопка "сделать главной" */}
                            {/* <div
                                className={style.card_buttonMain}
                                style={{
                                    color: isMain ? "#fadb14" : "#999",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation(); 
                                    fileList.forEach((f, index) => {
                                        if (f.uid === file.uid) {
                                            handlerToStart(index);
                                        }
                                    });
                                    
                                }}
                            >
                                {isMain ? <StarFilled /> : <StarOutlined />}
                            </div> */}
                        </div>
                    );
                }}
            >
                <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Загрузить</div>
                </div>
            </Upload>
            {error && <SpanErrorForm text={error.message} />}
        </div>
    );
};

export default PhotoBlockForm;
