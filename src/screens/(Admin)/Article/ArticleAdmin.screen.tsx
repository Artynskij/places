"use client";
import { useState } from "react";
import { Button, Input, Form, Card, Upload, Select, message } from "antd";
import TipTapEditor from "@/components/common/TipTap/Editor/TipTapEditor";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import PreviewEditor from "./previewEditor";
import { IArticleNewFront, IMediaFront } from "@/lib/models";
import { getImageDimensions } from "@/lib/helpers/getImageDimensions";

export const ArticleAdminScreen: React.FC = () => {
    const [form] = Form.useForm();
    const [editorData, setEditorData] = useState<any>(null);

    const [articleData, setArticleData] = useState<IArticleNewFront | null>(
        null
    );

    // Моковые данные категорий
    const mockCategories = [
        { id: 1, name: "Технологии" },
        { id: 2, name: "Наука" },
        { id: 3, name: "Искусство" },
        { id: 4, name: "Спорт" },
        { id: 5, name: "Политика" },
        { id: 6, name: "Экономика" },
        { id: 7, name: "Здоровье" },
        { id: 8, name: "Образование" },
    ];

    const handleFinish = async (values: any) => {
        if (!editorData) {
            message.error("нету контента");
            return;
        }

        const file = values.mainImage.fileList?.[0];
        if (!file) {
            message.error("нет главной картинки");
            return;
        }

        const paramsFile = file.originFileObj
            ? await getImageDimensions(file.originFileObj)
            : null;

        const newArticle: IArticleNewFront = {
            id: "228",
            title: values.title,
            category: values.category,
            author: "какой-то автор",
            content: editorData,
            date: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [1, 2, 3, 4],
            titleImage: {
                src: file.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : "",
                height: paramsFile?.height || 600,
                width: paramsFile?.width || 800,
                blobPath: "",
                fileName: file.name,
                type: "image",
                title: file.name,
                id: new Date().getDate().toString(),
            },
        };

        // ✅ отправка на сервер
        console.log("Отправляем на сервер:", newArticle);
        message.error("пока что не отправляем");

        // setArticleData(newArticle);
    };

    const handlePreview = async () => {
        const values = await form.validateFields().catch(() => null);
        console.log(values);
        if (!values) {
            message.error("заполните все поля");
            return false;
        }

        if (!editorData) {
            message.error("нету контента");
            return false;
        }

        const file = values.mainImage[0];
        if (!file) {
            message.error("нет главной картинки");
            return false;
        }

        const paramsFile = file.originFileObj
            ? await getImageDimensions(file.originFileObj)
            : null;

        const newArticle: IArticleNewFront = {
            id: "preview",
            title: values.title,
            category: values.category,
            author: "какой-то автор",
            content: editorData,
            date: new Date().toLocaleDateString("ru-RU"),
            description: values.description,
            reactions: [],
            titleImage: {
                src: file.originFileObj
                    ? URL.createObjectURL(file.originFileObj)
                    : "",
                height: paramsFile?.height || 600,
                width: paramsFile?.width || 800,
                blobPath: "",
                fileName: file.name,
                type: "image",
                title: file.name,
                id: "preview-img",
            },
        };

        // ✅ только для предпросмотра
        setArticleData(newArticle);
        return true;
    };
    return (
        <Card>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
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
                    label="Категория(моковые)"
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
                    <TipTapEditor setJson={setEditorData} />
                </Form.Item>

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
