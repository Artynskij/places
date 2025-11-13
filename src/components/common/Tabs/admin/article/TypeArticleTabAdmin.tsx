"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Table,
    Button,
    Space,
    Input,
    Form,
    Modal,
    message,
    Tag,
    Card,
    Tooltip,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ReloadOutlined,
} from "@ant-design/icons";
import {
    IArticleSubTypeFront,
    IArticleTypeFront,
    IDetailLang,
    IOption,
} from "@/lib/models";
import { ArticleTypeService } from "@/lib/Api/(Article)/article-type.api";
import { LanguageManagerBlock } from "@/components/common/Form/_components/LanguageManagerBlock/LanguageManagerBlock";
import { TLocale } from "@/lib/models/types";

import type { ColumnsType } from "antd/es/table";
import { CONSTANT_LANGS_DETAILS } from "@/asset/constants/langs-details";
import { buildEntityField } from "@/lib/helpers/build-entity-field";
import { CopyClipboardButton } from "@/components/common/ButtonFunctional/CopyClipboardButton";
import { ModalConfirm } from "@/components/common/Modal/ModalConfirm";

const { Search } = Input;

export const TypeArticleTabAdmin: React.FC = () => {
    const [typesArticle, setTypesArticle] = useState<IArticleTypeFront[]>([]);
    const [editType, setEditType] = useState<IArticleTypeFront | null>(null);
    const [searchOptions, setSearchOptions] = useState<IOption[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const [languageDetails, setLanguageDetails] = useState<IDetailLang[]>(
        CONSTANT_LANGS_DETAILS
    );
    const [isModalLoading, setIsModalLoading] = useState(false);
    const [form] = Form.useForm();

    const services = useMemo(
        () => ({
            articleType: new ArticleTypeService(),
        }),
        []
    );

    const fetchAll = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await services.articleType.get();
            setTypesArticle(data || []);
        } catch {
            message.error("Ошибка загрузки типов статей");
        } finally {
            setIsLoading(false);
        }
    }, [services]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    useEffect(() => {
        if (editType && isModalActive) {
            const details =
                editType.content?.details?.map((detail) => ({
                    lang: detail.lang as TLocale,
                    value: detail.value || "",
                })) || CONSTANT_LANGS_DETAILS;

            setLanguageDetails(details);

            form.setFieldsValue({
                code: editType.code || "",
            });
        } else if (isModalActive) {
            form.resetFields();
            setLanguageDetails(CONSTANT_LANGS_DETAILS);
        }
    }, [editType, isModalActive, form]);

    const fetchById = async (id: string) => {
        setIsLoading(true);
        try {
            const typeArticle = await services.articleType.getById(id);
            if (!typeArticle) {
                throw Error("Тип статьи не найден");
            }
            setTypesArticle([typeArticle]);
        } catch {
            message.error("Тип статьи не найден");
        } finally {
            setIsLoading(false);
        }
    };

    const findSearchByTitle = async (title: string) => {
        if (!title.trim()) {
            setSearchOptions([]);
            return;
        }

        try {
            // Здесь можно добавить поиск по API если есть такой метод
            // Пока просто фильтруем локально
            const filtered = typesArticle.filter(
                (item) =>
                    item.name?.toLowerCase().includes(title.toLowerCase()) ||
                    item.code?.toLowerCase().includes(title.toLowerCase())
            );

            setSearchOptions(
                filtered.map((item) => ({
                    label: item.name || item.code || "",
                    value: item.id,
                }))
            );
        } catch {
            message.error("Ошибка поиска");
            setSearchOptions([]);
        }
    };

    const handleEdit = (record: IArticleTypeFront) => {
        setEditType(record);
        setIsModalActive(true);
    };

    const handleDelete = async (record: IArticleTypeFront) => {
        try {
            await services.articleType.delete(record.id);
            fetchAll();
            message.success("Тип статьи удален");
        } catch {
            message.error("Ошибка при удалении типа статьи");
        }
    };

    const handleModalClose = () => {
        setIsModalActive(false);
        setEditType(null);
        form.resetFields();
        setLanguageDetails(CONSTANT_LANGS_DETAILS);
    };

    const handleLanguageDetailsChange = (details: IDetailLang[]) => {
        setLanguageDetails(details);
    };

    const handleAdd = () => {
        setEditType(null);
        setIsModalActive(true);
    };

    const handleSubmit = async () => {
        try {
            // Валидируем languageDetails - проверяем что все выбранные языки заполнены
            const hasEmptyFields = languageDetails.some(
                (item) => !item.value.trim()
            );
            const englishDetail = languageDetails.find(
                (item) => item.lang === "en"
            );
            if (!englishDetail) {
                message.error("Английский язык обязателен.");
                return;
            }
            if (hasEmptyFields) {
                message.error("Заполните все выбранные языки");
                return;
            }

            // Валидируем остальные поля формы

            setIsModalLoading(true);

            const { name, code } = buildEntityField({
                englishName: englishDetail.value,
                entity: ["code", "name"],
            });
            const filledDetails = languageDetails.filter((item) =>
                item.value.trim()
            );
            const body = {
                source: {
                    Name: name,
                    Code: code,
                },

                content: {
                    details: filledDetails,
                },
            };

            if (editType) {
                // Редактирование существующего типа
                const updatedType = await services.articleType.update(
                    editType.id,
                    body
                );

                if (updatedType) {
                    message.success("Тип статьи обновлен");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при обновлении типа статьи");
                }
            } else {
                // Создание нового типа

                const newType = await services.articleType.create(body);

                if (newType) {
                    message.success("Тип статьи создан");
                    fetchAll();
                    handleModalClose();
                } else {
                    message.error("Ошибка при создании типа статьи");
                }
            }
        } catch (error) {
            console.error("Ошибка:", error);
            message.error("Произошла ошибка при сохранении");
        } finally {
            setIsModalLoading(false);
        }
    };

    const columns: ColumnsType<IArticleTypeFront> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (id: IArticleTypeFront["id"]) => {
                return <CopyClipboardButton text={id} />;
            },
        },

        {
            title: "Название рубрики",
            dataIndex: "value",
            key: "value",
        },
        {
            title: "Языки",
            key: "languages",
            render: (_, record) => (
                <Space>
                    {record.content?.details?.map((detail, index) => (
                        <Tooltip
                            key={detail.lang}
                            title={`${detail.lang.toUpperCase()}: ${
                                detail.value
                            }`}
                        >
                            <Tag color="blue">{detail.lang.toUpperCase()}</Tag>
                        </Tooltip>
                    ))}
                </Space>
            ),
        },
        {
            title: "Кол-во статей",
            dataIndex: "articlesCount",
            key: "articlesCount",
            render: (count: number) => (
                <Tag color={count > 0 ? "blue" : "default"}>{count}</Tag>
            ),
        },
        {
            title: "Кол-во подрубрик",
            dataIndex: "subTypes",
            key: "subTypes",
            render: (subTypes: IArticleSubTypeFront[]) => (
                <Tag color={subTypes.length > 0 ? "blue" : "default"}>
                    {subTypes.length}
                </Tag>
            ),
        },
        {
            title: "Действия",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Tooltip title={"Редактировать"}>
                        <Button
                            icon={<EditOutlined />}
                            size="small"
                            onClick={() => handleEdit(record)}
                        />
                    </Tooltip>
                    <ModalConfirm handlerAction={() => handleDelete(record)}>
                        <Tooltip title={"Удалить"}>
                            <Button
                                danger
                                icon={<DeleteOutlined />}
                                size="small"
                                disabled={record.articlesCount > 0}
                            />
                        </Tooltip>
                    </ModalConfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Card
                extra={
                    <Space>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Добавить рубрику
                        </Button>
                        <Button
                            icon={<ReloadOutlined />}
                            onClick={() => {
                                message.info("Обновлено");
                                fetchAll();
                            }}
                            loading={isLoading}
                        />
                    </Space>
                }
                title="Управление типами статей"
            >
                <Space style={{ marginBottom: 16 }}>
                    <Search
                        placeholder="Поиск по ID"
                        onSearch={(value) => {
                            if (!value) return fetchAll();
                            fetchById(value);
                        }}
                        allowClear
                        loading={isLoading}
                        style={{ width: 200 }}
                    />
                    {/* <Select
                        showSearch
                        placeholder="Поиск по названию"
                        onSearch={findSearchByTitle}
                        onSelect={(id) => fetchById(id)}
                        filterOption={false}
                        notFoundContent={null}
                        style={{ width: 300 }}
                        options={searchOptions}
                    /> */}
                </Space>

                <Table
                    columns={columns}
                    dataSource={typesArticle}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={isLoading}
                />
            </Card>

            <Modal
                title={
                    editType
                        ? "Редактировать рубрики статьи"
                        : "Добавить рубрики статьи"
                }
                open={isModalActive}
                onOk={handleSubmit}
                onCancel={handleModalClose}
                width={700}
                okText={editType ? "Сохранить" : "Создать"}
                cancelText="Отмена"
                confirmLoading={isModalLoading}
            >
                <Form form={form} layout="vertical">
                    <LanguageManagerBlock
                        value={languageDetails}
                        onChange={handleLanguageDetailsChange}
                        required={true}
                    />
                </Form>
            </Modal>
        </>
    );
};
