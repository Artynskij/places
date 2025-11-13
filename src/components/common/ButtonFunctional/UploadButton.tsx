"use client";
import React, { useEffect, useState } from "react";
import style from "./buttonFunctional.module.scss";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useAlertMessage } from "@/lib/context";
import { FieldError, useFormContext } from "react-hook-form";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import { Button } from "@/components/UI/Button/Button";
import { SpanErrorForm } from "@/components/UI/Span/SpanErrorForm";
import { IMediaFront } from "@/lib/models";
import Image from "next/image";

import clsx from 'clsx'


const { Dragger } = Upload;

interface Props {
    titleSpan: string;
    titleButton?: string;
    titleHelp?: string;
    className?: string;
    onChange?: (files: File[]) => void;
    value?: (File | undefined)[];
    downloadedValue?: IMediaFront[] | null;
    error: FieldError | null;
    accept?: "image" | "doc" | "video" | "all";
    maxSizeMB?: number;
    maxCount?: number;
    multiple?: boolean;
    action?: string;
    disabled?: boolean;
    type?: "box" | "avatar";
}

export const UploadButton: React.FC<Props> = ({
    accept = "all",
    maxSizeMB,
    maxCount = 5,
    multiple = true,
    disabled = false,
    onChange,
    error,
    value,
    downloadedValue,
    type = "box",
    className,
}) => {
    const message = useAlertMessage();

    const ACCEPT_MIME_MAP: Record<NonNullable<Props["accept"]>, string> = {
        image: ".jpg,.jpeg,.png,.webp,.gif,.svg,.avif,.pdf",
        doc: ".pdf,.doc,.docx,.txt,.rtf",
        video: ".mp4,.webm,.ogg,.mov,.avi,.mkv",
        all: "*/*",
    };
    const maxSize: Record<NonNullable<Props["accept"]>, number> = {
        image: 47,
        doc: 10,
        video: 10000,
        all: 100,
    };
    const resolvedAccept = accept ? ACCEPT_MIME_MAP[accept] : undefined;
    const inlineStyles = {
        error: { borderColor: "red" },
    };
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
    // useEffect(() => {
    //     if (downloadedValue?.length && !value?.length) {
    //         const defaultFiles = downloadedValue.map((media, idx) => {
    //             const fakeFile = new File([""], media.fileName, {
    //                 type: media.type || "image/jpeg",
    //             });
    //             return Object.assign(fakeFile, {
    //                 uid: String(idx),
    //                 url: media.src,
    //                 isExisting: true,
    //             });
    //         });

    //         onChange?.(defaultFiles);
    //     }
    // }, []);

    // формируем список только из value
    const newFiles: UploadFile[] =
        value?.filter(Boolean).map((file, idx) => {
            const rcFile = file as RcFile & { url?: string };
            return {
                uid: rcFile.uid || `file-${idx}`,
                name: rcFile.name,
                size: rcFile.size,
                status: "done" as const,
                url: rcFile.url, // поддержка превью для скачанных
                originFileObj: rcFile,
            };
        }) ?? [];
    const defaultFiles: UploadFile[] =
        downloadedValue?.map((media, idx) => {
            return {
                uid: String(idx),
                name: media.title || `file-${idx}`,
                status: "done",
                url: media.src,
            };
        }) || [];
    const fileList: UploadFile[] = [...defaultFiles, ...newFiles];

    const props: UploadProps = {
        name: "file",
        multiple,
        accept: resolvedAccept,
        maxCount,
        disabled,
        fileList: fileList,

        beforeUpload(file: RcFile) {
            const isAllowed = checkFileType(file, resolvedAccept);
            const resolvedMaxSize = maxSizeMB ?? maxSize[accept];
            const isLtMax = file.size / 1024 / 1024 < resolvedMaxSize;

            if (!isAllowed) {
                message.error(`Тип файла ${file.type} не поддерживается`);
                return Upload.LIST_IGNORE;
            }
            if (!isLtMax) {
                message.error(`Файл ${file.name} больше ${resolvedMaxSize}MB`);
                return Upload.LIST_IGNORE;
            }
            return true;
        },
        onChange(info) {
            // ✅ Вытащим только новые файлы
            const newFiles = info.fileList
                .filter((f) => !!f.originFileObj)
                .map((f) => f.originFileObj as File);

            onChange?.(newFiles); // обновляем react-hook-form

            // Уведомления
            const latestFile = info.file;
            if (latestFile.status === "done") {
                message.success(`${latestFile.name} загружен`);
            } else if (latestFile.status === "error") {
                message.error(`${latestFile.name} не удалось загрузить`);
            }
        },
        // onDrop(e) {
        //     console.log("Файлы перетянуты:", e.dataTransfer.files);
        // },
    };

    return (
        <div style={{ width: '100%' }}>

            <div className={clsx(style.uploadButton, !!className && className)}>
                <Dragger
                    style={error?.message ? inlineStyles.error : {}}
                    {...props}
                    
                    // showUploadList={false}
                    itemRender={(originNode, file, fileList, actions) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <DeleteOutlined
                                        onClick={actions.remove}
                                        style={{ color: "red", cursor: "pointer" }}
                                    />
                                    <span>{file.name}</span>
                                </div>
                            </div>
                        );
                    }}
                >
                    {/* <div className={style.oldFiles_block}>
                    {downloadedValue?.map((media) => {
                        return (
                            <Image
                                key={media.blobPath}
                                alt={media.title}
                                src={media.src}
                                height={50}
                                width={50}
                            />
                        );
                    })}
                </div> */}

                    {type === "box" && (
                        <>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className={style.uploadButton_text}>
                                Кликните или перетащите файл для загрузки
                            </p>
                            <p className={style.uploadButton_text}>
                                Допустимые форматы: {accept === 'all' ? 'все форматы' : resolvedAccept?.replaceAll('.', ' ').replaceAll(',', ', ')}.
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
        </div>
    );
};
