"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, Button, Space, Tag, Image, Card, Select, Tooltip } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ReloadOutlined,
    PlusOutlined,
    FieldTimeOutlined,
} from "@ant-design/icons";
import { IArticleFront, IOption } from "@/lib/models";
import { ArticleService } from "@/lib/Api/(Article)/article/article.service";
import { useTranslations } from "next-intl";
import PreviewEditor from "@/components/common/TipTap/Viewer/previewEditor";
import { ModalConfirm } from "@/components/common/Modal/ModalConfirm";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { useAlertMessage } from "@/lib/context";
import { FormCreateArticle } from "@/components/common/Form/article/FormCreateArticle";
import { createFormatDate } from "@/lib/helpers/create-format-date";
import { CopyClipboardButton } from "@/components/common/ButtonFunctional/CopyClipboardButton";

const { Option } = Select;

export const ArticleTabAdmin: React.FC = () => {
    const message = useAlertMessage();

    const tStatusArticle = useTranslations("StatusArticle");

    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [editArticle, setEditArticle] = useState<IArticleFront | null>(null);
    const [articles, setArticles] = useState<IArticleFront[]>([]);
    const [statusOptions, setStatusOptions] = useState<IOption[]>([]);

    const services = useMemo(
        () => ({
            article: new ArticleService(),
            dataLoad: new DataLoadManagementService(),
        }),
        []
    );
    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        const [responseArticles, responseStatuses] = await Promise.all([
            await services.article.getWithFilter({
                page: 1,
                pageSize: 10,
            }),
            await services.dataLoad.getArticleStatus(),
        ]);
        if (responseArticles) {
            setArticles(responseArticles);
        } else {
            message.error("ошибка при получении  статей");
            return;
        }
        if (responseStatuses) {
            const options: IOption[] = responseStatuses.map((item) => ({
                id: item.Id,
                label: tStatusArticle(item.Code),
                value: item.Code,
            }));
            setStatusOptions(options);
        } else {
            message.error("ошибка при получении статусов статей");
        }
        setIsLoading(false);
    }, [services, tStatusArticle, message]);

    // Загрузка данных
    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

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
        handleRefresh();
    };

    const handleDelete = async (article: IArticleFront) => {
        const responseDelete = await services.article.delete(article.id);
        if (responseDelete) {
            message.info("Статья удалена");
            handleRefresh();
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
            message.success("Обновлен статус");
            handleRefresh();
        } else {
            message.success("Ошибка при обновлении статуса");
        }
    };
    const handleUpdateDate = async (id: string) => {
        const responsePublishedDate =
            await services.article.updatePublishedDate(id);
        if (responsePublishedDate) {
            message.success("Обновлена дата");
            handleRefresh();
        } else {
            message.success("Ошибка при обновлении даты");
        }
    };
    const handleRefresh = () => {
        message.info("Обновлено");
        fetchAll();
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
                <Tooltip title={"Изменить статус"}>
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
                </Tooltip>
            )}
            <Tooltip title={"Обновить дату"}>
                <Button
                    icon={<FieldTimeOutlined />}
                    size="middle"
                    onClick={() => handleUpdateDate(record.id)}
                />
            </Tooltip>
            <PreviewEditor article={record}>
                <Tooltip title={"Превью статьи"}>
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="middle"
                    />
                </Tooltip>
            </PreviewEditor>

            <Tooltip title={"Редактировать"}>
                <Button
                    icon={<EditOutlined />}
                    size="middle"
                    onClick={() => handleEdit(record)}
                />
            </Tooltip>
            <ModalConfirm handlerAction={() => handleDelete(record)}>
                <Tooltip title={"Удалить"}>
                    <Button danger icon={<DeleteOutlined />} size="middle" />
                </Tooltip>
            </ModalConfirm>
        </Space>
    );

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (id: IArticleFront["id"]) => {
                return <CopyClipboardButton text={id} />;
            },
        },
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
            render: (author: IArticleFront["author"]) => author?.nickname,
        },
        {
            title: "Статус",
            key: "status",
            render: (_: any, record: IArticleFront) => (
                <Tag color="green">{tStatusArticle(record.status.code)}</Tag>
            ),
        },
        {
            title: "Дата создания",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (
                date: IArticleFront["createdDate"],
                record: IArticleFront
            ) => <Tag color="default">{createFormatDate(date)}</Tag>,
        },
        {
            title: "Дата публикации",
            dataIndex: "publishedDate",
            key: "publishedDate",
            render: (
                date: IArticleFront["publishedDate"],
                record: IArticleFront
            ) => <Tag color="blue">{createFormatDate(date)}</Tag>,
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
