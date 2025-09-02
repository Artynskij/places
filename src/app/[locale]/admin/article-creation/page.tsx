"use client";

import React, { useState } from "react";
import {
    Card,
    Form,
    Input,
    Select,
    Button,
    Upload,
    message,
    Space,
    Divider,
    Row,
    Col,
} from "antd";
import {
    PlusOutlined,
    UploadOutlined,
    SaveOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { IArticleFront } from "@/lib/models";
import { ArticleService } from "@/lib/Api/article/article.service";
import styles from "../admin.module.scss";

const { TextArea } = Input;
const { Option } = Select;

interface ArticleFormData {
    title: string;
    markdown: string;
    description: string;
    author: string;
    titleImage?: string;
}

const ArticleCreationPage: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);

    const articleService = new ArticleService();

    const categories = [
        "Новости",
        "Путеводители",
        "Рестораны",
        "Отели",
        "Развлечения",
        "Культура",
        "Спорт",
        "События",
    ];

    const handleSubmit = async (values: ArticleFormData) => {
        setLoading(true);
        try {
            // TODO: Добавить API вызов для создания статьи
            // const newArticle = await articleService.create(values);
            console.log("Article data:", values);

            // Имитация API вызова
            await new Promise((resolve) => setTimeout(resolve, 1000));

            message.success("Статья успешно сохранена!");
            form.resetFields();
        } catch (error) {
            message.error("Ошибка при сохранении статьи");
            console.error("Article save error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = () => {
        const values = form.getFieldsValue();
        if (!values.title || !values.markdown) {
            message.warning(
                "Заполните заголовок и содержание для предварительного просмотра"
            );
            return;
        }
        setPreviewVisible(true);
    };

    const uploadProps = {
        name: "file",
        action: "/api/upload", // Замените на ваш API endpoint
        headers: {
            authorization: "authorization-text",
        },
        onChange(info: any) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} файл загружен успешно`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} ошибка загрузки файла.`);
            }
        },
    };

    return (
        <div>
            <h2
                style={{
                    fontSize: "28px",
                    fontWeight: "600",
                    color: "#262626",
                    marginBottom: "24px",
                }}
            >
                Создание статьи
            </h2>

            <Row gutter={24}>
                <Col span={16}>
                    <Card style={{ fontSize: "14px" }}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            className={styles.adminForm}
                            style={{ fontSize: "14px" }}
                        >
                            <Form.Item
                                name="title"
                                label={
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Заголовок статьи
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите заголовок статьи",
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Введите заголовок статьи"
                                    style={{ fontSize: "16px" }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label={
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Краткое описание
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите краткое описание",
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="Краткое описание статьи для превью"
                                    style={{ fontSize: "14px" }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="markdown"
                                label={
                                    <span
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        Содержание статьи (Markdown)
                                    </span>
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: "Введите содержание статьи",
                                    },
                                ]}
                            >
                                <TextArea
                                    rows={15}
                                    placeholder="Введите содержание статьи в формате Markdown..."
                                    style={{ fontSize: "14px" }}
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="author"
                                        label={
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                Автор
                                            </span>
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message: "Введите автора",
                                            },
                                        ]}
                                    >
                                        <Input
                                            placeholder="Имя автора"
                                            style={{ fontSize: "14px" }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="titleImage"
                                        label={
                                            <span
                                                style={{
                                                    fontSize: "16px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                URL главного изображения
                                            </span>
                                        }
                                    >
                                        <Input
                                            placeholder="https://example.com/image.jpg"
                                            style={{ fontSize: "14px" }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider />

                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={loading}
                                    style={{ fontSize: "14px" }}
                                >
                                    Сохранить статью
                                </Button>

                                <Button
                                    icon={<EyeOutlined />}
                                    onClick={handlePreview}
                                    style={{ fontSize: "14px" }}
                                >
                                    Предварительный просмотр
                                </Button>
                            </Space>
                        </Form>
                    </Card>
                </Col>

                <Col span={8}>
                    <Card
                        title={
                            <span
                                style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                                Информация
                            </span>
                        }
                        style={{ fontSize: "14px" }}
                    >
                        <Card
                            title={
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Советы по написанию
                                </span>
                            }
                            size="small"
                            style={{ marginTop: 16, fontSize: "14px" }}
                        >
                            <ul style={{ paddingLeft: 20, margin: 0 }}>
                                <li>Используйте привлекательные заголовки</li>
                                <li>
                                    Добавляйте изображения для лучшего
                                    восприятия
                                </li>
                                <li>
                                    Структурируйте текст с помощью подзаголовков
                                </li>
                                <li>Используйте Markdown для форматирования</li>
                                <li>Проверяйте орфографию и грамматику</li>
                            </ul>
                        </Card>

                        <Card
                            title={
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Markdown справка
                                </span>
                            }
                            size="small"
                            style={{ marginTop: 16, fontSize: "14px" }}
                        >
                            <div style={{ fontSize: "13px" }}>
                                <p>
                                    <strong>Заголовки:</strong> # ## ###
                                </p>
                                <p>
                                    <strong>Жирный:</strong> **текст**
                                </p>
                                <p>
                                    <strong>Курсив:</strong> *текст*
                                </p>
                                <p>
                                    <strong>Ссылки:</strong> [текст](url)
                                </p>
                                <p>
                                    <strong>Изображения:</strong> ![alt](url)
                                </p>
                            </div>
                        </Card>
                    </Card>
                </Col>
            </Row>

            {/* Модальное окно предварительного просмотра */}
            {previewVisible && (
                <Card
                    title={
                        <span style={{ fontSize: "20px", fontWeight: "600" }}>
                            Предварительный просмотр
                        </span>
                    }
                    style={{ marginTop: 16, fontSize: "14px" }}
                    extra={
                        <Button
                            onClick={() => setPreviewVisible(false)}
                            style={{ fontSize: "14px" }}
                        >
                            Закрыть
                        </Button>
                    }
                >
                    <div
                        style={{
                            border: "1px solid #d9d9d9",
                            padding: 16,
                            borderRadius: 6,
                            backgroundColor: "#fafafa",
                            fontSize: "14px",
                        }}
                    >
                        <h1
                            style={{
                                fontSize: "24px",
                                fontWeight: "600",
                                marginBottom: "12px",
                            }}
                        >
                            {form.getFieldValue("title")}
                        </h1>
                        <p
                            style={{
                                color: "#666",
                                fontSize: "16px",
                                marginBottom: "16px",
                            }}
                        >
                            {form.getFieldValue("description")}
                        </p>
                        <div
                            style={{
                                whiteSpace: "pre-wrap",
                                fontSize: "14px",
                                lineHeight: "1.6",
                            }}
                        >
                            {form.getFieldValue("markdown")}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ArticleCreationPage;
