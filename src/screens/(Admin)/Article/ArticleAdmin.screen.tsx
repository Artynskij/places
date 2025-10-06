"use client";
import { useState } from "react";
import { Button, Input, Form, Card, Upload, Select, message } from "antd";
import TipTapEditor from "@/components/common/TipTap/Editor/TipTapEditor";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import PreviewEditor from "./previewEditor";
import {
    IArticleNewFront,
    IMediaFront,
    IMediaFrontWithFile,
} from "@/lib/models";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { locales } from "@/config";
import { ImageUpdateSeo } from "@/components/common/Image/ImageUpdateSeo";

import { nanoid } from "nanoid";
import type { UploadFile } from "antd/lib";
import { TLocale } from "@/lib/models/types";
import { GeneralArticleService } from "@/lib/Api/(MainService)/article.general";
import { useUser } from "@/lib/context/UserContext/UserContext";

interface ArticleFormValues {
    lang: TLocale;
    titleSeo: string;
    descriptionSeo: string;
    title: string;
    description: string;
    mainImage: UploadFile[];
    category: string;
}

export const ArticleAdminScreen: React.FC = () => {
    const [form] = Form.useForm<ArticleFormValues>();
    const { user } = useUser();
    const [editorData, setEditorData] = useState<{
        content: any;
        mediaStorage: IMediaFront[];
    }>();
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [articleData, setArticleData] = useState<IArticleNewFront | null>(
        null
    );
    const articleGeneralService = new GeneralArticleService();
    // Моковые данные категорий
    const mockCategories = [
        { id: 1, name: "Новости туризма" },
        { id: 2, name: "Полезные советы, лайфхаки" },
        { id: 3, name: "Обзоры" },
    ];

    const handleSave = async (values: ArticleFormValues) => {
        if (!editorData) {
            message.error("нету контента");
            return;
        }
        if (!user) {
            message.error("нету пользователя");
            return;
        }

        const fileMainImage = values.mainImage[0];

        const paramsFile = fileMainImage.originFileObj
            ? await getImageDimensions(fileMainImage.originFileObj)
            : null;

        const newArticle: IArticleNewFront = {
            id: "228",
            title: values.title,
            category: values.category,
            author: "какой-то автор",
            content: editorData.content,
            date: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [1, 2, 3, 4],
            media: editorData?.mediaStorage,
            titleImage: {
                title: articleData?.titleImage.title || fileMainImage.name,
                alt: articleData?.titleImage.alt || fileMainImage.name,
                src: fileMainImage.originFileObj
                    ? URL.createObjectURL(fileMainImage.originFileObj)
                    : "",
                height: paramsFile?.height || 600,
                width: paramsFile?.width || 800,
                blobPath: "",
                fileName: fileMainImage.name,
                type: "image",
                id: new Date().getDate().toString(),
                file: fileMainImage,
            },
        };
        const response = await articleGeneralService.create({
            articleState: newArticle,
            formData: { ...values, ...editorData },
            user: user,
        });
        // ✅ отправка на сервер
        setArticleData(newArticle);

        if (response) {
            message.error("всё ок");
        } else {
            message.error("что-то пошло не так");
        }
        // message.error("пока не отправляем");
    };

    const handlePreview = async () => {
        const values = await form.validateFields().catch(() => null);

        if (!values) {
            message.error("заполните все поля");
            return false;
        }

        if (!editorData) {
            message.error("нету контента");
            return false;
        }

        const fileMainImage = values.mainImage[0];
        if (!fileMainImage) {
            message.error("нет главной картинки");
            return false;
        }

        const paramsFile = fileMainImage.originFileObj
            ? await getImageDimensions(fileMainImage.originFileObj)
            : null;
        const urlMainImage = fileMainImage.originFileObj
            ? URL.createObjectURL(fileMainImage.originFileObj)
            : "";
        const newArticle: IArticleNewFront = {
            id: "preview",
            title: values.title,
            category: values.category,
            author: "какой-то автор",
            content: editorData.content,
            date: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [],
            titleImage: {
                title: articleData?.titleImage.title || fileMainImage.name,
                alt: articleData?.titleImage.alt || fileMainImage.name,
                src: urlMainImage,
                height: paramsFile?.height || 600,
                width: paramsFile?.width || 800,
                blobPath: urlMainImage,
                fileName: fileMainImage.name,
                type: "image",
                id: nanoid(),
            },
            media: editorData.mediaStorage,
        };

        // ✅ только для предпросмотра
        setArticleData(newArticle);
        return true;
    };
    const updateMainImage = (updatedMedia: IMediaFrontWithFile) => {
        if (!articleData) return;
        setArticleData((oldArticle) => {
            if (!oldArticle?.media) return oldArticle;

            return {
                ...oldArticle,
                titleImage: updatedMedia,
            };
        });
    };
    const updateMedia = (updatedMedia: IMediaFrontWithFile) => {
        if (!articleData) return;
        const updatedMediaArray = articleData.media.map((item) =>
            item.id === updatedMedia.id ? updatedMedia : item
        );
        setArticleData((oldArticle) => {
            if (!oldArticle?.media) return oldArticle;

            return {
                ...oldArticle,
                media: updatedMediaArray,
            };
        });
        if (editorInstance) {
            editorInstance.commands.updateMediaInStorage(updatedMedia);
        }
        setEditorData((oldEditorData) => {
            if (!oldEditorData) return oldEditorData;
            return {
                ...oldEditorData,
                mediaStorage: updatedMediaArray,
            };
        });
    };
    return (
        <Card>
            <Form layout="vertical" form={form} onFinish={handleSave}>
                <Form.Item
                    label="Язык"
                    name="lang"
                    rules={[{ required: true, message: "Выберите Язык" }]}
                >
                    <Select placeholder="Выберите категорию">
                        {locales.map((lang) => (
                            <Select.Option key={lang} value={lang}>
                                {lang}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="title seo"
                    name="titleSeo"
                    rules={[{ required: true, message: "Введите title seo" }]}
                >
                    <Input placeholder="Введите title seo" />
                </Form.Item>
                <Form.Item
                    label="description seo"
                    name="descriptionSeo"
                    rules={[
                        { required: true, message: "Введите Description seo" },
                    ]}
                >
                    <TextArea placeholder="Введите description seo" />
                </Form.Item>
                <Form.Item
                    label="Заголовок"
                    name="title"
                    rules={[{ required: true, message: "Введите заголовок" }]}
                >
                    <Input placeholder="Введите заголовок статьи" />
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[{ required: true, message: "Введите описание" }]}
                >
                    <TextArea placeholder="Введите описание статьи" />
                </Form.Item>

                <Form.Item
                    label="Главная картинка"
                    name="mainImage"
                    valuePropName="fileList" // 👈 говорим Form что значение лежит в fileList
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList;
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Главная картинка обязательна",
                        },
                    ]}
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false} // чтобы не грузилось сразу
                    >
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Загрузить</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Рубрика(главная)"
                    name="category"
                    rules={[{ required: true, message: "Выберите категорию" }]}
                >
                    <Select placeholder="Выберите категорию">
                        {mockCategories.map((category) => (
                            <Select.Option
                                key={category.id}
                                value={category.name}
                            >
                                {category.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Контент">
                    <TipTapEditor
                        onEditorInit={setEditorInstance}
                        setEditorData={setEditorData}
                    />
                </Form.Item>
                {articleData?.titleImage && (
                    <div
                        style={{
                            padding: 20,
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <div>Главное фото</div>

                        <ImageUpdateSeo
                            onUpdate={updateMainImage}
                            key={articleData.titleImage.id}
                            media={articleData.titleImage}
                        />
                    </div>
                )}
                {!!articleData?.media.length && (
                    <div
                        style={{
                            padding: 20,
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <div>Фото из контента</div>
                        <div
                            style={{
                                padding: 20,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                            }}
                        >
                            {articleData.media.map((mediaItem) => {
                                return (
                                    <ImageUpdateSeo
                                        onUpdate={updateMedia}
                                        key={mediaItem.id}
                                        media={mediaItem}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>

                    <PreviewEditor
                        handlePreview={handlePreview}
                        article={articleData || null}
                    >
                        <Button
                            type="primary"
                            // onClick={handlePreview}
                            style={{ marginLeft: 16 }}
                        >
                            preview
                        </Button>
                    </PreviewEditor>
                </Form.Item>
            </Form>
        </Card>
    );
};
