"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input, Form, Upload, Select, Modal, Space } from "antd";
import TipTapEditor from "@/components/common/TipTap/Editor/TipTapEditor";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import {
    IArticleFront,
    IArticleTypeFront,
    IArticleSubTypeFront,
    IMediaFront,
    IMediaFrontWithFile,
} from "@/lib/models";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";
import { locales } from "@/config";
import { ImageUpdateSeo } from "@/components/common/Image/ImageUpdateSeo";
import {
    TLocale,
    TTipTapHTMLContent,
    TTipTapJSONContent,
} from "@/lib/models/types";
import { GeneralArticleService } from "@/lib/Api/(MainService)/article.general";
import { useUser } from "@/lib/context/UserContext/UserContext";
import PreviewEditor from "@/components/common/TipTap/Viewer/previewEditor";
import { CONSTANT_ARTICLE_STATUS_DB } from "@/asset/constants/database/article-status.const";
import { ArticleTypeService } from "@/lib/Api/(Article)/article-type.api";
import { ArticleSubTypeService } from "@/lib/Api/(Article)/article-subType.api";
import { convertEditorJsonToHtml } from "@/lib/helpers/convert-editor-json-hml";
import { useAlertMessage } from "@/lib/context";
import type { UploadFile } from "antd/lib";
interface ArticleFormValues {
    lang: TLocale;
    titleSeo: string;
    descriptionSeo: string;
    title: string;
    description: string;
    mainImage: UploadFile[];
    typeIds: string[]; // Изменено на массив
    subTypeIds: string[]; // Изменено на массив
}

interface FormCreateArticleProps {
    initialData: IArticleFront | null;
    handleCloseModal: () => void;
    isModalActive: boolean;
}

export const FormCreateArticle: React.FC<FormCreateArticleProps> = ({
    initialData,
    handleCloseModal,
    isModalActive,
}) => {
    const message = useAlertMessage();

    const [form] = Form.useForm<ArticleFormValues>();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [editorData, setEditorData] = useState<{
        content: TTipTapJSONContent | null;
        mediaStorage: IMediaFront[];
    } | null>(null);
    const [editorInstance, setEditorInstance] = useState<any>();
    const [articleData, setArticleData] = useState<IArticleFront | null>(null);

    const [articleTypes, setArticleTypes] = useState<IArticleTypeFront[]>([]);
    const [articleSubTypes, setArticleSubTypes] = useState<
        IArticleSubTypeFront[]
    >([]);
    const [filteredSubTypes, setFilteredSubTypes] = useState<
        IArticleSubTypeFront[]
    >([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    useEffect(() => {
        try {
            JSON.stringify(articleData);
        } catch (e) {
            console.warn("⚠️ articleData имеет циклические ссылки");
        }
    }, [articleData]);
    const services = useMemo(
        () => ({
            article: new GeneralArticleService(),
            type: new ArticleTypeService(),
            subType: new ArticleSubTypeService(),
        }),
        []
    );

    const loadInitialData = useCallback(async () => {
        try {
            const [types, subTypes] = await Promise.all([
                services.type.get(),
                services.subType.get(),
            ]);
            if (types) setArticleTypes(types);
            if (subTypes) setArticleSubTypes(subTypes);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }, [services]);
    useEffect(() => {
        loadInitialData();
    }, [loadInitialData, isModalActive]);
    const initializeFormData = useCallback(() => {
        if (initialData) {
            const typeIds = initialData.type.map((item) => item.id);
            const subTypeIds = initialData.subType.map((item) => item.id);
            const content = initialData.contentEntity?.details[0];

            form.setFieldsValue({
                descriptionSeo: "mockSeo",
                titleSeo: "mockSeo",
                description: content?.contentValue?.description,
                title: content?.contentValue?.title,
                typeIds: typeIds || [],
                subTypeIds: subTypeIds || [],
                lang: content?.lang,
                mainImage: initialData.titleImage
                    ? [
                          {
                              uid: initialData.titleImage.id,
                              name: initialData.titleImage.fileName,
                              status: "done",
                              url: initialData.titleImage.src,
                              thumbUrl: initialData.titleImage.src,
                          },
                      ]
                    : [],
            });
            setArticleData(initialData);
            setSelectedTypes(typeIds);
        } else {
            form.setFieldsValue({
                descriptionSeo: "mockSeo",
                titleSeo: "mockSeo",
                description: "",
                title: "",
                typeIds: [],
                subTypeIds: [],
                lang: "ru",
                mainImage: [],
            });
            setSelectedTypes([]);
            // setEditorData(null);
            setArticleData(null);
        }
    }, [form, initialData]);
    useEffect(() => {
        if (!isModalActive) return;
        initializeFormData();
    }, [initializeFormData, isModalActive]);
    const updateFilteredSubTypes = useCallback(() => {
        if (selectedTypes.length > 0) {
            const filtered = articleSubTypes.filter((subType) =>
                selectedTypes.includes(subType.articleTypeId)
            );
            setFilteredSubTypes(filtered);
            form.setFieldValue("subTypeIds", []);
        } else {
            setFilteredSubTypes([]);
        }
    }, [selectedTypes, articleSubTypes, form]);
    useEffect(() => {
        updateFilteredSubTypes();
    }, [updateFilteredSubTypes]);

    // Основные обработчики
    const handleSave = async (values: ArticleFormValues) => {
        if (!validateForm(values)) return;
        if (!editorData?.content || !editorData?.mediaStorage) return;
        setLoading(true);
        if (initialData) {
            try {
                const articleData = await prepareArticleData(values);
                const response = await services.article.update({
                    idArticle: articleData.id,
                    articleState: articleData,
                    formData: {
                        ...values,
                        content: articleData.markdown,
                        mediaStorage: editorData.mediaStorage,
                    },
                    user: user!,
                });

                if (response) {
                    message.success("статья обновлена");
                    handleCloseModal();
                }
            } catch (error) {
                console.error("Ошибка сохранения:", error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const articleData = await prepareArticleData(values);
                const response = await services.article.create({
                    articleState: articleData,
                    formData: {
                        ...values,
                        content: articleData.markdown,
                        mediaStorage: editorData.mediaStorage,
                    },
                    user: user!,
                });

                if (response) {
                    message.success("статья создана");
                    handleCloseModal();
                }
            } catch (error) {
                console.error("Ошибка сохранения:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const validateForm = (values: ArticleFormValues): boolean => {
        if (!editorData?.content) {
            message.error("Нет контента");
            return false;
        }
        if (!user) {
            message.error("Нет пользователя");
            return false;
        }
        return true;
    };

    const prepareArticleData = async (
        values: ArticleFormValues
    ): Promise<IArticleFront> => {
        const fileMainImage = values.mainImage[0];
        const paramsFile = fileMainImage?.originFileObj
            ? await getImageDimensions(fileMainImage.originFileObj)
            : null;

        const selectedArticleTypes = articleTypes.filter((item) =>
            values.typeIds.includes(item.id)
        );

        const selectedArticleSubTypes = articleSubTypes.filter((item) =>
            values.subTypeIds?.includes(item.id)
        );

        const generatedHTML = convertEditorJsonToHtml(
            editorData!.content as TTipTapJSONContent,
            editorData!.mediaStorage
        );

        return {
            id: initialData?.id || Date.now().toString(),
            title: values.title,
            subType: selectedArticleSubTypes || [],
            type: selectedArticleTypes || [],
            readingTime: 0,
            markdown: generatedHTML,
            publishedDate: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [1, 2, 3, 4],
            media: editorData!.mediaStorage,
            status: {
                id: "",
                code: CONSTANT_ARTICLE_STATUS_DB.PENDING_REVIEW,
            },
            createdDate: new Date().toDateString(),
            titleImage: await prepareTitleImage(fileMainImage, paramsFile),
            contentEntity: null,
        };
    };

    const prepareTitleImage = async (
        fileMainImage: UploadFile,
        paramsFile: any
    ) => ({
        isMain: true,

        title: articleData?.titleImage?.title || fileMainImage.name,
        alt: articleData?.titleImage?.alt || fileMainImage.name,

        src:
            fileMainImage.url ||
            (fileMainImage.originFileObj
                ? URL.createObjectURL(fileMainImage.originFileObj)
                : ""),
        height: paramsFile?.height || 600,
        width: paramsFile?.width || 800,
        blobPath: "",
        fileName: fileMainImage.name,
        type: "image" as const,
        id: Date.now().toString(),
        file: fileMainImage,
    });

    const handlePreview = async () => {
        try {
            const values = await form.validateFields();
            const isValidContent = validateForm(values);
            if (!values || !isValidContent) {
                return false;
            }
            if (values && isValidContent) {
                const previewData = await prepareArticleData(values);
                setArticleData(previewData);
            }
            return true;
        } catch (error) {
            message.error("форма не заполнена");
            console.error("Ошибка валидации:", error);
        }
        return false;
    };

    const handleTypeChange = (values: string[]) => {
        setSelectedTypes(values);
    };

    const handleCancel = () => {
        handleCloseModal();
    };
    const updateMainMedia = (updatedMedia: IMediaFrontWithFile) => {
        if (!articleData) return;
        setArticleData((oldArticle) => {
            if (!oldArticle) return oldArticle;

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
        <Modal
            title={initialData ? "Редактировать статью" : "Создать статью"}
            open={isModalActive}
            onCancel={handleCancel}
            width="90%"
            style={{ maxWidth: 1200 }}
            footer={null}
            destroyOnClose
        >
            <Form layout="vertical" form={form} onFinish={handleSave}>
                <Form.Item
                    label="Язык"
                    name="lang"
                    rules={[{ required: true, message: "Выберите Язык" }]}
                >
                    <Select placeholder="Выберите язык">
                        {locales.map((lang) => (
                            <Select.Option key={lang} value={lang}>
                                {lang}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="SEO заголовок"
                    name="titleSeo"
                    rules={[
                        { required: true, message: "Введите SEO заголовок" },
                    ]}
                >
                    <Input placeholder="Введите SEO заголовок" />
                </Form.Item>

                <Form.Item
                    label="SEO описание"
                    name="descriptionSeo"
                    rules={[
                        { required: true, message: "Введите SEO описание" },
                    ]}
                >
                    <TextArea placeholder="Введите SEO описание" />
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
                    getValueFromEvent={(e) =>
                        Array.isArray(e) ? e : e?.fileList
                    }
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

                {articleTypes.length > 0 && (
                    <Form.Item
                        label="Рубрики"
                        name="typeIds"
                        rules={[
                            { required: true, message: "Выберите рубрики" },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            onChange={handleTypeChange}
                            placeholder="Выберите рубрики"
                        >
                            {articleTypes.map((category) => (
                                <Select.Option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                {filteredSubTypes.length > 0 && (
                    <Form.Item label="Подрубрики" name="subTypeIds">
                        <Select
                            mode="multiple"
                            placeholder="Выберите подрубрики"
                        >
                            {filteredSubTypes.map((subType) => (
                                <Select.Option
                                    key={subType.id}
                                    value={subType.id}
                                >
                                    {subType.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}

                <Form.Item label="Контент">
                    <TipTapEditor
                        onEditorInit={setEditorInstance}
                        setEditorData={setEditorData}
                        initialMediaStorage={initialData?.media.filter(
                            (item) => !item.isMain
                        )}
                        initialContent={initialData?.markdown}
                    />
                </Form.Item>

                {/* Медиа элементы */}
                {articleData?.titleImage && (
                    <div
                        style={{
                            padding: 20,
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                        }}
                    >
                        <div>Главное фото</div>
                        <ImageUpdateSeo
                            onUpdate={updateMainMedia} // Добавь логику при необходимости
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
                            gap: "5px",
                        }}
                    >
                        <div>Фото из контента</div>
                        <div
                            style={{
                                // padding: 20,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "5px",
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
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            {initialData ? "Обновить" : "Создать"}
                        </Button>

                        <PreviewEditor
                            handlePreview={handlePreview}
                            article={articleData}
                        >
                            <Button type="default">Предпросмотр</Button>
                        </PreviewEditor>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
