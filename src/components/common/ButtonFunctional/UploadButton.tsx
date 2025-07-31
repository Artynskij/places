"use client";
import React, { useState } from "react";
import style from "./buttonFunctional.module.scss";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useAlertMessage } from "@/lib/context";
import { FieldError, useFormContext } from "react-hook-form";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";

const { Dragger } = Upload;

interface Props {
    titleSpan: string;
    titleButton?: string;
    titleHelp?: string;
    accept?: "image" | "doc" | "video" | "all"; // MIME типы: "image/*", ".pdf,.docx", и т.п.
    maxSizeMB?: number; // Ограничение размера (в МБ)
    maxCount?: number; // Кол-во файлов
    multiple?: boolean;
    action?: string; // URL для загрузки
    onSuccess?: (file: File, response: any) => void;
    onError?: (file: File, error: any) => void;
    disabled?: boolean;
    value?: (File | undefined)[];
    onChange?: (files: File[]) => void;
    error: FieldError | null;
    type?: "box" | "avatar";
    className?: string;
}

export const UploadButton: React.FC<Props> = ({
    accept = "all",
    maxSizeMB,
    maxCount = 5,
    multiple = true,
    onSuccess,
    onError,
    disabled = false,
    onChange,
    error,

    type = "box",
    className,
}) => {
    const message = useAlertMessage();

    const ACCEPT_MIME_MAP: Record<NonNullable<Props["accept"]>, string> = {
        image: ".jpg,.jpeg,.png,.webp,.gif,.svg",
        doc: ".pdf,.doc,.docx,.txt,.rtf",
        video: ".mp4,.webm,.ogg,.mov,.avi,.mkv",
        all: "*/*",
    };
    const maxSize: Record<NonNullable<Props["accept"]>, number> = {
        image: 5,
        doc: 10,
        video: 10000,
        all: 100,
    };
    const resolvedAccept = accept ? ACCEPT_MIME_MAP[accept] : undefined;

    const checkFileType = (file: RcFile, accept?: string): boolean => {
        if (!accept) return true;

        const acceptedTypes = accept
            .split(",")
            .map((type) => type.trim().toLowerCase());

        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
        const mimeType = file.type.toLowerCase();

        return acceptedTypes.some((type) => {
            if (type.startsWith(".")) {
                return type === fileExtension;
            }
            if (type.endsWith("/*")) {
                const baseType = type.split("/")[0];
                return mimeType.startsWith(baseType + "/");
            }
            return type === mimeType;
        });
    };

    const props: UploadProps = {
        name: "file",
        multiple,

        accept: resolvedAccept,
        maxCount,
        disabled,
        beforeUpload(file: RcFile) {
            const isAllowed = checkFileType(file, resolvedAccept);
            const resolvedMaxSize = maxSizeMB ?? maxSize[accept];
            const isLtMax = file.size / 1024 / 1024 < resolvedMaxSize;

            if (!isAllowed) {
                message.error(`Тип файла ${file.type} не поддерживается`);
                return Upload.LIST_IGNORE; // лучше для ant-design v4+
            }

            if (!isLtMax) {
                message.error(`Файл ${file.name} больше ${maxSizeMB}MB`);
                return Upload.LIST_IGNORE;
            }

            return true;
        },
        onChange(info) {
            const validFiles = info.fileList
                .filter((f) => f.status !== "error")
                .map((f) => f.originFileObj as File)
                .filter(Boolean);
            onChange?.(validFiles); // обновляем состояние формы
            const latestFile = info.file;

            if (latestFile.status === "done") {
                message.success(`${latestFile.name} загружен`);
                onSuccess?.(latestFile.originFileObj!, latestFile.response);
            } else if (latestFile.status === "error") {
                message.error(`${latestFile.name} не удалось загрузить`);
                onError?.(latestFile.originFileObj!, latestFile.response);
            }
        },
        onDrop(e) {
            console.log("Файлы перетянуты:", e.dataTransfer.files);
        },
    };

    return (
        <div className={`${style.uploadButton} ${className}`}>
            <Dragger className={style.uploadButton_dragger} {...props}>
                {type === "box" && (
                    <>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className={style.uploadButton_text}>
                            Кликните или перетащите файл для загрузки
                        </p>
                        <p className={style.uploadButton_text}>
                            Допустимые форматы:{" "}
                            {resolvedAccept?.replaceAll(".", " ")}.
                        </p>
                        <p className={style.uploadButton_text}>
                            Размер каждого файла должен быть не более 47 Мб.
                        </p>
                        {maxCount && (
                            <p className="ant-upload-hint">
                                Поддерживается одиночная и массовая загрузка.
                                Максимум {maxCount} файлов.
                            </p>
                        )}
                    </>
                )}
                {type === "avatar" && <div>Avatar</div>}
            </Dragger>
            
            {error && <SpanErrorForm text={error.message} />}
        </div>
    );
};
