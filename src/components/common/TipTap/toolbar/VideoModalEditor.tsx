"use client";
import { Editor } from "@tiptap/react";
import { Button, Modal, Tabs, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import { nanoid } from "nanoid";
import {
    getImageDimensions,
    getVideoDimensions,
} from "@/lib/helpers/getImageDimensions";
import { IMediaFrontWithFile } from "@/lib/models";

interface IProp {
    editor: Editor;
    children: React.ReactNode | React.ReactNode[];
}

const VideoModalEditor = ({ editor, children }: IProp) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<UploadFile | null>(null);

    const handleOk = async () => {
        if (!editor || !selectedVideo?.originFileObj) return;
        const id = nanoid();
        const params = await getVideoDimensions(selectedVideo.originFileObj);
        const url = URL.createObjectURL(selectedVideo.originFileObj);
        const mediaItem: IMediaFrontWithFile = {
            blobPath: url,
            src: url,
            fileName: selectedVideo.name,
            title: selectedVideo.name,
            type: "video",
            width: params.width,
            height: params.height,
            id: id,
            alt: selectedVideo.name,
            file:selectedVideo
        };
        editor.commands.addMedia(mediaItem);
        editor.commands.setMediaVideo({ mediaId: id, src: url });

        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>{children}</div>
            <Modal
                title="Добавить видео"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
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
                                    fileList={
                                        selectedVideo ? [selectedVideo] : []
                                    }
                                    accept="video/*"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    onChange={(info) => {
                                        setSelectedVideo(
                                            info.fileList[0] || null
                                        );
                                    }}
                                >
                                    <Button icon={<UploadOutlined />}>
                                        Загрузить видео
                                    </Button>
                                </Upload>
                            ),
                        },
                    ]}
                />
            </Modal>
        </>
    );
};

export default VideoModalEditor;
