"use client";
import { useEffect, useState } from "react";
import { Table, Button, Space, Modal, Tag, Image, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { IArticleFront } from "@/lib/models";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import useLocale from "@/lib/hooks/useLocale";
import { CONSTANT_ARTICLE_STATUS_DB } from "@/asset/constants/database/article-status.const";
import { useTranslations } from "next-intl";

interface ArticleListTabProps {
  
    onArticleEdit: (article: IArticleFront) => void;
    onArticleDelete: (articleId: string) => void;
}

export const ArticleTabAdmin: React.FC<ArticleListTabProps> = ({
  
    onArticleEdit,
    onArticleDelete,
}) => {
    const locale = useLocale();
    const tStatusArticle = useTranslations("StatusArticle");

    const [previewArticle, setPreviewArticle] = useState<IArticleFront | null>(
        null
    );
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [articles, setArticles] = useState<IArticleFront[]>([]);
    const articleService = new ArticleService();
    useEffect(() => {
        articleService.getWithFilter({ page: 1, pageSize: 10 }).then((res) => {
            if (res) {
                console.log(res);
                setArticles(res);
            }
        });
    }, []);
    const handleEdit = (article: IArticleFront) => {
        onArticleEdit(article);
    };

    const handleDelete = (article: IArticleFront) => {
        Modal.confirm({
            title: "Удаление статьи",
            content: `Вы уверены, что хотите удалить статью "${article.title}"?`,
            okText: "Удалить",
            cancelText: "Отмена",
            okType: "danger",
            onOk: () => {
                onArticleDelete(article.id);
            },
        });
    };

    const handlePreview = (article: IArticleFront) => {
        setPreviewArticle(article);
        setIsPreviewVisible(true);
    };

    const columns = [
        {
            title: "Заголовок",
            dataIndex: "title",
            key: "title",
            width: 300,
            render: (title: string, record: IArticleFront) => (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {record.titleImage && (
                        <Image
                            width={50}
                            height={30}
                            src={record.titleImage.src}
                            alt={record.titleImage.alt}
                            style={{ objectFit: "cover" }}
                        />
                    )}
                    <span>{title}</span>
                </div>
            ),
        },
        {
            title: "Категория",
            dataIndex: "category",
            key: "category",
            render: (category: string) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: "Автор",
            dataIndex: "author",
            key: "author",
        },
        {
            title: "Дата",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Статус",
            key: "status",
            render: (_: any, record: IArticleFront) => (
                <Tag color="green">{tStatusArticle(record.status.code)}</Tag>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            render: (_: any, record: IArticleFront) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => handlePreview(record)}
                    >
                        Просмотр
                    </Button>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => handleEdit(record)}
                    >
                        Редактировать
                    </Button>
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                        onClick={() => handleDelete(record)}
                    >
                        Удалить
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h3>Список статей ({articles.length})</h3>
                </div>
            </div>

            <Table
                columns={columns}
                dataSource={articles}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
            />

            <Modal
                title={previewArticle?.title}
                open={isPreviewVisible}
                onCancel={() => setIsPreviewVisible(false)}
                footer={[
                    <Button
                        key="close"
                        onClick={() => setIsPreviewVisible(false)}
                    >
                        Закрыть
                    </Button>,
                ]}
                width={800}
            >
                {previewArticle && (
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            {previewArticle.titleImage && (
                                <Image
                                    width="100%"
                                    height={200}
                                    src={previewArticle.titleImage.src}
                                    alt={previewArticle.titleImage.alt}
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                        </div>
                        <p>
                            <strong>Описание:</strong>{" "}
                            {previewArticle.description}
                        </p>
                        <p>
                            <strong>Категория:</strong>{" "}
                            {previewArticle.category}
                        </p>
                        <p>
                            <strong>Автор:</strong> {previewArticle.author}
                        </p>
                        <p>
                            <strong>Дата:</strong> {previewArticle.date}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

