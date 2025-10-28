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
                isMain: false,
            };

            // ✅ 1. Добавляем в хранилище
            editor.commands.addMedia(mediaItem);

            // ✅ 2. Вставляем в контент ТОЛЬКО mediaId
            editor.commands.setMediaImage({
                mediaId: id,
            });
        }
    };

    const createSlider = async (files: UploadFile[]) => {
        if (!editor || files.length === 0) {
            console.log("❌ No editor or files");
            return;
        }

        const slides: Array<{ mediaId: string; caption?: string }> = [];

        for (const file of files) {
            if (!file.originFileObj) {
                console.log("❌ No originFileObj for file:", file);
                continue;
            }

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
                isMain: false,
            };

            editor.commands.addMedia(mediaItem);

            slides.push({
                mediaId: id,
            });
        }

        // ✅ Даем время на обновление storage
        // await new Promise((resolve) => setTimeout(resolve, 0));

        editor.commands.insertSlider({
            slides: slides,
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
                <UploadSortable
                    fileList={selectedImages}
                    onChange={({ fileList }) => setSelectedImages(fileList)}
                />
            </Modal>
        </>
    );
};

export default ImageModalEditor;
