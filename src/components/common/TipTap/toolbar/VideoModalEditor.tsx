"use client";
import { Editor } from "@tiptap/react";
import { Button, Modal, Tabs, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

interface IProp {
    editor: Editor;
    children: React.ReactNode | React.ReactNode[];
}

const VideoModalEditor = ({ editor, children }: IProp) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<UploadFile | null>(null);

    const handleOk = () => {
        if (!editor || !selectedVideo?.originFileObj) return;
        const url = URL.createObjectURL(selectedVideo.originFileObj);

        editor
            .chain()
            .focus()
            .setMediaVideo({
                src: url,
                title: selectedVideo.name,
                caption: selectedVideo.name,
                width: "100%",
                height: 400,
                controls: true,
            })
            .run();

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
