"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Tag, Image, Card, Select } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ReloadOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { IArticleFront, IOption } from "@/lib/models";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import { useTranslations } from "next-intl";
import PreviewEditor from "@/components/common/TipTap/Viewer/previewEditor";
import { ModalConfirm } from "@/components/common/Modal/ModalConfirm";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { useAlertMessage } from "@/lib/context";
import { FormCreateArticle } from "@/components/common/Form/article/FormCreateArticle";

const { Option } = Select;

export const ArticleTabAdmin: React.FC = () => {
    const message = useAlertMessage();
    const tStatusArticle = useTranslations("StatusArticle");

    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [editArticle, setEditArticle] = useState<IArticleFront | null>(null);
    const [articles, setArticles] = useState<IArticleFront[]>([]);
    const [statusOptions, setStatusOptions] = useState<IOption[]>([]);

    // const articleService = new ArticleService();
    // const dataLoadManagementService = new DataLoadManagementService();
    const services = useMemo(
        () => ({
            article: new ArticleService(),
            dataLoad: new DataLoadManagementService(),
        }),
        []
    );
    const fetchArticles = useCallback(async () => {
        const res = await services.article.getWithFilter({
            page: 1,
            pageSize: 10,
        });
        if (res) {
            setArticles(res);
        }
    }, [services]);

    const fetchStatusOptions = useCallback(async () => {
        const res = await services.dataLoad.getArticleStatus();
        if (res) {
            const options: IOption[] = res.map((item) => ({
                id: item.Id,
                label: tStatusArticle(item.Code),
                value: item.Code,
            }));
            setStatusOptions(options);
        }
    }, [services, tStatusArticle]);
    const loadInitialData = useCallback(async () => {
        setIsLoading(true);
        try {
            await Promise.all([fetchArticles(), fetchStatusOptions()]);
        } finally {
            setIsLoading(false);
        }
    }, [fetchArticles, fetchStatusOptions]);
    // Загрузка данных
    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    // Обработчики действий
    const handleAdd = () => {
        setEditArticle(null);
        setIsModalActive(true);
    };

    const handleEdit = (article: IArticleFront) => {
        setEditArticle(article);
        setIsModalActive(true);
    };

    const handleCloseModal = () => {
        setIsModalActive(false);
        fetchArticles();
    };

    const handleDelete = async (article: IArticleFront) => {
        const responseDelete = await services.article.delete(article.id);
        if (responseDelete) {
            message.info("Статья удалена");
            fetchArticles();
        }
    };

    const handleStatusChange = async (
        idArticle: string,
        newStatus: IOption
    ) => {
        const res = await services.article.update(idArticle, {
            source: { ArticlesStatusId: newStatus.id as string },
        });
        if (res) {
            fetchArticles();
        }
    };

    const handleRefresh = () => {
        message.info("Обновлено");
        fetchArticles();
    };

    // Вспомогательные компоненты
    const TagsList = ({
        items,
    }: {
        items: Array<{ id: string; value: string }>;
    }) => (
        <Space direction="vertical">
            {items.map((item) => (
                <Tag key={item.id} color="blue" style={{ cursor: "pointer" }}>
                    {item.value}
                </Tag>
            ))}
        </Space>
    );

    const ArticleActions = ({ record }: { record: IArticleFront }) => (
        <Space>
            {statusOptions.length > 0 && (
                <Select
                    size="small"
                    style={{ width: 140 }}
                    defaultValue={record.status.code}
                    onChange={(selectedValue) => {
                        const newStatus = statusOptions.find(
                            (item) => item.value === selectedValue
                        );
                        if (newStatus) {
                            handleStatusChange(record.id, newStatus);
                        }
                    }}
                    placeholder="Изменить статус"
                >
                    {statusOptions.map((option) => (
                        <Option key={option.id} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            )}

            <PreviewEditor article={record}>
                <Button type="primary" icon={<EyeOutlined />} size="middle" />
            </PreviewEditor>

            <Button
                icon={<EditOutlined />}
                size="middle"
                onClick={() => handleEdit(record)}
            />

            <ModalConfirm handlerAction={() => handleDelete(record)}>
                <Button danger icon={<DeleteOutlined />} size="middle" />
            </ModalConfirm>
        </Space>
    );

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
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
            title: "Рубрика",
            dataIndex: "type",
            key: "type",
            render: (types: IArticleFront["type"]) => (
                <TagsList items={types} />
            ),
        },
        {
            title: "Под рубрика",
            dataIndex: "subType",
            key: "subType",
            render: (subTypes: IArticleFront["subType"]) => (
                <TagsList items={subTypes} />
            ),
        },
        {
            title: "Автор",
            dataIndex: "author",
            key: "author",
            render: (author: IArticleFront["author"]) => author?.Nickname,
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
                <ArticleActions record={record} />
            ),
        },
    ];

    return (
        <Card
            title={`Список статей ${articles.length}`}
            extra={
                <Space>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Создать статью
                    </Button>
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={handleRefresh}
                        loading={isLoading}
                    />
                </Space>
            }
        >
            <Table
                columns={columns}
                dataSource={articles}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                scroll={{ x: 800 }}
                loading={isLoading}
            />

            <FormCreateArticle
                handleCloseModal={handleCloseModal}
                isModalActive={isModalActive}
                initialData={editArticle}
            />
        </Card>
    );
};
