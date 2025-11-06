// ImageUpdateSeo.tsx
import { IMediaFrontWithFile } from "@/lib/models";
import { EditOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Card } from "antd";
import { useState } from "react";
import style from "./imageUpdateSeo.module.scss";
import Image from "next/image";

interface IProp {
    media: IMediaFrontWithFile;
    onUpdate: (media: IMediaFrontWithFile) => void;
}

export const ImageUpdateSeo = ({ media, onUpdate }: IProp) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    // const [isHovered, setIsHovered] = useState(false);

    const showModal = () => {
        form.setFieldsValue({
            title: media.title,
            alt: media.alt,
        });
        setIsModalOpen(true);
    };

    // const onUpdate = (updatedMedia: IMediaFront) => {
    //     console.log("Обновленные данные:", updatedMedia);
    // };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const updatedMedia = {
                ...media,
                title: values.title,
                alt: values.alt,
            };
            onUpdate(updatedMedia);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={style.container}>
                {media.type === "video" ? (
                    <video
                        src={media.src}
                        width={200}
                        height={150}
                        controls
                    ></video>
                ) : (
                    <Image
                        src={media.src}
                        alt={media.alt}
                        width={220}
                        height={160}
                        className={style.image}
                        // preview={false}
                    />
                )}

                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className={style.editButton}
                    onClick={showModal}
                />
            </div>

            <Modal
                title="Редактирование SEO изображения"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Сохранить"
                cancelText="Отмена"
                width={600}
            >
                <div className={style.modalContent}>
                    {media.type === "video" ? (
                        <video
                            src={media.src}
                            width={150}
                            height={120}
                            controls
                            className={style.previewImage}
                        ></video>
                    ) : (
                        <Image
                            src={media.src}
                            alt={media.alt}
                            width={150}
                            height={120}
                            className={style.previewImage}
                        />
                    )}

                    <div className={style.fileInfo}>
                        <Card size="small" title="Информация о файле">
                            <p>
                                <strong>Имя файла:</strong> {media.fileName}
                            </p>
                            <p>
                                <strong>Размер:</strong> {media.width} ×{" "}
                                {media.height}px
                            </p>
                            <p>
                                <strong>Тип:</strong> {media.type}
                            </p>
                        </Card>
                    </div>
                </div>

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Подпись картинки"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: "Пожалуйста, введите заголовок",
                            },
                            {
                                max: 255,
                                message:
                                    "Заголовок не должен превышать 255 символов",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={2}
                            placeholder="Введите заголовок изображения..."
                            showCount
                            maxLength={255}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Альтернативный текст (Alt)"
                        name="alt"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Пожалуйста, введите альтернативный текст",
                            },
                            {
                                max: 255,
                                message:
                                    "Alt текст не должен превышать 255 символов",
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={2}
                            placeholder="Введите альтернативный текст для SEO..."
                            showCount
                            maxLength={255}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
