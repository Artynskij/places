"use client";
import { Editor } from "@tiptap/react";
import { Button, Modal, Tabs, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { nanoid } from "nanoid";
import type { UploadFile } from "antd/es/upload/interface";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
interface IProp {
    type: "media" | "slider";
    editor: Editor;
    children: React.ReactNode | React.ReactNode[];
}
const ImageModalEditor = ({ editor, children, type }: IProp) => {
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState<UploadFile[]>([]);
    const createMedia = (files: UploadFile[]) => {
        if (!editor) return;
        files.forEach(async (file) => {
            if (!file.originFileObj) return;
            const params = await getImageDimensions(file.originFileObj);
            editor
                .chain()
                .focus()
                .setMediaImage({
                    src: URL.createObjectURL(file.originFileObj),
                    height: params.height,
                    width: params.width,
                    alt: file.name,
                    title: file.name,
                    caption: file.name,
                })
                .run();
        });
    };
    const createSlider = async (files: UploadFile[]) => {
        if (!editor || files.length === 0) return;
        const PromisesParams = files.map((file) => {
            if (!file.originFileObj) return;
            return getImageDimensions(file.originFileObj);
        });
        const ParamsArray = await Promise.all(PromisesParams);
        editor
            .chain()
            .focus()
            .insertContent({
                attrs: { id: nanoid() },
                type: "slider",
                content: files.map((file, index) => {
                    // if (!file.originFileObj) return ' ';
                    const params = ParamsArray[index];

                    return {
                        type: "image",
                        attrs: {
                            src: file.originFileObj
                                ? URL.createObjectURL(file.originFileObj)
                                : "",
                            height: params?.height || 600,
                            width: params?.width || 800,
                            alt: file.name,
                            title: file.name,
                        },
                    };
                }),
            })
            .run();
    };
    const handleOk = () => {
        if (type === "media") {
            createMedia(selectedImages);
        }
        if (type === "slider") {
            createSlider(selectedImages);
        }

        setIsImageModalOpen(false);
        setSelectedImages([]);
    };
    return (
        <>
            <div
                onClick={() => {
                    setIsImageModalOpen(true);
                }}
            >
                {children}
            </div>
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
                                <Upload
                                    listType="picture-card"
                                    multiple
                                    fileList={selectedImages}
                                    beforeUpload={() => false}
                                    onChange={(info) => {
                                        const files = info.fileList;

                                        setSelectedImages(files);
                                    }}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <div style={{ marginTop: 8 }}>
                                            Загрузить
                                        </div>
                                    </div>
                                </Upload>
                            ),
                        },
                    ]}
                />
            </Modal>
        </>
    );
};
export default ImageModalEditor;
