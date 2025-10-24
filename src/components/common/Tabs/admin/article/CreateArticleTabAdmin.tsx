"use client";
import { useEffect, useState } from "react";
import { Button, Input, Form, Upload, Select, message } from "antd";
import TipTapEditor from "@/components/common/TipTap/Editor/TipTapEditor";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

import {
    IArticleFront,
    IArticleSubTypeFront,
    IArticleTypeFront,
    IMediaFront,
    IMediaFrontWithFile,
    IPersonEntity,
} from "@/lib/models";
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
import { ArticleTypeService } from "@/lib/Api/(Article)/article-type.api";
import { ArticleSubTypeService } from "@/lib/Api/(Article)/article-subType.api";
import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { getHtmlFormJsonEditor } from "@/lib/helpers/getHtmlFormJsonEditor";

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

interface ArticleCreateTabProps {
    onArticleCreated: (article: IArticleFront) => void;
    initialData?: IArticleFront;
    isEdit?: boolean;
}

export const CreateArticleTabAdmin: React.FC<ArticleCreateTabProps> = ({
    onArticleCreated,
    initialData,
    isEdit = false,
}) => {
    const articleTypeService = new ArticleTypeService();
    const articleSubTypeService = new ArticleSubTypeService();
    const personService = new PersonService();

    const [form] = Form.useForm<ArticleFormValues>();
    const { user } = useUser();

    const [editorData, setEditorData] = useState<{
        content: any;
        mediaStorage: IMediaFront[];
    }>();
    const [loading, setLoading] = useState(false);
    const [editorInstance, setEditorInstance] = useState<any>(null);
    const [articleData, setArticleData] = useState<IArticleFront | null>(
        initialData || null
    );
    const [articleTypes, setArticleTypes] = useState<
        IArticleTypeFront[] | null
    >(null);
    const [articleSubTypes, setArticleSubTypes] = useState<
        IArticleSubTypeFront[] | null
    >(null);
    const [filteredSubTypes, setFilteredSubTypes] = useState<
        IArticleSubTypeFront[]
    >([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Изменено на массив
    const articleGeneralService = new GeneralArticleService();

    useEffect(() => {
        fetchAdditionalData();
    }, []);

    useEffect(() => {
        if (selectedTypes.length > 0 && articleSubTypes) {
            const filtered = articleSubTypes.filter((subType) =>
                selectedTypes.includes(subType.articleTypeId)
            );
            setFilteredSubTypes(filtered);

            // Сбрасываем выбранные подрубрики при смене категорий
            form.setFieldValue("subTypeIds", []);
        } else {
            setFilteredSubTypes([]);
        }
    }, [selectedTypes, articleSubTypes, form]);

    const fetchAdditionalData = async () => {
        const resTypes = articleTypeService.get().then((res) => {
            if (res) {
                setArticleTypes(res);
            } else {
                message.error("Ошибка при получении рубрик статей");
            }
        });
        const resSubTypes = articleSubTypeService.get().then((res) => {
            if (res) {
                setArticleSubTypes(res);
            } else {
                message.error("Ошибка при получении рубрик статей");
            }
        });
    };

    const handleTypeChange = (values: string[]) => {
        setSelectedTypes(values);
    };

    const handleSave = async (values: ArticleFormValues) => {
        if (!editorData) {
            message.error("Нет контента");
            return;
        }
        if (!user) {
            message.error("Нет пользователя");
            return;
        }
        if (!articleTypes || !articleSubTypes) {
            message.error("Системаная ошибка");
            return;
        }
        setLoading(true);
        console.log("values", values);
        try {
            const fileMainImage = values.mainImage[0];

            const paramsFile = fileMainImage.originFileObj
                ? await getImageDimensions(fileMainImage.originFileObj)
                : null;

            // Получаем выбранные рубрики
            const selectedArticleTypes = articleTypes.filter((item) =>
                values.typeIds.includes(item.id)
            ) as IArticleTypeFront[];

            // Получаем выбранные подрубрики
            const selectedArticleSubTypes = articleSubTypes.filter((item) =>
                values.subTypeIds.includes(item.id)
            ) as IArticleSubTypeFront[];
            const generatedHTML = getHtmlFormJsonEditor(
                editorData.content,
                editorData?.mediaStorage
            );
            const newArticle: IArticleFront = {
                id:
                    isEdit && initialData
                        ? initialData.id
                        : Date.now().toString(),
                title: values.title,
                subType: selectedArticleSubTypes.map((subType) => ({
                    id: subType.id,
                    code: subType.code,
                    value: subType.value,
                })), // Изменено на массив
                type: selectedArticleTypes.map((type) => ({
                    id: type.id,
                    code: type.code,
                    value: type.value,
                })), // Изменено на массив
                readingTime: 0,
                // author: user.personName?.fullName || "Автор",
                markdown: generatedHTML,
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
                contentEntity: null,
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
        if (!articleTypes || !articleSubTypes) {
            message.error("Системаная ошибка");
            return false;
        }
        if (!values) {
            message.error("Заполните все поля");
            return false;
        }

        if (!editorData) {
            message.error("Нет контента");
            return false;
        }
        // if (!user) {
        //     return false;
        // }

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

        // Получаем выбранные рубрики для превью
        const selectedArticleTypes = articleTypes.filter((item) =>
            values.typeIds.includes(item.id)
        ) as IArticleTypeFront[];

        // Получаем выбранные подрубрики для превью
        const selectedArticleSubTypes = articleSubTypes.filter((item) =>
            values.subTypeIds.includes(item.id)
        ) as IArticleSubTypeFront[];
        const generatedHTML = getHtmlFormJsonEditor(
            editorData.content,
            editorData?.mediaStorage
        );
        const newArticle: IArticleFront = {
            id: "preview",
            title: values.title,
            subType: selectedArticleSubTypes.map((subType) => ({
                id: subType.id,
                code: subType.code,
                value: subType.value,
            })), // Изменено на массив
            type: selectedArticleTypes.map((type) => ({
                id: type.id,
                code: type.code,
                value: type.value,
            })), // Изменено на массив
            // author: user,
            markdown: generatedHTML,
            date: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [],
            status: {
                id: "",
                code: CONSTANT_ARTICLE_STATUS_DB.PENDING_REVIEW,
            },
            readingTime: 0,
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
            contentEntity: null,
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
                              types: initialData.type?.map((t) => t.id) || [], // Адаптируем под массив
                              subTypes:
                                  initialData.subType?.map((st) => st.id) || [], // Адаптируем под массив
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
                {articleTypes && (
                    <Form.Item
                        label="Рубрики(главные)"
                        name="typeIds" // Изменено имя
                        rules={[
                            { required: true, message: "Выберите рубрики" },
                        ]}
                    >
                        <Select
                            mode="multiple" // Добавлен режим множественного выбора
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
                    <Form.Item
                        label="Подрубрики"
                        name="subTypeIds" // Изменено имя
                        rules={[
                            { required: false, message: "Выберите подрубрики" },
                        ]}
                    >
                        <Select
                            mode="multiple" // Добавлен режим множественного выбора
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
                        article={articleData}
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
