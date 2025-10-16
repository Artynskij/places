"use client";
import { useState } from "react";
import { Button, Input, Form, Upload, Select, message } from "antd";
import TipTapEditor from "@/components/common/TipTap/Editor/TipTapEditor";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

import { IArticleFront, IMediaFront, IMediaFrontWithFile } from "@/lib/models";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { locales } from "@/config";
import { ImageUpdateSeo } from "@/components/common/Image/ImageUpdateSeo";

import { nanoid } from "nanoid";
import type { UploadFile } from "antd/lib";
import { TLocale } from "@/lib/models/types";
import { GeneralArticleService } from "@/lib/Api/(MainService)/article.general";
import { useUser } from "@/lib/context/UserContext/UserContext";
import PreviewEditor from "@/components/common/TipTap/Viewer/previewEditor";
import { CONSTANT_ARTICLE_STATUS_DB } from "@/asset/constants/database/article-status.const";

interface ArticleFormValues {
    lang: TLocale;
    titleSeo: string;
    descriptionSeo: string;
    title: string;
    description: string;
    mainImage: UploadFile[];
    category: string;
}

interface ArticleCreateTabProps {
    onArticleCreated: (article: IArticleFront) => void;
    initialData?: IArticleFront;
    isEdit?: boolean;
}

const CreateArticleTabAdmin: React.FC<ArticleCreateTabProps> = ({
    onArticleCreated,
    initialData,
    isEdit = false,
}) => {
    const [form] = Form.useForm<ArticleFormValues>();
    const { user } = useUser();
    const [editorData, setEditorData] = useState<{
        content: any;
        mediaStorage: IMediaFront[];
    }>();
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [articleData, setArticleData] = useState<IArticleFront | null>(
        initialData || null
    );
    const [loading, setLoading] = useState(false);

    const articleGeneralService = new GeneralArticleService();

    // Моковые данные категорий
    const mockCategories = [
        { id: 1, name: "Новости туризма" },
        { id: 2, name: "Полезные советы, лайфхаки" },
        { id: 3, name: "Обзоры" },
    ];

    const handleSave = async (values: ArticleFormValues) => {
        if (!editorData) {
            message.error("Нет контента");
            return;
        }
        if (!user) {
            message.error("Нет пользователя");
            return;
        }

        setLoading(true);
        try {
            const fileMainImage = values.mainImage[0];

            const paramsFile = fileMainImage.originFileObj
                ? await getImageDimensions(fileMainImage.originFileObj)
                : null;

            const newArticle: IArticleFront = {
                id:
                    isEdit && initialData
                        ? initialData.id
                        : Date.now().toString(),
                title: values.title,
                category: values.category,
                author: user.personName?.fullName || "Автор",
                markdown: editorData.content,
                date: new Date().toLocaleDateString("ru-RU"),
                description: values.description,
                reactions: [1, 2, 3, 4],
                media: editorData?.mediaStorage,
                status: {
                    id: "",
                    code: CONSTANT_ARTICLE_STATUS_DB.PENDING_REVIEW,
                },
                titleImage: {
                    isMain: true,
                    title: articleData?.titleImage?.title || fileMainImage.name,
                    alt: articleData?.titleImage?.alt || fileMainImage.name,
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

            if (response) {
                onArticleCreated(newArticle);
                message.success(isEdit ? "Статья обновлена" : "Статья создана");
                if (!isEdit) {
                    form.resetFields();
                    setEditorData(undefined);
                    setArticleData(null);
                }
            } else {
                message.error("Что-то пошло не так");
            }
        } catch (error) {
            message.error("Ошибка при сохранении");
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async () => {
        const values = await form.validateFields().catch(() => null);

        if (!values) {
            message.error("Заполните все поля");
            return false;
        }

        if (!editorData) {
            message.error("Нет контента");
            return false;
        }

        const fileMainImage = values.mainImage[0];
        if (!fileMainImage) {
            message.error("Нет главной картинки");
            return false;
        }

        const paramsFile = fileMainImage.originFileObj
            ? await getImageDimensions(fileMainImage.originFileObj)
            : null;
        const urlMainImage = fileMainImage.originFileObj
            ? URL.createObjectURL(fileMainImage.originFileObj)
            : "";
        const newArticle: IArticleFront = {
            id: "preview",
            title: values.title,
            category: values.category,
            author: "Автор",
            markdown: editorData.content,
            date: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [],
            status: {
                id: "",
                code: CONSTANT_ARTICLE_STATUS_DB.PENDING_REVIEW,
            },
            titleImage: {
                isMain: true,
                title: articleData?.titleImage?.title || fileMainImage.name,
                alt: articleData?.titleImage?.alt || fileMainImage.name,
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
        <div>
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSave}
                initialValues={
                    initialData
                        ? {
                              title: initialData.title,
                              description: initialData.description,
                              category: initialData.category,
                              // ... другие поля
                          }
                        : {}
                }
            >
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
                    valuePropName="fileList"
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
                        beforeUpload={() => false}
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
                        initialContent={initialData?.markdown}
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
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {isEdit ? "Обновить" : "Создать"}
                    </Button>

                    <PreviewEditor
                        handlePreview={handlePreview}
                        article={articleData || null}
                    >
                        <Button type="primary" style={{ marginLeft: 16 }}>
                            Предпросмотр
                        </Button>
                    </PreviewEditor>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateArticleTabAdmin;
