"use client";
import { Editor } from "@tiptap/react";
import { Button, Modal, Tabs, Upload } from "antd";
import { useState } from "react";
import { nanoid } from "nanoid";
import type { UploadFile } from "antd/es/upload/interface";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { UploadSortable } from "../../Upload/UploadSortable";
import { IMediaFrontWithFile } from "@/lib/models";

interface IProp {
    type: "media" | "slider";
    editor: Editor;
    children: React.ReactNode | React.ReactNode[];
}

const ImageModalEditor = ({ editor, children, type }: IProp) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<UploadFile[]>([]);

    const createMedia = async (files: UploadFile[]) => {
        if (!editor) return;

        for (const file of files) {
            if (!file.originFileObj) continue;

            const id = nanoid();
            const params = await getImageDimensions(file.originFileObj);
            const url = URL.createObjectURL(file.originFileObj);
            const mediaItem: IMediaFrontWithFile = {
                blobPath: url,
                src: url,
                fileName: file.name,
                title: file.name,
                type: "image",
                width: params.width,
                height: params.height,
                id: id,
                alt: file.name,
                file: file,
            };
            editor.commands.addMedia(mediaItem);
            editor.commands.setMediaImage({
                mediaId: id,
                src: url,
                alt: file.name,
            });
        }
    };

    const createSlider = async (files: UploadFile[]) => {
        if (!editor || files.length === 0) return;

        const mediaIds: string[] = [];

        // Сначала создаем медиа элементы в storage
        for (const file of files) {
            if (!file.originFileObj) continue;

            const id = nanoid();
            const params = await getImageDimensions(file.originFileObj);
            const mediaItem: IMediaFrontWithFile = {
                blobPath: URL.createObjectURL(file.originFileObj),
                src: URL.createObjectURL(file.originFileObj),
                fileName: file.name,
                title: file.name,
                type: "image",
                width: params.width,
                height: params.height,
                id: id,
                alt: file.name,
                file: file,
            };

            editor.commands.addMedia(mediaItem);
            mediaIds.push(id);
        }

        // Используем команду для вставки слайдера
        editor.commands.insertSlider({
            mediaIds: mediaIds,
            id: nanoid(),
        });
    };

    const handleOk = async () => {
        if (type === "media") {
            await createMedia(selectedImages);
        }
        if (type === "slider") {
            await createSlider(selectedImages);
        }

        setIsImageModalOpen(false);
        setSelectedImages([]);
    };

    return (
        <>
            <div onClick={() => setIsImageModalOpen(true)}>{children}</div>
            <Modal
                title="Добавить картинку"
                open={isImageModalOpen}
                onOk={handleOk}
                onCancel={() => setIsImageModalOpen(false)}
            >
                <Tabs
                    defaultActiveKey="upload"
                    items={[
                        {
                            key: "library",
                            label: "Библиотека",
                            children: <Button>Вставить котика 🐱</Button>,
                        },
                        {
                            key: "upload",
                            label: "Загрузить",
                            children: (
                                <UploadSortable
                                    fileList={selectedImages}
                                    onChange={({ fileList }) =>
                                        setSelectedImages(fileList)
                                    }
                                />
                            ),
                        },
                    ]}
                />
            </Modal>
        </>
    );
};

export default ImageModalEditor;
